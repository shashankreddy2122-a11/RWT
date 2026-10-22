import { useEffect, useState } from 'react'

/* ---------- IMAGES: put your files in public/images with these names ---------- */
const IMAGES = {
  // testimonials collage
  fbCoffee: '/assets/h12.png',
  fbPattern: '/assets/h13.png', // optional texture on the red square
  fbDessert: '/assets/h14.png',
  // chefs (transparent PNGs work best)
  chef1: '/assets/h15.png',
  chef2: '/assets/h16.png',
  chef3: '/assets/h17.png',
  // app section
  appPhone: '/assets/h18.png', // phone in hand
  scooter: '/assets/h19.png',
  pizza: '/assets/h20.png',
  bowl: '/assets/h21.png',
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

/* ===================== TESTIMONIALS ===================== */
const testimonials = [
  {
    text: 'A good restaurant is like a vacation; it transports you, and it becomes a lot more than just about the food. All great deeds and all great thoughts',
    name: 'Bratlee Hamint',
  },
  {
    text: 'Every dish arrived fresh and full of flavour. The staff made our family dinner feel special, and we are already planning our next visit.',
    name: 'Sara Jonhson',
  },
  {
    text: 'The best place in town for a relaxed evening. Great coffee, lovely desserts and a warm welcome every single time we come in.',
    name: 'Daniel Rowe',
  },
]

const Testimonials = () => {
  const [active, setActive] = useState(0)

  // auto-slide every 6 seconds (restarts when you click a dot)
  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % testimonials.length), 6000)
    return () => clearTimeout(t)
  }, [active])

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className={`${CONTAINER} grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
        {/* Left: text + card + dots */}
        <div>
          <Eyebrow>Testimonials & Reviews</Eyebrow>
          <h2
            style={heading}
            className="mt-3 text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.2] text-black max-w-md"
          >
            Our Customar Feedbacks
          </h2>

          {/* stacked cards, only the active one is visible (keeps the height steady) */}
          <div className="mt-8 grid max-w-xl">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                aria-hidden={i !== active}
                style={{ borderColor: YELLOW }}
                className={`col-start-1 row-start-1 relative rounded-2xl border-[3px] bg-white p-6 sm:p-8 pb-10 transition-opacity duration-500 ${
                  i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <p className="text-sm sm:text-[15px] leading-relaxed text-gray-700">{t.text}</p>
                <p style={heading} className="mt-5 text-base font-bold text-black">
                  {t.name}
                </p>
                <span
                  style={{ backgroundColor: YELLOW }}
                  className="absolute right-4 bottom-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
              </div>
            ))}
          </div>

          {/* dots */}
          <div className="mt-8 flex items-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                aria-label={`Show review ${i + 1}`}
                style={i === active ? { borderColor: RED } : undefined}
                className={`w-3 h-3 rounded-full transition ${
                  i === active ? 'bg-transparent border-2' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: image collage (scales with the screen) */}
        <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[460px] aspect-[1/1.05]">
          {/* coffee – top right */}
          <div className="absolute left-[35%] top-0 w-[46%] aspect-square rounded-2xl overflow-hidden bg-neutral-300 shadow-lg z-10">
            <Img src={IMAGES.fbCoffee} alt="Coffee" className="w-full h-full object-cover" />
          </div>
          {/* red square – middle left */}
          <div
            style={{ backgroundColor: RED }}
            className="absolute left-0 top-[44%] w-[46%] aspect-square rounded-2xl overflow-hidden"
          >
            <Img
              src={IMAGES.fbPattern}
              alt=""
              className="w-full h-full object-cover opacity-30 mix-blend-multiply"
            />
          </div>
          {/* dessert – bottom right */}
          <div className="absolute left-[54%] top-[56%] w-[46%] aspect-square rounded-2xl overflow-hidden bg-neutral-300 shadow-lg">
            <Img src={IMAGES.fbDessert} alt="Dessert" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== MEET OUR EXPERTS ===================== */
const experts = [
  { name: 'Thomas Walim', role: 'Dessert specialist', img: IMAGES.chef1 },
  { name: 'James Jhonson', role: 'Chef Master', img: IMAGES.chef2 },
  { name: 'Room Minal', role: 'Dessert specialist', img: IMAGES.chef3 },
]

const Signature = () => (
  <svg viewBox="0 0 130 34" className="w-24 h-7 text-black" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M4 24 C12 6, 22 30, 32 12 S50 22, 58 10 M30 27 C56 22, 88 29, 124 20" />
  </svg>
)

const socials = [
  {
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" transform="translate(0 0) scale(.85) translate(2 2)" />
      </svg>
    ),
  },
  {
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

const Experts = () => (
  <section className="pb-16 sm:pb-20 lg:pb-28">
    <div className={CONTAINER}>
      <SectionTitle>Meet Our Experts</SectionTitle>

      <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-6 lg:gap-12">
        {experts.map((e) => (
          <article key={e.name} className="flex flex-col items-center">
            {/* chef photo overlaps the top of the circle */}
            <div className="relative z-10 h-56 sm:h-52 lg:h-72 w-full flex items-end justify-center">
              <Img src={e.img} alt={e.name} className="h-full w-auto max-w-full object-contain object-bottom" />
            </div>

            {/* circle card */}
            <div className="-mt-16 sm:-mt-14 lg:-mt-20 w-full max-w-[280px] sm:max-w-none aspect-square rounded-full border-2 border-gray-200 bg-white flex flex-col items-center justify-end text-center pb-8 sm:pb-6 lg:pb-12 px-4">
              <p style={{ color: RED }} className="text-[11px] sm:text-xs font-bold">
                {e.role}
              </p>
              <h4 style={heading} className="mt-1 text-xl sm:text-lg lg:text-2xl font-semibold text-black">
                {e.name}
              </h4>

              <div className="mt-3 flex items-center gap-2 sm:gap-1.5 lg:gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={`${e.name} on ${s.label}`}
                    className="w-8 h-8 sm:w-7 sm:h-7 lg:w-9 lg:h-9 rounded-full bg-[#eaf1fb] text-gray-500 hover:bg-[#f5214f] hover:text-white flex items-center justify-center transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <div className="mt-3 sm:mt-2 lg:mt-4">
                <Signature />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

/* ===================== Everything under Featured Dishes ===================== */
export const BottomSections = () => (
  <>
    <Testimonials />
    <Experts />
  </>
)