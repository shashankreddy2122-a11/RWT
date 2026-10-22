import { useState } from 'react'
import { Star } from 'lucide-react'

const RED = '#f5214f'
const AMBER = '#f2a73b'
const GREEN = '#2e8b57'
const font = { fontFamily: "'Nunito', sans-serif" }

/* overall rating summary (left side of the card) */
const summary = {
  rating: 4.9,
  total: '5000+',
  bars: [
    { stars: 5, percentage: 95 },
    { stars: 4, percentage: 5 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ],
}

/* testimonials (right side of the card) – the dots switch between them */
const testimonials = [
  {
    text: "Botanica rice crackers are a staple in my pantry. They are a healthier alternative to traditional crackers and chips, but still satisfy my craving for something spicy and crunchy. Chilli garlic flavor is my personal favorite - it's so delicious!",
    author: 'Jennifer - From California',
  },
  {
    text: 'I love how light and crispy they are. Perfect with a dip for movie night, and the whole family keeps asking for more. We order every month now.',
    author: 'Daniel - From Texas',
  },
  {
    text: 'Great taste and fast delivery. The seaweed flavor is my new favorite snack for work, and it never feels heavy.',
    author: 'Priya - From New York',
  },
]

export default function ReviewsAndNewsletter() {
  const [active, setActive] = useState(0)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // connect your newsletter service here
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 4000)
  }

  const t = testimonials[active]

  return (
    <section style={font} className="relative bg-white py-14 sm:py-16 lg:py-20">
      {/* Loads the font – no other setup needed */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* ===================== REVIEWS CARD ===================== */}
          <div className="relative">
            {/* tilted red card behind */}
            <div
              aria-hidden="true"
              style={{ backgroundColor: RED }}
              className="absolute inset-0 scale-[1.01] rotate-[1.2deg] rounded-md sm:rotate-[1.4deg]"
            />

            {/* white card */}
            <div className="relative z-10 grid rounded-md bg-white shadow-[0_12px_32px_rgba(0,0,0,0.14)] lg:grid-cols-[320px_1fr]">
              {/* ---------- Left: rating summary ---------- */}
              <div className="relative border-b border-gray-200 px-6 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:px-6 lg:py-12">
                <p style={{ color: RED }} className="text-center text-6xl sm:text-7xl font-black leading-none">
                  {summary.rating}
                </p>
                <p className="mt-2 text-center text-[11px] text-gray-700">Based on {summary.total} reviews</p>

                <ul className="mx-auto mt-6 max-w-[260px] space-y-2.5 lg:mx-0 lg:max-w-none">
                  {summary.bars.map((b) => (
                    <li key={b.stars} className="flex items-center gap-3">
                      {/* small amber stars */}
                      <span className="flex shrink-0 gap-px" aria-label={`${b.stars} stars`}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={9}
                            strokeWidth={2}
                            stroke={AMBER}
                            fill={i < b.stars ? AMBER : 'none'}
                          />
                        ))}
                      </span>

                      {/* bar */}
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <span
                          className="block h-full rounded-full"
                          style={{ width: `${b.percentage}%`, backgroundColor: RED }}
                        />
                      </span>

                      <span className="w-8 shrink-0 text-right text-[10px] text-gray-700">{b.percentage}%</span>
                    </li>
                  ))}
                </ul>

                {/* notch on the divider, pointing right (desktop only) */}
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-gray-200 bg-white lg:block"
                />
              </div>

              {/* ---------- Right: testimonial ---------- */}
              <div className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill={RED} stroke={RED} />
                  ))}
                </div>

                <p
                  key={active}
                  className="mt-5 max-w-2xl animate-[fadeIn_0.5s_ease] text-[13px] sm:text-sm leading-[1.9] text-gray-600"
                >
                  {t.text}
                </p>

                <p className="mt-5 text-[11px] font-bold text-gray-700">{t.author}</p>

                {/* dots: the active one has a green ring */}
                <div className="mt-8 flex items-center gap-3">
                  {testimonials.map((_, i) => {
                    const on = i === active
                    return (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`Show review ${i + 1}`}
                        aria-current={on}
                        className="flex h-4 w-4 items-center justify-center rounded-full"
                        style={on ? { border: `1px solid ${GREEN}` } : undefined}
                      >
                        <span
                          className="block rounded-full"
                          style={{
                            width: on ? 5 : 4,
                            height: on ? 5 : 4,
                            backgroundColor: RED,
                            opacity: on ? 1 : i === 1 ? 0.85 : 0.35,
                          }}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ===================== NEWSLETTER ===================== */}
          <div className="relative mt-20 sm:mt-28 lg:mt-36">
            {/* light-blue band behind the lower half of the red box */}
            <div
              aria-hidden="true"
              className="absolute -inset-x-[50vw] bottom-[-3.5rem] top-1/2 bg-[#f1f5fb] sm:bottom-[-5rem]"
            />

            <div
              style={{ backgroundColor: RED }}
              className="relative overflow-hidden rounded-2xl px-6 py-8 shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:px-9 sm:py-9 lg:px-[34px]"
            >
              <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,330px)_1fr] lg:gap-10">
                {/* text */}
                <div>
                  <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-[32px]">
                    Subscribe Newsletter
                  </h2>
                  <p className="mt-2 max-w-[240px] text-[11px] leading-relaxed text-white">
                    Sign up for newsletter to receive special offers and exclusive news about Botanica products
                  </p>
                </div>

                {/* form */}
                <form onSubmit={onSubscribe} className="relative mt-3 lg:mt-5">
                  {/* dashed arrow scribble (desktop) */}
                  <svg
                    viewBox="0 0 90 50"
                    className="pointer-events-none absolute -left-3 -top-7 hidden h-12 w-20 lg:block"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 10 C26 0, 60 6, 70 32" strokeDasharray="5 4" />
                    <path d="M61 28 L71 36 L74 23" />
                  </svg>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    aria-label="Enter Your Email"
                    className="h-11 w-full rounded-full border border-black/60 bg-transparent pl-6 pr-36 text-[11px] text-white outline-none placeholder:text-white focus:border-white sm:h-12 sm:pr-40"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-11 rounded-full bg-white px-6 text-[11px] font-extrabold uppercase text-black transition hover:bg-gray-100 active:scale-[0.97] sm:h-12 sm:px-9"
                  >
                    Subscribe
                  </button>

                  {done && <p className="mt-3 text-sm font-bold text-white">Thanks for subscribing!</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  )
}