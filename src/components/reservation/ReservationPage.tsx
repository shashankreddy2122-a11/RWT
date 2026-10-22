import { useState } from 'react'
import { Check, Bike } from 'lucide-react'
import { ServicesMenus } from './SectionMenus'

const IMAGES = {
  // hero (two pill photos)
  hero1: '/assets/r2.png',
  hero2: '/assets/r3.png',
  // welcome section
  welcome1: '/assets/r4.png', // tall pill: hand salting a steak
  welcome2: '/assets/r5.png', // woman opening the door
  badge: '/assets/r6.png', // small round photo inside the circular text badge
  // good food section
  plate: '/assets/r7.png', // round plate of steak & salad
  // sketch / decoration images (same sketches as the footer)
}

const RED = '#f5214f'
const YELLOW = '#ffd400'
const GREEN = '#4caf50'
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

const Leaf = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill={GREEN} aria-hidden="true">
    <path d="M21 3C11 3 4 9 4 17c0 1.2.2 2.3.6 3.3.4-5 3.4-9.3 8.4-11.6-3.6 3-5.9 6.8-6.4 11.6C16 20.6 21 13 21 3z" />
  </svg>
)

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

/* ---------- Reserve button (red, with the offset ring from the design) ---------- */
const ReserveButton = ({
  type = 'button',
  onClick,
  children,
  ringOffset,
}: {
  type?: 'button' | 'submit'
  onClick?: () => void
  children: string
  ringOffset: string
}) => (
  <button
    type={type}
    onClick={onClick}
    style={{ backgroundColor: RED, ['--tw-ring-color' as string]: RED }}
    className={`h-11 px-7 rounded-lg text-white text-[13px] font-bold ring-2 ring-offset-[3px] ${ringOffset} hover:brightness-110 active:scale-[0.98] transition`}
  >
    {children}
  </button>
)

/* ===================== 1. HERO + RESERVATION FORM ===================== */
const inputCls =
  'h-11 w-full rounded-md border border-gray-200 bg-white px-4 text-xs sm:text-[13px] text-black placeholder:text-gray-800 outline-none focus:border-[#f5214f] transition-colors'

/* shows "Date" / "Time" as text, turns into a real picker when tapped */
const FlipInput = ({ type, placeholder }: { type: 'date' | 'time'; placeholder: string }) => (
  <input
    type="text"
    placeholder={placeholder}
    aria-label={placeholder}
    required
    onFocus={(e) => {
      e.currentTarget.type = type
    }}
    onBlur={(e) => {
      if (!e.currentTarget.value) e.currentTarget.type = 'text'
    }}
    className={inputCls}
  />
)

const Hero = () => {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.currentTarget.reset()
    // connect your booking service here
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section
      style={{ backgroundImage: "url('/assets/r1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      className="relative bg-[#f1f5fb] overflow-hidden"
    >
      <div
        className={`${CONTAINER} relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-14 sm:py-16 lg:py-20`}
      >
        {/* ---------- Left: heading + form ---------- */}
        <div>
          <h1 style={heading} className="text-4xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.2] text-black">
            Best Food for
            <br />
            <span style={{ backgroundColor: YELLOW }} className="inline-block rounded-full px-3 sm:px-4 -ml-3 sm:-ml-4">
              Best Restaurants
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-[13px] font-bold uppercase tracking-wide text-gray-800">
            Arriving from Paris in 1986
          </p>

          <form onSubmit={onSubmit} className="mt-8 max-w-md">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <input
                  type="number"
                  min={1}
                  required
                  placeholder="No of Guest"
                  aria-label="No of Guest"
                  className={inputCls}
                />
              </div>
              <FlipInput type="date" placeholder="Date" />
              <FlipInput type="time" placeholder="Time" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <ReserveButton type="submit" ringOffset="ring-offset-[#f1f5fb]">
                Reserve a Table
              </ReserveButton>
              {sent && (
                <p className="text-sm font-semibold" style={{ color: RED }}>
                  Thanks! We'll confirm your table soon.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* ---------- Right: two pill photos on the red shape ---------- */}
        <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] aspect-[231/253] mx-auto lg:mx-0 lg:ml-auto">
          {/* red shape – runs off the right edge of the screen */}
          <div
            style={{ backgroundColor: RED }}
            className="absolute left-[16.5%] -right-[60vw] top-[44%] h-[56%] rounded-l-full"
          />

          {/* pill 1 */}
          <div className="absolute left-0 top-0 w-[43.3%] h-[65%] rounded-full overflow-hidden bg-neutral-700 shadow-xl">
            <Img src={IMAGES.hero1} alt="" className="w-full h-full object-cover" />
          </div>

          {/* pill 2 */}
          <div className="absolute left-[52%] top-[23%] w-[43.3%] h-[65.5%] rounded-full overflow-hidden bg-neutral-800 shadow-xl">
            <Img src={IMAGES.hero2} alt="" className="w-full h-full object-cover" />
          </div>

          {/* free delivery badge */}
          <div className="absolute right-0 -top-1 sm:top-0 flex items-center gap-2 rounded-full bg-white pl-1.5 pr-3 py-1.5 shadow-md">
            <span
              style={{ backgroundColor: YELLOW }}
              className="w-7 h-7 sm:w-9 sm:h-9 shrink-0 rounded-full flex items-center justify-center text-black"
            >
              <Bike className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold leading-tight text-black">
              Free Delivery 7<br />
              Days a Week
            </span>
          </div>

          {/* leaves */}
          <Leaf className="absolute left-[17%] top-[76%] w-5 h-5 sm:w-6 sm:h-6 rotate-[25deg]" />
          <Leaf className="absolute left-[30%] top-[84%] w-5 h-5 sm:w-6 sm:h-6 -rotate-[15deg]" />
          <Leaf className="absolute left-[22%] top-[92%] w-4 h-4 sm:w-5 sm:h-5 rotate-[60deg]" />
        </div>
      </div>
    </section>
  )
}

/* ===================== 2. WELCOME ===================== */
const RoundBadge = () => (
  <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
    <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <path id="foodio-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
      </defs>
      <text fill={RED} fontSize="10" fontWeight="700">
        <textPath href="#foodio-circle" textLength="290" lengthAdjust="spacing">
          FOODIO RESTAURANT ★ FOODIO RESTAURANT ★
        </textPath>
      </text>
    </svg>
    <div className="absolute inset-[21%] rounded-full overflow-hidden bg-neutral-800 border-4 border-white shadow-md">
      <Img src={IMAGES.badge} alt="" className="w-full h-full object-cover" />
    </div>
  </div>
)

const Welcome = () => (
  <section className="bg-white py-16 sm:py-20 lg:py-24">
    <div className={`${CONTAINER} grid lg:grid-cols-[1fr_1.3fr_1fr] gap-12 lg:gap-10 items-center`}>
      {/* tall pill photo */}
      <div className="w-full max-w-[250px] sm:max-w-[290px] aspect-[132/188] rounded-full overflow-hidden bg-neutral-900 mx-auto lg:mx-0 shadow-lg">
        <Img src={IMAGES.welcome1} alt="Chef seasoning a steak" className="w-full h-full object-cover" />
      </div>

      {/* text */}
      <div className="text-center">
        <p style={{ color: RED }} className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em]">
          Welcome to Foodio
        </p>
        <h2
          style={heading}
          className="mt-3 text-4xl sm:text-5xl lg:text-[48px] font-semibold leading-[1.2] text-black max-w-xs sm:max-w-sm mx-auto"
        >
          Feel The Taste of Foods
        </h2>
        <p className="mt-5 text-[13px] sm:text-sm leading-relaxed text-gray-500 max-w-sm mx-auto">
          Nisl quam nestibulum ac quam nec odio elementu aucan ligula. Orci varius natoque pena tibus et maum ac quam
          nec odio rbine..
        </p>

        <p className="mt-8 text-[11px] sm:text-xs font-bold text-black">Monday to Friday – 11:30 TO 2:00</p>
        <a
          href={`tel:${'+4412981239 87'.replace(' 87', '87')}`}
          style={heading}
          className="mt-1.5 inline-block text-base sm:text-lg font-semibold text-black underline underline-offset-4 hover:text-[#f5214f] transition-colors"
        >
          +44 1298 123 987
        </a>
      </div>

      {/* right: photo + circular badge */}
      <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center lg:justify-self-end gap-6 sm:gap-8 lg:gap-8">
        <div className="w-full max-w-[260px] sm:w-48 lg:w-full lg:max-w-[260px] aspect-[127/80] rounded-3xl overflow-hidden bg-neutral-700 shadow-lg">
          <Img src={IMAGES.welcome2} alt="Welcome" className="w-full h-full object-cover" />
        </div>
        <RoundBadge />
      </div>
    </div>
  </section>
)

/* ===================== 3. GOOD FOOD ===================== */
const perks = ['Quality foods natural gradient', 'Award-winning Restaurant', 'Healthy Food', 'individually styled bedrooms']

const GoodFood = () => (
  <section className="bg-white pb-16 sm:pb-20 lg:pb-28">
    <div className={`${CONTAINER} grid lg:grid-cols-[1fr_minmax(0,400px)_1fr] gap-12 lg:gap-10 items-center`}>
      {/* heading */}
      <h2
        style={heading}
        className="text-4xl sm:text-5xl lg:text-[50px] font-semibold leading-[1.25] text-black text-center lg:text-left max-w-md mx-auto lg:mx-0"
      >
        Good Food Steak &amp; Great Restourant
      </h2>

      {/* plate */}
      <div className="relative mx-auto w-[260px] sm:w-[320px] lg:w-full aspect-square">
        <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900 shadow-2xl">
          <Img src={IMAGES.plate} alt="Steak and salad" className="w-full h-full object-cover" />
        </div>

        {/* discount badge */}
        <div
          style={{ backgroundColor: YELLOW }}
          className="absolute -left-5 -top-3 sm:-left-6 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full ring-2 ring-black ring-offset-2 ring-offset-white flex flex-col items-center justify-center text-black"
        >
          <span className="text-[9px] sm:text-[10px] font-bold">UPTO</span>
          <span style={heading} className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-none">
            20%
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold">DISCOUNT</span>
        </div>

      </div>

      {/* checklist + button */}
      <div className="mx-auto lg:mx-0 lg:justify-self-end w-fit">
        <ul className="space-y-3.5">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[13px] sm:text-sm font-bold text-black">
              <Check size={16} strokeWidth={3.5} color={GREEN} className="shrink-0" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ReserveButton onClick={scrollToTop} ringOffset="ring-offset-white">
            Reserve a Table
          </ReserveButton>
        </div>
      </div>
    </div>
  </section>
)

/* ===================== PAGE ===================== */
const ReservationPage = () => (
  <main style={{ fontFamily: "'League Spartan', sans-serif" }}>
    {/* Loads the fonts – no other setup needed */}
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=League+Spartan:wght@400;500;600;700&display=swap');`}</style>

    <Hero />
    <Welcome />
    <GoodFood />
    <ServicesMenus />
  </main>
)

export default ReservationPage