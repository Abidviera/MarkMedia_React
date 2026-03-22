# LENS Studio - 3D Photography & Videography Website

## Concept & Vision

A cutting-edge, award-winning 3D photography and videography studio website that immerses visitors in a cinematic digital experience. The site feels like stepping into a professional film set — dramatic lighting, purposeful motion, and a sense of premium craftsmanship. Every scroll reveals a new visual dimension, blending real photography portfolios with an abstract 3D environment that speaks to the studio's technical mastery.

## Design Language

### Aesthetic Direction
Dark, cinematic, and bold — inspired by high-end camera brand aesthetics (RED Digital Cinema, ARRI) crossed with luxury fashion editorials. The site feels like a premium photography portfolio meets a tech showcase.

### Color Palette
- **Primary Accent (Red):** `#E8102A` — dramatic, energetic, attention-commanding
- **Red Hover/Deep:** `#C0001F` — darker red for interactions
- **Red Glow:** `rgba(232,16,42,0.15)` — subtle ambient lighting
- **Background Black:** `#080808` — deep void, cinematic darkness
- **Off-White:** `#F5F5F3` — warm paper, editorial feel
- **Gray Light:** `#EBEBEB` — subtle borders, secondary text
- **Gray Mid:** `#999999` — body text, secondary info
- **Pure White:** `#FFFFFF` — primary text on dark

### Typography
- **Display/Hero:** "Bebas Neue" — massive, commanding, all-caps energy
- **Subheadings:** "Cormorant Garamond" italic — editorial luxury, sophistication
- **Body:** "DM Sans" — clean, modern readability
- **Labels/Eyebrow:** "Space Mono" — technical, precise, monospace edge

### Font Scale
- Hero text: `clamp(80px, 15vw, 220px)`
- Section titles: `clamp(48px, 8vw, 120px)`
- Subtext: `clamp(14px, 1.5vw, 18px)`

### Spatial System
- Base unit: 8px
- Section padding: 120px vertical (desktop), 60px (mobile)
- Max content width: 1400px
- Grid: 12-column with 24px gutters

### Motion Philosophy
- **Cinematic reveals:** Slow, deliberate animations (600-1200ms)
- **Scroll-driven:** Every section responds to scroll position
- **Parallax depth:** Multiple layers moving at different speeds
- **3D presence:** Floating elements, rotations, perspective shifts
- **Micro-interactions:** Immediate feedback (50-150ms) on hover/click

### Visual Assets
- **Icons:** Custom SVG line icons with 1.5px stroke
- **Images:** High-contrast photography samples (Unsplash/Pexels)
- **3D Elements:** Abstract camera geometry, floating spheres, particle fields
- **Decorative:** Red accent lines, glow effects, grain textures

## Layout & Structure

### Page Flow
1. **Preloader** — Dramatic black screen with red loading bar, letter-by-letter reveal
2. **Hero** — Full viewport with 3D camera scene, massive typography
3. **Marquee** — Red band of services scrolling infinitely
4. **About** — Editorial split layout with floating 3D element
5. **Services** — 360° interactive sphere + card grid
6. **Portfolio** — Horizontal scroll gallery
7. **Video Reel** — Full-bleed cinematic video with lightbox
8. **Stats** — 3D floating numbers
9. **Process** — Timeline steps
10. **Testimonials** — Rotating carousel
11. **Contact** — Split booking form
12. **Footer** — Giant branding + links

### Responsive Strategy
- Desktop-first with fluid scaling
- Mobile: Stack layouts, reduce 3D complexity, hamburger nav
- Tablet: Hybrid layouts, maintain 3D scenes

## Features & Interactions

### Custom Cursor
- Outer ring (40px white border) follows with 0.1 lerp lag
- Inner red dot (8px) follows exactly
- Hover: outer ring scales to 70px, turns red
- Drag on 3D: shows "DRAG" text
- Mix-blend-mode: difference for contrast

### Preloader
- Black fullscreen with centered loading bar
- Red bar animates 0→100% width
- "LENS STUDIO" letters stagger in (0.1s each)
- Full screen slides up revealing site

### Navigation
- Fixed position, transparent initially
- On scroll: frosted glass effect (backdrop-filter: blur)
- Logo: "LENS" with red circle replacing "O"
- Links: underline grows from center on hover
- CTA: outlined red button, fills on hover
- Mobile: hamburger → X animation

### Hero Section
- 3D scene: floating camera geometry, particle field, orbiting light
- Typography: SplitText char-by-char reveal
- Scroll indicator: animated mouse icon
- Camera rotates continuously, dolly zooms on scroll

### Services Sphere
- Interactive 360° orbit controls
- Auto-rotation when idle
- HTML labels orbit with sphere
- Red inner glow

### Horizontal Scroll
- GSAP pin section
- 6 images scroll horizontally
- Parallax: odd/even at different speeds
- Hover reveals overlay with title

### Video Lightbox
- Click "PLAY REEL" opens modal
- YouTube/Vimeo embed
- Click outside or X closes
- Body scroll lock when open

### Contact Form
- Fields: Name, Email, Phone, Service (select), Date, Message
- Red underline focus animation
- Validation states
- Submit button magnetic effect

## Component Inventory

### Preloader
- States: loading (0-100%), complete (reveal)
- Animation: bar fill, letter stagger, slide up

### Navbar
- States: transparent, scrolled (frosted), mobile-open
- Logo hover: slight glow
- Link hover: underline scale
- Button hover: fill transition

### HeroScene (3D)
- Camera geometry with metal material
- Orbiting red point light
- 3000 particle stars
- Sparkles effect
- Continuous Y rotation
- Scroll-based dolly

### GalleryScroll (3D)
- ScrollControls with 8 pages
- Floating image planes
- MeshDistortMaterial
- Spring fade-in
- Red glowing frames

### ServicesSphere (3D)
- Reflective sphere
- OrbitControls
- HTML labels
- Auto-rotate
- Inner glow

### StatsNumbers (3D)
- Text3D numbers
- Float component
- Red emissive
- Counter animation

### Marquee
- Infinite horizontal scroll
- Two rows (opposite directions)
- Red background
- White Bebas Neue text

### VideoSection
- Full-bleed video
- Parallax effect
- Play button overlay
- Lightbox modal

### Testimonials
- Framer Motion carousel
- Auto-advance (5s)
- Manual dots
- Client photos with red border

### ContactForm
- Input fields with labels
- Red underline focus
- Select dropdown
- Submit button

### Footer
- Giant "LENS STUDIO" text
- Grid links
- Social icons
- Text scramble on hover

## Technical Approach

### Framework
- React 18 with TypeScript
- Vite build tool
- Tailwind CSS for layout scaffolding

### 3D Engine
- Three.js via React Three Fiber
- @react-three/drei for all helpers
- @react-spring/three for physics animations
- Demand-based rendering for performance

### Animation
- GSAP + ScrollTrigger for scroll-driven
- Framer Motion for UI transitions
- Lenis for smooth scrolling (synced with GSAP)
- CSS animations for continuous effects

### State Management
- React useState/useRef for local state
- No external state library needed

### Performance
- React.Suspense + Loader for 3D
- Lazy load below-fold sections
- frameloop="demand" on non-hero canvases
- will-change on animated elements
- IntersectionObserver for canvas pause
