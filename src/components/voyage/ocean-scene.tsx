"use client"

import { useEffect, useRef } from "react"
import type * as ThreeNS from "three"
import { useTheme } from "@/components/theme/theme-provider"

const GOLD = 0xf0c14b
const RED = 0xe0362c
const VOYAGE = 420

// Straw-hat pirate palette — original low-poly fan figure, not a
// likeness lifted from official art.
const SKIN = 0xf0c08a
const VEST_RED = 0xd42f2a
const SHORTS_BLUE = 0x2f6fd0
const HAIR_BLACK = 0x1a1410

/**
 * Fixed-position WebGL backdrop. The camera sails forward along -Z in
 * proportion to page scroll, so the whole site reads as one voyage.
 *
 * Skipped entirely on reduced-motion or narrow screens — those get the
 * static gradient painted by the sibling <div> in <VoyageBackdrop>.
 */
export function OceanScene({ night = false }: { night?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const flat =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 900
    if (flat) return

    // Disposed by the cleanup below even if it runs mid-import.
    let cancelled = false
    let teardown: (() => void) | undefined

    /**
     * three is ~600KB of JS. A static import made every visitor parse
     * and evaluate it — including phones, which skip the scene entirely
     * via `flat` above. Importing here means the cost is paid only by
     * clients that actually render, and after hydration rather than
     * during it.
     */
    void import("three").then((THREE) => {
      if (cancelled) return
      teardown = build(THREE, canvas, night)
    })

    return () => {
      cancelled = true
      teardown?.()
    }
  }, [night])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen"
    />
  )
}

/** Builds the scene and returns its teardown. */
function build(
  THREE: typeof ThreeNS,
  canvas: HTMLCanvasElement,
  night: boolean
): (() => void) | undefined {
  {
    let renderer: ThreeNS.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      return // no WebGL — gradient backdrop stands in
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(window.innerWidth, window.innerHeight, false)

    // Night reuses the whole scene and only re-tunes light, fog and the
    // sea — the geometry is identical, so this costs nothing extra.
    const P = night
      ? {
          fog: 0x0d2c44,
          ambient: 0x2c4f6e,
          ambientI: 0.75,
          sun: 0xbcd4ff,
          sunI: 0.5,
          rim: 0x2a7fa8,
          rimI: 0.35,
          disc: 0xdbe6ff,
          halo: 0x9fb9e8,
          sea: 0x0d3a55,
          lanternI: 1.5,
        }
      : {
          fog: 0xcfe7ef,
          ambient: 0xd6ecf4,
          ambientI: 0.95,
          sun: 0xfff3d2,
          sunI: 1.2,
          rim: 0x69d3f2,
          rimI: 0.45,
          disc: 0xfff2c8,
          halo: 0xffe9a8,
          sea: 0x1ba2cd,
          lanternI: 0.5,
        }

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(P.fog, 90, 520)

    const cam = new THREE.PerspectiveCamera(
      62,
      window.innerWidth / window.innerHeight,
      0.1,
      1600
    )
    cam.position.set(0, 3.4, 12)

    // ---- light ----
    scene.add(new THREE.AmbientLight(P.ambient, P.ambientI))
    const sun = new THREE.DirectionalLight(P.sun, P.sunI)
    sun.position.set(-70, 80, -180)
    scene.add(sun)
    const rim = new THREE.DirectionalLight(P.rim, P.rimI)
    rim.position.set(50, 22, 70)
    scene.add(rim)

    const disc = new THREE.Mesh(
      new THREE.SphereGeometry(30, 26, 26),
      new THREE.MeshBasicMaterial({ color: P.disc, fog: false })
    )
    disc.position.set(-150, 58, -720)
    scene.add(disc)
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(52, 26, 26),
      new THREE.MeshBasicMaterial({
        color: P.halo,
        transparent: true,
        opacity: 0.28,
        fog: false,
      })
    )
    halo.position.copy(disc.position)
    scene.add(halo)

    // ---- sea ----
    const seaGeo = new THREE.PlaneGeometry(420, 620, 96, 132)
    const sea = new THREE.Mesh(
      seaGeo,
      new THREE.MeshStandardMaterial({
        color: P.sea,
        roughness: 0.14,
        metalness: 0.5,
        flatShading: true,
      })
    )
    sea.rotation.x = -Math.PI / 2
    sea.position.z = -VOYAGE / 2 + 20
    scene.add(sea)
    const seaAttr = seaGeo.attributes.position as ThreeNS.BufferAttribute
    const seaBase = Float32Array.from(seaAttr.array as Float32Array)

    // ---- depth: far silhouette ranges ----
    // Three desaturated layers at increasing distance. Each is paler
    // and flatter than the one in front, so the horizon reads as real
    // distance rather than a painted backdrop.
    const rangeLayers = [
      { z: -560, color: 0x6f9fb4, opacity: 0.75, scale: 1, count: 9 },
      { z: -760, color: 0x92b8c8, opacity: 0.6, scale: 1.5, count: 7 },
      { z: -980, color: 0xb3d0da, opacity: 0.45, scale: 2.1, count: 6 },
    ]
    for (const layer of rangeLayers) {
      const mat = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        fog: false,
      })
      for (let i = 0; i < layer.count; i++) {
        const h = (30 + Math.random() * 60) * layer.scale
        const peak = new THREE.Mesh(
          new THREE.ConeGeometry(
            (20 + Math.random() * 26) * layer.scale,
            h,
            5,
            1
          ),
          mat
        )
        peak.position.set(
          (Math.random() - 0.5) * 900 * layer.scale,
          h / 2 - 6,
          layer.z - Math.random() * 90
        )
        peak.rotation.y = Math.random() * 3
        scene.add(peak)
      }
    }

    // ---- depth: contact shadows ----
    // Cheap fake AO. Real shadow maps on this many objects would cost
    // more than the whole rest of the frame; a dark faded disc on the
    // waterline sells the same "this thing sits in the sea" cue.
    const shadowTex = (() => {
      const c = document.createElement("canvas")
      c.width = c.height = 128
      const ctx = c.getContext("2d")
      if (!ctx) return null
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
      g.addColorStop(0, "rgba(6,40,60,0.55)")
      g.addColorStop(0.55, "rgba(6,40,60,0.22)")
      g.addColorStop(1, "rgba(6,40,60,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 128, 128)
      return new THREE.CanvasTexture(c)
    })()
    const shadowMat = shadowTex
      ? new THREE.MeshBasicMaterial({
          map: shadowTex,
          transparent: true,
          depthWrite: false,
        })
      : null
    const contactShadow = (x: number, z: number, r: number) => {
      if (!shadowMat) return
      const s = new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 2), shadowMat)
      s.rotation.x = -Math.PI / 2
      s.position.set(x, 0.06, z)
      scene.add(s)
    }

    // ---- lanterns ----
    const leds: { mat: ThreeNS.MeshBasicMaterial; sp: number; ph: number }[] =
      []
    const lantern = (
      x: number,
      y: number,
      z: number,
      color: number,
      scl: number
    ) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
      })
      const m = new THREE.Mesh(new THREE.SphereGeometry(scl, 10, 10), mat)
      m.position.set(x, y, z)
      scene.add(m)
      leds.push({
        mat,
        sp: 0.6 + Math.random() * 2.2,
        ph: Math.random() * 6.28,
      })
      const l = new THREE.PointLight(color, P.lanternI, 22, 2)
      l.position.set(x, y, z)
      scene.add(l)
    }

    // ---- islands + palms ----
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x2f7d5c,
      roughness: 0.95,
      metalness: 0.05,
      flatShading: true,
    })
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xefd9a8,
      roughness: 1,
      flatShading: true,
    })
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x8a5f38,
      roughness: 0.95,
      flatShading: true,
    })
    const frondMat = new THREE.MeshStandardMaterial({
      color: 0x35a06a,
      roughness: 0.9,
      side: THREE.DoubleSide,
      flatShading: true,
    })

    const palm = (px: number, py: number, pz: number, s: number) => {
      const g = new THREE.Group()
      const tr = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18 * s, 0.3 * s, 6 * s, 6),
        trunkMat
      )
      tr.position.y = 3 * s
      tr.rotation.z = 0.14
      g.add(tr)
      for (let f = 0; f < 6; f++) {
        const fr = new THREE.Mesh(
          new THREE.ConeGeometry(0.7 * s, 3.4 * s, 4, 1, true),
          frondMat
        )
        fr.position.set(
          Math.cos(f * 1.05) * 1.5 * s - 0.8 * s,
          6.1 * s,
          Math.sin(f * 1.05) * 1.5 * s
        )
        fr.rotation.set(
          Math.cos(f * 1.05) * 1.1,
          f,
          Math.sin(f * 1.05) * 1.1 + 0.6
        )
        g.add(fr)
      }
      g.position.set(px, py, pz)
      scene.add(g)
    }

    for (let i = 0; i < 18; i++) {
      const z = -14 - i * 22 - Math.random() * 8
      const side = i % 2 === 0 ? -1 : 1
      const x = side * (17 + Math.random() * 26)
      const h = 7 + Math.random() * 16
      const isle = new THREE.Mesh(
        new THREE.ConeGeometry(
          4.5 + Math.random() * 7,
          h,
          6 + Math.floor(Math.random() * 3),
          1
        ),
        rockMat
      )
      isle.position.set(x, h / 2 - 1.4, z)
      isle.rotation.y = Math.random() * 3
      scene.add(isle)

      const beachR = 11 + Math.random() * 6
      const beach = new THREE.Mesh(
        new THREE.CylinderGeometry(beachR - 2, beachR, 1.6, 9),
        sandMat
      )
      beach.position.set(x, -0.5, z)
      scene.add(beach)
      contactShadow(x, z, beachR * 1.5)

      const spur = new THREE.Mesh(
        new THREE.ConeGeometry(2.4 + Math.random() * 3, h * 0.55, 6, 1),
        rockMat
      )
      spur.position.set(
        x + side * (4 + Math.random() * 4),
        h * 0.26 - 1.2,
        z + (Math.random() - 0.5) * 9
      )
      scene.add(spur)

      palm(
        x - side * (5 + Math.random() * 3),
        0,
        z + 3 + Math.random() * 4,
        0.8 + Math.random() * 0.5
      )
      if (i % 3 === 0)
        palm(
          x + side * (7 + Math.random() * 3),
          0,
          z - 4 - Math.random() * 4,
          0.7 + Math.random() * 0.4
        )
      if (i % 2 === 0) lantern(x - side * 3, h * 0.78, z + 2, RED, 0.42)
    }

    // ---- ships ----
    const sailMat = new THREE.MeshStandardMaterial({
      color: 0xe9dcbd,
      roughness: 0.95,
      side: THREE.DoubleSide,
    })
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x2a1a12,
      roughness: 0.8,
      metalness: 0.15,
      flatShading: true,
    })
    const ships: { g: ThreeNS.Group; ph: number; sp: number }[] = []
    for (let i = 0; i < 5; i++) {
      const g = new THREE.Group()
      const s = 1 + Math.random() * 0.8
      const hull = new THREE.Mesh(
        new THREE.BoxGeometry(7 * s, 2.1 * s, 2.6 * s),
        hullMat
      )
      hull.position.y = 0.9 * s
      g.add(hull)
      const bow = new THREE.Mesh(
        new THREE.ConeGeometry(1.3 * s, 3.4 * s, 4),
        hullMat
      )
      bow.rotation.z = -Math.PI / 2
      bow.position.set(5 * s, 1 * s, 0)
      g.add(bow)
      const mast = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14 * s, 0.16 * s, 11 * s, 6),
        hullMat
      )
      mast.position.y = 6.2 * s
      g.add(mast)
      const sail = new THREE.Mesh(
        new THREE.PlaneGeometry(5.4 * s, 6.4 * s),
        sailMat
      )
      sail.position.set(0, 6.6 * s, 0)
      sail.rotation.y = Math.PI / 2
      g.add(sail)
      const jib = new THREE.Mesh(
        new THREE.PlaneGeometry(3 * s, 3.6 * s),
        sailMat
      )
      jib.position.set(2.6 * s, 4.4 * s, 0)
      jib.rotation.y = Math.PI / 2
      g.add(jib)
      const flag = new THREE.Mesh(
        new THREE.PlaneGeometry(1.9 * s, 1.1 * s),
        new THREE.MeshBasicMaterial({
          color: i % 2 ? RED : GOLD,
          side: THREE.DoubleSide,
        })
      )
      flag.position.set(-0.85 * s, 11.4 * s, 0)
      flag.rotation.y = Math.PI / 2
      g.add(flag)
      g.position.set(
        (i % 2 ? 1 : -1) * (26 + Math.random() * 34),
        0,
        -40 - i * 78 - Math.random() * 30
      )
      g.rotation.y = (Math.random() - 0.5) * 1.6
      scene.add(g)
      contactShadow(g.position.x, g.position.z, 7 * s)
      ships.push({ g, ph: Math.random() * 6.28, sp: 0.5 + Math.random() * 0.5 })
    }

    // drifting lantern field
    for (let i = 0; i < 26; i++) {
      lantern(
        (Math.random() - 0.5) * 90,
        3 + Math.random() * 16,
        -Math.random() * VOYAGE + 10,
        Math.random() < 0.25 ? RED : GOLD,
        0.16 + Math.random() * 0.14
      )
    }

    // ---- straw hats ----
    const strawMat = new THREE.MeshStandardMaterial({
      color: 0xf2d489,
      roughness: 0.95,
      flatShading: true,
    })
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xd7262b,
      roughness: 0.75,
    })
    const hats: { g: ThreeNS.Group; ph: number; sp: number; spin: number }[] =
      []
    const strawHat = (
      x: number,
      y: number,
      z: number,
      s: number,
      tilt: number
    ) => {
      const g = new THREE.Group()
      const brim = new THREE.Mesh(
        new THREE.CylinderGeometry(2.15 * s, 2.35 * s, 0.14 * s, 26),
        strawMat
      )
      g.add(brim)
      const crown = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05 * s, 1.25 * s, 1.15 * s, 22),
        strawMat
      )
      crown.position.y = 0.62 * s
      g.add(crown)
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05 * s, 1.05 * s, 0.08 * s, 22),
        strawMat
      )
      cap.position.y = 1.2 * s
      g.add(cap)
      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(1.27 * s, 1.3 * s, 0.36 * s, 24),
        bandMat
      )
      band.position.y = 0.22 * s
      g.add(band)
      g.position.set(x, y, z)
      g.rotation.set(tilt, Math.random() * 3, tilt * 0.5)
      scene.add(g)
      hats.push({
        g,
        ph: Math.random() * 6.28,
        sp: 0.35 + Math.random() * 0.5,
        spin: 0.05 + Math.random() * 0.12,
      })
    }
    strawHat(7.5, 6.2, -16, 1.7, 0.22)
    strawHat(-9, 4.6, -52, 1.25, -0.18)
    strawHat(11, 7.4, -104, 1.5, 0.15)
    strawHat(-13, 5.4, -168, 1.35, -0.12)
    strawHat(9, 6.6, -246, 1.6, 0.2)
    strawHat(-8, 4.2, -330, 1.2, -0.2)

    // ---- the straw-hat pirate ----
    // An original low-poly figure in the same faceted language as the
    // islands and ships: red open vest, blue shorts, straw hat, scar
    // under the left eye, one arm thrown out toward the horizon.
    const skinMat = new THREE.MeshStandardMaterial({
      color: SKIN,
      roughness: 0.85,
      flatShading: true,
    })
    const vestMat = new THREE.MeshStandardMaterial({
      color: VEST_RED,
      roughness: 0.8,
      flatShading: true,
    })
    const shortsMat = new THREE.MeshStandardMaterial({
      color: SHORTS_BLUE,
      roughness: 0.85,
      flatShading: true,
    })
    const hairMat = new THREE.MeshStandardMaterial({
      color: HAIR_BLACK,
      roughness: 0.95,
      flatShading: true,
    })
    const darkMat = new THREE.MeshBasicMaterial({ color: 0x1a1410 })
    const scarMat = new THREE.MeshBasicMaterial({ color: 0xb5563f })
    const sandalMat = new THREE.MeshStandardMaterial({
      color: 0x6b4a2e,
      roughness: 0.95,
      flatShading: true,
    })

    type Pirate = {
      g: ThreeNS.Group
      arm: ThreeNS.Group
      ph: number
      sp: number
      y0: number
    }
    const pirates: Pirate[] = []

    const strawHatPirate = (
      x: number,
      y: number,
      z: number,
      s: number,
      faceY: number
    ) => {
      const g = new THREE.Group()

      const add = (
        geo: ThreeNS.BufferGeometry,
        mat: ThreeNS.Material,
        px: number,
        py: number,
        pz: number,
        parent: ThreeNS.Object3D = g
      ) => {
        const m = new THREE.Mesh(geo, mat)
        m.position.set(px * s, py * s, pz * s)
        parent.add(m)
        return m
      }

      // sandals + legs
      for (const side of [-1, 1]) {
        add(
          new THREE.BoxGeometry(0.34, 0.1, 0.62),
          sandalMat,
          side * 0.26,
          0.05,
          0.04
        )
        add(
          new THREE.CylinderGeometry(0.19, 0.16, 1.05, 7),
          skinMat,
          side * 0.26,
          0.62,
          0
        )
      }

      // shorts
      add(new THREE.BoxGeometry(0.98, 0.62, 0.62), shortsMat, 0, 1.4, 0)

      // torso + open vest (theta gap leaves the chest bare, as it should be)
      add(new THREE.CylinderGeometry(0.42, 0.46, 1.02, 9), skinMat, 0, 2.16, 0)
      const vest = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.53, 1.06, 12, 1, true, 0.7, 4.9),
        vestMat
      )
      vest.position.set(0, 2.16 * s, 0)
      vest.material.side = THREE.DoubleSide
      g.add(vest)

      // arms — the right one is a group so it can swing
      add(
        new THREE.CylinderGeometry(0.15, 0.13, 1.0, 7),
        skinMat,
        -0.6,
        2.1,
        0
      ).rotation.z = 0.32

      const arm = new THREE.Group()
      arm.position.set(0.5 * s, 2.55 * s, 0)
      const upper = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.13, 1.15, 7),
        skinMat
      )
      upper.position.set(0.34 * s, 0.3 * s, 0)
      upper.rotation.z = -0.85
      arm.add(upper)
      const fist = new THREE.Mesh(
        new THREE.SphereGeometry(0.19 * s, 8, 7),
        skinMat
      )
      fist.position.set(0.72 * s, 0.72 * s, 0)
      arm.add(fist)
      g.add(arm)

      // head
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.42 * s, 12, 10),
        skinMat
      )
      head.position.set(0, 2.98 * s, 0)
      head.scale.set(1, 1.04, 0.96)
      g.add(head)

      // hair — a skullcap sitting back on the crown
      const hair = new THREE.Mesh(
        new THREE.SphereGeometry(0.44 * s, 12, 10),
        hairMat
      )
      hair.position.set(0, 3.08 * s, -0.05 * s)
      hair.scale.set(1, 0.72, 1)
      g.add(hair)

      // face: eyes, grin, and the scar under the left eye
      for (const side of [-1, 1]) {
        add(
          new THREE.SphereGeometry(0.055, 7, 6),
          darkMat,
          side * 0.15,
          3.03,
          0.38
        )
      }
      const grin = new THREE.Mesh(
        new THREE.BoxGeometry(0.3 * s, 0.05 * s, 0.04 * s),
        darkMat
      )
      grin.position.set(0, 2.83 * s, 0.4 * s)
      g.add(grin)
      const scar = new THREE.Mesh(
        new THREE.BoxGeometry(0.04 * s, 0.16 * s, 0.03 * s),
        scarMat
      )
      scar.position.set(-0.16 * s, 2.9 * s, 0.4 * s)
      g.add(scar)

      // the hat
      const hat = new THREE.Group()
      const brim = new THREE.Mesh(
        new THREE.CylinderGeometry(0.78 * s, 0.86 * s, 0.06 * s, 20),
        strawMat
      )
      hat.add(brim)
      const crown = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4 * s, 0.46 * s, 0.42 * s, 18),
        strawMat
      )
      crown.position.y = 0.23 * s
      hat.add(crown)
      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4 * s, 0.4 * s, 0.04 * s, 18),
        strawMat
      )
      cap.position.y = 0.45 * s
      hat.add(cap)
      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(0.47 * s, 0.48 * s, 0.14 * s, 18),
        bandMat
      )
      band.position.y = 0.09 * s
      hat.add(band)
      hat.position.set(0, 3.34 * s, -0.02 * s)
      hat.rotation.z = 0.1
      g.add(hat)

      g.position.set(x, y, z)
      g.rotation.y = faceY
      scene.add(g)
      const record: Pirate = {
        g,
        arm,
        ph: Math.random() * 6.28,
        sp: 0.6 + Math.random() * 0.4,
        y0: y,
      }
      pirates.push(record)
      return record
    }

    // On the bow of the lead ship, riding its swell.
    if (ships[0]) {
      const rider = strawHatPirate(0, 0, 0, 1.05, -Math.PI / 2)
      scene.remove(rider.g)
      rider.g.position.set(4.2, 1.9, 0)
      rider.y0 = 1.9
      ships[0].g.add(rider.g)
    }

    // A barrel raft the camera sails right past, early on. Scaled so
    // the figure reads at a glance rather than as a speck — at this
    // distance the islands are 7–23 units tall, so anything under
    // about 6 disappears.
    const raftMat = new THREE.MeshStandardMaterial({
      color: 0x9a6a3c,
      roughness: 0.9,
      flatShading: true,
    })
    const raft = (rx: number, rz: number, s: number) => {
      for (let i = 0; i < 3; i++) {
        const b = new THREE.Mesh(
          new THREE.CylinderGeometry(0.9 * s, 0.78 * s, 2.1 * s, 12),
          raftMat
        )
        b.rotation.z = Math.PI / 2
        b.position.set(rx + (i - 1) * 1.9 * s, 0.5 * s, rz)
        scene.add(b)
      }
      contactShadow(rx, rz, 5 * s)
    }

    raft(-9, -62, 2)
    strawHatPirate(-9, 2.1, -62, 2, 0.6)

    // Further out, arm up at the horizon.
    strawHatPirate(16, 1.4, -196, 2.6, -0.7)
    contactShadow(16, -196, 9)

    // And one last figure late in the voyage, on a small island.
    strawHatPirate(-15, 3.2, -338, 2.2, 0.9)
    contactShadow(-15, -338, 8)

    // ---- barrels ----
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0x9a6a3c,
      roughness: 0.9,
      flatShading: true,
    })
    const hoopMat = new THREE.MeshStandardMaterial({
      color: 0xf5c542,
      roughness: 0.5,
      metalness: 0.6,
    })
    const barrels: { g: ThreeNS.Group; ph: number; sp: number }[] = []
    for (let i = 0; i < 14; i++) {
      const g = new THREE.Group()
      g.add(
        new THREE.Mesh(
          new THREE.CylinderGeometry(0.85, 0.72, 1.9, 12),
          barrelMat
        )
      )
      for (const hy of [-0.5, 0.5]) {
        const hp = new THREE.Mesh(
          new THREE.CylinderGeometry(0.88, 0.88, 0.16, 12),
          hoopMat
        )
        hp.position.y = hy
        g.add(hp)
      }
      g.position.set(
        (Math.random() - 0.5) * 70,
        0.3,
        -12 - Math.random() * VOYAGE
      )
      g.rotation.z = (Math.random() - 0.5) * 0.5
      scene.add(g)
      barrels.push({
        g,
        ph: Math.random() * 6.28,
        sp: 0.7 + Math.random() * 0.7,
      })
    }

    // ---- clouds ----
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      flatShading: true,
      transparent: true,
      opacity: 0.94,
      fog: false,
    })
    const clouds: { g: ThreeNS.Group; sp: number; x0: number }[] = []
    for (let i = 0; i < 26; i++) {
      const g = new THREE.Group()
      const puffs = 3 + Math.floor(Math.random() * 4)
      for (let k = 0; k < puffs; k++) {
        const r = 6 + Math.random() * 9
        const pf = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), cloudMat)
        pf.position.set(
          (k - puffs / 2) * r * 1.1,
          Math.random() * r * 0.4,
          Math.random() * r * 0.5
        )
        pf.scale.y = 0.55
        g.add(pf)
      }
      const depth = 0.35 + Math.random()
      g.position.set(
        (Math.random() - 0.5) * 620,
        40 + Math.random() * 90,
        -120 - Math.random() * 900
      )
      g.scale.setScalar(depth * 1.6)
      scene.add(g)
      clouds.push({ g, sp: 0.6 + Math.random() * 1.6, x0: g.position.x })
    }

    // ---- depth: foreground birds ----
    // Near-camera movement is what actually reads as depth: these
    // cross the frame far faster than the islands drift, so the eye
    // gets a parallax reference against the distant ranges.
    const birdMat = new THREE.MeshBasicMaterial({
      color: 0x2c4a5e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    })
    const birds: {
      g: ThreeNS.Group
      l: ThreeNS.Mesh
      r: ThreeNS.Mesh
      vx: number
      y0: number
      ph: number
    }[] = []
    for (let i = 0; i < 9; i++) {
      const g = new THREE.Group()
      const wing = new THREE.PlaneGeometry(1.5, 0.26)
      const l = new THREE.Mesh(wing, birdMat)
      l.position.x = -0.75
      const r = new THREE.Mesh(wing, birdMat)
      r.position.x = 0.75
      g.add(l, r)
      const scl = 0.6 + Math.random() * 1.5
      g.scale.setScalar(scl)
      const y0 = 12 + Math.random() * 26
      g.position.set(
        (Math.random() - 0.5) * 160,
        y0,
        10 - Math.random() * VOYAGE * 0.9
      )
      scene.add(g)
      birds.push({
        g,
        l,
        r,
        vx: (0.06 + Math.random() * 0.14) * scl,
        y0,
        ph: Math.random() * 6.28,
      })
    }

    // ---- sea spray ----
    const spray = new Float32Array(600 * 3)
    for (let i = 0; i < 600; i++) {
      spray[i * 3] = (Math.random() - 0.5) * 70
      spray[i * 3 + 1] = Math.random() * 7
      spray[i * 3 + 2] = -Math.random() * VOYAGE + 12
    }
    const pg = new THREE.BufferGeometry()
    pg.setAttribute("position", new THREE.BufferAttribute(spray, 3))
    const dots = new THREE.Points(
      pg,
      new THREE.PointsMaterial({
        color: 0xbfe4f7,
        size: 0.14,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      })
    )
    scene.add(dots)

    // ---- drive ----
    let p = 0 // eased scroll progress
    let pt = 0 // target scroll progress
    let mx = 0
    let my = 0
    let tmx = 0
    let tmy = 0
    const t0 = performance.now()
    let raf = 0

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      pt = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    const onMouse = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2
      tmy = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      cam.aspect = window.innerWidth / window.innerHeight
      cam.updateProjectionMatrix()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMouse, { passive: true })
    window.addEventListener("resize", onResize)
    onScroll()

    const wave = (x: number, y: number, t: number) =>
      Math.sin(x * 0.075 + t * 0.85) * 0.72 +
      Math.sin(y * 0.105 - t * 0.62) * 0.55 +
      Math.sin((x + y) * 0.045 + t * 1.25) * 0.28

    const arr = seaAttr.array as Float32Array

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = (performance.now() - t0) / 1000
      p += (pt - p) * 0.05
      mx += (tmx - mx) * 0.04
      my += (tmy - my) * 0.04

      for (let i = 0; i < arr.length; i += 3) {
        arr[i + 2] = seaBase[i + 2] + wave(seaBase[i], seaBase[i + 1], t)
      }
      seaAttr.needsUpdate = true
      sea.geometry.computeVertexNormals()

      const z = 12 - p * VOYAGE
      const bob = Math.sin(t * 0.85) * 0.22 + Math.sin(t * 1.7) * 0.09
      cam.position.set(
        mx * 2.2 + Math.sin(t * 0.24) * 0.7,
        3.4 + bob - my * 0.5,
        z
      )
      cam.lookAt(mx * 1.1, 3.1 + bob * 0.6 - my * 0.3, z - 18)
      cam.rotation.z = mx * 0.03 + Math.sin(t * 0.42) * 0.012

      for (const L of leds) {
        L.mat.opacity =
          0.9 * (0.5 + 0.5 * (0.5 + 0.5 * Math.sin(t * L.sp + L.ph)))
      }
      for (const S of ships) {
        S.g.position.y = Math.sin(t * S.sp + S.ph) * 0.5
        S.g.rotation.z = Math.sin(t * S.sp * 0.8 + S.ph) * 0.035
      }
      for (const H of hats) {
        H.g.position.y += Math.sin(t * H.sp + H.ph) * 0.004
        H.g.rotation.y += H.spin * 0.01
        H.g.rotation.x = Math.sin(t * H.sp * 0.7 + H.ph) * 0.12 + 0.16
      }
      for (const B of barrels) {
        B.g.position.y = 0.25 + Math.sin(t * B.sp + B.ph) * 0.4
        B.g.rotation.z = Math.sin(t * B.sp * 0.9 + B.ph) * 0.22
      }
      for (const C of clouds) {
        C.g.position.x =
          C.x0 + Math.sin(t * 0.03 * C.sp) * 26 * C.sp - p * 40 * C.sp
      }
      for (const P of pirates) {
        // ride the swell, and throw the arm up on a slower beat
        P.g.position.y = P.y0 + Math.sin(t * P.sp + P.ph) * 0.22
        P.g.rotation.z = Math.sin(t * P.sp * 0.7 + P.ph) * 0.05
        P.arm.rotation.z = -0.5 + Math.sin(t * P.sp * 1.4 + P.ph) * 0.45
      }
      for (const B of birds) {
        B.g.position.x += B.vx
        if (B.g.position.x > 90) B.g.position.x = -90
        B.g.position.y = B.y0 + Math.sin(t * 0.9 + B.ph) * 1.6
        const flap = Math.sin(t * 7 + B.ph) * 0.6
        B.l.rotation.z = flap
        B.r.rotation.z = -flap
      }
      dots.rotation.y = t * 0.004

      renderer.render(scene, cam)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("resize", onResize)
      scene.traverse((o) => {
        const m = o as ThreeNS.Mesh
        if (m.geometry) m.geometry.dispose()
        const mat = m.material
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else if (mat) mat.dispose()
      })
      renderer.dispose()
    }
  }
}

/**
 * Log Pose backdrop: a night chart instead of a night sea. Starfield,
 * a drifting nebula, and waypoint compasses strung along the same -Z
 * voyage path the ocean camera sails — same drive logic, no water.
 */
export function LogPoseScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const flat =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 900
    if (flat) return

    let cancelled = false
    let teardown: (() => void) | undefined

    void import("three").then((THREE) => {
      if (cancelled) return
      teardown = buildLogPose(THREE, canvas)
    })

    return () => {
      cancelled = true
      teardown?.()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen"
    />
  )
}

function buildLogPose(
  THREE: typeof ThreeNS,
  canvas: HTMLCanvasElement
): (() => void) | undefined {
  let renderer: ThreeNS.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
  } catch {
    return
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(window.innerWidth, window.innerHeight, false)

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x0a1128, 80, 620)

  const cam = new THREE.PerspectiveCamera(
    62,
    window.innerWidth / window.innerHeight,
    0.1,
    1600
  )
  cam.position.set(0, 3.4, 12)

  scene.add(new THREE.AmbientLight(0x2a3a6e, 0.55))
  const key = new THREE.DirectionalLight(0xbcd4ff, 0.4)
  key.position.set(-60, 90, -160)
  scene.add(key)

  // ---- nebula glow, off to one side ----
  const nebula = new THREE.Mesh(
    new THREE.SphereGeometry(70, 24, 24),
    new THREE.MeshBasicMaterial({
      color: 0x7ec8e3,
      transparent: true,
      opacity: 0.1,
      fog: false,
    })
  )
  nebula.position.set(-140, 70, -640)
  scene.add(nebula)
  const nebulaCore = new THREE.Mesh(
    new THREE.SphereGeometry(24, 20, 20),
    new THREE.MeshBasicMaterial({
      color: 0xf2c14b,
      transparent: true,
      opacity: 0.5,
      fog: false,
    })
  )
  nebulaCore.position.copy(nebula.position)
  scene.add(nebulaCore)

  // ---- starfield: two layers, dense white + sparse gold ----
  const field = (
    count: number,
    spread: number,
    color: number,
    size: number,
    opacity: number
  ) => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = Math.random() * spread * 0.6
      pos[i * 3 + 2] = -Math.random() * (VOYAGE + spread)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    const pts = new THREE.Points(
      g,
      new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        depthWrite: false,
        fog: false,
      })
    )
    scene.add(pts)
    return pts
  }
  const starsFar = field(1400, 1100, 0xdfe9ff, 1.3, 0.75)
  const starsNear = field(220, 700, 0xf2c14b, 2.1, 0.6)

  // ---- waypoint compasses strung along the voyage ----
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x7ec8e3,
    transparent: true,
    opacity: 0.55,
  })
  const needleMat = new THREE.MeshBasicMaterial({ color: 0xf2c14b })
  const compasses: {
    g: ThreeNS.Group
    needle: ThreeNS.Mesh
    ph: number
    sp: number
  }[] = []
  const compass = (x: number, y: number, z: number, s: number) => {
    const g = new THREE.Group()
    g.add(
      new THREE.Mesh(new THREE.TorusGeometry(2.2 * s, 0.06 * s, 8, 32), ringMat)
    )
    g.add(
      new THREE.Mesh(
        new THREE.TorusGeometry(1.5 * s, 0.045 * s, 8, 28),
        ringMat
      )
    )
    const needle = new THREE.Mesh(
      new THREE.BoxGeometry(0.09 * s, 0.09 * s, 3.6 * s),
      needleMat
    )
    g.add(needle)
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.22 * s, 10, 10),
      new THREE.MeshBasicMaterial({
        color: 0xf2c14b,
        transparent: true,
        opacity: 0.9,
      })
    )
    g.add(glow)
    g.position.set(x, y, z)
    scene.add(g)
    compasses.push({
      g,
      needle,
      ph: Math.random() * 6.28,
      sp: 0.3 + Math.random() * 0.3,
    })
  }
  for (let i = 0; i < 7; i++) {
    const z = -30 - i * 62 - Math.random() * 20
    const side = i % 2 === 0 ? -1 : 1
    compass(
      side * (9 + Math.random() * 10),
      2 + Math.random() * 5,
      z,
      1 + Math.random() * 0.7
    )
  }

  // ---- drive: same scroll/mouse camera logic as the ocean ----
  let p = 0
  let pt = 0
  let mx = 0
  let my = 0
  let tmx = 0
  let tmy = 0
  const t0 = performance.now()
  let raf = 0

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    pt = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  }
  const onMouse = (e: MouseEvent) => {
    tmx = (e.clientX / window.innerWidth - 0.5) * 2
    tmy = (e.clientY / window.innerHeight - 0.5) * 2
  }
  const onResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    cam.aspect = window.innerWidth / window.innerHeight
    cam.updateProjectionMatrix()
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("mousemove", onMouse, { passive: true })
  window.addEventListener("resize", onResize)
  onScroll()

  const tick = () => {
    raf = requestAnimationFrame(tick)
    const t = (performance.now() - t0) / 1000
    p += (pt - p) * 0.05
    mx += (tmx - mx) * 0.04
    my += (tmy - my) * 0.04

    const z = 12 - p * VOYAGE
    cam.position.set(mx * 2.2, 3.4 - my * 0.5, z)
    cam.lookAt(mx * 1.1, 3.1 - my * 0.3, z - 18)
    cam.rotation.z = mx * 0.02

    starsFar.rotation.y = t * 0.003
    starsNear.rotation.y = -t * 0.005

    for (const C of compasses) {
      C.g.rotation.y = t * 0.25 + C.ph
      C.needle.rotation.x = Math.sin(t * C.sp + C.ph) * 0.5
      C.g.position.y += Math.sin(t * C.sp + C.ph) * 0.003
    }

    renderer.render(scene, cam)
  }
  tick()

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("mousemove", onMouse)
    window.removeEventListener("resize", onResize)
    scene.traverse((o) => {
      const m = o as ThreeNS.Mesh
      if (m.geometry) m.geometry.dispose()
      const mat = m.material
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
      else if (mat) mat.dispose()
    })
    renderer.dispose()
  }
}

/** Per-backdrop sky gradient and the scrim that keeps text readable. */
const SKY = {
  "ocean-day": {
    gradient:
      "linear-gradient(180deg,#2ea9d6 0%,#7fd3ea 34%,#cfe9ef 56%,#f6e3bd 66%,#f6e3bd 100%)",
    scrim: "rgb(255 252 242 / 0.42)",
  },
  "ocean-night": {
    gradient:
      "linear-gradient(180deg,#03080f 0%,#071624 30%,#0d2c44 58%,#16405c 78%,#1d5570 100%)",
    scrim: "rgb(4 14 24 / 0.5)",
  },
} as const

/**
 * Theme-aware backdrop.
 *
 * The two ocean variants share one 3D scene and differ only in sky and
 * scrim — the geometry reads as dusk under a dark gradient, which is far
 * cheaper than a second scene. The flat variants skip WebGL entirely.
 */
export function VoyageBackdrop() {
  const { backdrop } = useTheme()

  if (backdrop === "grid") {
    // Themed via tokens rather than a fixed hex, so brutalism's acid-yellow
    // grid and terminal's black-on-phosphor scanlines share one backdrop.
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: "var(--v-sea-bg)",
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--color-ink) 12%, transparent) 2px, transparent 2px), linear-gradient(90deg, color-mix(in oklch, var(--color-ink) 12%, transparent) 2px, transparent 2px)",
          backgroundSize: "56px 56px",
        }}
      />
    )
  }

  if (backdrop === "paper") {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "var(--v-sea-bg)" }}
      />
    )
  }

  if (backdrop === "starfield") {
    return (
      <>
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg,#050815 0%,#0a1128 38%,#141b3d 68%,#1c2454 100%)",
          }}
        />
        <LogPoseScene />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[2]"
          style={{ background: "rgb(4 6 18 / 0.48)" }}
        />
      </>
    )
  }

  const sky = SKY[backdrop]
  const night = backdrop === "ocean-night"

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: sky.gradient }}
      />
      <OceanScene night={night} />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{ background: sky.scrim }}
      />
    </>
  )
}
