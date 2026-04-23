"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei"
import { Download, Heart, X } from "lucide-react"

/* =========================
   Card Context (inlined)
   ========================= */

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const cards: Card[] = [
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop&auto=format&q=80", alt: "Elegant Invitation", title: "Elegant Invitation" },
    { id: "2", imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=800&fit=crop&auto=format&q=80", alt: "Modern Design", title: "Modern Design" },
    { id: "3", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop&auto=format&q=80", alt: "Vintage Style", title: "Vintage Style" },
    { id: "4", imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=800&fit=crop&auto=format&q=80", alt: "Minimalist", title: "Minimalist" },
    { id: "5", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&auto=format&q=80", alt: "Floral Design", title: "Floral Design" },
    { id: "6", imageUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=800&fit=crop&auto=format&q=80", alt: "Geometric", title: "Geometric" },
    { id: "7", imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800&fit=crop&auto=format&q=80", alt: "Luxury Gold", title: "Luxury Gold" },
    { id: "8", imageUrl: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&h=800&fit=crop&auto=format&q=80", alt: "Rustic Style", title: "Rustic Style" },
    { id: "9", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop&auto=format&q=80", alt: "Dark Modern", title: "Dark Modern" },
    { id: "10", imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=800&fit=crop&auto=format&q=80", alt: "Colorful Party", title: "Colorful Party" },
    { id: "11", imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=800&fit=crop&auto=format&q=80", alt: "Geometric", title: "Geometric" },
    { id: "12", imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&h=800&fit=crop&auto=format&q=80", alt: "Luxury Gold", title: "Luxury Gold" },
    { id: "13", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&auto=format&q=80", alt: "Rustic Style", title: "Rustic Style" },
    { id: "14", imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=800&fit=crop&auto=format&q=80", alt: "Dark Modern", title: "Dark Modern" },
    { id: "15", imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop&auto=format&q=80", alt: "Colorful Party", title: "Colorful Party" },
    { id: "16", imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=800&fit=crop&auto=format&q=80", alt: "Elegant Script", title: "Elegant Script" },
    { id: "17", imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop&auto=format&q=80", alt: "Watercolor Art", title: "Watercolor Art" },
    { id: "18", imageUrl: "https://images.unsplash.com/photo-1580130933887-834d1f10ff84?w=600&h=800&fit=crop&auto=format&q=80", alt: "Botanical", title: "Botanical" },
    { id: "19", imageUrl: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=800&fit=crop&auto=format&q=80", alt: "Art Deco", title: "Art Deco" },
    { id: "20", imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=800&fit=crop&auto=format&q=80", alt: "Marble Luxury", title: "Marble Luxury" },
  ]

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  )
}

/* =========================
   Starfield Background (inlined)
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 10000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 bg-black" />
}

/* =========================
   Floating Card (inlined)
   ========================= */

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }
  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-40 h-52 rounded-lg overflow-hidden shadow-2xl bg-[#1F2121] p-3 select-none"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(49, 184, 198, 0.5), 0 0 30px rgba(49, 184, 198, 0.3)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered ? "2px solid rgba(49, 184, 198, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img
            src={card.imageUrl || "/placeholder.svg"}
            alt={card.alt}
            className="w-full h-40 object-cover rounded-md"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-1 text-center">
            <p className="text-white text-xs font-medium truncate">{card.title}</p>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Card Modal (inlined)
   ========================= */

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseEnter = () => {}
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const toggleFavorite = () => setIsFavorited((v) => !v)
  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={handleBackdropClick}>
      <div className="relative max-w-md w-full mx-4">
        <button onClick={handleClose} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10">
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-[16px] bg-[#1F2121] p-4 transition-all duration-500 ease-out w-full"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full mb-4" style={{ aspectRatio: "3 / 4" }}>
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl || "/placeholder.svg"}
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px", opacity: 1 }}
              />
            </div>

            <h3 className="text-white text-lg font-semibold mb-4 text-center">{selectedCard.title}</h3>

            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex h-9 flex-1 items-center justify-center rounded-lg text-base font-medium text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                style={{ backgroundColor: "#31b8c6" }}
              >
                <div className="flex items-center gap-1.5">
                  <Download className="h-4 w-4" strokeWidth={1.8} />
                  <span>Download</span>
                </div>
              </button>
              <button
                type="button"
                onClick={toggleFavorite}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-black outline-none transition duration-300 ease-out hover:opacity-80 active:scale-[0.97]"
                style={{ backgroundColor: "#31b8c6" }}
              >
                <Heart className="h-4 w-4" strokeWidth={1.8} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Card Galaxy (inlined)
   ========================= */

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: {
      x: number
      y: number
      z: number
      rotationX: number
      rotationY: number
      rotationZ: number
    }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 12 + (i % 3) * 4

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#31b8c6" transparent opacity={0.02} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

/* =========================
   Page/Component Export
   ========================= */

export default function StellarCardGallerySingle() {
  return (
    <CardProvider>
      <div className="w-full h-screen relative overflow-hidden bg-black">
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={40}
              autoRotate={false}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div className="absolute top-4 left-4 z-20 text-white pointer-events-none">
          <h1 className="text-2xl font-bold mb-2">3D Stellar Card Gallery</h1>
          <p className="text-sm opacity-70">Drag to look around &bull; Scroll to zoom &bull; Click cards to view details</p>
        </div>

        <button
          onClick={() => {
            const close = (window as unknown as Record<string, () => void>).__closeWorkGallery;
            if (close) close();
          }}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close gallery and return to site"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </CardProvider>
  )
}
