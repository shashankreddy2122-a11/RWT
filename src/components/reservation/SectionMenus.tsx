import { useState } from 'react'
import { Coffee, Store, Martini, Donut, Phone, Mail, MapPin } from 'lucide-react'

/* ---------- IMAGES: put your files in public/images with these names ---------- */
const IMAGES = {
  sponsor1: '/assets/s1.png', // Organic Food
  sponsor2: '/assets/s2.png', // Healthy Food
  sponsor3: '/assets/s3.png', // Vegetarian Restaurant
  sponsor4: '/assets/s4.png', // Vegetarian
  sponsor5: '/assets/s5.png', // Vegetarian Food
  sponsor6: '/assets/s6.png', // Vegan Food
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

/* ===================== 1. HIGHLY TRUSTED SPONSOR ===================== */
const sponsors = [
  { src: IMAGES.sponsor1, alt: 'Organic Food' },
  { src: IMAGES.sponsor2, alt: 'Healthy Food' },
  { src: IMAGES.sponsor3, alt: 'Vegetarian Restaurant' },
  { src: IMAGES.sponsor4, alt: 'Vegetarian' },
  { src: IMAGES.sponsor5, alt: 'Vegetarian Food' },
  { src: IMAGES.sponsor6, alt: 'Vegan Food' },
]

const Sponsors = () => (
  <section className="bg-white py-12 sm:py-14 lg:py-16">
    <div className={CONTAINER}>
      <h3
        style={heading}
        className="text-center text-base sm:text-lg font-semibold uppercase tracking-wide text-black"
      >
        Highly Trusted Sponsor
      </h3>

      <div className="mt-8 sm:mt-10 grid grid-cols-2 min-[480px]:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 items-center justify-items-center">
        {sponsors.map((s) => (
          <div key={s.alt} className="h-16 sm:h-20 w-full flex items-center justify-center">
            <Img src={s.src} alt={s.alt} className="max-h-full max-w-[140px] w-auto object-contain" />
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* ===================== 2. DELICIOUS MENUS ===================== */
type MenuItem = { name: string; price: number; desc: string }

const menus: { title: string; cardClass: string; items: MenuItem[] }[] = [
  {
    title: 'Breakfast',
    cardClass: '',
    items: [
      { name: 'Dasi Breakfast', price: 12, desc: 'Sausage, three rashers of streaky bacon, two fried eggs' },
      { name: 'Three Meat Skillet', price: 9, desc: 'Hickory House bacon, sausage, ham, cheddar cheese' },
      { name: 'Breakfast Bowl', price: 14, desc: 'Three eggs, tater tots, choice of bacon or sausage, shredded cheese' },
    ],
  },
  {
    title: 'Lunch',
    cardClass: 'lg:-mt-5', // middle card sits a little higher
    items: [
      { name: 'Potato Skins', price: 9, desc: 'Sour cream, bacon, cheddar cheese, olive oil' },
      { name: 'Apple Pie Pancakes', price: 9, desc: 'Spices. Slather with butter and dunk them in some homemade vanilla' },
      { name: 'Sweet Cream Waffle', price: 9, desc: 'Refrigerated, 2 Eggs ; Baking & Spices. 2 cups' },
      { name: 'Caesar Wrap', price: 9, desc: 'This classic handheld with tender chicken, Parmesan cheese and chopped' },
    ],
  },
  {
    title: 'Dinner',
    cardClass: 'lg:mt-1',
    items: [
      {
        name: 'Beef Lasagna Food',
        price: 9,
        desc: '2 olive oil, plus a little for the dish; 750g lean beef mince; 90g pack prosciutto',
      },
      {
        name: 'Chicken Mayo Roll',
        price: 9,
        desc: 'Cook the chicken in a grill pan, once the chicken is cooked place chicken',
      },
      { name: 'Mutton Curry', price: 9, desc: 'Mutton Curry' },
    ],
  },
]

const DeliciousMenus = () => (
  <div>
    <SectionTitle>Delicious Menus</SectionTitle>

    <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      {menus.map((m, idx) => (
        <article
          key={m.title}
          className={`rounded-3xl bg-white p-6 sm:p-7 shadow-[0_10px_40px_rgba(30,60,120,0.08)] ${m.cardClass} ${
            idx === 1 ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:col-span-1 lg:max-w-none' : ''
          }`}
        >
          {/* title with short yellow underline */}
          <h4 style={heading} className="relative inline-block pb-2.5 text-xl font-semibold text-black">
            {m.title}
            <span
              style={{ backgroundColor: YELLOW }}
              className="absolute left-0 bottom-0 w-6 h-[3px] rounded-full"
            />
          </h4>

          <ul className="mt-4">
            {m.items.map((item, i) => (
              <li
                key={item.name}
                className={`py-3.5 ${i !== m.items.length - 1 ? 'border-b border-gray-200' : ''} ${
                  i === 0 ? 'pt-2' : ''
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[13px] sm:text-sm font-bold text-black">{item.name}</p>
                  <p style={{ ...heading, color: RED }} className="shrink-0 text-[13px] sm:text-sm font-semibold">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-gray-600">{item.desc}</p>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </div>
)

/* ===================== 3. BEST SERVICES ===================== */
const services = [
  { title: 'Afternoon Tea', Icon: Coffee },
  { title: 'Takeaway & Delivery', Icon: Store },
  { title: 'Wine & Cocktails', Icon: Martini },
  { title: 'Alfresco Dining', Icon: Donut },
]

const Services = () => (
  <div>
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-start">
      <div>
        <p style={{ color: RED }} className="text-xs sm:text-[13px] font-bold uppercase tracking-wide">
          Best Solutions
        </p>
        <h2
          style={heading}
          className="mt-3 text-4xl sm:text-5xl lg:text-[50px] font-semibold leading-[1.2] text-black max-w-md"
        >
          We Provide Best Services
        </h2>
      </div>

      <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600 max-w-xl lg:pt-2 lg:ml-auto">
        Nisl quam nestibulum ac quam nec odio elementu aucan ligula. Orci varius natoque pena tibus et maurient monte
        nascete ridiculus mus nellentesque um ac quam nec odio rbine.
      </p>
    </div>

    <div className="mt-12 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {services.map(({ title, Icon }) => (
        <div key={title} className="flex flex-col items-center text-center">
          {/* yellow circle with an outer ring */}
          <div
            style={{ borderColor: YELLOW }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 p-1.5 sm:p-2"
          >
            <div
              style={{ backgroundColor: YELLOW }}
              className="w-full h-full rounded-full flex items-center justify-center text-black"
            >
              <Icon className="w-9 h-9 sm:w-11 sm:h-11" strokeWidth={1.5} />
            </div>
          </div>

          <h4 style={heading} className="mt-6 text-base sm:text-lg font-semibold text-black">
            {title}
          </h4>
          <p className="mt-2 text-[11px] sm:text-xs leading-relaxed text-gray-700 max-w-[180px]">
            Nisl quam nestibulum ac quam nec aucan ligula Orci varius.
          </p>
        </div>
      ))}
    </div>
  </div>
)

/* ===================== 4. GET IN TOUCH (booking form) ===================== */
const contacts = [
  { label: 'for booking', value: '+1 (850) 344 0 66', Icon: Phone, href: 'tel:+18503440066' },
  { label: 'for private dining', value: 'info@foodio.com', Icon: Mail, href: 'mailto:info@foodio.com' },
  { label: 'location', value: 'New Street Town 2512x (U.S)', Icon: MapPin, href: undefined },
]

const fieldCls =
  'h-12 sm:h-[52px] w-full rounded-md border-2 border-gray-200 bg-white px-5 text-xs sm:text-[13px] font-semibold text-black placeholder:text-gray-700 outline-none focus:border-[#f5214f] transition-colors'

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
    className={fieldCls}
  />
)

const GetInTouch = () => {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.currentTarget.reset()
    // connect your booking service here
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={CONTAINER}>
        <p style={{ color: RED }} className="text-xs sm:text-[13px] font-bold uppercase tracking-wide">
          Get in Touch
        </p>
        <h2
          style={heading}
          className="mt-3 text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.2] text-black max-w-xl"
        >
          Reservation Table &amp; Enjoy Dining Table
        </h2>

        <div className="mt-10 lg:mt-12 grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-12 items-start">
          {/* ---------- Contact info ---------- */}
          <ul className="space-y-6 sm:space-y-7">
            {contacts.map(({ label, value, Icon, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span
                  style={{ backgroundColor: YELLOW }}
                  className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-black"
                >
                  <Icon size={22} strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <p style={{ color: RED }} className="text-[11px] font-bold">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-0.5 block text-[13px] font-bold text-gray-800 hover:text-[#f5214f] transition-colors break-words"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-[13px] font-bold text-gray-800">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* ---------- Form ---------- */}
          <form onSubmit={onSubmit} className="w-full lg:max-w-[760px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="sm:col-span-2">
                <input
                  type="number"
                  min={1}
                  required
                  placeholder="No of Guest"
                  aria-label="No of Guest"
                  className={fieldCls}
                />
              </div>

              <input type="text" required placeholder="Full Name" aria-label="Full Name" className={fieldCls} />
              <input type="tel" required placeholder="Phone No" aria-label="Phone No" className={fieldCls} />

              <FlipInput type="date" placeholder="Date" />
              <FlipInput type="time" placeholder="Time" />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-4">
              {sent && (
                <p className="text-sm font-semibold" style={{ color: RED }}>
                  Thanks! We'll confirm your table soon.
                </p>
              )}
              <button
                type="submit"
                style={{ backgroundColor: RED, ['--tw-ring-color' as string]: RED }}
                className="h-11 px-8 rounded-lg text-white text-[13px] font-bold ring-2 ring-offset-[3px] ring-offset-white hover:brightness-110 active:scale-[0.98] transition"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ===================== Everything under the Good Food section ===================== */
export const ServicesMenus = () => (
  <>
    <Sponsors />

    <section className="bg-[#f1f5fb] py-16 sm:py-20 lg:py-24">
      <div className={CONTAINER}>
        <DeliciousMenus />
        <div className="mt-20 sm:mt-24 lg:mt-28">
          <Services />
        </div>
      </div>
    </section>
    <GetInTouch />
  </>
)