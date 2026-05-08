import { useEffect, useRef } from 'react';
import * as THREE from 'three';

declare global {
  interface Window {
    stopAnimation?: () => void;
  }
}

export default function PeacockHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let animationId: number;

    const init = async () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = '';

      const style = document.createElement('style');
      style.textContent = `
        .peacock-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          background-color: #000;
          overflow: hidden;
        }

        .logo {
          display: grid;
          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          z-index: 2;
        }

        .logo svg {
          margin: auto;
          width: 50%;
          height: auto;
          filter: drop-shadow(0 10px 10px rgb(0 0 0 / .75));
        }

        .posters {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }

        .posters canvas {
          margin: auto;
          width: 100% !important;
          height: auto !important;
        }
      `;
      containerRef.current.appendChild(style);

      const logoDiv = document.createElement('div');
      logoDiv.className = 'logo';
      logoDiv.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 600 500" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&amp;family=Montserrat:wght@200;300;400&amp;display=swap');
          </style>

          <!-- Logo Image with Focus Ring -->
          <g transform="translate(300, 180)">
            <!-- Focus ring outer glow -->
            <circle cx="0" cy="0" r="130" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.3"/>
            <circle cx="0" cy="0" r="120" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.5"/>

            <!-- Focus corners -->
            <path d="M -130 -80 L -130 -100 L -110 -100" fill="none" stroke="#FFFFFF" stroke-width="2"/>
            <path d="M 130 -80 L 130 -100 L 110 -100" fill="none" stroke="#FFFFFF" stroke-width="2"/>
            <path d="M -130 80 L -130 100 L -110 100" fill="none" stroke="#FFFFFF" stroke-width="2"/>
            <path d="M 130 80 L 130 100 L 110 100" fill="none" stroke="#FFFFFF" stroke-width="2"/>

            <!-- Logo image -->
            <image href="/logo.png" x="-90" y="-90" width="180" height="180" preserveAspectRatio="xMidYMid meet" "/>
          </g>

          <!-- MARKMEDIA text -->
          <text x="50%" y="360" dominant-baseline="middle" text-anchor="middle" font-family="'Cinzel', 'Montserrat', serif" font-weight="600" font-size="48" fill="#FFFFFF" letter-spacing="0.3em">MARKMEDIA</text>

          <!-- Tagline -->
          <text x="50%" y="400" dominant-baseline="middle" text-anchor="middle" font-family="'Montserrat', sans-serif" font-weight="300" font-size="10" fill="#FFFFFF" letter-spacing="0.6em" opacity="0.8">PHOTOGRAPHY &amp; CINEMATOGRAPHY</text>
        </svg>
      `;
      containerRef.current.appendChild(logoDiv);

      const postersDiv = document.createElement('div');
      postersDiv.className = 'posters';
      containerRef.current.appendChild(postersDiv);

      let assetGroupY = 0;
      let scrollStatus = false;
      let waitForIt: ReturnType<typeof setTimeout>;
      let frameCount = 1;
      const urlParams = new URLSearchParams(window.location.search);
      let disableAnimate = urlParams.get('disableAnimate');
      const posterCollection: THREE.Group[] = [];

      // Use exact same poster dimensions as HTML (40x27), texture.repeat crops to match
      const posterSize = {
        h: 40,
        w: 27,
        padding: 2,
        cols: 11,
        rows: 10,
        resIndex: 2,
      };

      const canvasSize = {
        h: window.innerWidth * 414 / 1075,
        w: window.innerWidth,
      };

      const canvas = document.createElement('canvas');

      // Gracefully handle WebGL unavailability
      const probeCtx = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!probeCtx) {
        console.warn('PeacockHero: WebGL not available, skipping 3D scene');
        return;
      }

      const scene = new THREE.Scene();
      let renderer: THREE.WebGLRenderer;

      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      } catch {
        console.warn('PeacockHero: WebGL context creation failed');
        return;
      }

      // Handle WebGL context loss gracefully
      const handleContextLost = (e: Event) => {
        e.preventDefault();
        disableAnimate = 'true';
        console.warn('PeacockHero: WebGL context lost, pausing animation');
      };
      canvas.addEventListener('webglcontextlost', handleContextLost);

      const posterShape = new THREE.Shape();
      const roundedRect = (ctx: THREE.Shape, x: number, y: number, width: number, height: number, radius: number) => {
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
      };

      roundedRect(posterShape, 0, 0, posterSize.w, posterSize.h, 3);
      const posterGeometry = new THREE.ShapeGeometry(posterShape);

      const startingY = -posterSize.h - posterSize.padding;
      const assetGroup = new THREE.Group();
      assetGroup.position.y = startingY;
      assetGroup.position.x = -((posterSize.w * posterSize.cols) + (posterSize.padding * (posterSize.cols - 1))) / 2;
      scene.add(assetGroup);

      const camera = new THREE.PerspectiveCamera(75, canvasSize.w / canvasSize.h * 0.5, 0.01, 1000);
      camera.rotation.x = 0.6;
      camera.position.z = 100;
      camera.position.y = posterSize.h * 1.5;

      const spotLight = new THREE.PointLight(0xffffff, 2500, 500);
      spotLight.position.x = 0;
      spotLight.position.y = posterSize.h * 1.5;
      spotLight.position.z = 50;
      scene.add(spotLight);

      renderer.setSize(canvasSize.w, canvasSize.h);
      postersDiv.prepend(renderer.domElement);

      const scrollPosters = (moveY = 0.1) => {
        if (assetGroup.position.y >= 0) {
          loopPosters();
          assetGroupY = startingY;
        } else {
          assetGroupY += moveY;
        }
      };

      const loopPosters = () => {
        if (posterCollection.length) {
          const lastY = (posterSize.h * posterCollection.length) + (posterSize.padding * (posterCollection.length - 1));
          for (let i = 0; i < posterCollection.length; i++) {
            const row = posterCollection[i];
            if (row.position.y >= lastY) {
              row.position.y = -startingY;
            } else {
              row.position.y += -startingY;
            }
          }
        }
      };

      // Photography images - Only: Gaming, Sports, Hospital, Food Ads, Festivals, Dubai Functions, Travel, Cultural, Wedding, Events (All Working Images)
      const PHOTOGRAPHY_IMAGES = [
        // GAMING / ESPORTS
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
        'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80',
        'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&q=80',
        'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&q=80',

        // SPORTS
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
        'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
        'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80',

        // HOSPITAL / HEALTHCARE
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
        'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80',
        'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
        'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&q=80',
        'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
        'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80',

        // FOOD ADVERTISEMENT
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
        'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80',
        'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&q=80',

        // FESTIVALS
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',

        // DUBAI FUNCTIONS / EVENTS
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
        'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=600&q=80',
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80',
        'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80',
        'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80',

        // TRAVEL
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
        'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600&q=80',
        'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',

        // CULTURAL
        'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80',
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',

        // WEDDING
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
        'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
        'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80',
        'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',

        // EVENTS
        'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
        'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=600&q=80',
      ];

      const shuffleList = <T,>(list: T[]): T[] => {
        const newList: T[] = [];
        while (list.length > 0) {
          const random = Math.floor(Math.random() * list.length);
          newList.push(list.splice(random, 1)[0]);
        }
        return newList;
      };

      // Load photography textures with chunked loading to avoid blocking
      const initScene = async () => {
        const textureLoader = new THREE.TextureLoader();
        const imageUrls = shuffleList([...PHOTOGRAPHY_IMAGES]);
        const totalPosters = posterSize.cols * posterSize.rows;
        const BATCH_SIZE = 10; // Process 10 posters per frame batch

        const createRow = (rowIndex: number): THREE.Group => {
          const rowGroup = new THREE.Group();
          rowGroup.position.y = (rowIndex + 1) * (posterSize.h + posterSize.padding);
          assetGroup.add(rowGroup);
          posterCollection.push(rowGroup);
          return rowGroup;
        };

        const loadPoster = async (index: number): Promise<THREE.Mesh | null> => {
          try {
            const imageUrl = imageUrls[index % imageUrls.length];
            const posterTexture = await textureLoader.loadAsync(imageUrl);
            posterTexture.colorSpace = THREE.SRGBColorSpace;
            posterTexture.wrapS = posterTexture.wrapT = THREE.RepeatWrapping;
            posterTexture.repeat.set(0.037, 0.025);

            const material = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              map: posterTexture,
            });

            const poster = new THREE.Mesh(posterGeometry, material);
            const col = index % posterSize.cols;
            poster.position.x = col * (posterSize.w + posterSize.padding);
            poster.name = `photo-${index}`;
            return poster;
          } catch {
            return null;
          }
        };

        // Use requestIdleCallback or setTimeout for non-blocking batched loading
        const yieldToMain = (): Promise<void> =>
          new Promise(resolve => {
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => resolve(), { timeout: 100 });
            } else {
              setTimeout(resolve, 0);
            }
          });

        let rowGroup = createRow(0);

        for (let i = 0; i < totalPosters; i++) {
          if (i > 0 && i % posterSize.cols === 0) {
            rowGroup = createRow(i / posterSize.cols);
          }

          const poster = await loadPoster(i);
          if (poster) {
            rowGroup.add(poster);
          }

          // Yield every BATCH_SIZE posters to prevent blocking
          if (i > 0 && i % BATCH_SIZE === 0) {
            await yieldToMain();
          }
        }
      };

      let texturesReady = false;

      // Mousewheel scroll handler — exact same as HTML
      const handleWheel = (e: WheelEvent) => {
        clearTimeout(waitForIt);
        scrollStatus = true;
        scrollPosters(Math.abs(e.deltaY));
        waitForIt = window.setTimeout(() => {
          scrollStatus = false;
        }, 50);
      };
      window.addEventListener('mousewheel', handleWheel, { passive: true });
      window.stopAnimation = () => {
        disableAnimate = 'true';
      };

      // Start scene initialization
      initScene().then(() => { texturesReady = true; }).catch(() => {});

      // EXACT SAME animation loop as HTML
      const animate = () => {
        if (frameCount % 3 === 0) {
          if (!scrollStatus && !disableAnimate) {
            scrollPosters(0.3);
          }
          frameCount = 1;
          assetGroup.position.y = assetGroupY;
          if (texturesReady) {
            renderer.render(scene, camera);
          }
        } else {
          frameCount++;
        }
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);

      cleanup = () => {
        window.removeEventListener('mousewheel', handleWheel);
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        if (animationId) cancelAnimationFrame(animationId);
        clearTimeout(waitForIt);
        renderer.dispose();
      };
    };

    init();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return <div ref={containerRef} className="peacock-wrapper" />;
}
