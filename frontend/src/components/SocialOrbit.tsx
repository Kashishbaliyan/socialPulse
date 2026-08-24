import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function SocialOrbit() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 5.8
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 5), new THREE.MeshStandardMaterial({ color: '#7667ff', roughness: .32, metalness: .18 }))
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.83, .045, 12, 96), new THREE.MeshBasicMaterial({ color: '#fe7ac4', transparent: true, opacity: .8 }))
    ring.rotation.x = 1.12
    scene.add(orb, ring, new THREE.AmbientLight('#ffffff', 1.5))
    const light = new THREE.PointLight('#ff99d5', 25, 15)
    light.position.set(2, 3, 4); scene.add(light)
    const geometry = new THREE.SphereGeometry(.13, 18, 18)
    const dots = ['#31d9c2', '#ffd05b', '#ff7a8b'].map((color, i) => {
      const dot = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color })); dot.userData.angle = i * 2.1; scene.add(dot); return dot
    })
    const resize = () => { const { width, height } = mount.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix() }
    let frame = 0
    const animate = () => { frame = requestAnimationFrame(animate); orb.rotation.y += .004; ring.rotation.z += .006; dots.forEach((dot, i) => { const a = performance.now() * .0008 + dot.userData.angle; const r = 1.9 + i * .12; dot.position.set(Math.cos(a) * r, Math.sin(a * 1.35) * .8, Math.sin(a) * .8) }); renderer.render(scene, camera) }
    resize(); window.addEventListener('resize', resize); animate()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); renderer.dispose(); orb.geometry.dispose(); (orb.material as THREE.Material).dispose(); ring.geometry.dispose(); (ring.material as THREE.Material).dispose(); geometry.dispose(); dots.forEach((dot) => (dot.material as THREE.Material).dispose()); mount.removeChild(renderer.domElement) }
  }, [])
  return <div ref={mountRef} aria-hidden="true" className="h-full w-full" />
}
