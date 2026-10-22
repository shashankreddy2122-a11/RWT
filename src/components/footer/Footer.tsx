import { useState } from 'react'
import { Link } from 'react-router-dom'

const IMAGES = {
  logo: '/logo.png', // same logo as the header (shown in white on the red card)
}

const RED = '#f5214f'
const YELLOW = '#ffd400'
const heading = { fontFamily: "'Fredoka', sans-serif" }
const CONTAINER = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Menu', to: '/menu' },
  { label: 'Pages', to: '/pages' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Reservation', to: '/reservation' },
]

/* hides the image if the file isn't added yet */
const ColumnTitle = ({ children }: { children: string }) => (
  <h4
    style={heading}
    className="relative inline-block pb-2 text-xl sm:text-[22px] font-semibold text-black"
  >
    {children}
    <span
      style={{ backgroundColor: YELLOW }}
      className="absolute left-0 bottom-0 w-full h-[3px] rounded-full"
    />
  </h4>
)

const Footer = () => {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // connect your newsletter service here
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 4000)
  }

  return (
    <footer
      style={{ fontFamily: "'League Spartan', sans-serif" }}
      className="relative bg-[#f1f5fb] overflow-hidden"
    >
      <div className={`${CONTAINER} relative pt-14 sm:pt-16 lg:pt-20`}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_0.7fr] lg:gap-8 xl:gap-10">
          {/* ---------- Red info card ---------- */}
          <div
            style={{ backgroundColor: RED }}
            className="rounded-3xl px-7 py-8 sm:px-8 flex flex-col min-h-[260px] md:col-span-2 lg:col-span-1 lg:min-h-[270px]"
          >
            <img
              src={IMAGES.logo}
              alt="TasteNest – Fast Food Restaurant"
              className="h-14 sm:h-16 w-auto self-start brightness-0 invert"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />

            <h3
              style={heading}
              className="mt-4 text-2xl sm:text-3xl font-semibold text-white"
            >
              TasteNest
            </h3>

            <p className="mt-8 text-xs sm:text-[13px] font-bold text-white">
              Tuesday – Saturday: 12:00pm – 23:00pm
            </p>
            <p className="mt-4 text-xs sm:text-[13px] font-bold text-white underline underline-offset-2">
              Closed on Sunday
            </p>

            <p className="mt-auto pt-10 text-xs sm:text-[13px] font-bold text-white">
              5 star rated on TripAdvisor
            </p>
          </div>

          {/* ---------- Newsletter ---------- */}
          <div className="lg:pt-2">
            <ColumnTitle>Newsletter</ColumnTitle>
            <p className="mt-6 text-[13px] sm:text-sm text-gray-800">Get recent news and updates.</p>

            <form onSubmit={onSubscribe} className="mt-5 max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                aria-label="Email Address"
                className="h-12 w-full rounded-lg border border-gray-200 bg-white px-5 text-[13px] text-black placeholder:text-gray-400 outline-none focus:border-[#f5214f] transition-colors"
              />

              <button
                type="submit"
                style={{ backgroundColor: RED, ['--tw-ring-color' as string]: RED }}
                className="mt-5 h-11 px-8 rounded-lg text-white text-[13px] font-bold ring-2 ring-offset-[3px] ring-offset-[#f1f5fb] hover:brightness-110 active:scale-[0.98] transition"
              >
                Subscribe
              </button>

              {done && (
                <p className="mt-3 text-sm font-semibold" style={{ color: RED }}>
                  Thanks for subscribing!
                </p>
              )}
            </form>
          </div>

          <nav aria-label="Footer navigation" className="lg:pt-2">
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="mt-6 space-y-3.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] font-semibold text-gray-800 transition-colors hover:text-[#f5214f] sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ---------- Yellow bar ---------- */}
        <div style={{ backgroundColor: YELLOW }} className="mt-12 lg:mt-16 h-[7px] sm:h-2 w-full" />

        {/* ---------- Bottom row ---------- */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-[13px] font-bold text-black">
            <span style={{ color: RED }} className="italic">
              © 2025 TasteNest
            </span>
            <span className="ml-2">| All shawonetc3 Themes</span>
          </p>

          <div className="flex items-center gap-8 sm:gap-12">
            <a
              href="#"
              className="text-xs sm:text-[13px] font-bold text-black underline underline-offset-2 hover:text-[#f5214f] transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-xs sm:text-[13px] font-bold text-black underline underline-offset-2 hover:text-[#f5214f] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer