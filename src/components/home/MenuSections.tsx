import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Check } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addItem, openCart } from '../../redux/cartSlice'
import type { AppDispatch } from '../../redux/store'

const IMAGES = {
  bbqPlate: '/assets/h7.png',
  steaks: '/assets/h8.png',
  cocktails: '/assets/h9.png',
  chicken: '/assets/h7.png',
  burger: '/assets/h10.png',
  coffee: '/assets/h11.png',
}

const RED = '#f5214f'
const YELLOW = '#ffd400'
const heading = { fontFamily: "'Fredoka', sans-serif" }
const CONTAINER = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

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

/* ===================== MENU PANEL (changes with the category tab) ===================== */
const MENUS: Record<
  string,
  { title: string; image?: string; items: { name: string; desc: string; price: number }[] }
> = {
  Dessert: {
    title: 'BBQ',
    image: IMAGES.bbqPlate,
    items: [
      { name: 'Sake BBQ sauce', desc: 'radish, black sesame seeds, coriander', price: 9 },
      { name: 'BBQ baby back ribs', desc: 'sticky Asian glaze, charred lime, chilli cashews', price: 16 },
      { name: 'Half smoked chicken', desc: 'miso butter glaze, charred lime wedge, sake bbq', price: 34 },
      { name: 'Dusted chicken wings', desc: 'tossed in Korean hot sauce, pickled radish', price: 40 },
    ],
  },
  Steak: {
    title: 'BBQ',
    image: IMAGES.bbqPlate,
    items: [
      { name: 'Sake BBQ sauce', desc: 'radish, black sesame seeds, coriander', price: 9 },
      { name: 'BBQ baby back ribs', desc: 'sticky Asian glaze, charred lime, chilli cashews', price: 16 },
      { name: 'Half smoked chicken', desc: 'miso butter glaze, charred lime wedge, sake bbq', price: 34 },
      { name: 'Dusted chicken wings', desc: 'tossed in Korean hot sauce, pickled radish', price: 40 },
    ],
  },
  Coffee: {
    title: 'Coffee',
    items: [
      { name: 'Flat white', desc: 'double espresso, silky steamed milk', price: 4 },
      { name: 'Delicious black coffee', desc: 'single origin, slow brewed', price: 5 },
      { name: 'Caramel latte', desc: 'espresso, caramel, steamed milk', price: 6 },
      { name: 'Iced mocha', desc: 'chocolate, espresso, cold milk, ice', price: 7 },
    ],
  },
  Burger: {
    title: 'Burgers',
    items: [
      { name: 'Shroom bacon burger', desc: 'beef patty, roasted mushrooms, crispy bacon', price: 14 },
      { name: 'Classic cheeseburger', desc: 'cheddar, pickles, house sauce', price: 12 },
      { name: 'Crispy chicken burger', desc: 'buttermilk chicken, slaw, hot honey', price: 13 },
      { name: 'Loaded fries', desc: 'cheese sauce, jalapeño, crispy onions', price: 8 },
    ],
  },
}

export const MenuPanel = ({ tab }: { tab: string }) => {
  const menu = MENUS[tab] ?? MENUS.Steak

  return (
    <div className={`bg-[#f1f5fb] rounded-[28px] lg:rounded-[32px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10 grid ${menu.image ? 'lg:grid-cols-[340px_1fr] gap-8 lg:gap-12' : 'lg:grid-cols-1'} items-center`}>
      {menu.image && (
        <div className="mx-auto w-56 h-56 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px] lg:-ml-16 lg:-my-6 rounded-full bg-white/60">
          <Img src={menu.image} alt={menu.title} className="w-full h-full object-contain drop-shadow-xl" />
        </div>
      )}

      {/* Menu list */}
      <div className="lg:pr-4">
        {/* Title */}
        <h4 style={heading} className="text-3xl sm:text-4xl font-bold text-black leading-none">
          {menu.title}
        </h4>

        <ul className="mt-6 sm:mt-8">
          {menu.items.map((item, i) => (
            <li
              key={item.name}
              className={`py-4 sm:py-[18px] ${
                i !== menu.items.length - 1 ? 'border-b-[1.5px] border-dashed border-black' : ''
              } ${i === 0 ? 'pt-0' : ''}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                {/* Item name */}
                <p className="font-bold text-[15px] sm:text-base text-black leading-snug">{item.name}</p>
                {/* Price */}
                <p style={{ ...heading, color: RED }} className="font-semibold text-[15px] sm:text-base shrink-0">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <p className="mt-1.5 text-[12.5px] sm:text-[13px] text-gray-600 leading-snug">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ===================== DISCOVER MENU ===================== */
const discover = [
  { title: 'Steaks & BBQ', sub: 'canonical classics to obscure tiki drinks', price: 120, img: IMAGES.steaks },
  { title: 'Cocktails', sub: 'canonical classics to obscure tiki drinks', price: 120, img: IMAGES.cocktails },
]

const DiscoverMenu = () => (
  <section className="py-16 sm:py-20 lg:py-24">
    <div className={CONTAINER}>
      <SectionTitle>Discover Menu</SectionTitle>

      <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 pb-4">
        {discover.map((d) => (
          <div key={d.title} className="relative">
            {/* card (clips the image) */}
            <div className="relative overflow-hidden rounded-2xl bg-black min-h-[230px] sm:min-h-[260px]">
              <Img src={d.img} alt={d.title} className="absolute inset-y-0 right-0 w-3/5 h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              <div className="relative z-10 p-6 sm:p-8 pb-28 max-w-[65%]">
                <h4 style={heading} className="text-2xl sm:text-3xl font-semibold text-white">
                  {d.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-gray-200 max-w-[190px]">{d.sub}</p>
              </div>
            </div>

            {/* price badge hangs over the bottom-left edge */}
            <div
              style={{ backgroundColor: YELLOW }}
              className="absolute left-5 sm:left-7 -bottom-5 w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-full flex flex-col items-center justify-center"
            >
              <span style={heading} className="text-xl sm:text-2xl font-semibold leading-none text-black">
                <span style={{ color: RED }}>$</span>
                {d.price}
              </span>
              <span className="text-[10px] font-bold text-black mt-0.5">person</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* ===================== RESERVE A TABLE ===================== */
const inputCls =
  'h-11 w-full rounded-md bg-white px-4 text-xs sm:text-[13px] text-black placeholder:text-gray-700 outline-none focus:ring-2 focus:ring-[#ffd400]'

/* shows "Date" / "Time" as text, turns into a real picker when tapped */
const FlipInput = ({ type, placeholder }: { type: 'date' | 'time'; placeholder: string }) => (
  <input
    type="text"
    placeholder={placeholder}
    aria-label={placeholder}
    onFocus={(e) => {
      e.currentTarget.type = type
    }}
    onBlur={(e) => {
      if (!e.currentTarget.value) e.currentTarget.type = 'text'
    }}
    className={inputCls}
  />
)

const ReserveTable = () => {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.currentTarget.reset()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div
      style={{ backgroundColor: RED }}
      className="rounded-2xl px-6 py-8 sm:px-10 lg:px-12 lg:py-10 grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-12 items-center"
    >
      <div>
        <h3 style={heading} className="text-3xl sm:text-4xl font-semibold leading-tight text-white">
          RESERVE
          <br />
          <span className="underline decoration-[3px] underline-offset-4" style={{ textDecorationColor: YELLOW }}>
            A TABLE
          </span>
        </h3>
        <p className="mt-3 text-xs sm:text-[13px] text-white">Discover our New Menu !</p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-12 gap-3">
        <div className="col-span-12 sm:col-span-6">
          <input type="number" min={1} placeholder="No of Guest" aria-label="No of Guest" required className={inputCls} />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <FlipInput type="date" placeholder="Date" />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <FlipInput type="time" placeholder="Time" />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <input type="text" placeholder="Full Name" aria-label="Full Name" required className={inputCls} />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <input type="tel" placeholder="Phone No" aria-label="Phone No" required className={inputCls} />
        </div>

        <div className="col-span-12 flex items-center justify-end gap-4">
          {sent && <p className="text-sm font-semibold text-white">Thanks! We'll confirm your table soon.</p>}
          <button
            type="submit"
            style={{ backgroundColor: YELLOW }}
            className="h-11 px-8 rounded-md text-sm font-bold text-black ring-2 ring-white/50 ring-offset-2 ring-offset-[#f5214f] hover:brightness-95 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

/* ===================== FEATURED DISHES (bag → header cart) ===================== */
const dishes = [
  { id: 'crispy-fried-chicken', name: 'Crispy Fried Chicken', price: 10.85, oldPrice: 14.85, image: IMAGES.chicken },
  { id: 'shroom-bacon-burger', name: 'Shroom Bacon Burger', price: 11.76, oldPrice: 21.76, image: IMAGES.burger },
  { id: 'delicious-black-coffee', name: 'Delicious Black Coffee', price: 11.76, oldPrice: 21.76, image: IMAGES.coffee },
]

const FeaturedDishes = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [justAdded, setJustAdded] = useState<string | null>(null)

  const handleAdd = (d: (typeof dishes)[number]) => {
    dispatch(addItem({ id: d.id, name: d.name, price: d.price, image: d.image }))
    dispatch(openCart()) // delete this line if you don't want the cart to slide open on every click
    setJustAdded(d.id)
    setTimeout(() => setJustAdded(null), 1200)
  }

  return (
    <section className="bg-[#f1f5fb] pt-14 sm:pt-16 pb-16 sm:pb-24">
      <div className={CONTAINER}>
        <SectionTitle>Featured Dishes</SectionTitle>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
          {dishes.map((d) => (
            <article
              key={d.id}
              onClick={() => navigate(`/product/${d.id}`, { state: { product: d } })}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate(`/product/${d.id}`, { state: { product: d } })
                }
              }}
              role="link"
              tabIndex={0}
              style={{ borderColor: YELLOW }}
              className="relative cursor-pointer rounded-2xl border-2 bg-white p-5 sm:p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <span
                style={{ backgroundColor: YELLOW }}
                className="absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-bold text-black"
              >
                SALE
              </span>

              {/* image on a red blob */}
              <div className="relative h-48 sm:h-52 flex items-center justify-center">
                <span
                  style={{ backgroundColor: RED }}
                  className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-40 h-40 sm:w-44 sm:h-44 rounded-full"
                />
                <Img src={d.image} alt={d.name} className="relative w-44 h-44 sm:w-48 sm:h-48 object-contain drop-shadow-lg" />
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-black">{d.name}</h4>
                  <p className="mt-1 flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-gray-500 line-through">${d.oldPrice.toFixed(2)}</span>
                    <span style={{ ...heading, color: RED }} className="text-lg font-semibold">
                      ${d.price.toFixed(2)}
                    </span>
                  </p>
                </div>

                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    handleAdd(d)
                  }}
                  aria-label={`Add ${d.name} to cart`}
                  style={{ backgroundColor: YELLOW }}
                  className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-black hover:brightness-95 active:scale-95 transition"
                >
                  {justAdded === d.id ? <Check size={18} strokeWidth={3} /> : <ShoppingBag size={18} />}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== Everything below the category tabs ===================== */
export const LowerSections = () => (
  <>
    <DiscoverMenu />

    {/* Reserve block sits half on white, half on the light-blue background */}
    <section className="relative">
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[#f1f5fb]" aria-hidden="true" />
      <div className={`${CONTAINER} relative`}>
        <ReserveTable />
      </div>
    </section>

    <FeaturedDishes />
  </>
)