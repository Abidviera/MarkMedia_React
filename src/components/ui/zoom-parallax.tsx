'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import Lenis from 'lenis';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const [scrollProgress, setScrollProgress] = useState(0);

	// Create MotionValue for smooth interpolation
	const progressValue = useMemo(() => new MotionValue(0), []);

	// Use Lenis for smooth scroll progress calculation
	useEffect(() => {
		const lenis = (window as unknown as Record<string, Lenis>).__lenis;
		const containerEl = container.current;
		if (!lenis || !containerEl) return;

		const updateProgress = () => {
			const rect = containerEl.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const containerHeight = containerEl.offsetHeight;

			// Calculate scroll progress: 0 when container top enters viewport, 1 when bottom leaves
			const scrollStart = -rect.top;
			const totalScroll = containerHeight - viewportHeight;

			if (totalScroll <= 0) {
				setScrollProgress(1);
				progressValue.set(1);
				return;
			}

			const progress = Math.max(0, Math.min(1, scrollStart / totalScroll));
			setScrollProgress(progress);
			progressValue.set(progress);
		};

		const handleScroll = () => {
			requestAnimationFrame(updateProgress);
		};

		lenis.on('scroll', handleScroll);
		updateProgress();

		return () => {
			lenis.off('scroll', handleScroll);
		};
	}, [progressValue]);

	// Create smooth transforms using the Lenis scroll progress MotionValue
	const scale4 = useTransform(progressValue, [0, 1], [1, 4]);
	const scale5 = useTransform(progressValue, [0, 1], [1, 5]);
	const scale6 = useTransform(progressValue, [0, 1], [1, 6]);
	const scale8 = useTransform(progressValue, [0, 1], [1, 8]);
	const scale9 = useTransform(progressValue, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[300vh]" style={{ transform: 'translateZ(0)' }}>
			<div className="sticky top-0 h-screen overflow-hidden" style={{ transform: 'translateZ(0)' }}>
				{images.map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center will-change-transform ${
								index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''
							} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${
								index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''
							} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${
								index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''
							} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''}`}
						>
							<div className="relative h-[25vh] w-[25vw] overflow-hidden">
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									className="h-full w-full object-cover"
									loading={index === 0 ? 'eager' : 'lazy'}
									decoding="async"
									style={{
										willChange: 'transform',
										transform: 'translateZ(0)',
										backfaceVisibility: 'hidden',
									}}
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
