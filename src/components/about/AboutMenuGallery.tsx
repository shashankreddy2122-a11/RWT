import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Utensils, Award } from 'lucide-react'

/* ---------- IMAGES: put your files in public/images with these names ---------- */
const IMAGES = {
  gallery1: '/assets/a7.png', // two burgers on a board
  gallery2: '/assets/a5.png', // cheesy pizza slice
  gallery3: '/assets/a8.png', // burger with fries
  gallery4: '/assets/a7.png', // extra slides (optional)
  gallery5: '/assets/a5.png',
  gallery6: '/assets/a8.png',
  quality: '/assets/a9.png', // big photo on the right
}

const RED = '#f5214f'
const YELLOW = '#ffc107'
const GREEN = '#1fa34a'
const oswald = { fontFamily: "'Oswald', sans-serif" }
const roboto = { fontFamily: "'Roboto', sans-serif" }
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

/* ===================== 1. TRENDING FOOD MENU ===================== */
const menuItems = [
  { name: 'CHICAGO DEEP PIZZA', price: 22 },
  { name: 'CHINESE PASTA', price: 34 },
  { name: 'Chicago Burger King.', price: 29 },
  { name: 'Chicago Chicken Wings.', price: 39 },
  { name: 'Chicago French Fries.', price: 29 },
  { name: 'Chicago Deep Pasta.', price: 34 },
  { name: 'Chicago Beef Jerky.', price: 39 },
  { name: 'Chicago Salad Resipes.', price: 29 },
]

const DESC = 'Its the perfect dining experience where Experience quick and efficient'

const TrendingMenu = () => (
  <section className="bg-white pt-4 pb-14 sm:pb-16 lg:pb-20">
    <div className={CONTAINER}>
      <div className="text-center">
        <p style={{ ...roboto, color: GREEN }} className="text-[11px] sm:text-xs font-bold">
          About Our Food
        </p>
        <h2 style={oswald} className="mt-1 text-3xl sm:text-4xl lg:text-[42px] font-bold text-black">
          Trending Food Menu
        </h2>
      </div>

      {/* dashed card */}
      <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-dashed border-gray-300 p-4 sm:p-6 lg:px-8 lg:py-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
          {menuItems.map((item) => (
            <li key={item.name} className="flex items-start justify-between gap-4 border-b border-dashed border-gray-300 py-4">
              <div className="min-w-0">
                <h4 style={oswald} className="text-[13px] sm:text-sm font-bold uppercase-none text-black">
                  {item.name}
                </h4>
                <p style={roboto} className="mt-1 text-[10px] sm:text-[11px] leading-snug text-gray-600">
                  {DESC}
                </p>
              </div>
              <p style={oswald} className="shrink-0 text-sm sm:text-base font-semibold" >
                <span style={{ color: YELLOW }}>${item.price.toFixed(2)}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

/* ===================== 2. IMAGE SLIDER ===================== */
const slides = [
  { src: IMAGES.gallery1, alt: 'Burgers on a wooden board' },
  { src: IMAGES.gallery2, alt: 'Cheesy pizza slice' },
  { src: IMAGES.gallery3, alt: 'Burger with fries' },
  { src: IMAGES.gallery4, alt: 'Fast food' },
  { src: IMAGES.gallery5, alt: 'Fast food' },
  { src: IMAGES.gallery6, alt: 'Fast food' },
]

/* how many photos are visible: 3 on desktop, 2 on tablet, 1 on phone */
const getVisible = () => {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 640) return 2
  return 1
}

const Gallery = () => {
  const [visible, setVisible] = useState(getVisible)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const onResize = () => setVisible(getVisible())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const maxIndex = Math.max(0, slides.length - visible)
  const current = Math.min(index, maxIndex)

  const prev = () => setIndex(current <= 0 ? maxIndex : current - 1)
  const next = () => setIndex(current >= maxIndex ? 0 : current + 1)

  const arrowCls =
    'shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-700 hover:text-[#f5214f] active:scale-90 transition'

  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className={`${CONTAINER} flex items-center justify-center gap-2 sm:gap-6 lg:gap-12`}>
        <button onClick={prev} aria-label="Previous photos" className={arrowCls}>
          <ArrowLeft size={26} strokeWidth={2.6} />
        </button>

        <div className="min-w-0 flex-1 max-w-4xl overflow-hidden">
          <div
            className="-mx-[5px] flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * (100 / visible)}%)` }}
          >
            {slides.map((s, i) => (
              <div key={i} className="shrink-0 px-[5px]" style={{ width: `${100 / visible}%` }}>
                <div className="aspect-[13/17] w-full overflow-hidden bg-neutral-900">
                  <Img src={s.src} alt={s.alt} className="h-full w-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={next} aria-label="Next photos" className={arrowCls}>
          <ArrowRight size={26} strokeWidth={2.6} />
        </button>
      </div>
    </section>
  )
}

/* ===================== 3. WHERE QUALITY MEET EXCELLENT SERVICE ===================== */
const features = [
  { title: 'Super Quality Food', Icon: Utensils },
  { title: 'Well Reputation', Icon: Award },
]

const Quality = () => (
  <section className="relative bg-white pb-16 sm:pb-20 lg:pb-28">
    <div className="relative">
      {/* ---------- Text ---------- */}
      <div className={`${CONTAINER} flex items-center lg:min-h-[460px]`}>
        <div className="w-full lg:w-[46%] lg:pr-6">
          <p style={{ ...roboto, color: RED }} className="text-[11px] sm:text-xs font-bold">
            About Our Food
          </p>

          <h2
            style={oswald}
            className="mt-2 max-w-md text-3xl sm:text-4xl lg:text-[40px] font-bold leading-[1.2] text-black"
          >
            Where Quality Meet Excellent <span style={{ color: RED }}>Service.</span>
          </h2>

          <p style={roboto} className="mt-4 max-w-md text-[11px] sm:text-xs leading-relaxed text-gray-600">
            Its the perfect dining experience where every dish is crafted with fresh, high-quality Experience quick and
            efficient where every dish is crafted with fresh, high-quality ingredients.
          </p>

          {/* two features */}
          <div className="mt-6 grid max-w-md grid-cols-1 min-[420px]:grid-cols-2 gap-5">
            {features.map(({ title, Icon }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon size={30} strokeWidth={1.4} style={{ color: YELLOW }} className="shrink-0" />
                <div>
                  <h4 style={oswald} className="text-[13px] font-bold text-black">
                    {title}
                  </h4>
                  <p style={roboto} className="mt-1 text-[10px] sm:text-[11px] leading-snug text-gray-600">
                    A team of dreamers and doers building unique interactive music and art
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* button + small text */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href="#"
              style={{ ...roboto, backgroundColor: RED }}
              className="rounded-md px-6 py-3 text-xs font-medium text-white hover:brightness-110 transition"
            >
              More About Us
            </a>
            <div style={roboto}>
              <p className="text-[9px] font-bold uppercase" >
                <span style={{ color: YELLOW }}>Oxford Garden</span>
              </p>
              <p className="mt-0.5 text-[9px] sm:text-[10px] font-bold uppercase text-black">
                Customer&apos;s experience is our highest priority.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Photo (runs to the right edge of the screen on desktop) ---------- */}
      <div className="relative mx-4 mt-10 h-72 overflow-hidden rounded-3xl bg-neutral-900 sm:mx-6 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:h-auto lg:w-[48%] lg:rounded-l-3xl lg:rounded-r-none">
        <Img src={IMAGES.quality} alt="Burgers and fries" className="absolute inset-0 h-full w-full object-cover" />

        <div
          style={{ ...oswald, backgroundColor: GREEN }}
          className="absolute bottom-[14%] right-[8%] -rotate-[28deg] rounded-md px-4 py-2 text-base sm:text-xl font-bold text-white shadow-lg"
        >
          Since /1985
        </div>
      </div>
    </div>
  </section>
)

/* ===================== Everything under the About section ===================== */
export const AboutMenuGallery = () => (
  <>
    <TrendingMenu />
    <Gallery />
    <Quality />
  </>
)