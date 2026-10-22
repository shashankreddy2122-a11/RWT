
import { Play, Apple } from 'lucide-react'

/* ---------- IMAGES: put your files in public/images with these names ---------- */
const IMAGES = {
  // app section
  appPhone: '/assets/h18.png', // phone in hand
  scooter: '/assets/h19.png',
  pizza: '/assets/h20.png',
  bowl: '/assets/h21.png',
  // recent news
  news1: 'assets/h22.png',
  news2: '/assets/h23.png',
  author: '/assets/h3.png', // reuse the Willimes photo, or add a new one
  // instagram grid
  insta1: '/assets/h5.png',
  insta2: '/assets/h12.png',
  insta3: '/assets/h6.png',
  insta4: '/assets/h13.png',
  insta5: '/assets/h7.png',
  insta6: '/assets/h14.png',
  insta7: '/assets/h8.png',
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

const Eyebrow = ({ children }: { children: string }) => (
  <p style={{ color: RED }} className="text-xs sm:text-[13px] font-bold uppercase tracking-wide">
    {children}
  </p>
)

/* ===================== APP DOWNLOAD ===================== */
const Leaf = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#4caf50" aria-hidden="true">
    <path d="M21 3C11 3 4 9 4 17c0 1.2.2 2.3.6 3.3.4-5 3.4-9.3 8.4-11.6-3.6 3-5.9 6.8-6.4 11.6C16 20.6 21 13 21 3z" />
  </svg>
)

const perks = ['Higher Reach - Minimal Effort', 'Showcase your Brand', 'Exclusive offers & discounts']

const AppSection = () => (
  <section className="relative bg-[#f1f5fb] overflow-hidden">
    <div
      className={`${CONTAINER} grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-6 items-center pt-14 sm:pt-16 lg:pt-0 pb-14 sm:pb-16 lg:pb-20`}
    >
      {/* Left text */}
      <div className="lg:py-16">
        <Eyebrow>Best App for Foods Ordering</Eyebrow>
        <h2
          style={heading}
          className="mt-3 text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-[1.2] text-black max-w-md"
        >
          Manage Your Restaurant Anytime! Anywhere!
        </h2>

        <ul className="mt-5 space-y-2.5">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-3 text-sm sm:text-[15px] text-gray-800">
              <span
                style={{ backgroundColor: YELLOW }}
                className="w-4 h-4 shrink-0 rounded-full flex items-center justify-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black/70" />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#"
            style={{ backgroundColor: RED }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-white text-sm font-bold hover:brightness-110 transition"
          >
            <Play size={14} fill="white" />
            Google Play
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-black text-white text-sm font-bold hover:bg-neutral-800 transition"
          >
            <Apple size={15} fill="white" />
            App Store
          </a>
        </div>
      </div>

      {/* Right visual */}
      <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[470px]">
        {/* red shape – runs off the right edge of the screen */}
        <div
          style={{ backgroundColor: RED }}
          className="absolute bottom-0 left-0 -right-[60vw] h-[78%] rounded-tl-[140px] sm:rounded-tl-[200px] lg:rounded-tl-[260px]"
        />

        {/* leaves */}
        <Leaf className="absolute left-[18%] top-[6%] w-7 h-7 rotate-[20deg]" />
        <Leaf className="absolute right-[26%] top-[8%] w-5 h-5 -rotate-[30deg]" />
        <Leaf className="absolute right-[4%] top-[40%] w-4 h-4 rotate-[60deg]" />

        {/* phone in hand */}
        <Img
          src={IMAGES.appPhone}
          alt="Restaurant ordering app"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[96%] w-auto object-contain object-bottom"
        />

        {/* scooter */}
        <Img
          src={IMAGES.scooter}
          alt="Food delivery"
          className="absolute -left-2 sm:left-0 bottom-0 h-[42%] w-auto object-contain"
        />

        {/* pizza */}
        <Img
          src={IMAGES.pizza}
          alt="Pizza"
          className="absolute right-[2%] sm:right-[6%] top-[12%] h-[24%] w-auto object-contain drop-shadow-lg"
        />

        {/* bowl */}
        <Img
          src={IMAGES.bowl}
          alt="Salad bowl"
          className="absolute right-[2%] sm:right-[8%] bottom-[14%] h-[24%] w-auto object-contain drop-shadow-lg"
        />
      </div>
    </div>
  </section>
)

/* ===================== RECENT NEWS ===================== */
const news = [
  {
    id: 'creamy-chicken-alfredo',
    date: 'April 6, 2023',
    title: 'Creamy Chicken Alfredo',
    author: 'Willimes Thomas',
    img: IMAGES.news1,
  },
  {
    id: 'air-fryer-salmon',
    date: 'April 6, 2023',
    title: 'Air Fryer Salmon',
    author: 'Willimes Thomas',
    img: IMAGES.news2,
  },
]

const RecentNews = () => (
  <section className="py-16 sm:py-20 lg:py-24">
    <div className={CONTAINER}>
      <SectionTitle>Recent News</SectionTitle>

      <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-12">
        {news.map((n) => (
          <a key={n.id} href="#" className="group flex items-center gap-5 sm:gap-7">
            {/* photo */}
            <div className="w-36 sm:w-44 lg:w-[190px] shrink-0 aspect-[1/1.07] rounded-3xl overflow-hidden bg-neutral-800">
              <Img
                src={n.img}
                alt={n.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* text */}
            <div className="min-w-0">
              <span
                style={{ backgroundColor: YELLOW }}
                className="inline-block rounded px-2.5 py-1 text-[11px] font-bold text-black"
              >
                {n.date}
              </span>

              <h4
                style={heading}
                className="mt-3 text-xl sm:text-2xl font-semibold leading-snug text-black group-hover:text-[#f5214f] transition-colors"
              >
                {n.title}
              </h4>

              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300 shrink-0">
                  <Img src={IMAGES.author} alt={n.author} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-black">{n.author}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
)

/* ===================== INSTAGRAM FOLLOW ===================== */
const InstagramIcon = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

/* 4 columns; each tile has a flex ratio so the heights match the design */
const columns: { img: string; flex: number }[][] = [
  [
    { img: IMAGES.insta1, flex: 1.95 },
    { img: IMAGES.insta2, flex: 1 },
  ],
  [{ img: IMAGES.insta3, flex: 1 }],
  [
    { img: IMAGES.insta4, flex: 1 },
    { img: IMAGES.insta5, flex: 1.75 },
  ],
  [
    { img: IMAGES.insta6, flex: 1.95 },
    { img: IMAGES.insta7, flex: 1 },
  ],
]

const InstagramFollow = () => (
  <section className="pb-16 sm:pb-20 lg:pb-28">
    <div className={CONTAINER}>
      <div className="relative">
        {/* image grid */}
        <div className="flex gap-2.5 sm:gap-3 lg:gap-3.5 h-[320px] sm:h-[400px] lg:h-[500px]">
          {columns.map((col, ci) => (
            <div key={ci} className="flex-1 min-w-0 flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5">
              {col.map((tile, ti) => (
                <a
                  key={ti}
                  href="#"
                  aria-label="Open Instagram post"
                  style={{ flexGrow: tile.flex, flexBasis: 0 }}
                  className="relative min-h-0 rounded-xl sm:rounded-2xl lg:rounded-[22px] overflow-hidden bg-neutral-200"
                >
                  <Img src={tile.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  {/* faded look */}
                  <span className="absolute inset-0 bg-white/70" />
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* centered follow text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto text-center px-4 py-5 rounded-2xl">
            <a
              href="#"
              aria-label="Follow us on Instagram"
              style={{ backgroundColor: RED }}
              className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white flex items-center justify-center hover:brightness-110 transition"
            >
              <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>

            <h3
              style={heading}
              className="mt-4 text-2xl sm:text-3xl lg:text-[34px] font-semibold text-black"
            >
              Follow @shawonetc3
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-600">
              Join our community to inspire your desires
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* ===================== App section + Recent News + Instagram ===================== */
export const NewsSocial = () => (
  <>
    <AppSection />
    <RecentNews />
    <InstagramFollow />
  </>
)