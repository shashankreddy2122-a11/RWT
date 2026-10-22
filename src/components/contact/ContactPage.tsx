import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Target, Phone, Clock, User, Mail, Pencil, ChevronDown, Apple, Play } from 'lucide-react'

/* ---------- IMAGES: put your files in public/images with these names ---------- */
const IMAGES = {
  heroWing: '/assets/h7.png', // chicken wing, top-left corner
  heroLeg: '/assets/m1.png', // chicken drumstick
  heroEgg: '/assets/m13.png', // big fried egg
  leaves: '/assets/p7.png', // green leaves beside the info card
  visitPizza: '/assets/m18.png', // small pizza (visit section)
  bigPizza: '/assets/h2.png', // big pizza on a board (bottom-left)
  map: '/assets/W.png', // map picture (add your own file here)
}

/* ---------- Address (the map picture opens Google Maps with this address) ---------- */
const ADDRESS = '313 W Tonichi Ave, Gunnison, CO 81230, United States'
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

const CREAM = '#f7f0dc'
const PEACH = '#fde4bd'
const RED = '#e8160c'
const PINK = '#f5214f'
const ORANGE = '#ff9f1c'
const GREEN = '#2f8f5b'
const YELLOW = '#ffd400'

const head = { fontFamily: "'Barlow Condensed', sans-serif" }
const body = { fontFamily: "'Barlow', sans-serif" }
const CONTAINER = 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'

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

/* ===================== 1. PAGE BANNER ===================== */
const Banner = () => (
  <section style={{ backgroundColor: CREAM }} className="relative min-h-[190px] sm:min-h-[240px] lg:min-h-[320px]">
    <Img
      src={IMAGES.heroWing}
      className="pointer-events-none absolute left-0 top-0 h-auto w-14 select-none sm:w-20 lg:w-24"
    />

    <div className={`${CONTAINER} relative z-10 pt-14 sm:pt-16 lg:pt-28`}>
      <h1 style={head} className="text-4xl font-bold text-black sm:text-5xl lg:text-[48px]">
        Contact
      </h1>
      <p style={body} className="mt-1 text-[11px] text-black sm:text-xs">
        <Link to="/" style={{ color: RED }} className="hover:underline">
          Home
        </Link>
        <span className="mx-1">/</span>
        Contact
      </p>
    </div>

    {/* scribble arrow */}
    <svg
      viewBox="0 0 140 60"
      className="absolute left-[24%] top-6 hidden h-14 w-36 sm:block lg:left-[22%] lg:top-8 lg:h-16 lg:w-40"
      fill="none"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 44 C30 18, 60 6, 92 14 C114 20, 112 40, 94 34 C84 30, 92 16, 104 14 C118 12, 128 18, 134 26" />
      <path d="M124 14 L134 26 L120 30" />
    </svg>

    {/* drumstick + egg (the egg hangs a little over the bottom edge) */}
    <Img
      src={IMAGES.heroLeg}
      className="pointer-events-none absolute right-[34%] top-3 z-10 hidden h-auto w-20 select-none sm:block lg:right-[45%] lg:top-8 lg:w-28"
    />
    <Img
      src={IMAGES.heroEgg}
      className="pointer-events-none absolute right-2 top-4 z-10 h-auto w-32 select-none sm:right-[5%] sm:w-52 lg:right-[17%] lg:top-3 lg:w-[330px]"
    />
  </section>
)

/* ===================== 2. CONTACT INFORMATION + FORM ===================== */
const infoRows = [
  {
    title: 'Address',
    lines: ['8522 Preston Rd, Inglewood, Maine 98380'],
    Icon: Target,
    color: RED,
  },
  {
    title: 'Contact Info',
    lines: ['Mobile: +205-0547-98743', 'Email: info@barab.com'],
    Icon: Phone,
    color: PINK,
  },
  {
    title: 'Opening Hours',
    lines: ['Monday - Saturday: 9:00am - 10:00pm', 'Sunday are Closed'],
    Icon: Clock,
    color: ORANGE,
  },
]

const fieldCls =
  'h-11 w-full rounded-full px-5 pr-11 text-[11px] sm:text-xs text-black placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-black/20'

const ContactSection = () => {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.currentTarget.reset()
    // connect your email / backend service here
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section style={body} className="bg-white pb-14 pt-16 sm:pt-20 lg:pb-20 lg:pt-24">
      <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-2 lg:gap-12`}>
        {/* ---------- Left: info card ---------- */}
        <div style={{ backgroundColor: CREAM }} className="relative rounded-[36px] p-5 sm:p-8">
          <h2 style={head} className="text-2xl font-bold uppercase leading-none text-black sm:text-[28px]">
            Contact <span style={{ color: RED }}>Information</span>
          </h2>
          <p className="mt-3 max-w-sm text-[10px] leading-relaxed text-gray-700 sm:text-[11px]">
            Relax and enjoy your food in our cozy restaurant, or take it to go. Great taste, great service — every visit
            is a flavorful experience worth coming back for.
          </p>

          <ul className="mt-5 space-y-3">
            {infoRows.map(({ title, lines, Icon, color }) => (
              <li key={title} className="flex items-center gap-4 rounded-[28px] bg-white py-3 pl-3 pr-5 shadow-sm">
                <span
                  style={{ backgroundColor: color }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white sm:h-12 sm:w-12"
                >
                  <Icon size={19} strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <h4 className="text-[12px] font-bold text-black sm:text-[13px]">{title}</h4>
                  {lines.map((l) => (
                    <p key={l} className="break-words text-[10px] leading-snug text-gray-700 sm:text-[11px]">
                      {l}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <Img
            src={IMAGES.leaves}
            className="pointer-events-none absolute -right-4 top-[16%] hidden h-auto w-14 select-none sm:block lg:-right-7 lg:w-20"
          />
        </div>

        {/* ---------- Right: form ---------- */}
        <div>
          <h3 style={head} className="text-2xl font-bold text-black sm:text-[28px]">
            Get in Touch!
          </h3>

          <form onSubmit={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Your name"
                aria-label="Your name"
                style={{ backgroundColor: CREAM }}
                className={fieldCls}
              />
              <User size={13} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-800" />
            </div>

            <div className="relative">
              <input
                type="email"
                required
                placeholder="Your Email"
                aria-label="Your Email"
                style={{ backgroundColor: CREAM }}
                className={fieldCls}
              />
              <Mail size={13} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-800" />
            </div>

            <div className="relative sm:col-span-2">
              <select
                required
                defaultValue=""
                aria-label="Subject"
                style={{ backgroundColor: CREAM }}
                className={`${fieldCls} appearance-none`}
              >
                <option value="" disabled>
                  Personal Training
                </option>
                <option>Table Reservation</option>
                <option>Private Dining</option>
                <option>Catering</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-800" />
            </div>

            <div className="relative sm:col-span-2">
              <textarea
                required
                rows={5}
                placeholder="Write Messages..."
                aria-label="Message"
                style={{ backgroundColor: CREAM }}
                className="h-40 w-full resize-none rounded-2xl px-5 py-3.5 pr-11 text-[11px] text-black outline-none placeholder:text-gray-600 focus:ring-2 focus:ring-black/20 sm:text-xs"
              />
              <Pencil size={12} className="pointer-events-none absolute right-5 top-4 text-gray-800" />
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button
                type="submit"
                style={head}
                className="h-10 rounded-full bg-black px-6 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-neutral-800 active:scale-[0.98]"
              >
                Send Message Now
              </button>
              {sent && (
                <p className="text-sm font-semibold" style={{ color: GREEN }}>
                  Thanks! We'll get back to you soon.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ===================== 3. VISIT OUR RESTAURANT + MAP PICTURE ===================== */
const socials = [
  {
    label: 'Facebook',
    svg: <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.2l.8-3H13v-2c0-.6.4-1 1-1z" fill="currentColor" stroke="none" />,
  },
  {
    label: 'X',
    svg: (
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill="currentColor"
        stroke="none"
        transform="translate(3 3) scale(.75)"
      />
    ),
  },
  {
    label: 'LinkedIn',
    svg: <path d="M7 10v7M7 7v.01M11 17v-7M11 13c0-2 1.4-3 3-3s3 1 3 3v4" />,
  },
  {
    label: 'Dribbble',
    svg: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M5 9c4 0 8-1 10-4M9 4.5c2.5 3 5 8 5.5 15M19.5 13c-3-1-7 0-9 3" />
      </>
    ),
  },
]

const Visit = () => (
  <section style={body} className="grid lg:grid-cols-2">
    {/* ---------- Left: peach box ---------- */}
    <div style={{ backgroundColor: PEACH }} className="p-4 sm:p-6 lg:p-7">
      <div className="relative flex h-full min-h-[340px] flex-col items-center justify-center rounded border border-white/80 px-6 py-10 text-center sm:px-10 lg:min-h-[400px]">
        <div className="flex items-center gap-2">
          <span style={{ backgroundColor: RED }} className="h-px w-6" />
          <p style={{ ...head, color: RED }} className="text-[10px] font-semibold uppercase italic tracking-wide">
            Restaurant Location
          </p>
          <span style={{ backgroundColor: RED }} className="h-px w-6" />
        </div>

        <h2 style={head} className="mt-3 text-3xl font-bold uppercase text-black sm:text-4xl">
          Visit Our Restaurant
        </h2>

        <p className="mt-5 max-w-[220px] text-[11px] leading-relaxed text-gray-700 sm:text-xs">{ADDRESS.replace(', Gunnison', ', Gunnison')}</p>

        <span className="my-4 h-9 w-px bg-[#e0a458]" />

        <p className="text-[11px] leading-relaxed text-gray-700 sm:text-xs">
          Monday-Saturday: 6:00pm - 10:00pm
          <br />
          Sunday: is the holiday
        </p>

        <div className="mt-5 flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-700 text-gray-800 transition-colors hover:bg-black hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {s.svg}
              </svg>
            </a>
          ))}
        </div>

        <Img
          src={IMAGES.visitPizza}
          className="pointer-events-none absolute bottom-4 right-4 h-auto w-20 select-none sm:w-24 lg:w-28"
        />
      </div>
    </div>

    {/* ---------- Right: map picture (opens Google Maps when clicked) ---------- */}
    <a
      href={MAP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Open the map in Google Maps"
      className="relative block min-h-[300px] bg-[#e3ece0] lg:min-h-[440px]"
    >
      <Img
        src={IMAGES.map}
        alt="Map showing the restaurant location"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute left-2 top-2 rounded-sm bg-white px-2 py-1 text-[9px] font-medium text-[#1a73e8] shadow">
        View larger map
      </span>
    </a>
  </section>
)

/* ===================== 4. LET'S TALK WITH US ===================== */
const quickLinks: { label: string; to: string }[] = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Service', to: '/menu' },
  { label: 'Latest Blog', to: '/blog' },
  { label: 'Our Shop', to: '/menu' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Reservation', to: '/reservation' },
]

const Ornament = () => (
  <div className="mt-1.5 flex items-center justify-center gap-1" aria-hidden="true">
    <span style={{ backgroundColor: YELLOW }} className="h-px w-3" />
    <span style={{ backgroundColor: YELLOW }} className="h-1 w-1 rotate-45" />
    <span style={{ backgroundColor: YELLOW }} className="h-px w-3" />
  </div>
)

const cardCls = 'rounded-lg border border-yellow-300/60 p-5 text-center text-white shadow-md'

const StoreBadge = ({ small, big, children }: { small: string; big: string; children: React.ReactNode }) => (
  <a
    href="#"
    className="inline-flex items-center gap-1.5 rounded-md border border-white/80 bg-black px-2.5 py-1.5 text-left text-white transition-colors hover:bg-neutral-800"
  >
    {children}
    <span className="leading-none">
      <span className="block text-[6px]">{small}</span>
      <span className="mt-0.5 block text-[10px] font-semibold">{big}</span>
    </span>
  </a>
)

const Talk = () => (
  <section style={{ backgroundColor: CREAM, ...body }} className="relative overflow-hidden pb-24 pt-12 sm:pb-28 sm:pt-14 lg:pb-32">
    <Img
      src={IMAGES.bigPizza}
      className="pointer-events-none absolute bottom-0 left-0 z-0 hidden h-auto w-56 select-none lg:block"
    />

    <div className={`${CONTAINER} relative z-10 lg:pl-52`}>
      <h2 style={{ ...head, color: GREEN }} className="text-center text-5xl font-bold sm:text-6xl lg:text-[64px]">
        Let’s Talk With Us
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {/* Contact info */}
        <div style={{ backgroundColor: PINK }} className={cardCls}>
          <h4 className="text-sm font-semibold">Contact Info</h4>
          <Ornament />
          <p className="mt-3 text-[10px] leading-relaxed">
            Phone: +123456789 &nbsp; +912345678
            <br />
            Email: info@example.com
          </p>
        </div>

        {/* Quick links */}
        <div style={{ backgroundColor: PINK }} className={cardCls}>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <Ornament />
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Download */}
        <div style={{ backgroundColor: PINK }} className={cardCls}>
          <h4 className="text-sm font-semibold">Download</h4>
          <Ornament />
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <StoreBadge small="Download on the" big="App Store">
              <Apple size={14} fill="white" />
            </StoreBadge>
            <StoreBadge small="GET IT ON" big="Google Play">
              <Play size={13} fill="white" />
            </StoreBadge>
          </div>
        </div>
      </div>
    </div>

    {/* small white wave at the bottom centre */}
    <svg
      viewBox="0 0 120 24"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-1/2 h-5 w-28 -translate-x-1/2 sm:h-6 sm:w-36 lg:w-44"
      fill="#fff"
      aria-hidden="true"
    >
      <path d="M0 24 C18 24 24 8 44 8 C58 8 62 16 76 16 C96 16 102 24 120 24 Z" />
    </svg>
  </section>
)

/* ===================== PAGE ===================== */
const ContactPage = () => (
  <main style={body} className="bg-white">
    {/* Loads the fonts – no other setup needed */}
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700&display=swap');`}</style>

    <Banner />
    <ContactSection />
    <Visit />
    <Talk />
  </main>
)

export default ContactPage