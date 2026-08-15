"use client"

import { useEffect, useRef } from "react"
import type * as ThreeNS from "three"

// Same palette as the background pirates — an original low-poly fan
// figure, not a likeness lifted from official art.
const SKIN = 0xf0c08a
const VEST_RED = 0xd42f2a
const SHORTS_BLUE = 0x2f6fd0
const HAIR_BLACK = 0x1a1410
const STRAW = 0xe8d08a
const BAND = 0xd4453c

/**
 * The captain, riding along in the corner of the page.
 *
 * He gets his own canvas rather than a slot in <OceanScene>. Inside that
 * scene he'd be part of the backdrop at z-1, which means every prose
 * panel and card scrolls over the top of him — he'd spend most of the
 * voyage behind the content. A separate canvas above the content layer
 * is the only way he reads as a character in the page rather than
 * scenery behind it.
 *
 * The cost is a second WebGL context. It's a fair trade here: this scene
 * is one figure at a few hundred triangles against a transparent
 * background, and it's skipped outright on the same terms as the ocean.
 */
export function Captain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Same gate as the ocean: no motion, no room, no captain.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 1024
    ) {
      return
    }

    let cancelled = false
    let teardown: (() => void) | undefined

    void import("three").then((THREE) => {
      if (cancelled) return
      teardown = build(THREE, canvas)
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
      className="pointer-events-none fixed right-0 bottom-0 z-30 hidden h-[min(52vh,430px)] w-[min(44vw,540px)] lg:block"
    />
  )
}

/**
 * His scroll choreography.
 *
 * Each entry pins a pose to a point in the scroll. Between two entries
 * the pose is interpolated with a smoothstep, so the acts read as one
 * continuous performance rather than five snaps — and because it's
 * driven by eased scroll progress, scrubbing back plays it in reverse
 * for free.
 *
 *   reach  stretching-arm angle (0 = straight out to his left, + = up)
 *   st     stretch multiplier — the gum-gum reach
 *   off    off arm angle (+ = raised)
 *   turn   body yaw
 *   lean   body roll
 *   hatY   how far the hat lifts
 *   spin   hat spin rate
 */
type Pose = {
  reach: number
  st: number
  off: number
  turn: number
  lean: number
  hatY: number
  spin: number
}

const ACTS: { at: number; pose: Pose }[] = [
  // at the rail, arms down, watching the water
  {
    at: 0,
    pose: {
      reach: -1.3,
      st: 1,
      off: -1.3,
      turn: 0.3,
      lean: 0,
      hatY: 0,
      spin: 0,
    },
  },
  // spots something and points it out across the page
  {
    at: 0.2,
    pose: {
      reach: 0.1,
      st: 1.7,
      off: -1.2,
      turn: 0.16,
      lean: 0.05,
      hatY: 0,
      spin: 0,
    },
  },
  // gum-gum: the arm goes out over the sea
  {
    at: 0.45,
    pose: {
      reach: 0.34,
      st: 4.6,
      off: -1.25,
      turn: 0.1,
      lean: -0.09,
      hatY: 0.05,
      spin: 0,
    },
  },
  // pulls it back to wind up
  {
    at: 0.62,
    pose: {
      reach: -0.75,
      st: 0.8,
      off: -1,
      turn: 0.55,
      lean: 0.17,
      hatY: 0,
      spin: 0,
    },
  },
  // and throws the pistol punch
  {
    at: 0.8,
    pose: {
      reach: 0.04,
      st: 5.5,
      off: -1.3,
      turn: 0.06,
      lean: -0.15,
      hatY: 0.06,
      spin: 0,
    },
  },
  // both arms up at the end of the log
  {
    at: 1,
    pose: {
      reach: 1.45,
      st: 1.2,
      off: 1.5,
      turn: 0.3,
      lean: 0,
      hatY: 0.32,
      spin: 1,
    },
  },
]

const smoothstep = (u: number) => u * u * (3 - 2 * u)

function poseAt(q: number): Pose {
  let i = 0
  while (i < ACTS.length - 2 && q > ACTS[i + 1].at) i++
  const a = ACTS[i]
  const b = ACTS[i + 1]
  const u = smoothstep(Math.min(1, Math.max(0, (q - a.at) / (b.at - a.at))))
  const mix = (k: keyof Pose) => a.pose[k] + (b.pose[k] - a.pose[k]) * u
  return {
    reach: mix("reach"),
    st: mix("st"),
    off: mix("off"),
    turn: mix("turn"),
    lean: mix("lean"),
    hatY: mix("hatY"),
    spin: mix("spin"),
  }
}

/** Builds the figure and its loop; returns the teardown. */
function build(
  THREE: typeof ThreeNS,
  canvas: HTMLCanvasElement
): (() => void) | undefined {
  let renderer: ThreeNS.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  } catch {
    return // no WebGL — the page simply goes without him
  }

  const size = () => ({
    w: canvas.clientWidth || 1,
    h: canvas.clientHeight || 1,
  })
  const { w, h } = size()

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(w, h, false)

  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(46, w / h, 0.1, 100)
  cam.position.set(0, 0, 10)

  scene.add(new THREE.AmbientLight(0xffffff, 0.95))
  const key = new THREE.DirectionalLight(0xffffff, 0.85)
  key.position.set(-3, 5, 8)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0xffe9a8, 0.5)
  rim.position.set(5, 2, -4)
  scene.add(rim)

  const mat = (color: number, roughness: number) =>
    new THREE.MeshStandardMaterial({ color, roughness, flatShading: true })

  const skinMat = mat(SKIN, 0.85)
  const vestMat = mat(VEST_RED, 0.8)
  const shortsMat = mat(SHORTS_BLUE, 0.85)
  const hairMat = mat(HAIR_BLACK, 0.95)
  const strawMat = mat(STRAW, 0.9)
  const bandMat = mat(BAND, 0.8)
  const sandalMat = mat(0x6b4a2e, 0.95)
  const darkMat = new THREE.MeshBasicMaterial({ color: 0x1a1410 })
  const scarMat = new THREE.MeshBasicMaterial({ color: 0xb5563f })

  const g = new THREE.Group()
  const body = new THREE.Group()
  g.add(body)
  scene.add(g)

  const put = (
    geo: ThreeNS.BufferGeometry,
    m: ThreeNS.Material,
    x: number,
    y: number,
    z: number,
    parent: ThreeNS.Object3D = body
  ) => {
    const mesh = new THREE.Mesh(geo, m)
    mesh.position.set(x, y, z)
    parent.add(mesh)
    return mesh
  }

  // legs + sandals
  for (const side of [-1, 1]) {
    put(
      new THREE.BoxGeometry(0.34, 0.1, 0.62),
      sandalMat,
      side * 0.26,
      0.05,
      0.04
    )
    put(
      new THREE.CylinderGeometry(0.19, 0.16, 1.05, 7),
      skinMat,
      side * 0.26,
      0.62,
      0
    )
  }

  put(new THREE.BoxGeometry(0.98, 0.62, 0.62), shortsMat, 0, 1.4, 0)
  put(new THREE.CylinderGeometry(0.42, 0.46, 1.02, 9), skinMat, 0, 2.16, 0)

  // open vest — the theta gap leaves the chest bare, as it should be
  const vest = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.53, 1.06, 12, 1, true, 0.7, 4.9),
    vestMat
  )
  vest.position.set(0, 2.16, 0)
  vest.material.side = THREE.DoubleSide
  body.add(vest)

  /**
   * An arm that can stretch. The cylinder's geometry is translated so its
   * base sits on the origin, then rotated to lie along +X — so scaling
   * `ext.scale.x` grows it out of the shoulder rather than from its
   * middle. The fist counter-scales to stay a sphere.
   */
  const buildArm = (shoulderX: number) => {
    const pivot = new THREE.Group()
    pivot.position.set(shoulderX, 2.55, 0)
    const ext = new THREE.Group()
    pivot.add(ext)

    const upperGeo = new THREE.CylinderGeometry(0.15, 0.13, 1.1, 7)
    upperGeo.translate(0, 0.55, 0)
    const upper = new THREE.Mesh(upperGeo, skinMat)
    upper.rotation.z = -Math.PI / 2
    ext.add(upper)

    const fist = new THREE.Mesh(new THREE.SphereGeometry(0.2, 9, 8), skinMat)
    fist.position.x = 1.16
    ext.add(fist)

    body.add(pivot)
    return { pivot, ext, fist }
  }

  // The reaching arm is his left, so the stretch travels across the page
  // toward the content instead of straight off the right edge.
  const reachArm = buildArm(-0.5)
  const offArm = buildArm(0.5)

  const head = new THREE.Group()
  head.position.set(0, 2.98, 0)
  body.add(head)

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), skinMat)
  skull.scale.set(1, 1.04, 0.96)
  head.add(skull)

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.44, 12, 10), hairMat)
  hair.position.set(0, 0.1, -0.05)
  hair.scale.set(1, 0.72, 1)
  head.add(hair)

  for (const side of [-1, 1]) {
    put(
      new THREE.SphereGeometry(0.055, 7, 6),
      darkMat,
      side * 0.15,
      0.05,
      0.38,
      head
    )
  }
  put(new THREE.BoxGeometry(0.3, 0.05, 0.04), darkMat, 0, -0.15, 0.4, head)
  put(new THREE.BoxGeometry(0.04, 0.16, 0.03), scarMat, -0.16, -0.08, 0.4, head)

  // the hat — its own group so it can lift and spin
  const hat = new THREE.Group()
  hat.add(
    new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.86, 0.06, 20), strawMat)
  )
  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.46, 0.42, 18),
    strawMat
  )
  crown.position.y = 0.23
  hat.add(crown)
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.04, 18),
    strawMat
  )
  cap.position.y = 0.45
  hat.add(cap)
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.47, 0.48, 0.14, 18),
    bandMat
  )
  band.position.y = 0.09
  hat.add(band)
  hat.position.set(0, 0.36, -0.02)
  head.add(hat)

  g.scale.setScalar(0.78)

  /** Stands him against the right edge, feet on the bottom. */
  const place = () => {
    const dist = cam.position.z
    const halfH = Math.tan((cam.fov * Math.PI) / 360) * dist
    const halfW = halfH * cam.aspect
    g.position.set(halfW - 1.15, -halfH + 0.1, 0)
  }
  place()

  // ---- drive ----
  let p = 0
  let pt = 0
  let mx = 0
  let tmx = 0
  const t0 = performance.now()
  let raf = 0

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    pt = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  }
  const onMouse = (e: MouseEvent) => {
    tmx = (e.clientX / window.innerWidth - 0.5) * 2
  }
  const onResize = () => {
    const { w: nw, h: nh } = size()
    renderer.setSize(nw, nh, false)
    cam.aspect = nw / nh
    cam.updateProjectionMatrix()
    place()
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

    const pose = poseAt(p)
    const sway = Math.sin(t * 1.6) * 0.05

    body.position.y = Math.sin(t * 1.9) * 0.06
    body.rotation.y = pose.turn + mx * 0.22
    body.rotation.z = pose.lean + Math.sin(t * 1.1) * 0.02

    // reaching arm points -X, so its angle is measured off a half turn
    reachArm.pivot.rotation.z = Math.PI - pose.reach + sway
    reachArm.ext.scale.x = pose.st
    // counter-scale, or the fist stretches into an egg with the arm
    reachArm.fist.scale.x = 1 / pose.st

    offArm.pivot.rotation.z = pose.off - sway * 0.6

    head.rotation.y = Math.sin(t * 0.7) * 0.12 - mx * 0.18
    hat.position.y = 0.36 + pose.hatY + Math.sin(t * 2.3) * 0.012
    hat.rotation.y += pose.spin * 0.09
    hat.rotation.z = 0.1 + Math.sin(t * 1.3) * 0.03

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
      const mm = m.material
      if (Array.isArray(mm)) mm.forEach((x) => x.dispose())
      else if (mm) mm.dispose()
    })
    renderer.dispose()
  }
}
