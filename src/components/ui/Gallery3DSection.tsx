'use client';

import { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Stars, Sparkles } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', alt: 'Wedding Photography', category: 'Wedding' },
  { id: 2, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', alt: 'Corporate Event', category: 'Corporate' },
  { id: 3, src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80', alt: 'Fashion Editorial', category: 'Fashion' },
  { id: 4, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80', alt: 'Sports Photography', category: 'Sports' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', alt: 'Real Estate', category: 'Architecture' },
  { id: 6, src: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1200&q=80', alt: 'Product Photography', category: 'Product' },
  { id: 7, src: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80', alt: 'Aerial Drone', category: 'Aerial' },
  { id: 8, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80', alt: 'Wedding Celebration', category: 'Wedding' },
];

const categories = ['All', 'Wedding', 'Corporate', 'Fashion', 'Sports', 'Architecture', 'Product', 'Aerial'];

// 3D Floating Shapes with MeshDistortMaterial
function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[-3, 1, -5]}>
        <torusGeometry args={[0.8, 0.25, 32, 100]} />
        <MeshDistortMaterial color="#dc2626" speed={2} distort={0.4} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[3, -1, -3]}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <MeshDistortMaterial color="#f97316" speed={3} distort={0.5} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
}

function FloatingBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 2, -4]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <MeshDistortMaterial color="#ffffff" speed={2} distort={0.2} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron() {
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.5}>
      <mesh position={[2, 2, -6]}>
        <octahedronGeometry args={[0.5]} />
        <MeshDistortMaterial color="#dc2626" speed={4} distort={0.6} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron() {
  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh position={[-2, -2, -4]}>
        <icosahedronGeometry args={[0.4, 0]} />
        <MeshDistortMaterial color="#f97316" speed={2.5} distort={0.4} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
}

// 3D Particle System
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 1500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#dc2626" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// Camera Controller with Scroll
function CameraController() {
  const { camera } = useThree();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const targetX = Math.sin(scrollY.current * 0.0005) * 2;
    const targetY = Math.sin(scrollY.current * 0.0003) * 1;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#dc2626" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#f97316" />
      <spotLight position={[0, 15, 0]} intensity={1} color="#ffffff" angle={0.5} penumbra={1} />

      <ParticleSystem />
      <FloatingTorus />
      <FloatingSphere />
      <FloatingBox />
      <FloatingOctahedron />
      <FloatingIcosahedron />

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={80} scale={12} size={3} speed={0.3} opacity={0.4} color="#dc2626" />

      <Environment preset="night" />
    </>
  );
}

// Gallery Item Component
function GalleryItem({ image, index, onClick }: { image: typeof galleryImages[0]; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="gallery-item"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -10 }}
    >
      <div className="gallery-item-inner">
        <img src={image.src} alt={image.alt} className="gallery-item-image" loading="lazy" />
        <div className="gallery-item-overlay" />
        <motion.div
          className="gallery-item-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <span className="gallery-item-category">{image.category}</span>
          <h3 className="gallery-item-title">{image.alt}</h3>
        </motion.div>
        <motion.div
          className="gallery-item-zoom"
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
            <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M11 8V14M8 11H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>
        <motion.div
          className="gallery-item-border"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

export default function Gallery3DSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), {
    stiffness: 100,
    damping: 30
  });

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-heading-line', {
        y: 100,
        opacity: 0,
        rotateX: 45,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gallery-header',
          start: 'top 70%',
        },
      });

      gsap.from('.gallery-filter', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery-filters',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="gallery-section">
    

      {/* Gradient Overlays */}
      <div className="gallery-gradient-top" />

      <motion.div className="gallery-container" style={{ y }}>
        {/* Header */}
        <div className="gallery-header">
          <motion.p
            className="gallery-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Portfolio
          </motion.p>
          <h2 className="gallery-title">
            <span className="gallery-heading-line">VISUAL</span>
            <span className="gallery-heading-line gallery-title-accent">GALLERY</span>
          </h2>
          <motion.p
            className="gallery-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore our collection of stunning visual stories
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          className="gallery-filters"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`gallery-filter ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={index}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="gallery-lightbox-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.src} alt={selectedImage.alt} />
              <div className="gallery-lightbox-info">
                <span className="gallery-lightbox-category">{selectedImage.category}</span>
                <h3 className="gallery-lightbox-title">{selectedImage.alt}</h3>
              </div>
              <button
                className="gallery-lightbox-close"
                onClick={() => setSelectedImage(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-section {
          position: relative;
          min-height: 100vh;
          background: var(--bg-primary);
          overflow: hidden;
        }

        .gallery-canvas {
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        .gallery-gradient-top {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 150px;
          background: transparent;
          z-index: 1;
          pointer-events: none;
        }
        [data-theme="dark"] .gallery-gradient-top {
          background: linear-gradient(to bottom, var(--bg-primary), transparent);
        }

        .gallery-container {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          padding: 8rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 4rem;
          perspective: 1000px;
        }

        .gallery-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #dc2626;
          margin-bottom: 1.5rem;
        }

        .gallery-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 10vw, 7rem);
          line-height: 0.9;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          display: flex;
          flex-direction: column;
        }

        .gallery-heading-line {
          display: block;
        }

        .gallery-title-accent {
          color: transparent;
          -webkit-text-stroke: 2px var(--border-hover);
        }

        .gallery-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: var(--text-dim);
          margin-top: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Filters */
        .gallery-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 4rem;
        }

        .gallery-filter {
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-dim);
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2rem;
        }

        .gallery-filter:hover {
          border-color: rgba(255, 255, 255, 0.4);
          color: var(--text-primary);
          background: var(--card-bg);
        }

        .gallery-filter.active {
          background: linear-gradient(135deg, #dc2626, #f97316);
          border-color: transparent;
          color: var(--text-primary);
          box-shadow: 0 10px 40px rgba(220, 38, 38, 0.4);
        }

        /* Gallery Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .gallery-item {
          cursor: pointer;
        }

        .gallery-item-inner {
          position: relative;
          aspect-ratio: 4/3;
          border-radius: 1rem;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover .gallery-item-inner {
          border-color: rgba(220, 38, 38, 0.3);
          box-shadow: 0 25px 50px -12px rgba(220, 38, 38, 0.25);
        }

        .gallery-item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.1);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover .gallery-item-image {
          filter: grayscale(0%) contrast(1);
          transform: scale(1.1);
        }

        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          transition: background 0.5s ease;
        }

        .gallery-item:hover .gallery-item-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(220,38,38,0.1) 50%, transparent 100%);
        }

        .gallery-item-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          z-index: 2;
        }

        .gallery-item-category {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: #dc2626;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .gallery-item-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .gallery-item-zoom {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: rgba(220, 38, 38, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }

        .gallery-item-border {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #dc2626, #f97316);
          transform-origin: left;
        }

        /* Lightbox */
        .gallery-lightbox {
          position: fixed;
          inset: 0;
          background: var(--shadow);
          backdrop-filter: blur(20px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .gallery-lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);
        }

        .gallery-lightbox-content img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
        }

        .gallery-lightbox-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
        }

        .gallery-lightbox-category {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: #dc2626;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .gallery-lightbox-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0.5rem 0 0;
        }

        .gallery-lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 50px;
          height: 50px;
          background: var(--border-color);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .gallery-lightbox-close:hover {
          background: #dc2626;
          transform: rotate(90deg);
        }

        @media (max-width: 768px) {
          .gallery-container {
            padding: 5rem 1rem;
          }

          .gallery-title {
            font-size: 2.5rem;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
