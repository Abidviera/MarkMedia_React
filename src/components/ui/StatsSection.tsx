'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Stars, Sparkles } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Capturing moments that last forever',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    color: '#dc2626',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
  },
  {
    id: 2,
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    description: 'A decade of visual excellence',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)'
  },
  {
    id: 3,
    value: 450,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Trusted by renowned brands',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    color: '#dc2626',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
  },
  {
    id: 4,
    value: 15,
    suffix: '+',
    label: 'Team Members',
    description: 'Creative professionals united',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)'
  },
  {
    id: 5,
    value: 50,
    suffix: '+',
    label: 'Awards Won',
    description: 'International recognition',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
    color: '#dc2626',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
  },
  {
    id: 6,
    value: 100,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Excellence in every project',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)'
  }
];

// Animated Counter Component with professional easing
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2500;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Professional easing: cubic-bezier approximation
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeOutExpo * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className="stat-counter-wrapper">
      <span className="stat-counter">{count}</span>
      <span className="stat-suffix">{suffix}</span>
    </div>
  );
}

// 3D Floating Diamond
function FloatingDiamond({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

// 3D Particle Field with Professional Look
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 2500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Color variation between red and orange
      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        colors[i * 3] = 0.86;     // R
        colors[i * 3 + 1] = 0.15; // G
        colors[i * 3 + 2] = 0.15; // B
      } else {
        colors[i * 3] = 0.98;     // R
        colors[i * 3 + 1] = 0.45; // G
        colors[i * 3 + 2] = 0.09; // B
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#dc2626"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D Floating Rings
function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ring2Ref.current.rotation.x = -state.clock.elapsedTime * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} position={[-4, 0, -4]}>
        <torusGeometry args={[1.2, 0.03, 32, 100]} />
        <meshStandardMaterial color="#dc2626" metalness={1} roughness={0} emissive="#dc2626" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring2Ref} position={[4, 1, -5]}>
        <torusGeometry args={[0.8, 0.025, 32, 100]} />
        <meshStandardMaterial color="#f97316" metalness={1} roughness={0} emissive="#f97316" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring3Ref} position={[0, -2, -3]}>
        <torusGeometry args={[1.5, 0.02, 32, 100]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} transparent opacity={0.5} />
      </mesh>
    </>
  );
}

// Camera Controller
function CameraController() {
  const { camera } = useThree();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const targetZ = 8 - scrollY.current * 0.001;
    const targetY = Math.sin(scrollY.current * 0.0008) * 0.8;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.max(5, targetZ), 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 3D Scene
function Scene3D() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#dc2626" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#f97316" />
      <spotLight position={[0, 15, 0]} intensity={1} color="#ffffff" angle={0.5} penumbra={1} />

      <ParticleField />
      <FloatingRings />

      <FloatingDiamond position={[-3, 2, -4]} color="#dc2626" />
      <FloatingDiamond position={[3, -1, -3]} color="#f97316" />
      <FloatingDiamond position={[0, 3, -5]} color="#ffffff" />

      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={15} size={4} speed={0.3} opacity={0.6} color="#dc2626" />

      <Environment preset="night" />
    </>
  );
}

// Professional Stat Card Component
function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className="stat-card"
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
    >
      {/* Gradient Background */}
      <div className="stat-card-bg" />

      {/* Glow Effect on Hover */}
      <motion.div
        className="stat-card-glow"
        style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}40 0%, transparent 60%)` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon Container */}
      <motion.div
        className="stat-icon-container"
        style={{ background: stat.gradient }}
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 + index * 0.12 }}
      >
        <div className="stat-icon" style={{ color: '#ffffff' }}>
          {stat.icon}
        </div>
      </motion.div>

      {/* Counter */}
      <div className="stat-content">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
        <h3 className="stat-label">{stat.label}</h3>
        <p className="stat-description">{stat.description}</p>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        className="stat-accent-line"
        style={{ background: stat.gradient }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 + index * 0.12 }}
      />

      {/* Corner Decoration */}
      <div className="stat-corner stat-corner-tl" />
      <div className="stat-corner stat-corner-tr" />
      <div className="stat-corner stat-corner-bl" />
      <div className="stat-corner stat-corner-br" />
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), {
    stiffness: 100,
    damping: 30
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with stagger
      gsap.from('.stats-heading-line', {
        y: 100,
        opacity: 0,
        rotateX: 45,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-header',
          start: 'top 75%',
        },
      });

      // Eyebrow animation
      gsap.from('.stats-eyebrow', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-header',
          start: 'top 75%',
        },
      });

      // Parallax background text
      gsap.to('.stats-bg-text', {
        y: -300,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // CTA animation
      gsap.from('.stats-cta-content', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-cta',
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stats-section">
      {/* 3D Background Canvas */}
     

      {/* Background Gradient Overlays */}
      <div className="stats-bg-gradient-top" />
      <div className="stats-bg-gradient-bottom" />

      {/* Animated Background Elements */}
      <motion.div
        className="stats-bg-orb stats-bg-orb-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="stats-bg-orb stats-bg-orb-2"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div className="stats-container" style={{ y, opacity }}>
        {/* Header */}
        <div className="stats-header">
          <motion.p
            className="stats-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow-line" />
            Our Track Record
            <span className="eyebrow-line" />
          </motion.p>
          <h2 className="stats-main-title">
            <span className="stats-heading-line">NUMBERS</span>
            <span className="stats-heading-line stats-heading-accent">THAT MATTER</span>
          </h2>
          <motion.p
            className="stats-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Proven excellence through years of delivering exceptional visual stories
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="stats-cta"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stats-cta-content">
            <div className="cta-decoration">
              <span className="cta-line" />
              <span className="cta-dot" />
              <span className="cta-line" />
            </div>
            <p className="stats-cta-text">Ready to add your story to our portfolio?</p>
            <motion.a
              href="#contact"
              className="stats-cta-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 60px rgba(220, 38, 38, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Your Project</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Background text decoration */}
      <div className="stats-bg-text">IMPACT</div>

      <style>{`
        .stats-section {
          position: relative;
          background: #000000;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 10rem 2rem;
          overflow: hidden;
          min-height: 100vh;
        }

        .stats-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .stats-bg-gradient-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to bottom, #000000, transparent);
          z-index: 1;
          pointer-events: none;
        }

        .stats-bg-gradient-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to top, #000000, transparent);
          z-index: 1;
          pointer-events: none;
        }

        .stats-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }

        .stats-bg-orb-1 {
          top: 20%;
          right: 10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%);
        }

        .stats-bg-orb-2 {
          bottom: 30%;
          left: 5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
        }

        .stats-container {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          z-index: 2;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 6rem;
          perspective: 1000px;
        }

        .stats-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #dc2626;
          margin-bottom: 2rem;
        }

        .eyebrow-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #dc2626);
        }

        .eyebrow-line:last-child {
          background: linear-gradient(90deg, #dc2626, transparent);
        }

        .stats-main-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(3.5rem, 10vw, 7rem);
          line-height: 0.9;
          color: #ffffff;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
        }

        .stats-heading-line {
          display: block;
        }

        .stats-heading-accent {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
        }

        .stats-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.5);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Stats Grid - Professional Layout */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 6rem;
        }

        /* Professional Stat Card */
        .stat-card {
          position: relative;
          padding: 2.5rem 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          cursor: default;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .stat-card:hover {
          border-color: rgba(220, 38, 38, 0.3);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
                      0 0 0 1px rgba(220, 38, 38, 0.1);
        }

        .stat-card-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(220, 38, 38, 0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .stat-card:hover .stat-card-bg {
          opacity: 1;
        }

        .stat-card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Icon Container */
        .stat-icon-container {
          width: 70px;
          height: 70px;
          margin-bottom: 1.5rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px -10px currentColor;
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon svg {
          width: 28px;
          height: 28px;
        }

        /* Counter */
        .stat-content {
          position: relative;
          z-index: 1;
        }

        .stat-counter-wrapper {
          display: flex;
          align-items: baseline;
          margin-bottom: 0.75rem;
        }

        .stat-counter {
          font-family: 'Inter', sans-serif;
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .stat-suffix {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 700;
          color: #dc2626;
          margin-left: 0.25rem;
        }

        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 0.5rem;
        }

        .stat-description {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.6;
          margin: 0;
        }

        /* Accent Line */
        .stat-accent-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          transform-origin: left;
        }

        /* Corner Decorations */
        .stat-corner {
          position: absolute;
          width: 12px;
          height: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover .stat-corner {
          opacity: 1;
        }

        .stat-corner-tl { top: 8px; left: 8px; border-top: 2px solid #dc2626; border-left: 2px solid #dc2626; }
        .stat-corner-tr { top: 8px; right: 8px; border-top: 2px solid #dc2626; border-right: 2px solid #dc2626; }
        .stat-corner-bl { bottom: 8px; left: 8px; border-bottom: 2px solid #dc2626; border-left: 2px solid #dc2626; }
        .stat-corner-br { bottom: 8px; right: 8px; border-bottom: 2px solid #dc2626; border-right: 2px solid #dc2626; }

        /* CTA Section */
        .stats-cta {
          padding-top: 4rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stats-cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .cta-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        }

        .cta-dot {
          width: 6px;
          height: 6px;
          background: #dc2626;
          border-radius: 50%;
        }

        .stats-cta-text {
          font-family: 'Inter', sans-serif;
          font-size: 1.5rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .stats-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 3rem;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border: none;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          text-decoration: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 15px 35px -10px rgba(220, 38, 38, 0.5);
        }

        .stats-cta-btn:hover {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        /* Background text */
        .stats-bg-text {
          position: absolute;
          bottom: -15%;
          right: -10%;
          font-family: 'Inter', sans-serif;
          font-size: 25vw;
          font-weight: 800;
          color: #ffffff;
          opacity: 0.015;
          letter-spacing: -0.05em;
          user-select: none;
          pointer-events: none;
          z-index: 0;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .stat-card {
            padding: 2rem 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .stats-section {
            padding: 6rem 1.5rem;
          }

          .stats-header {
            margin-bottom: 4rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .stat-card {
            padding: 2rem 1.5rem;
          }

          .stat-icon-container {
            width: 60px;
            height: 60px;
            border-radius: 12px;
          }

          .stat-icon svg {
            width: 24px;
            height: 24px;
          }

          .stats-cta-text {
            font-size: 1.2rem;
          }

          .stats-cta-btn {
            padding: 1rem 2rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}
