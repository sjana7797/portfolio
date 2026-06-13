"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// ── Palette (matched to reference image) ──────────────────────────────────
const C = {
  skin:    "#F5C5A3",   // warm peach
  skinSd:  "#E2A882",   // jaw/neck shadow
  hair:    "#1C1D27",   // dark navy
  hairHL:  "#38405A",   // volume highlight
  hairRim: "#7A4828",   // warm amber rim — separates hair from dark bg
  eyeW:    "#F2EFE8",
  iris:    "#8A8E9A",   // grey anime iris
  pupil:   "#18181E",
  eyeHL:   "#FFFFFF",
  glasses: "#1A1A1E",
  hoodie:  "#EEEFF3",   // off-white
  hoodieD: "#C9CED6",
  collar:  "#E4E8EC",
  outline: "#181010",
  lash:    "#18181E",
  brow:    "#18181E",
  nose:    "#DFA080",
  lips:    "#C07B68",
}

const outlineMat = new THREE.MeshBasicMaterial({ color: C.outline, side: THREE.BackSide })

function makeToonTex(steps: number[]) {
  const data = new Uint8Array(steps)
  const tex  = new THREE.DataTexture(data, steps.length, 1, THREE.RedFormat)
  tex.minFilter = THREE.NearestFilter
  tex.magFilter = THREE.NearestFilter
  tex.needsUpdate = true
  return tex
}

function Character() {
  const rootRef       = useRef<THREE.Group>(null)
  const hlLRef        = useRef<THREE.Mesh>(null)
  const hlRRef        = useRef<THREE.Mesh>(null)
  const leftEyeRef    = useRef<THREE.Group>(null)
  const rightEyeRef   = useRef<THREE.Group>(null)
  const leftPupilRef  = useRef<THREE.Group>(null)
  const rightPupilRef = useRef<THREE.Group>(null)

  // Stable gradient textures (empty dep array = created once on mount)
  const skinGm   = useMemo(() => makeToonTex([100, 185, 250]), [])
  const hairGm   = useMemo(() => makeToonTex([85,  175, 240]), [])
  const hoodieGm = useMemo(() => makeToonTex([130, 245]),      [])

  const M = useMemo(() => {
    const toon = (c: string, gm: THREE.DataTexture) =>
      new THREE.MeshToonMaterial({ color: c, gradientMap: gm })
    const flat = (c: string) => new THREE.MeshToonMaterial({ color: c })
    const glow = (c: string) => new THREE.MeshToonMaterial({
      color: c, emissive: new THREE.Color(c), emissiveIntensity: 0.35,
    })
    return {
      skin:    toon(C.skin,    skinGm),
      skinSd:  flat(C.skinSd),
      hair:    toon(C.hair,    hairGm),
      hairHL:  flat(C.hairHL),
      hairRim: flat(C.hairRim),
      eyeW:    flat(C.eyeW),
      iris:    flat(C.iris),
      pupil:   flat(C.pupil),
      eyeHL:   glow(C.eyeHL),
      glasses: flat(C.glasses),
      hoodie:  toon(C.hoodie,  hoodieGm),
      hoodieD: flat(C.hoodieD),
      collar:  flat(C.collar),
      nose:    flat(C.nose),
      lips:    flat(C.lips),
      lash:    flat(C.lash),
      brow:    flat(C.brow),
    }
  }, [skinGm, hairGm, hoodieGm])

  useFrame(({ clock, pointer }) => {
    if (!rootRef.current) return
    const t = clock.elapsedTime

    // Slight base 3/4 turn (right-facing) matching reference pose + gentle sway
    rootRef.current.rotation.y = 0.10 + Math.sin(t * 0.30) * 0.04
    rootRef.current.position.y = -0.36 + Math.sin(t * 0.48) * 0.014

    // Mouse-tracking pupils
    const maxX = 0.042
    const maxY = 0.024
    const tx = THREE.MathUtils.clamp(pointer.x * maxX, -maxX, maxX)
    const ty = THREE.MathUtils.clamp(pointer.y * maxY, -maxY, maxY)
    if (leftPupilRef.current) {
      leftPupilRef.current.position.x = THREE.MathUtils.lerp(leftPupilRef.current.position.x, tx, 0.11)
      leftPupilRef.current.position.y = THREE.MathUtils.lerp(leftPupilRef.current.position.y, ty, 0.11)
    }
    if (rightPupilRef.current) {
      rightPupilRef.current.position.x = THREE.MathUtils.lerp(rightPupilRef.current.position.x, tx, 0.11)
      rightPupilRef.current.position.y = THREE.MathUtils.lerp(rightPupilRef.current.position.y, ty, 0.11)
    }

    // Blink every ~5.2 s
    const bc = t % 5.2
    const bl = bc > 4.95 ? Math.max(0, 1 - Math.abs((bc - 5.07) / 0.12)) : 0
    if (leftEyeRef.current)  leftEyeRef.current.scale.y  = 1 - bl * 0.95
    if (rightEyeRef.current) rightEyeRef.current.scale.y = 1 - bl * 0.95

    // Glint shimmer
    const hs = 0.031 * (0.88 + Math.sin(t * 2.8) * 0.12)
    if (hlLRef.current) { hlLRef.current.scale.x = hs; hlLRef.current.scale.y = hs }
    if (hlRRef.current) { hlRRef.current.scale.x = hs; hlRRef.current.scale.y = hs }
  })

  return (
    <group ref={rootRef} position={[0, -0.36, 0]}>

      {/* ── NECK (prominent, longer) ──────────────────────────────────────── */}
      <mesh material={outlineMat} position={[0, -0.82, -0.03]} scale={[1.04, 1.02, 1.04]}>
        <cylinderGeometry args={[0.152, 0.192, 0.50, 22]} />
      </mesh>
      <mesh material={M.skin} position={[0, -0.82, -0.03]}>
        <cylinderGeometry args={[0.145, 0.185, 0.50, 22]} />
      </mesh>

      {/* ── HEAD (elongated oval — matches reference) ─────────────────────── */}
      <mesh material={outlineMat} scale={[0.788, 0.955, 0.762]}>
        <sphereGeometry args={[0.88, 32, 32]} />
      </mesh>
      <mesh material={M.skin} scale={[0.748, 0.908, 0.722]}>
        <sphereGeometry args={[0.88, 32, 32]} />
      </mesh>
      {/* Chin taper for jaw definition */}
      <mesh material={M.skin} position={[0, -0.63, 0.05]} scale={[0.43, 0.19, 0.40]}>
        <sphereGeometry args={[0.88, 16, 16]} />
      </mesh>
      {/* Jaw shadow */}
      <mesh material={M.skinSd} position={[0, -0.55, -0.15]} scale={[0.60, 0.12, 0.18]}>
        <sphereGeometry args={[0.88, 12, 12]} />
      </mesh>

      {/* ── HAIR — swept pompadour (faithful to reference) ────────────────── */}
      {/* Warm amber rim: glows on hair edges against dark bg */}
      <mesh material={M.hairRim} position={[0, 0.14, -0.57]} scale={[0.77, 0.62, 0.08]}>
        <sphereGeometry args={[0.88, 16, 16]} />
      </mesh>
      {/* Back/side cap */}
      <mesh material={M.hair} position={[0, 0.20, -0.08]} scale={[0.80, 0.68, 0.78]}>
        <sphereGeometry args={[0.88, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
      </mesh>
      {/* Pompadour main volume (sweeps up and back) */}
      <mesh material={M.hair} position={[0.06, 0.70, 0.18]} rotation={[-0.28, 0.06, -0.20]} scale={[0.52, 0.30, 0.44]}>
        <sphereGeometry args={[0.88, 16, 16]} />
      </mesh>
      {/* Pompadour left wing */}
      <mesh material={M.hair} position={[-0.20, 0.60, 0.28]} rotation={[0.22, -0.18, 0.14]} scale={[0.30, 0.22, 0.20]}>
        <sphereGeometry args={[0.88, 12, 12]} />
      </mesh>
      {/* Crown highlight */}
      <mesh material={M.hairHL} position={[0.18, 0.78, 0.24]} scale={[0.25, 0.13, 0.20]}>
        <sphereGeometry args={[0.88, 12, 12]} />
      </mesh>
      {/* Sideburn L */}
      <mesh material={M.hair} position={[-0.61, -0.11, 0.04]} scale={[0.145, 0.36, 0.18]}>
        <sphereGeometry args={[0.88, 12, 12]} />
      </mesh>
      {/* Sideburn R */}
      <mesh material={M.hair} position={[0.61, -0.11, 0.04]} scale={[0.145, 0.36, 0.18]}>
        <sphereGeometry args={[0.88, 12, 12]} />
      </mesh>

      {/* ── EARS (with outline) ───────────────────────────────────────────── */}
      <mesh material={outlineMat} position={[-0.637, -0.04, 0]} scale={[0.100, 0.140, 0.088]}>
        <sphereGeometry args={[0.88, 12, 12]} />
      </mesh>
      <mesh material={M.skin} position={[-0.637, -0.04, 0]} scale={[0.090, 0.128, 0.078]}>
        <sphereGeometry args={[0.88, 12, 12]} />
      </mesh>
      <mesh material={outlineMat} position={[0.637, -0.04, 0]} scale={[0.100, 0.140, 0.088]}>
        <sphereGeometry args={[0.88, 12, 12]} />
      </mesh>
      <mesh material={M.skin} position={[0.637, -0.04, 0]} scale={[0.090, 0.128, 0.078]}>
        <sphereGeometry args={[0.88, 12, 12]} />
      </mesh>

      {/* ── EYEBROWS (thick, slightly arched) ────────────────────────────── */}
      <mesh material={M.brow} position={[-0.218, 0.305, 0.622]} rotation={[0, 0, -0.08]} scale={[0.168, 0.032, 0.022]}>
        <boxGeometry />
      </mesh>
      <mesh material={M.brow} position={[0.218, 0.305, 0.622]} rotation={[0, 0, 0.08]} scale={[0.168, 0.032, 0.022]}>
        <boxGeometry />
      </mesh>

      {/* ── LEFT EYE ─────────────────────────────────────────────────────── */}
      <group ref={leftEyeRef} position={[-0.218, 0.095, 0.022]}>
        <mesh material={M.eyeW} position={[0, 0, 0.610]} scale={[0.190, 0.148, 0.038]}>
          <sphereGeometry args={[0.88, 16, 16]} />
        </mesh>
        <group ref={leftPupilRef}>
          <mesh material={M.iris}  position={[0, -0.010, 0.644]} scale={[0.118, 0.124, 0.024]}>
            <sphereGeometry args={[0.88, 16, 16]} />
          </mesh>
          <mesh material={M.pupil} position={[0, -0.012, 0.658]} scale={[0.060, 0.075, 0.015]}>
            <sphereGeometry args={[0.88, 12, 12]} />
          </mesh>
          <mesh ref={hlLRef} material={M.eyeHL} position={[0.036, 0.024, 0.664]} scale={[0.030, 0.030, 0.010]}>
            <sphereGeometry args={[0.88, 8, 8]} />
          </mesh>
        </group>
        <mesh material={M.lash} position={[0, 0.076, 0.618]} scale={[0.190, 0.022, 0.020]}>
          <boxGeometry />
        </mesh>
      </group>

      {/* ── RIGHT EYE ────────────────────────────────────────────────────── */}
      <group ref={rightEyeRef} position={[0.218, 0.095, 0.022]}>
        <mesh material={M.eyeW} position={[0, 0, 0.610]} scale={[0.190, 0.148, 0.038]}>
          <sphereGeometry args={[0.88, 16, 16]} />
        </mesh>
        <group ref={rightPupilRef}>
          <mesh material={M.iris}  position={[0, -0.010, 0.644]} scale={[0.118, 0.124, 0.024]}>
            <sphereGeometry args={[0.88, 16, 16]} />
          </mesh>
          <mesh material={M.pupil} position={[0, -0.012, 0.658]} scale={[0.060, 0.075, 0.015]}>
            <sphereGeometry args={[0.88, 12, 12]} />
          </mesh>
          <mesh ref={hlRRef} material={M.eyeHL} position={[0.036, 0.024, 0.664]} scale={[0.030, 0.030, 0.010]}>
            <sphereGeometry args={[0.88, 8, 8]} />
          </mesh>
        </group>
        <mesh material={M.lash} position={[0, 0.076, 0.618]} scale={[0.190, 0.022, 0.020]}>
          <boxGeometry />
        </mesh>
      </group>

      {/* ── RECTANGULAR GLASSES (matching reference) ─────────────────────── */}
      {/* Each frame = 4 BoxGeometry bars forming a rectangle */}
      {/* Left frame: center at (-0.218, 0.095, 0.670) */}
      <group position={[-0.218, 0.095, 0.670]}>
        <mesh material={M.glasses} position={[0,      0.110, 0]} scale={[0.328, 0.010, 0.008]}><boxGeometry /></mesh>
        <mesh material={M.glasses} position={[0,     -0.110, 0]} scale={[0.328, 0.010, 0.008]}><boxGeometry /></mesh>
        <mesh material={M.glasses} position={[-0.164, 0,     0]} scale={[0.010, 0.220, 0.008]}><boxGeometry /></mesh>
        <mesh material={M.glasses} position={[ 0.164, 0,     0]} scale={[0.010, 0.220, 0.008]}><boxGeometry /></mesh>
      </group>
      {/* Right frame */}
      <group position={[0.218, 0.095, 0.670]}>
        <mesh material={M.glasses} position={[0,      0.110, 0]} scale={[0.328, 0.010, 0.008]}><boxGeometry /></mesh>
        <mesh material={M.glasses} position={[0,     -0.110, 0]} scale={[0.328, 0.010, 0.008]}><boxGeometry /></mesh>
        <mesh material={M.glasses} position={[-0.164, 0,     0]} scale={[0.010, 0.220, 0.008]}><boxGeometry /></mesh>
        <mesh material={M.glasses} position={[ 0.164, 0,     0]} scale={[0.010, 0.220, 0.008]}><boxGeometry /></mesh>
      </group>
      {/* Bridge piece */}
      <mesh material={M.glasses} position={[0, 0.108, 0.675]} scale={[0.090, 0.010, 0.008]}>
        <boxGeometry />
      </mesh>
      {/* Temple arms */}
      <mesh material={M.glasses} position={[-0.462, 0.095, 0.530]} rotation={[0, -0.44, 0]} scale={[0.300, 0.008, 0.008]}>
        <boxGeometry />
      </mesh>
      <mesh material={M.glasses} position={[0.462, 0.095, 0.530]} rotation={[0, 0.44, 0]} scale={[0.300, 0.008, 0.008]}>
        <boxGeometry />
      </mesh>

      {/* ── NOSE (subtle mark) ───────────────────────────────────────────── */}
      <mesh material={M.nose} position={[0, -0.065, 0.690]} scale={[0.028, 0.020, 0.012]}>
        <sphereGeometry args={[0.88, 8, 8]} />
      </mesh>

      {/* ── MOUTH (confident smirk) ──────────────────────────────────────── */}
      <mesh material={M.lips} position={[0.015, -0.218, 0.658]} rotation={[0, 0, Math.PI + 0.05]}>
        <torusGeometry args={[0.048, 0.009, 6, 18, Math.PI * 0.80]} />
      </mesh>

      {/* ── HOODIE ───────────────────────────────────────────────────────── */}
      <mesh material={outlineMat} position={[0, -1.17, -0.02]} scale={[1.035, 1.015, 1.035]}>
        <cylinderGeometry args={[0.42, 0.55, 0.90, 24]} />
      </mesh>
      <mesh material={M.hoodie} position={[0, -1.17, -0.02]}>
        <cylinderGeometry args={[0.41, 0.54, 0.90, 24]} />
      </mesh>
      {/* Shadow crease front */}
      <mesh material={M.hoodieD} position={[-0.11, -1.09, 0.375]} rotation={[0.04, 0.05, 0.03]} scale={[0.048, 0.42, 0.022]}>
        <boxGeometry />
      </mesh>
      {/* Shoulders */}
      <mesh material={M.hoodie} position={[-0.57, -1.02, -0.02]} scale={[0.31, 0.31, 0.31]}>
        <sphereGeometry args={[0.88, 14, 14]} />
      </mesh>
      <mesh material={M.hoodie} position={[0.57, -1.02, -0.02]} scale={[0.31, 0.31, 0.31]}>
        <sphereGeometry args={[0.88, 14, 14]} />
      </mesh>
      {/* Collar */}
      <mesh material={outlineMat} position={[0, -0.83, 0.04]} scale={[0.502, 0.134, 0.408]}>
        <sphereGeometry args={[0.88, 14, 14]} />
      </mesh>
      <mesh material={M.collar} position={[0, -0.83, 0.04]} scale={[0.476, 0.118, 0.386]}>
        <sphereGeometry args={[0.88, 14, 14]} />
      </mesh>
      {/* Drawcords */}
      <mesh material={M.lash} position={[-0.076, -1.03, 0.418]} rotation={[0, 0, 0.05]} scale={[0.008, 0.185, 0.008]}>
        <boxGeometry />
      </mesh>
      <mesh material={M.lash} position={[0.076, -1.03, 0.418]} rotation={[0, 0, -0.05]} scale={[0.008, 0.185, 0.008]}>
        <boxGeometry />
      </mesh>
    </group>
  )
}

export function AnimeAvatarCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.24, 3.05], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[-2, 4, 3.5]} intensity={1.45} />
      <directionalLight position={[2.5, 1, 2]} intensity={0.40} color="#cce0ff" />
      {/* Warm back rim — keeps dark hair visible on dark background */}
      <directionalLight position={[0, 2, -4]} intensity={0.50} color="#7A5030" />
      <Character />
    </Canvas>
  )
}
