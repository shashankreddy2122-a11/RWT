import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const IMAGES = {
  chef: '/assets/b2.png', // chef holding a plate
  pan: '/assets/h2.png', // outlined frying pan sketch behind the chef photo
  author: '/assets/b3.png', // small round photo
}

/* background image of the hero (public/assets/b1.png) */
const HERO_BG = '/assets/b1.png'

const YELLOW = '#ffc21a'
const BLOG_RED = '#EF294C'
const BLOG_GREEN = '#00A149'
const oswald = { fontFamily: "'Oswald', sans-serif" }
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

/* ===================== 1. HERO SLIDER ===================== */
const slides = [
  {
    title: ['Juicy', 'Burger', 'Combo'],
    text: 'Start Your Order Just Only $18.00',
    bg: HERO_BG, // background of this slide (change it here if one slide needs a different one)
  },
  {
    title: ['Awesome', 'Delicious', 'Pizza'],
    text: 'Star Your Order Just Only $25.00',
    bg: HERO_BG,
  },
  {
    title: ['Fresh', 'Grilled', 'Steak'],
    text: 'Start Your Order Just Only $32.00',
    bg: HERO_BG,
  },
]

const Hero = () => {
  const [active, setActive] = useState(1) // slide 2 shows first, like the design

  // auto-slide every 6 seconds (restarts when you click an arrow)
  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % slides.length), 6000)
    return () => clearTimeout(t)
  }, [active])

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length)
  const next = () => setActive((a) => (a + 1) % slides.length)

  const s = slides[active]

  return (
    <section style={{ overflowX: 'clip' }} className="relative z-10 bg-neutral-900">
      {/* background image (b1.png) */}
      <Img
        key={s.bg}
        src={s.bg}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />

      <div className={`${CONTAINER} relative z-10 py-14 sm:py-16 lg:flex lg:min-h-[540px] lg:items-center lg:py-12`}>
        <div key={active} className="animate-[blogFade_0.6s_ease] lg:pl-[4%]">
          <h1
            style={oswald}
            className="text-[56px] font-bold uppercase leading-[0.98] text-white sm:text-7xl lg:text-[92px]"
          >
            {s.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p style={oswald} className="mt-4 text-sm font-semibold text-white sm:text-[15px]">
            {s.text}
          </p>

          <Link
            to="/menu"
            style={{ ...oswald, backgroundColor: YELLOW }}
            className="mt-5 inline-flex items-center gap-2.5 px-7 py-4 text-[11px] font-semibold text-black transition hover:brightness-95 active:scale-[0.98]"
          >
            Order Now
            <ArrowRight size={15} strokeWidth={2.6} />
          </Link>

          {/* counter: 2 ——— / 3 */}
          <div style={oswald} className="mt-10 flex items-center gap-4 text-xs text-white sm:text-sm">
            <span>{active + 1}</span>
            <span className="h-px w-16 bg-white/80 sm:w-24" />
            <span>/ {slides.length}</span>

            <span className="ml-3 flex items-center gap-1">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/70 hover:bg-white hover:text-black transition"
              >
                <ArrowLeft size={13} />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/70 hover:bg-white hover:text-black transition"
              >
                <ArrowRight size={13} />
              </button>
            </span>
          </div>
        </div>
      </div>

      <style>{`@keyframes blogFade { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  )
}

/* ===================== 2. ABOUT / CHEF ===================== */
const About = () => (
  <section className="relative z-0 bg-white pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
    <div className={CONTAINER}>
      <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14 lg:gap-20">
        {/* chef photo with the pan sketch behind it */}
        <div className="relative mx-auto h-72 w-[260px] sm:h-80 sm:w-[300px] md:ml-8">
          <Img
            src={IMAGES.pan}
            className="pointer-events-none absolute -left-14 top-6 h-auto w-44 select-none opacity-70 sm:-left-20 sm:w-52"
          />
          <div className="absolute inset-y-0 right-0 aspect-[126/155] h-full overflow-hidden bg-neutral-800 shadow-md">
            <Img src={IMAGES.chef} alt="Chef holding a plate of pasta" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* text */}
        <div style={oswald}>
          <p className="text-[11px] font-medium uppercase tracking-wide">
            <span style={{ color: YELLOW }}>Learn Something Foodking</span>
          </p>

          <p className="mt-3 max-w-md text-[17px] font-semibold leading-snug text-[#1a1a1a] sm:text-lg">
            Welcome To Our Culinary Haven, Where Each Dish Is A Symphony Of Flavors Meticulously Crafted Tantalize Your
            Taste Buds. Nestled In The Heart Of [City], Our Restaurant Is An Inviting Space That Combines.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-800">
              <Img src={IMAGES.author} alt="Michael V. Christenson" className="h-full w-full object-cover" />
            </div>
            <p className="text-[11px] font-semibold text-[#1a1a1a]">
              Michael V. Christenson <span className="font-normal text-gray-500">/</span>{' '}
              <span className="text-[9px] font-normal text-gray-500">CEO &amp; Founder</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* ===================== 3. NEWS & BLOG ===================== */
const blogPosts = [
  {
    category: 'fast food',
    date: '28 Feb 2021',
    title: 'Culinary Chronicles Exploring Gastronomic Wonders At Foodking Restaurant',
    image: '/assets/b4.png',
  },
  {
    category: 'Health Care',
    date: '28 Feb 2021',
    title: 'Taste Sensations: Navigating The Epicurean Landscape Of Restaurant Name',
    image: '/assets/b5.png',
  },
  {
    category: 'Restaurants',
    date: '28 Feb 2021',
    title: 'Epicurean Insights Blogging Odyss Through Restaurant Name Culinary Universe',
    image: '/assets/b6.png',
  },
]

const NewsBlog = () => (
  <section className="bg-white pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
    <div className={CONTAINER}>
      {/* Section header */}
      <div className="text-center">
        <p style={{ ...oswald, color: BLOG_RED }} className="text-xs font-semibold uppercase tracking-wide">
          NEWS & BLOG
        </p>
        <h2 style={oswald} className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-bold text-black">
          Explore news & blog
        </h2>
      </div>

      {/* Blog cards */}
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <article key={index} className="overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            </div>

            {/* Content */}
            <div className="mt-4">
              {/* Category and date */}
              <div className="flex items-center justify-between">
                <p style={{ ...oswald, color: BLOG_RED }} className="text-xs font-semibold uppercase">
                  {post.category}
                </p>
                <p style={oswald} className="text-xs text-black">
                  {post.date}
                </p>
              </div>

              {/* Divider line */}
              <div className="my-3 h-px bg-gray-300" />

              {/* Title */}
              <h3 style={oswald} className="text-sm font-semibold leading-snug text-black sm:text-base">
                {post.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

/* ===================== 4. TESTIMONIAL ===================== */
const Testimonial = () => (
  <section className="bg-white pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
    <div className={CONTAINER}>
      <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14 lg:gap-20">
        {/* Left: Image with pan sketch behind */}
        <div className="relative mx-auto h-72 w-[260px] sm:h-80 sm:w-[300px] md:ml-8">
          <Img
            src={IMAGES.pan}
            className="pointer-events-none absolute -left-14 top-6 h-auto w-44 select-none opacity-70 sm:-left-20 sm:w-52"
          />
          <div className="absolute inset-y-0 right-0 aspect-[126/155] h-full overflow-hidden bg-neutral-800 shadow-md">
            <Img src="/assets/b2.png" alt="Piter Bowman" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Right: Content */}
        <div style={oswald} className="text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-black">Piter Bowman</h3>
          <p style={{ color: YELLOW }} className="mt-2 text-xs font-semibold uppercase tracking-wide">
            Business CEO & co founder
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
            "Thank you for dinner last night. It was amazing!! I have say it's the best meal I have had in quite some
            time. will definitely be seeing more eating next year."
          </p>

          {/* Five stars */}
          <div className="mt-4 flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                fill={YELLOW}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* ===================== 5. UPDATE NEWS ===================== */
const updatePosts = [
  {
    date: '15 Feb 2021',
    comments: 'comments',
    title: 'Quick Cravings: Unraveling Fast Food Delights',
    description:
      'There are many variations of passages of Lorem Ipsum available, but majority have suffered Lorem haca ullamcorper donec ante habi believable. If you are going to use a passage...',
    image: '/assets/b7.png',
  },
  {
    date: '15 Feb 2021',
    comments: 'comments',
    title: 'Veggie Vibes: Garden Fresh Delightful Creations',
    description:
      'There are many variations of passages of Lorem Ipsum available, but majority have suffered Lorem haca ullamcorper donec ante habi believable. If you are going to use a passage...',
    image: '/assets/b8.png',
  },
  {
    date: '15 Feb 2021',
    comments: 'comments',
    title: 'Bold Bite: Exotic Flavors, Global Adventure',
    description:
      'There are many variations of passages of Lorem Ipsum available, but majority have suffered Lorem haca ullamcorper donec ante habi believable. If you are going to use a passage...',
    image: '/assets/b9.png',
  },
]

const UpdateNews = () => (
  <section className="bg-white pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
    <div className={CONTAINER}>
      {/* Section header */}
      <div className="text-center">
        <p style={{ ...oswald, color: BLOG_GREEN }} className="text-xs font-semibold uppercase tracking-wide">
          news & blog
        </p>
        <h2 style={oswald} className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-bold text-black">
          Update news & blog
        </h2>
      </div>

      {/* Update cards */}
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {updatePosts.map((post, index) => (
          <article key={index} className="overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            </div>

            {/* Content */}
            <div className="mt-4">
              {/* Date and comments */}
              <div className="flex items-center justify-between">
                <p style={oswald} className="text-xs text-black">
                  {post.date}
                </p>
                <p style={oswald} className="text-xs text-black">
                  {post.comments}
                </p>
              </div>

              {/* Divider line */}
              <div className="my-3 h-px bg-gray-300" />

              {/* Title */}
              <h3 style={oswald} className="text-sm font-semibold leading-snug text-black sm:text-base">
                {post.title}
              </h3>

              {/* Description with gray background */}
              <div style={{ backgroundColor: '#f5f5f5' }} className="mt-3 rounded px-3 py-2">
                <p style={oswald} className="text-xs leading-relaxed text-gray-600">
                  {post.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

/* ===================== PAGE ===================== */
const BlogPage = () => (
  <main style={oswald} className="bg-white">
    {/* Loads the font – no other setup needed */}
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap');`}</style>

    <Hero />
    <About />
    <NewsBlog />
    <Testimonial />
    <UpdateNews />
  </main>
)

export default BlogPage