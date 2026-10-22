import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Star, Smartphone, Apple } from 'lucide-react'
import { MenuExtras } from './MenuExtras'
import { MenuDeals } from './MenuDeals'

/* ---------- IMAGES: put your files in public/images with these names ---------- */
const IMAGES = {
  heroBg: '/assets/bg.png', // faint food sketches on the dark background (optional)
  about1: '/assets/m2.png', // oval 1: woman at the counter
  about2: '/assets/m3.png', // oval 2: phone with food app
}

const RED = '#f5214f'
const YELLOW = '#ffd400'
const heading = { fontFamily: "'Fredoka', sans-serif" }
const CONTAINER = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

/* hides the image if the file isn't added yet */
const Img = ({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    onError={(e) => {
      e.currentTarget.style.display = 'none'
    }}
  />
)

const SectionTitle = ({ children }: { children: string }) => (
  <div className="text-center">
    <h3
      style={heading}
      className="relative inline-block pb-3 text-3xl sm:text-4xl lg:text-[40px] font-semibold text-black"
    >
      {children}
      <span
        style={{ backgroundColor: YELLOW }}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 sm:w-32 h-[5px] rounded-full"
      />
    </h3>
  </div>
)

/* ===================== 1. HERO SLIDER ===================== */
const slides = [
  {
    tag: 'Fastest Delivery & Easy Pickup',
    title: 'Kings Burger',
    text: 'Good food starts with good ingridients. We only bring you the best.',
    rating: '4.8',
    img: '/assets/m1.png', // burger (transparent PNG works best)
  },
  {
    tag: 'Fresh From The Oven',
    title: 'Cheesy Pizza',
    text: 'Hand stretched dough, rich tomato sauce and loads of melting cheese.',
    rating: '4.9',
    img: '/assets/m1.png',
  },
  {
    tag: 'Smoky & Juicy',
    title: 'Grill Special',
    text: 'Slow grilled over open flames and served hot with our house sauces.',
    rating: '4.7',
    img: '/assets/m1.png',
  },
]

const Hero = () => {
  const [active, setActive] = useState(0)

  // auto-slide every 6 seconds (restarts when you click an arrow or dot)
  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % slides.length), 6000)
    return () => clearTimeout(t)
  }, [active])

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length)
  const next = () => setActive((a) => (a + 1) % slides.length)

  const s = slides[active]

  const arrowCls =
    'w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-black active:scale-90 transition'

  return (
    <section className="relative bg-[#1a1a1f] overflow-hidden">
      {/* faint sketches */}
      <Img src={IMAGES.heroBg} className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />

      <div
        className={`${CONTAINER} relative z-10 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center pt-14 pb-28 sm:pt-16 sm:pb-32 lg:pt-0 lg:pb-0 lg:min-h-[560px]`}
      >
        {/* ---------- Left text ---------- */}
        <div key={active} className="animate-[fadeIn_0.6s_ease]">
          <p style={{ ...heading, color: RED }} className="text-xs sm:text-sm font-semibold">
            {s.tag}
          </p>
          <h1
            style={{ ...heading, color: YELLOW }}
            className="mt-2 text-5xl sm:text-6xl lg:text-[60px] font-semibold leading-[1.1]"
          >
            {s.title}
          </h1>
          <p className="mt-4 max-w-xs text-xs sm:text-sm leading-relaxed text-white">{s.text}</p>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <a
              href="#"
              style={{ backgroundColor: RED, ['--tw-ring-color' as string]: RED }}
              className="rounded-md px-6 py-3 text-xs sm:text-[13px] font-bold text-white ring-2 ring-offset-[3px] ring-offset-[#1a1a1f] hover:brightness-110 transition"
            >
              View Our Menu
            </a>

            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill={YELLOW} stroke={YELLOW} />
                ))}
              </div>
              <span className="text-xs font-bold text-white">{s.rating}</span>
            </div>
          </div>
        </div>

        {/* ---------- Right: red block + food + discount badge ---------- */}
        <div className="relative h-[280px] sm:h-[360px] lg:h-[460px]">
          {/* red block – runs off the right edge of the screen */}
          <div
            style={{ backgroundColor: RED }}
            className="absolute left-[8%] -right-[50vw] top-[16%] h-[62%]"
          />

          {/* food image */}
          <Img
            key={s.img}
            src={s.img}
            alt={s.title}
            className="absolute left-1/2 top-0 h-[92%] w-auto max-w-[95%] -translate-x-[45%] object-contain drop-shadow-2xl"
          />

          {/* discount badge */}
          <div
            style={{ backgroundColor: YELLOW }}
            className="absolute left-[2%] sm:left-[6%] top-[52%] flex h-20 w-20 sm:h-24 sm:w-24 flex-col items-center justify-center rounded-full text-black ring-2 ring-black ring-offset-2 ring-offset-white"
          >
            <span className="text-[8px] sm:text-[9px] font-bold">UPTO</span>
            <span style={heading} className="text-2xl sm:text-3xl font-semibold leading-none">
              20%
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold">DISCOUNT</span>
          </div>
        </div>
      </div>

      {/* ---------- Arrows + dots ---------- */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-8 z-20">
        <div className={`${CONTAINER} flex items-center justify-between`}>
          <button onClick={prev} aria-label="Previous slide" className={arrowCls}>
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                style={i === active ? { backgroundColor: RED } : undefined}
                className={`h-2.5 w-2.5 rounded-full transition ${i === active ? '' : 'bg-white'}`}
              />
            ))}
          </div>

          <button onClick={next} aria-label="Next slide" className={arrowCls}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* fade animation for the slide text */}
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  )
}

/* ===================== 2. ABOUT THE FOOD RESTAURANT ===================== */
const features = [
  { title: 'Online Food Ordering', text: 'Easy Food delivery from the best restaurants.', Icon: Smartphone },
  { title: '100% Healthy Food', text: 'Eating a wide variety of nutritious Healthy foods', Icon: Apple },
]

const AboutRestaurant = () => (
  <section className="bg-white py-14 sm:py-16 lg:py-20">
    <div className={CONTAINER}>
      <div className="text-center">
        <p style={{ color: RED }} className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">
          About the Food Restaurant
        </p>
        <h2
          style={heading}
          className="mx-auto mt-2 max-w-lg text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-[1.2] text-black"
        >
          Perfect Place For An Exceptional Experience
        </h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* two ovals */}
        <div className="mx-auto flex w-full max-w-md gap-3 sm:gap-4">
          <div className="aspect-[108/158] flex-1 overflow-hidden rounded-full bg-neutral-300 shadow-md">
            <Img src={IMAGES.about1} alt="Restaurant staff" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-[108/158] flex-1 overflow-hidden rounded-full bg-neutral-800 shadow-md">
            <Img src={IMAGES.about2} alt="Food ordering app" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* text */}
        <div>
          <p className="max-w-md text-[11px] sm:text-xs leading-relaxed text-gray-500">
            Nisl quam nestibulum ac quam nec odio elementu aucan ligula. Orci varius natoque pena tibus et maurient monte
            nascete ridiculus mus nellentesque ha um ac quam nec odio abulum ac quam nec odio airbine.
          </p>

          <ul className="mt-6 space-y-5">
            {features.map(({ title, text, Icon }) => (
              <li key={title} className="flex items-center gap-4">
                <span
                  style={{ borderColor: YELLOW }}
                  className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full border-2 bg-white"
                >
                  <Icon size={24} strokeWidth={1.8} style={{ color: RED }} />
                </span>
                <div>
                  <h4 style={heading} className="text-sm sm:text-base font-semibold text-black">
                    {title}
                  </h4>
                  <p className="mt-1 max-w-[190px] text-[10px] sm:text-[11px] leading-snug text-gray-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
)

/* ===================== 3. CHOOSE A CATEGORY ===================== */
const categories = [
  { name: 'Organic Food', dishes: 12 },
  { name: 'Zinger Burgers', dishes: 94 },
  { name: 'Grill Food', dishes: 12 },
  { name: 'Bar B Q', dishes: 12 },
  { name: 'Pizza Slices', dishes: 18 },
  { name: 'Fresh Salads', dishes: 9 },
  { name: 'Crispy Chicken', dishes: 15 },
  { name: 'Pasta Dishes', dishes: 11 },
  { name: 'Desserts', dishes: 14 },
  { name: 'Coffee & Tea', dishes: 8 },
  { name: 'Milkshakes', dishes: 10 },
  { name: 'Breakfast', dishes: 13 },
].map((c, i) => ({ ...c, img: `/assets/m${6 + (i % 4)}.png` }))

/* photos visible at once: 4 on desktop, 2 on tablet, 1 on phone */
const getVisible = () => {
  if (typeof window === 'undefined') return 4
  if (window.innerWidth >= 1024) return 4
  if (window.innerWidth >= 640) return 2
  return 1
}

const Categories = () => {
  const [visible, setVisible] = useState(getVisible)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const onResize = () => setVisible(getVisible())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const pages = Math.ceil(categories.length / visible)
  const current = Math.min(page, pages - 1)
  // never slide past the last item, so there are no empty gaps
  const offset = Math.min(current * visible, categories.length - visible)

  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className={CONTAINER}>
        <SectionTitle>Choose a Category</SectionTitle>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden">
          <div
            className="-mx-2 flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${offset * (100 / visible)}%)` }}
          >
            {categories.map((c) => (
              <a
                key={c.name}
                href="#"
                className="group shrink-0 px-2 text-center"
                style={{ width: `${100 / visible}%` }}
              >
                {/* oval photo with dark outer ring and white inner ring */}
                <div className="rounded-full bg-neutral-900 p-[5px]">
                  <div className="aspect-[98/58] overflow-hidden rounded-full border-2 border-white bg-neutral-700">
                    <Img
                      src={c.img}
                      alt={c.name}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <h4 style={heading} className="mt-3 text-sm sm:text-base font-semibold text-black">
                  {c.name}
                </h4>
                <p style={{ color: RED }} className="mt-0.5 text-[9px] sm:text-[10px] font-bold">
                  {c.dishes} Dishes in the Menu
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Show page ${i + 1}`}
              style={i === current ? { backgroundColor: RED } : undefined}
              className={`h-2.5 w-2.5 rounded-full transition ${i === current ? '' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== PAGE ===================== */
const MenuPage = () => (
  <main style={{ fontFamily: "'League Spartan', sans-serif" }} className="bg-white">
    {/* Loads the fonts – no other setup needed */}
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=League+Spartan:wght@400;500;600;700&display=swap');`}</style>

    <Hero />
    <AboutRestaurant />
    <Categories />
    <MenuExtras />
    <MenuDeals />
  </main>
)

export default MenuPage