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

      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);

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

      const animate = () => {
        if (frameCount % 2 === 0) {
          if (!scrollStatus && !disableAnimate) {
            scrollPosters(1.2);
          }
          frameCount = 1;
          assetGroup.position.y = assetGroupY;
          renderer.render(scene, camera);
        } else {
          frameCount++;
        }
        animationId = requestAnimationFrame(animate);
      };

      const shuffleList = (list: unknown[]) => {
        const newList: unknown[] = [];
        while (list.length > 0) {
          const random = Math.floor(Math.random() * list.length);
          newList.push(list.splice(random, 1)[0]);
        }
        return newList;
      };

      const fetchAndStore = async (key: string, url: string) => {
        const storage = localStorage.getItem(key);
        if (storage) {
          return JSON.parse(storage);
        } else {
          const response = await fetch(url);
          const data = await response.json();
          localStorage.setItem(key, JSON.stringify(data));
          return data;
        }
      };

      const fetchConfig = () =>
        fetchAndStore('tmdbConfig', `https://api.themoviedb.org/3/configuration?api_key=17f6c7973c2ed29ef001953add2d04d3`);

      const fetchAssetList = (type: 'movie' | 'tv', page: number) => {
        const peacockProvider = [386, 387];
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=17f6c7973c2ed29ef001953add2d04d3&include_adult=true&sort_by=popularity.desc&language=en-US&page=${page}&watch_region=US&with_watch_providers=${peacockProvider.join('|')}&with_networks=3353`;
        return fetchAndStore(`tmdbAssetList${type}${page}`, url);
      };

      const createImageURL = (baseUrl: string, size: string, path: string) =>
        `${baseUrl}${size}${path}`;

      const initScene = async () => {
        const config = await fetchConfig();
        const assetList = shuffleList([
          ...(await fetchAssetList('tv', 1)).results,
          ...(await fetchAssetList('tv', 2)).results,
          ...(await fetchAssetList('tv', 3)).results,
          ...(await fetchAssetList('movie', 1)).results,
          ...(await fetchAssetList('movie', 2)).results,
          ...(await fetchAssetList('movie', 3)).results,
        ]).splice(0, posterSize.cols * posterSize.rows);

        const textureLoader = new THREE.TextureLoader();
        let x = 0;
        let y = 0;
        let rowGroup: THREE.Group;

        assetList.forEach((asset: { poster_path: string; name?: string; title?: string }, i: number) => {
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

          const url = createImageURL(
            config.images.secure_base_url,
            config.images.poster_sizes[posterSize.resIndex],
            asset.poster_path
          );

          const posterTexture = textureLoader.load(url);
          posterTexture.colorSpace = THREE.SRGBColorSpace;
          posterTexture.wrapS = posterTexture.wrapT = THREE.RepeatWrapping;
          posterTexture.repeat.set(0.037, 0.025);

          const material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            map: posterTexture,
          });

          const poster = new THREE.Mesh(posterGeometry, material);
          poster.position.x = x;
          poster.name = asset.name || asset.title;
          rowGroup!.add(poster);
        });
      };

      let isHeroVisible = true;

      const handleScroll = (e: WheelEvent) => {
        // Only animate posters when hero is visible (at top of page)
        if (!isHeroVisible) return;

        clearTimeout(waitForIt);
        scrollStatus = true;
        scrollPosters(Math.abs(e.deltaY));
        waitForIt = setTimeout(() => {
          scrollStatus = false;
        }, 50);
      };

      const handlePageScroll = () => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        // Disable poster animation once user scrolls past hero section
        if (scrollY > heroHeight * 0.1) {
          isHeroVisible = false;
          disableAnimate = 'true';
        } else {
          isHeroVisible = true;
          // Re-enable auto-animation when scrolled back to top of page
          disableAnimate = null;
        }

        // Also check if the hero element is actually visible in the viewport.
        // This handles cases where scrollY > heroHeight * 0.1 but the hero
        // is still on screen (e.g. deep-linked URLs, anchor navigation).
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const heroTop = rect.top;
          const heroBottom = rect.bottom;
          const viewportHeight = window.innerHeight;

          if (heroTop < viewportHeight && heroBottom > 0) {
            // Hero is visible in viewport — ensure animation is running
            isHeroVisible = true;
            disableAnimate = null;
          }
        }
      };

      window.addEventListener('mousewheel', handleScroll, { passive: true });
      window.addEventListener('scroll', handlePageScroll, { passive: true });
      window.stopAnimation = () => {
        disableAnimate = 'true';
      };

      initScene();
      animate();

      cleanup = () => {
        window.removeEventListener('mousewheel', handleScroll);
        window.removeEventListener('scroll', handlePageScroll);
        if (animationId) cancelAnimationFrame(animationId);
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
