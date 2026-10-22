import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import FarmFreshProducts from './FarmFreshProducts'
import ReviewsAndNewsletter from './ReviewsAndNewsletter'

const GREEN = '#00873f'
const LIME = '#7fd30f'
const DEEP_RED = '#c20017'

const nunito = { fontFamily: "'Nunito', sans-serif" }
const condensed = { fontFamily: "'Barlow Condensed', sans-serif" }
const FONT = { fontFamily: "'League Spartan', sans-serif" }

/* ---------- Top offers (5 cards) ---------- */
const offers = [
  { name: 'Fresh Strawberries', price: '$3.99/Kg', image: '/assets/p2.png' },
  { name: 'Australian Avocado', price: '$5.99/Kg', image: '/assets/p3.png' },
  { name: 'Salmon Fillet', price: '$20.99/Kg', image: '/assets/p4.png' },
  { name: 'Cabbage', price: '$2.99/Kg', image: '/assets/p5.png' },
  { name: 'Pomegranate', price: '$6.99/Kg', image: '/assets/p6.png' },
]

/* ---------- Weekend deals (pill slider) ---------- */
const deals = [
  {
    tag: 'WEEKEND DEALS',
    name: 'Fresh Coconut',
    price: '$10.00',
    image: '/assets/p8.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed erat tempor purus mattis.',
    bg: '#ffe0e5',
    btn: '#f5214f',
  },
  {
    tag: 'WEEKEND DEALS',
    name: 'Fresh Watermelon',
    price: '$19.00',
    image: '/assets/p9.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed erat tempor purus mattis.',
    bg: '#ffe0e5',
    btn: '#0a7a3b',
  },
  {
    tag: 'WEEKEND DEALS',
    name: 'Fresh Blueberries',
    price: '$12.00',
    image: '/assets/p7.png',
    description: 'Fresh and delicious seasonal favourites selected just for you.',
    bg: '#e1e1ff',
    btn: '#5b57e0',
  },
]

/* hides the image if the file isn't added yet */
function FoodImage({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.style.visibility = 'hidden'
      }}
    />
  )
}

/* ===================== 1. HERO ===================== */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-white shadow-[inset_0_16px_18px_-16px_rgba(0,0,0,0.14)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center justify-items-center px-5 py-14 sm:min-h-[300px] sm:grid-cols-[2.2fr_auto_1fr] sm:justify-items-stretch sm:py-0 lg:min-h-[380px]">
        {/* left: optional photo (stays empty until you add the file) */}
        <div className="hidden justify-end pr-6 sm:flex">
          <FoodImage
            src="/assets/p1.png"
            alt="Grilled beef burger"
            className="h-32 w-auto object-contain lg:h-48"
          />
        </div>

        {/* centre: text */}
        <div className="text-center">
          <div className="inline-block">
            <h1
              style={condensed}
              className="text-[56px] font-extrabold uppercase leading-[0.9] text-[#1d1d1f] sm:text-[46px] md:text-[64px] lg:text-[80px]"
            >
              Grilled
              <br />
              Beef
              <br />
              Burger
            </h1>
            {/* w-0 + min-w-full keeps the paragraph exactly as wide as the heading */}
            <p
              style={FONT}
              className="mt-2 w-0 min-w-full text-[11px] leading-snug text-gray-800 sm:text-[9px] md:text-xs lg:text-sm"
            >
              Secret family recipes are the stuff of legends and Stack burger blend is no exception.
            </p>
          </div>

          <div className="mt-4">
            <Link
              to="/menu"
              style={{ ...FONT, backgroundColor: GREEN }}
              className="inline-flex items-center gap-1.5 rounded-sm px-5 py-2.5 text-[9px] font-bold uppercase text-white transition hover:brightness-110 sm:px-4 sm:py-2 sm:text-[8px] md:px-6 md:py-3 md:text-[10px]"
            >
              Order Now <ShoppingBag size={10} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ===================== 2. TOP OFFERS ===================== */
function TopOffers() {
  return (
    <section className="relative bg-white px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-12">

      <h2
        style={nunito}
        className="relative text-center text-lg font-extrabold text-[#222] sm:text-[11px] md:text-xl lg:text-2xl"
      >
        Top Offers This Week
      </h2>

      {/* phones: swipe sideways · tablet and up: 5 columns */}
      <div className="relative mx-auto mt-6 flex max-w-4xl snap-x gap-3 overflow-x-auto pb-4 sm:mt-7 sm:grid sm:max-w-3xl sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:pb-0 lg:max-w-4xl lg:gap-5">
        {offers.map((offer) => (
          <Link
            to="/menu"
            key={offer.name}
            className="group w-[120px] shrink-0 snap-start text-center sm:w-auto"
          >
            <div className="relative">
              {/* photo with a notch cut out of the bottom */}
              <div className="aspect-[0.88] overflow-hidden rounded-t-xl bg-gray-100 [clip-path:polygon(0_0,100%_0,100%_100%,50%_86%,0_100%)]">
                <FoodImage
                  src={offer.image}
                  alt={offer.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* green badge sitting in the notch */}
              <span
                style={{ borderColor: LIME }}
                className="absolute left-1/2 top-[86%] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed bg-white sm:h-7 sm:w-7 md:h-9 md:w-9"
              >
                <span
                  style={{ backgroundColor: LIME }}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white sm:h-5 sm:w-5 md:h-7 md:w-7"
                >
                  <ShoppingBag size={11} />
                </span>
              </span>
            </div>

            <p
              style={{ ...FONT, color: '#0a7f3f' }}
              className="mt-4 text-[11px] font-bold sm:mt-3 sm:text-[7px] md:mt-4 md:text-xs"
            >
              {offer.price}
            </p>
            <p
              style={FONT}
              className="mt-1 text-[11px] font-bold leading-tight text-[#1d1d1f] sm:text-[7px] md:text-xs"
            >
              {offer.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ===================== 3. WEEKEND DEALS ===================== */
const pad = (n: number) => String(n).padStart(2, '0')

/* font size that grows with the pill but never gets smaller than 'min' */
const cq = (min: number, cqw: number) => ({ fontSize: `max(${min}px, ${cqw}cqw)` })

/* live countdown – starts at 02 days 16 hours 57 mins 55 secs, like the design */
function useCountdown() {
  const [left, setLeft] = useState(2 * 86400 + 16 * 3600 + 57 * 60 + 55)

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  return [
    { label: 'Days', value: Math.floor(left / 86400) },
    { label: 'Hours', value: Math.floor((left % 86400) / 3600) },
    { label: 'Mins', value: Math.floor((left % 3600) / 60) },
    { label: 'Secs', value: left % 60 },
  ]
}

function Countdown({ items }: { items: { label: string; value: number }[] }) {
  return (
    <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
      {/* little green squiggle above the circles */}
      <svg
        viewBox="0 0 40 8"
        className="absolute -top-3 left-1/2 h-2 w-8 -translate-x-1/2"
        fill="none"
        stroke="#0a7a3b"
        strokeWidth="1"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M2 5 C6 0, 10 8, 14 3 S22 7, 26 2 S34 6, 38 3" />
      </svg>

      <div className="flex" style={{ gap: '1cqw' }}>
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center rounded-full text-white"
            style={{ width: 'max(30px, 5.3cqw)', height: 'max(30px, 5.3cqw)', backgroundColor: DEEP_RED }}
          >
            <span style={{ ...FONT, ...cq(10, 1.8) }} className="font-bold leading-none">
              {pad(item.value)}
            </span>
            <span style={{ ...FONT, ...cq(6, 1) }} className="leading-none">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WeekendDeals() {
  const [active, setActive] = useState(0)
  const timer = useCountdown()

  return (
    <section className="overflow-hidden bg-white pb-8 pt-8 sm:pt-12">
      <div className="text-center">
        <h2 style={nunito} className="text-xl font-extrabold text-[#222] sm:text-[15px] md:text-2xl lg:text-3xl">
          Weekend Deals
        </h2>
        <p
          style={FONT}
          className="mt-0.5 text-[10px] font-bold text-green-700 sm:text-[7px] md:text-[10px] lg:text-xs"
        >
          Hurry up!! Limited time offer
        </p>
      </div>

      {/* three equal pills: the middle one is centred, the others peek in from the edges */}
      <div className="mt-2 overflow-hidden pt-8">
        <div key={active} className="flex animate-[dealIn_0.5s_ease] justify-center gap-3">
          {[-1, 0, 1].map((position) => {
            const index = (active + position + deals.length) % deals.length
            const deal = deals[index]
            const isCenter = position === 0

            return (
              <article
                key={deal.name}
                onClick={() => !isCenter && setActive(index)}
                style={{ backgroundColor: deal.bg }}
                className={`relative flex h-[190px] w-[90%] shrink-0 items-center rounded-full [container-type:inline-size] sm:aspect-[393/180] sm:h-auto sm:w-[min(57vw,760px)] ${
                  isCenter ? '' : 'cursor-pointer'
                }`}
              >
                {isCenter && <Countdown items={timer} />}

                {/* text */}
                <div className="min-w-0 flex-1 pl-[10%] pr-2">
                  <p style={{ ...FONT, ...cq(8, 1.5) }} className="font-semibold uppercase text-gray-500">
                    {deal.tag}
                  </p>

                  <h3 style={{ ...nunito, ...cq(16, 3.3) }} className="mt-1 font-extrabold leading-tight text-[#1d1d1f]">
                    {deal.name}
                  </h3>

                  <p
                    style={{ ...FONT, ...cq(9, 1.5), maxWidth: '36cqw' }}
                    className="mt-1 leading-snug text-gray-500"
                  >
                    {deal.description}
                  </p>

                  <p style={{ ...FONT, ...cq(14, 2.9) }} className="mt-2 font-bold text-[#1d1d1f]">
                    {deal.price}
                  </p>

                  <Link
                    to="/menu"
                    style={{ ...FONT, ...cq(8, 1.6), backgroundColor: deal.btn }}
                    className="mt-2 inline-flex items-center gap-2 rounded-full py-[3px] pl-3 pr-[3px] font-bold uppercase text-white transition hover:brightness-110"
                  >
                    Shop Now
                    <span
                      style={{ color: deal.btn, width: 'max(18px, 3.6cqw)', height: 'max(18px, 3.6cqw)' }}
                      className="flex items-center justify-center rounded-full bg-white"
                    >
                      <ArrowRight size={10} strokeWidth={3} />
                    </span>
                  </Link>
                </div>

                {/* round food photo on the right */}
                <div className="mr-[4%] aspect-square w-[37%] shrink-0">
                  <FoodImage
                    src={deal.image}
                    alt={deal.name}
                    className="h-full w-full object-contain drop-shadow-xl"
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* dots – the active one has a green ring */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {deals.map((deal, i) => {
          const on = i === active
          return (
            <button
              key={deal.name}
              onClick={() => setActive(i)}
              aria-label={`Show ${deal.name}`}
              aria-current={on}
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full"
              style={on ? { border: '1px solid #0a7a3b' } : undefined}
            >
              <span
                className="block rounded-full"
                style={{
                  width: on ? 4 : 3,
                  height: on ? 4 : 3,
                  backgroundColor: i === 2 ? '#8bd50b' : '#0a7a3b',
                }}
              />
            </button>
          )
        })}
      </div>

      <style>{`@keyframes dealIn { from { opacity: 0.3; transform: translateX(24px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  )
}

/* ===================== PAGE ===================== */
export default function Pages() {
  return (
    <main className="min-h-screen overflow-hidden bg-white" style={FONT}>
      {/* Loads the fonts – no other setup needed */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=League+Spartan:wght@400;500;600;700&family=Nunito:wght@600;700;800&display=swap');
      `}</style>

      <Hero />
      <TopOffers />
      <WeekendDeals />
      <FarmFreshProducts />
      <ReviewsAndNewsletter />
    </main>
  )
}