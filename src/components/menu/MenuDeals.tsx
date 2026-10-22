import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Check } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cartSlice'
import type { AppDispatch } from '../../redux/store'

const RED = '#f5214f'
const YELLOW = '#ffd400'
const GREEN = '#4caf50'
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

const money = (n: number) => `$${n.toFixed(2)}`

/* red button with the offset ring from the design */
const RedButton = ({ onClick, children }: { onClick: () => void; children: string }) => (
  <button
    onClick={onClick}
    style={{ backgroundColor: RED, ['--tw-ring-color' as string]: RED }}
    className="h-11 px-8 rounded-lg text-white text-[13px] font-bold ring-2 ring-offset-[3px] ring-offset-white hover:brightness-110 active:scale-[0.98] transition"
  >
    {children}
  </button>
)

/* ===================== 1. COMPLIMENTARY COCKTAIL, COFFEE, ICE-TEA ===================== */
const complimentaryImages = ['h7.png', 'm12.png', 'h11.png', 'h10.png']

const products = [
  { id: 'comp-crispy-fried-chicken', name: 'Crispy Fried Chicken', price: 10.85, oldPrice: 14.85 },
  { id: 'comp-bbq-chicken-pizza', name: 'BBQ Chicken Pizza New', price: 13.17 },
  { id: 'comp-delicious-black-coffee', name: 'Delicious Black Coffee', price: 11.76, oldPrice: 21.76 },
  { id: 'comp-margherita-pizza', name: 'Margherita Pizza New', price: 15.8 },
].map((p, i) => ({ ...p, image: `/assets/${complimentaryImages[i]}` }))

const Complimentary = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleAdd = (p: (typeof products)[number]) => {
    dispatch(addItem({ id: p.id, name: p.name, price: p.price, image: p.image }))
    navigate('/cart') // opens the cart page with the product in it
  }

  const handleProductClick = (p: (typeof products)[number]) => {
    navigate(`/product/${p.id}`, { state: { product: p } })
  }

  return (
    <section className="bg-[#f1f5fb] pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className={CONTAINER}>
        <div className="text-center">
          <h2
            style={heading}
            className="mx-auto max-w-2xl text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-[1.25] text-black"
          >
            A Complimentary Cocktail, Coffee, Ice-Tea For You.
          </h2>
          <p className="mt-2 text-[10px] sm:text-xs text-gray-600">
            Enjoy a Cosmopolitan or a non-alcoholic espresso martini.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-5 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.id}
              onClick={() => handleProductClick(p)}
              className="relative cursor-pointer rounded-2xl bg-white px-4 pb-4 pt-24 shadow-[0_8px_30px_rgba(30,60,120,0.08)] hover:shadow-lg transition sm:pt-28"
            >
              {/* image on a red circle, popping out of the top of the card */}
              <div className="absolute inset-x-0 -top-12 flex h-36 justify-center sm:-top-14 sm:h-40">
                <span
                  style={{ backgroundColor: RED }}
                  className="absolute left-3 top-4 h-24 w-24 rounded-full sm:h-28 sm:w-28"
                />
                <Img src={p.image} alt={p.name} className="relative h-full w-auto max-w-full object-contain drop-shadow-lg" />
              </div>

              <p className="text-[9px] font-bold text-black">100 grams</p>
              <h4 style={heading} className="mt-1.5 pr-6 text-sm sm:text-[15px] font-semibold leading-snug text-black">
                {p.name}
              </h4>

              <div className="mt-3 flex items-end justify-between">
                <p className="flex items-baseline gap-1.5">
                  {p.oldPrice && (
                    <span className="text-[10px] font-semibold text-gray-500 line-through">{money(p.oldPrice)}</span>
                  )}
                  <span style={{ ...heading, color: RED }} className="text-base sm:text-lg font-semibold">
                    {money(p.price)}
                  </span>
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAdd(p)
                  }}
                  aria-label={`Add ${p.name} to cart`}
                  style={{ backgroundColor: YELLOW }}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-black hover:brightness-95 active:scale-95 transition"
                >
                  <ShoppingBag size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-[11px] sm:text-xs font-bold text-black">
          Booking Calling 24/7:{' '}
          <a href="tel:+1234567890" style={{ color: RED }} className="underline underline-offset-2 hover:opacity-80">
            +12 345 67890
          </a>
        </p>
      </div>
    </section>
  )
}

/* ===================== 2. BEST SELLER DEALS ===================== */
const deals = [
  { id: 'deal-fish-vegetables', name: 'Fish Vegetables', price: 9.5, oldPrice: 13.5 },
  { id: 'deal-buffet-vegas', name: 'Buffet Vegas', price: 10.85, oldPrice: 14.85 },
  { id: 'deal-fish-fry-grilled', name: 'Fish Fry Grilled', price: 12.4, oldPrice: 16.4 },
  { id: 'deal-tasty-snacks', name: 'Tasty Snacks', price: 8.75, oldPrice: 11.75 },
  { id: 'deal-smoked-chicken', name: 'Smoked Chicken', price: 14.2, oldPrice: 18.2 },
].map((d) => ({ ...d, image: '/assets/m12.png' }))

const perks = ['Fresh & Tasty', 'Best in organic foods', '100 Fresh Ingredients', 'Better for your Health']

const BestSeller = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [active, setActive] = useState(1) // Buffet Vegas is selected first, like the design
  const [added, setAdded] = useState(false)

  const deal = deals[active]

  const handleAdd = () => {
    dispatch(addItem({ id: deal.id, name: deal.name, price: deal.price, image: deal.image }))
    setAdded(true)
    navigate('/cart') // opens the cart page with the product in it
  }

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-5xl">
          <p style={{ color: RED }} className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">
            Weekly Special
          </p>
          <h2 style={heading} className="mt-2 text-4xl sm:text-5xl lg:text-[46px] font-semibold text-black">
            Best Seller Deals
          </h2>

          <div className="relative mt-8 grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:gap-4">
            {/* ---------- Left: red box with the deal list ---------- */}
            <div style={{ backgroundColor: RED }} className="rounded-2xl p-4 sm:p-5">
              <ul className="space-y-3">
                {deals.map((d, i) => {
                  const on = i === active
                  return (
                    <li key={d.id}>
                      <button
                        onClick={() => {
                          setActive(i)
                          setAdded(false)
                        }}
                        aria-pressed={on}
                        style={on ? { backgroundColor: YELLOW } : undefined}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                          on ? '' : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        <span
                          style={on ? { borderColor: RED } : undefined}
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            on ? '' : 'border-gray-400'
                          }`}
                        >
                          <span
                            style={on ? { backgroundColor: RED } : undefined}
                            className={`h-1.5 w-1.5 rounded-full ${on ? '' : 'bg-gray-500'}`}
                          />
                        </span>
                        <span style={heading} className="text-[13px] sm:text-sm font-semibold text-black">
                          {d.name}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* burger overlapping both boxes (desktop) */}
            <Img
              key={deal.image}
              src={deal.image}
              alt={deal.name}
              className="pointer-events-none absolute left-[43%] top-1/2 z-10 hidden w-[240px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-2xl lg:block xl:w-[270px]"
            />

            {/* ---------- Right: yellow-bordered details card ---------- */}
            <div
              style={{ borderColor: YELLOW }}
              className="flex flex-col justify-center rounded-2xl border-[3px] bg-white p-6 sm:p-8 lg:pl-28 xl:pl-32"
            >
              {/* burger inside the card on phones and tablets */}
              <Img
                key={`m-${deal.image}`}
                src={deal.image}
                alt={deal.name}
                className="mx-auto mb-4 h-40 w-auto object-contain drop-shadow-xl sm:h-48 lg:hidden"
              />

              <h3 style={heading} className="text-xl sm:text-2xl font-semibold text-black">
                {deal.name}
              </h3>

              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 min-[420px]:grid-cols-2">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-[11px] font-bold text-gray-800">
                    <Check size={14} strokeWidth={3.5} color={GREEN} className="shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex items-baseline gap-2.5">
                <span style={{ ...heading, color: RED }} className="text-2xl sm:text-3xl font-semibold">
                  {money(deal.price)}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-600 line-through">
                  {money(deal.oldPrice)}
                </span>
              </p>

              <div className="mt-5">
                <RedButton onClick={handleAdd}>{added ? 'Added' : 'Product'}</RedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== Everything under Food Services ===================== */
export const MenuDeals = () => (
  <>
    <Complimentary />
    <BestSeller />
  </>
)