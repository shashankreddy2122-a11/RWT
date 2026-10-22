import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Star, Donut, Drumstick, Coffee, Sandwich } from 'lucide-react'
import { MenuPanel, LowerSections } from './MenuSections'
import { BottomSections } from './BottomSection'
import { NewsSocial } from './NewsSocial'

/* ---------- IMAGES: put your files in public/images with these names ---------- */
const IMAGES = {
  hero: '/assets/h1.png', // big plate image on the right of the hero
  pizza: '/assets/h2.png', // small round image in the "Weekly Special" card
  avatar: '/assets/h3.png', // Willimes James photo
  restaurant: '/assets/h4.png',
  cocktail: '/assets/h5.png',
  dining: '/assets/h6.png',
}

/* ---------- Colors & fonts ---------- */
const RED = '#f5214f'
const YELLOW = '#ffd400'
const heading = { fontFamily: "'Fredoka', sans-serif" }

/* Same container as the Header, so everything lines up with the logo */
const CONTAINER = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

/* Hides the image if the file isn't added yet (no broken-image icon) */
const Img = ({
  src,
  alt = '',
  className = '',
}: {
  src: string
  alt?: string
  className?: string
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    onError={(e) => {
      e.currentTarget.style.display = 'none'
    }}
  />
)

const cards = [
  { title: 'Restaurant', img: IMAGES.restaurant, offset: false },
  { title: 'Cocktail Bar', img: IMAGES.cocktail, offset: true },
  { title: 'Private Dining', img: IMAGES.dining, offset: false },
]

const categories = [
  { name: 'Dessert', Icon: Donut },
  { name: 'Steak', Icon: Drumstick },
  { name: 'Coffee', Icon: Coffee },
  { name: 'Burger', Icon: Sandwich },
]

const HomePage = () => {
  const [slide, setSlide] = useState(0)
  const [activeTab, setActiveTab] = useState('Dessert')

  return (
    <main style={{ fontFamily: "'League Spartan', sans-serif" }} className="bg-white">
      {/* Loads the fonts – no other setup needed */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=League+Spartan:wght@400;500;600;700&display=swap');`}</style>

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen overflow-hidden bg-[#0b0b0b]">
        {/* Right-side food image */}
        <div className="absolute inset-0">
          <Img
            src={IMAGES.hero}
            alt=""
            className="h-full w-full object-cover object-center"
          />

          {/* Gradient overlay on desktop only */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent lg:block" />
        </div>


        <div
          className={`${CONTAINER} relative z-10 py-16 sm:py-20 lg:py-0 lg:min-h-[680px] flex flex-col lg:flex-row items-start lg:items-center gap-10`}
        >
          {/* Left text – starts exactly under the logo */}
          <div className="max-w-xl">
            <h2
              style={heading}
              className="text-4xl sm:text-5xl lg:text-[60px] font-semibold leading-[1.15] text-white"
            >
              The Perfect Space to Enjoy Fantastic Food
            </h2>
            <p className="mt-5 text-[15px] sm:text-base text-gray-200 max-w-sm leading-relaxed">
              Festive dining at Farthings where we are strong believers in using the very
              best produce
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to="/menu"
                style={{ backgroundColor: RED, ['--tw-ring-color' as string]: RED }}
                className="px-7 py-3.5 text-white text-sm font-semibold rounded-md ring-2 ring-offset-2 ring-offset-black hover:brightness-110 transition"
              >
                See Our Menus
              </Link>
              <button
                aria-label="Play video"
                className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white/10 transition"
              >
                <Play size={16} fill="white" />
              </button>
              <span className="text-white text-xs font-semibold uppercase tracking-wide">
                Video
              </span>
            </div>

            {/* Slider dots */}
            <div className="mt-12 flex items-center gap-3">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition ${
                    slide === i ? 'bg-transparent border-2' : 'bg-white'
                  }`}
                  style={slide === i ? { borderColor: YELLOW } : undefined}
                />
              ))}
            </div>
          </div>

          {/* Weekly special card – right edge lines up with the header buttons */}
          <div
            style={{ borderColor: YELLOW }}
            className="relative w-full max-w-[340px] bg-black border-2 rounded-2xl p-4 pr-3 flex items-center justify-between lg:absolute lg:right-8 lg:bottom-14"
          >
            <span
              style={{ backgroundColor: RED }}
              className="absolute -top-3 right-6 text-white text-[10px] font-semibold px-2.5 py-1 rounded-sm"
            >
              Weekly Special
            </span>
            <div>
              <p style={heading} className="text-xl font-semibold text-white">
                <span style={{ color: RED }}>$</span>90.85
              </p>
              <p className="mt-1 text-white font-semibold text-sm">Sicilian Pizza</p>
              <div className="mt-1.5 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill={YELLOW} stroke={YELLOW} />
                ))}
              </div>
            </div>
            <div className="w-[88px] h-[88px] rounded-full overflow-hidden bg-neutral-800 border-4 border-white/90 shrink-0">
              <Img src={IMAGES.pizza} alt="Sicilian Pizza" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <p
                style={{ color: RED }}
                className="text-xs sm:text-[13px] font-bold uppercase tracking-wide"
              >
                About the Food Restaurant
              </p>
              <h3
                style={heading}
                className="mt-3 text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.2] text-black max-w-md"
              >
                New Ground with Dishes to be Enjoyed
              </h3>
            </div>

            <div className="lg:pt-6">
              <p className="text-sm sm:text-[15px] text-gray-500 leading-relaxed max-w-xl">
                Nisl quam nestibulum ac quam nec odio eleme aucan ligula. Orci varius nat
                oque pene titius et urient monte nescete ridiculus mus nellentesq um ac qu
                am nec odio rbine. Nisl quam nestibu aucan ligula.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-300 shrink-0">
                  <Img src={IMAGES.avatar} alt="Willimes James" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p style={heading} className="text-xl font-semibold text-black leading-tight">
                    Willimes James
                  </p>
                  <p className="text-xs sm:text-[13px] text-gray-700">
                    Director and Chief Operations Officer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Three image cards – full width, middle one sits lower */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 items-start">
            {cards.map((c) => (
              <div
                key={c.title}
                className={`bg-black rounded-[26px] p-3 aspect-[4/5] ${
                  c.offset ? 'sm:mt-10' : ''
                }`}
              >
                <div
                  style={{ borderColor: YELLOW }}
                  className="relative w-full h-full rounded-[18px] overflow-hidden border-[3px] bg-neutral-900"
                >
                  <Img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div
                    style={{ ...heading, backgroundColor: YELLOW }}
                    className="absolute bottom-0 left-0 right-0 py-3 text-center text-black font-semibold text-lg rounded-t-2xl"
                  >
                    {c.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CATEGORY TABS ===================== */}
      <section>
        <div className={CONTAINER}>
          {/* Bigger tabs: 4 equal columns on mobile, large fixed tabs from tablet up */}
          <div className="grid grid-cols-4 gap-3 sm:flex sm:justify-center sm:items-start sm:gap-6 lg:gap-8">
            {categories.map(({ name, Icon }) => {
              const active = activeTab === name
              return (
                <button
                  key={name}
                  onClick={() => setActiveTab(name)}
                  style={
                    active
                      ? {
                          backgroundColor: RED,
                          clipPath: 'polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)',
                        }
                      : undefined
                  }
                  className={`w-full sm:w-[140px] lg:w-[160px] flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all duration-200 ${
                    active
                      ? 'h-[104px] sm:h-[170px] lg:h-[190px] rounded-t-2xl text-white pb-2'
                      : 'h-[88px] sm:h-[140px] lg:h-[160px] rounded-2xl bg-white border-2 border-gray-200 text-black hover:border-gray-300 hover:-translate-y-0.5'
                  }`}
                >
                  <Icon
                    className="w-7 h-7 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                    strokeWidth={1.8}
                    style={{ color: active ? '#fff' : RED }}
                  />
                  <span
                    style={heading}
                    className="text-xs sm:text-lg lg:text-xl font-semibold"
                  >
                    {name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Light panel where the menu items for the active tab will go */}
          <div className="mt-8 sm:mt-10 bg-[#f1f5fb] rounded-t-[32px] min-h-[220px]">
            <MenuPanel tab={activeTab} />
          </div>
        </div>
      </section>

      <LowerSections />
      <BottomSections />
      <NewsSocial />
    </main>
  )
}

export default HomePage