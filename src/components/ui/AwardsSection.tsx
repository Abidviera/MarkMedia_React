'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Stars, Sparkles } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Award data
const awards = [
  {
    id: 1,
    title: 'Best Wedding Photographer',
    organization: 'Middle East Photography Awards',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80',
    color: '#dc2626'
  },
  {
    id: 2,
    title: 'Excellence in Visual Arts',
    organization: 'Gulf Film Festival',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
    color: '#f97316'
  },
  {
    id: 3,
    title: 'Corporate Photography Award',
    organization: 'Business Excellence Awards',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&q=80',
    color: '#dc2626'
  },
  {
    id: 4,
    title: 'Fashion Editorial Photographer',
    organization: 'Vogue Middle East',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
    color: '#f97316'
  },
  {
    id: 5,
    title: 'Cinematography Excellence',
    organization: 'Dubai International Film Festival',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=400&q=80',
    color: '#dc2626'
  },
  {
    id: 6,
    title: 'Drone Photography Pioneer',
    organization: 'Aerial Photography Awards',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80',
    color: '#f97316'
  }
];

const achievements = [
  { number: '50+', label: 'International Awards' },
  { number: '500+', label: 'Projects Completed' },
  { number: '15+', label: 'Years Experience' },
  { number: '#1', label: 'Rated in UAE' }
];

// 3D Floating Trophy Component
function FloatingTrophy({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        {/* Trophy cup */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.8, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Trophy handles */}
        <mesh position={[0.4, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.4, 0.1, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Trophy base */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.1, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// 3D Particle Field Component
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#dc2626"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// 3D Geometric Shapes
function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-3, 2, -5]}>
          <octahedronGeometry args={[0.5]} />
          <MeshDistortMaterial color="#dc2626" speed={2} distort={0.3} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[4, -1, -3]}>
          <icosahedronGeometry args={[0.4]} />
          <MeshDistortMaterial color="#f97316" speed={3} distort={0.4} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[2, 3, -4]}>
          <dodecahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.5} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

// Camera Controller for Scroll Animation
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
    // Smooth camera movement based on scroll
    const targetZ = 8 - scrollY.current * 0.002;
    const targetY = Math.sin(scrollY.current * 0.001) * 0.5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.max(5, targetZ), 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#dc2626" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f97316" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" />

      <ParticleField />
      <GeometricShapes />

      <FloatingTrophy position={[-2, 1, -2]} color="#dc2626" />
      <FloatingTrophy position={[2, -1, -3]} color="#f97316" />
      <FloatingTrophy position={[0, 2, -4]} color="#ffffff" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#dc2626" />

      <Environment preset="night" />
    </>
  );
}

// Award Card Component
function AwardCard({ award, index }: { award: typeof awards[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="award-card"
      initial={{ opacity: 0, y: 100, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="award-card-inner">
        <div className="award-image-container">
          <img src={award.image} alt={award.title} className="award-image" loading="lazy" />
          <div className="award-gradient-overlay" style={{ background: `linear-gradient(135deg, ${award.color}40, transparent)` }} />
        </div>
        <div className="award-content">
          <span className="award-year" style={{ color: award.color }}>{award.year}</span>
          <h3 className="award-title">{award.title}</h3>
          <p className="award-organization">{award.organization}</p>
        </div>
        <motion.div
          className="award-badge"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.5 + index * 0.1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={award.color} stroke="#ffffff" strokeWidth="1"/>
          </svg>
        </motion.div>
        {isHovered && (
          <motion.div
            className="award-glow"
            style={{ background: `radial-gradient(circle, ${award.color}30 0%, transparent 70%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
    stiffness: 100,
    damping: 30
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with scroll
      gsap.from('.awards-heading-line', {
        y: 150,
        opacity: 0,
        rotateX: 90,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.awards-header',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Achievement counters with stagger
      gsap.from('.achievement-item', {
        y: 80,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.15,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: '.awards-achievements',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Parallax effect on background
      gsap.to('.awards-bg-element', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="awards-section">
      

      {/* Background decorative elements */}
      <div className="awards-bg-element" style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, rgba(var(--accent-rgb), 0.1) 0%, transparent 70%)`, filter: 'blur(60px)' }} />
      <div className="awards-bg-element" style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <motion.div
        className="awards-container"
        style={{ y, opacity }}
      >
        {/* Header */}
        <div className="awards-header">
          <motion.p
            className="awards-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Recognition
          </motion.p>
          <h2 className="awards-main-title">
            <span className="awards-heading-line">AWARDS &</span>
            <span className="awards-heading-line awards-heading-accent">RECOGNITION</span>
          </h2>
          <motion.p
            className="awards-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Celebrating excellence in visual storytelling
          </motion.p>
        </div>

   

        {/* Awards Grid */}
        <div className="awards-grid">
          {awards.map((award, index) => (
            <AwardCard key={award.id} award={award} index={index} />
          ))}
        </div>
      </motion.div>

      <style>{`
        .awards-section {
          position: relative;
          background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%);
          border-top: 1px solid var(--border-color);
          padding: 8rem 2rem;
          overflow: hidden;
          min-height: 100vh;
        }

        .awards-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .awards-container {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          z-index: 2;
        }

        .awards-header {
          text-align: center;
          margin-bottom: 5rem;
          perspective: 1000px;
        }

        .awards-eyebrow {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--accent);
          margin-bottom: 1.5rem;
        }

        .awards-main-title {
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

        .awards-heading-line {
          display: block;
        }

        .awards-heading-accent {
          color: transparent;
          -webkit-text-stroke: 2px var(--border-hover);
          position: relative;
        }

        .awards-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: var(--text-dim);
          margin-top: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Achievements */
        .awards-achievements {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 5rem;
          padding: 3rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        .achievement-item {
          position: relative;
          text-align: center;
          padding: 2rem 1.5rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 1rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
          overflow: hidden;
        }

        .achievement-item:hover {
          background: var(--card-bg);
          border-color: var(--card-border-hover);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -12px var(--shadow);
        }

        .achievement-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 1rem;
          background: var(--card-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .achievement-number {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .achievement-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .achievement-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(220, 38, 38, 0.2) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* Awards Grid */
        .awards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .award-card {
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .award-card-inner {
          position: relative;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .award-card:hover .award-card-inner {
          border-color: var(--card-border-hover);
          box-shadow: 0 25px 50px -12px var(--shadow);
        }

        .award-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .award-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(1.1);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .award-card:hover .award-image {
          filter: grayscale(0%) contrast(1);
          transform: scale(1.1);
        }

        .award-gradient-overlay {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .award-card:hover .award-gradient-overlay {
          opacity: 1;
        }

        .award-content {
          padding: 1.5rem;
        }

        .award-year {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .award-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0.5rem 0;
        }

        .award-organization {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        .award-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          background: var(--shadow);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .award-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 1rem;
        }

        @media (max-width: 1024px) {
          .awards-achievements {
            grid-template-columns: repeat(2, 1fr);
          }

          .awards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .awards-section {
            padding: 5rem 1.5rem;
          }

          .awards-achievements {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .awards-grid {
            grid-template-columns: 1fr;
          }

          .award-image-container {
            height: 180px;
          }
        }
      `}</style>
    </section>
  );
}
