"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const PARTICLE_COUNT = 2200

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const { size } = useThree()

  const { geometry, initialPositions, speeds, offsets } = useMemo(() => {
    const count = PARTICLE_COUNT
    const pos = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)

    const spread = size.width > 768 ? 32 : 18

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.8) * 12
      speeds[i] = 0.2 + Math.random() * 0.5
      offsets[i] = Math.random() * Math.PI * 2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(pos.slice(), 3))

    return { geometry: geo, initialPositions: pos, speeds, offsets }
  }, [size.width])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.elapsedTime
    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const s = speeds[i]
      const o = offsets[i]
      pos[i * 3] = initialPositions[i * 3] + Math.cos(t * s * 0.4 + o) * 0.18
      pos[i * 3 + 1] =
        initialPositions[i * 3 + 1] + Math.sin(t * s + o) * 0.22
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.018
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color={new THREE.Color(0.45, 0.55, 1.0)}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function SecondaryField() {
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, initialPositions, speeds, offsets } = useMemo(() => {
    const count = 800
    const pos = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
      speeds[i] = 0.1 + Math.random() * 0.3
      offsets[i] = Math.random() * Math.PI * 2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(pos.slice(), 3))

    return { geometry: geo, initialPositions: pos, speeds, offsets }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.elapsedTime
    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array

    for (let i = 0; i < 800; i++) {
      const s = speeds[i]
      const o = offsets[i]
      pos[i * 3 + 1] = initialPositions[i * 3 + 1] + Math.sin(t * s + o) * 0.3
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = -clock.elapsedTime * 0.008
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        color={new THREE.Color(0.9, 0.9, 1.0)}
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export function ParticleCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ParticleField />
        <SecondaryField />
      </Canvas>
    </div>
  )
}
