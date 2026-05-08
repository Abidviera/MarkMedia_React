'use client';
import { cn } from '@/lib/utils';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
	{
		src: '/markphotos/4.webp',
		alt: 'Wedding photography',
	},
	{
		src: '/markphotos/2.webp',
		alt: 'Portrait session',
	},
	{
		src: '/markphotos/10.webp',
		alt: 'Event coverage',
	},
	{
		src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
		alt: 'Advertising campaign',
	},
		{
		src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80',
		alt: 'Product showcase',
	},
	{
		src: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&q=80',
		alt: 'Fashion photography',
	},

	{
		src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
		alt: 'Creative visuals',
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
						'bg-[radial-gradient(ellipse_at_center,rgba(var(--color-foreground-rgb,128,128,128),0.1),transparent_50%)]',
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
