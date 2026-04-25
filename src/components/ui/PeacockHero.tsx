import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TMDB_API_KEY = '17f6c7973c2ed29ef001953add2d04d3';
const PEACOCK_PROVIDER = [386, 387];

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

      const shuffleList = <T,>(list: T[]): T[] => {
        const newList: T[] = [];
        while (list.length > 0) {
          const random = Math.floor(Math.random() * list.length);
          newList.push(list.splice(random, 1)[0]);
        }
        return newList;
      };

      const fetchAndStore = <T,>(key: string, url: string): Promise<T> => {
        const stored = localStorage.getItem(key);
        if (stored) {
          return Promise.resolve(JSON.parse(stored) as T);
        }
        return fetch(url)
          .then(res => res.json())
          .then(data => {
            localStorage.setItem(key, JSON.stringify(data));
            return data as T;
          });
      };

      const fetchConfig = () =>
        fetchAndStore<{ images: { secure_base_url: string; poster_sizes: string[] } }>(
          'tmdbConfig',
          `https://api.themoviedb.org/3/configuration?api_key=${TMDB_API_KEY}`
        );

      const fetchAssetList = (type: 'tv' | 'movie', page: number) => {
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_API_KEY}&include_adult=true&sort_by=popularity.desc&language=en-US&page=${page}&watch_region=US&with_watch_providers=${PEACOCK_PROVIDER.join('|')}&with_networks=3353`;
        return fetchAndStore(`tmdbAssetList${type}${page}`, url) as Promise<{ results: { poster_path: string; name?: string; title?: string }[] }>;
      };

      // Load textures one at a time with a yield between each to avoid blocking the main thread
      const initScene = async () => {
        const config = await fetchConfig();
        const assetList = shuffleList([
          ...(await fetchAssetList('tv', 1)).results,
          ...(await fetchAssetList('tv', 2)).results,
          ...(await fetchAssetList('tv', 3)).results,
          ...(await fetchAssetList('movie', 1)).results,
          ...(await fetchAssetList('movie', 2)).results,
          ...(await fetchAssetList('movie', 3)).results,
        ]).filter(asset => asset.poster_path).splice(0, posterSize.cols * posterSize.rows);

        const textureLoader = new THREE.TextureLoader();
        let x = 0;
        let y = 0;
        let rowGroup: THREE.Group;

        for (let i = 0; i < assetList.length; i++) {
          const asset = assetList[i];
          if (i % posterSize.cols === 0) {
            y += posterSize.h + posterSize.padding;
            x = 0;
            rowGroup = new THREE.Group();
            rowGroup.position.y = y;
            assetGroup.add(rowGroup);
            posterCollection.push(rowGroup);
          } else {
            x += posterSize.w + posterSize.padding;
          }

          try {
            const url = `${config.images.secure_base_url}${config.images.poster_sizes[posterSize.resIndex]}${asset.poster_path}`;
            const posterTexture = await textureLoader.loadAsync(url);
            posterTexture.colorSpace = THREE.SRGBColorSpace;
            posterTexture.wrapS = posterTexture.wrapT = THREE.RepeatWrapping;
            posterTexture.repeat.set(0.037, 0.025);

            const material = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              map: posterTexture,
            });

            const poster = new THREE.Mesh(posterGeometry, material);
            poster.position.x = x;
            poster.name = asset.name || asset.title || '';
            rowGroup!.add(poster);
          } catch {
            // Skip failed textures silently
          }

          await new Promise(resolve => setTimeout(resolve, 0));
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
