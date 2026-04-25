'use client';
import { cn } from '@/lib/utils';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
	{
		src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Modern architecture building',
	},
	{
		src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Urban cityscape at sunset',
	},
	{
		src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Abstract geometric pattern',
	},
	{
		src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Mountain landscape',
	},
	{
		src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Minimalist design elements',
	},
	{
		src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Ocean waves and beach',
	},
	{
		src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Forest trees and sunlight',
	},
];

export default function ZoomParallaxSection() {
	return (
		<section className="relative w-full">
			<div className="relative z-20 flex h-[50vh] items-center justify-center">
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,var(--color-foreground/_10%),transparent_50%)]',
						'blur-[30px]',
					)}
				/>
				<div className="text-center">
					<span className="text-sm font-semibold tracking-widest text-red-600 uppercase">
						Portfolio
					</span>
					<h2
						className="mt-2 text-[120px] leading-[0.9] font-bold tracking-tight"
						style={{ color: '#000000' }}
					>
						VISUAL
					</h2>
					<h2
						className="text-[120px] leading-[0.9] font-bold tracking-tight text-transparent"
						style={{
							WebkitTextStroke: '2px rgba(0,0,0,0.5)',
						}}
					>
						GALLERY
					</h2>
					<p className="mt-4 text-base text-muted-foreground">
						Explore our collection of stunning visual stories
					</p>
				</div>
			</div>
			<ZoomParallax images={images} />
			<div className="h-[50vh]" />
		</section>
	);
}
