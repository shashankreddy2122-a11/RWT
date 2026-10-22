import { useState } from 'react'
import { ShoppingBag, Send, ArrowRight } from 'lucide-react'
import { AboutMenuGallery } from './AboutMenuGallery'

/* ---------- IMAGES: put your files in public/images with these names ---------- */
const IMAGES = {
  heroBg: '/assets/a1.png', // dark background with vegetables (right side)
  pizzaCard: '/assets/a2.png', // card 1
  fryCard: '/assets/a3.png', // card 2
  chickenCard: '/assets/a4.png', // card 3
  aboutMain: '/assets/a5.png', // big cheesy pizza photo
  founder: '/assets/a6.png', // small round photo
  leaf: '/assets/a7.png', // green leaf decoration
  burger: '/assets/a8.png', // outlined burger sketch
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

/* ===================== 1. HERO ===================== */
const BRUSH =
  'polygon(0% 22%, 4% 8%, 18% 14%, 40% 4%, 66% 12%, 88% 3%, 100% 18%, 97% 45%, 100% 70%, 94% 96%, 70% 88%, 44% 100%, 20% 90%, 6% 98%, 2% 70%, 0% 48%)'

const Hero = () => {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // connect your newsletter service here
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 4000)
  }

  return (
    <section className="relative z-10 bg-[#0d0d0d] overflow-hidden shadow-[0_28px_45px_-12px_rgba(0,0,0,0.18)]">
      {/* background photo (right side on desktop) */}
      <div className="absolute inset-0 lg:left-[35%]">
        <Img src={IMAGES.heroBg} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55 lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
      </div>

      <div
        className={`${CONTAINER} relative z-10 grid lg:grid-cols-2 gap-10 items-center py-16 sm:py-20 lg:py-0 lg:min-h-[560px]`}
      >
        {/* ---------- Left text ---------- */}
        <div>
          <p style={roboto} className="text-[11px] sm:text-xs text-white">
            Starting at{' '}
            <span className="font-bold" style={{ color: YELLOW }}>
              $24.80
            </span>
          </p>

          <h1
            style={roboto}
            className="mt-2 max-w-md text-4xl sm:text-5xl lg:text-[46px] font-bold leading-[1.15] text-white"
          >
            The best Food Collection 2024
          </h1>

          <p style={roboto} className="mt-3 text-xs sm:text-sm text-white">
            Exclusive offer{' '}
            <span className="relative inline-block font-bold" style={{ color: YELLOW }}>
              -35%
              <svg
                viewBox="0 0 60 8"
                className="absolute left-0 -bottom-2 w-full h-2"
                fill="none"
                stroke={YELLOW}
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 6 C18 1, 40 1, 58 5" />
              </svg>
            </span>{' '}
            off this week.
          </p>

          <a
            href="#"
            style={{ ...roboto, backgroundColor: RED }}
            className="mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-xs sm:text-sm font-medium text-white hover:brightness-110 transition"
          >
            <ShoppingBag size={14} />
            Order Now
          </a>

          {/* email pill */}
          <form onSubmit={onSubmit} className="mt-6 flex w-full max-w-sm items-center rounded-full bg-white p-1 pl-4">
            <Send size={13} className="shrink-0 text-gray-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Your email address"
              className="min-w-0 flex-1 bg-transparent px-3 text-xs text-black outline-none placeholder:text-gray-500"
            />
            <button
              type="submit"
              style={{ ...roboto, backgroundColor: RED }}
              className="rounded-full px-5 sm:px-6 py-2.5 text-xs font-medium text-white hover:brightness-110 transition"
            >
              Subscribe
            </button>
          </form>
          {done && (
            <p style={roboto} className="mt-3 text-sm font-medium" style-color="" >
              <span style={{ color: YELLOW }}>Thanks for subscribing!</span>
            </p>
          )}
        </div>

        {/* ---------- Right: brush stroke + discount badge ---------- */}
        <div className="relative h-36 sm:h-48 lg:h-[420px]">
          <div
            style={{ backgroundColor: RED, clipPath: BRUSH }}
            className="absolute left-0 right-0 top-1/2 lg:top-[44%] h-16 sm:h-20 lg:h-[88px] -translate-y-1/2 -rotate-3"
          />
          <div
            style={{ backgroundColor: YELLOW }}
            className="absolute left-1/2 lg:left-[42%] top-1/2 lg:top-[44%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-2 ring-black ring-offset-2 ring-offset-white flex flex-col items-center justify-center text-black"
          >
            <span style={roboto} className="text-[9px] font-bold">
              UPTO
            </span>
            <span style={oswald} className="text-3xl sm:text-4xl font-bold leading-none">
              20%
            </span>
            <span style={roboto} className="text-[9px] font-bold">
              DISCOUNT
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== 2. THREE CATEGORY CARDS ===================== */
const CardShell = ({ className = '', children, bgImage }: { className?: string; children: React.ReactNode; bgImage?: string }) => (
  <article
    className={`group relative overflow-hidden rounded-lg min-h-[190px] sm:min-h-[205px] shadow-lg hover:-translate-y-1 transition-transform duration-300 ${className}`}
  >
    {bgImage && (
      <>
        <Img
          src={bgImage}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40" />
      </>
    )}
    {children}
  </article>
)

const Categories = () => (
  <section className="bg-white pt-14 sm:pt-16 lg:pt-20">
    <div className={`${CONTAINER} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
      {/* Card 1 – pizza */}
      <CardShell bgImage={IMAGES.pizzaCard}>
        <div
          style={{ ...oswald, backgroundColor: YELLOW }}
          className="absolute right-3 top-3 z-10 flex h-14 w-14 -rotate-12 flex-col items-center justify-center rounded-full text-black ring-1 ring-black ring-offset-2 ring-offset-transparent"
        >
          <span className="text-[7px] font-bold leading-none">UP TO</span>
          <span className="text-lg font-bold leading-none">50%</span>
          <span className="text-[7px] font-bold leading-none">OFF</span>
        </div>
        <div className="relative z-10 p-5 max-w-[60%]">
          <p style={roboto} className="text-[10px] font-bold" >
            <span style={{ color: YELLOW }}>Crispy, Every Bite Taste</span>
          </p>
          <h3 style={oswald} className="mt-2 text-2xl sm:text-[26px] font-bold leading-[1.1] text-white">
            Delicious &amp; Hot Pizza
          </h3>
          <a href="#" style={roboto} className="mt-3 inline-flex items-center gap-1 text-[10px] text-white hover:underline">
            Order Now <ArrowRight size={11} />
          </a>
        </div>
      </CardShell>

      {/* Card 2 – french fry */}
      <CardShell bgImage={IMAGES.fryCard}>
        <div className="relative z-10 p-5 max-w-[62%]">
          <p style={roboto} className="text-[10px] font-bold text-white">
            Todays{' '}
            <span style={{ ...oswald, color: YELLOW }} className="text-xs">
              Delicious
            </span>
          </p>
          <h3 style={oswald} className="mt-2 text-3xl sm:text-[32px] font-bold leading-[1.1] text-white">
            French Fry
          </h3>
          <p style={roboto} className="mt-2 text-[10px] font-medium text-white">
            This Weekend Only
          </p>
          <a
            href="#"
            style={{ ...roboto, backgroundColor: YELLOW }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[10px] font-bold text-black hover:brightness-95 transition"
          >
            <ShoppingBag size={12} />
            Order Now
          </a>
        </div>
      </CardShell>

      {/* Card 3 – chicken */}
      <CardShell bgImage={IMAGES.chickenCard} className="sm:col-span-2 lg:col-span-1">
        <div className="relative z-10 p-5 max-w-[58%]">
          <p style={roboto} className="text-[10px] font-bold">
            <span style={{ color: YELLOW }}>Crispy, Every Bite Taste</span>
          </p>
          <h3 style={oswald} className="mt-2 text-2xl sm:text-[26px] font-bold leading-[1.1] text-white">
            Chiken &amp; French Fry
          </h3>
          <a href="#" style={roboto} className="mt-3 inline-flex items-center gap-1 text-[10px] text-white hover:underline">
            Order Now <ArrowRight size={11} />
          </a>
        </div>
      </CardShell>
    </div>
  </section>
)

/* ===================== 3. ABOUT US ===================== */
const stats = [
  { label: 'Satisfied Clients', value: '250+' },
  { label: 'Total Food Categories', value: '153+' },
  { label: 'Award Winning', value: '25+' },
]

const Signature = () => (
  <svg
    viewBox="0 0 100 30"
    className="w-24 h-8 text-black"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M3 22 C10 4, 18 28, 28 10 S44 20, 52 8 M24 24 C48 18, 78 26, 97 16" />
  </svg>
)

const About = () => (
  <section className="relative mt-16 sm:mt-20 lg:mt-24 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
    {/* decorations */}
    <Img
      src={IMAGES.leaf}
      className="hidden sm:block absolute left-0 top-0 z-10 w-16 lg:w-20 h-auto pointer-events-none select-none"
    />
    <Img
      src={IMAGES.burger}
      className="hidden md:block absolute right-6 top-0 w-14 lg:w-20 h-auto opacity-70 pointer-events-none select-none"
    />

    <div className="grid lg:grid-cols-[45%_55%] items-stretch lg:mt-10">
      {/* ---------- Image (runs to the left edge of the screen) ---------- */}
      <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[460px] bg-[#0d0d0d] overflow-hidden">
        <span
          aria-hidden="true"
          style={oswald}
          className="absolute left-0 top-2 select-none whitespace-nowrap text-[90px] sm:text-[130px] lg:text-[160px] font-bold leading-none text-white/[0.07]"
        >
          FAST FOOD
        </span>
        <Img src={IMAGES.aboutMain} alt="Fresh cheesy pizza" className="absolute inset-0 w-full h-full object-cover" />

        <div
          style={{ backgroundColor: YELLOW }}
          className="absolute bottom-0 right-0 w-[52%] sm:w-[44%] px-5 sm:px-7 py-6 sm:py-9"
        >
          <p style={oswald} className="text-lg sm:text-2xl font-bold leading-snug text-black">
            We Cook Sandwiches For You
          </p>
        </div>
      </div>

      {/* ---------- Text ---------- */}
      <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-16">
        <p style={{ ...roboto, color: GREEN }} className="text-[11px] sm:text-xs font-bold">
          About Our Food
        </p>

        <h2
          style={oswald}
          className="mt-3 max-w-md text-3xl sm:text-4xl lg:text-[40px] font-bold leading-[1.2] text-black"
        >
          The Best Delicious Food Made From Us...
        </h2>

        <p style={roboto} className="mt-4 max-w-xl text-xs sm:text-[13px] leading-relaxed text-gray-600">
          At TasteNest we believe great fast food starts with great ingredients. Every burger, pizza and plate of fries
          is made fresh to order from locally sourced produce, cooked with care and served with a smile. From our family
          kitchen to your table, we have been bringing people together over food they love since 2019.
        </p>

        {/* stats */}
        <div className="mt-8 grid grid-cols-1 min-[480px]:grid-cols-3 gap-y-6 max-w-xl">
          {stats.map((s) => (
            <div
              key={s.label}
              className="min-[480px]:border-l min-[480px]:border-gray-200 min-[480px]:first:border-l-0 min-[480px]:pl-5 min-[480px]:first:pl-0"
            >
              <p style={roboto} className="text-[11px] font-bold text-black">
                {s.label}
              </p>
              <p style={{ ...oswald, color: YELLOW }} className="mt-1 text-4xl font-bold leading-none">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* founder + foundation bar */}
        <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-neutral-800">
            <Img src={IMAGES.founder} alt="Founder" className="h-full w-full object-cover" />
          </div>
          <Signature />
          <p
            style={roboto}
            className="rounded-full bg-black px-5 py-2.5 text-[11px] sm:text-xs font-bold text-white"
          >
            Foundation, Since <span style={{ color: YELLOW }}>21st</span> Oct , 2019
          </p>
        </div>
      </div>
    </div>
  </section>
)

/* ===================== PAGE ===================== */
const AboutPage = () => (
  <main style={roboto} className="bg-white">
    {/* Loads the fonts – no other setup needed */}
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap');`}</style>

    <Hero />
    <Categories />
    <About />
    <AboutMenuGallery />
  </main>
)

export default AboutPage