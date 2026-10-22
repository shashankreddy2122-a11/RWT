import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Leaf, ShoppingBasket, Star, Zap } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cartSlice'
import type { AppDispatch } from '../../redux/store'

const GREEN = '#0b7a3f'
const LIME = '#c5f04b'
const PINK = '#ffdde2'
const nunito = { fontFamily: "'Nunito', sans-serif" }

const PAGE_SIZE = 8
const TABS = ['Vegetable', 'Fruits', 'Drink', 'Bee Products'] as const
type Category = (typeof TABS)[number]

type Product = {
  id: string
  name: string
  category: Category
  price: number
  oldPrice?: number
  discount?: string
  soldOut?: boolean
  countdown?: boolean
  image: string
}

const products: Product[] = (
  [
    /* ---------- Vegetable (page 1 = the 8 from your design) ---------- */
    { id: 'ffp-broccoli', name: 'Green Broccoli', category: 'Vegetable', price: 8, oldPrice: 9, discount: '-11%' },
    { id: 'ffp-onion-1', name: 'Purple Onion', category: 'Vegetable', price: 10, oldPrice: 12, discount: '-17%', countdown: true },
    { id: 'ffp-pepper', name: 'Chile Bell Pepper', category: 'Vegetable', price: 18 },
    { id: 'ffp-cabbage', name: 'Green Cabbage', category: 'Vegetable', price: 15 },
    { id: 'ffp-corn', name: 'Roasted Corn', category: 'Vegetable', price: 15 },
    { id: 'ffp-asparagus', name: 'Organic Asparagus', category: 'Vegetable', price: 16, oldPrice: 19, discount: '-16%' },
    { id: 'ffp-onion-2', name: 'Purple Onion', category: 'Vegetable', price: 18, soldOut: true },
    { id: 'ffp-tomato', name: 'Cherry Tomato', category: 'Vegetable', price: 14 },
    /* ---------- Vegetable (page 2) ---------- */
    { id: 'ffp-carrot', name: 'Fresh Carrots', category: 'Vegetable', price: 9 },
    { id: 'ffp-spinach', name: 'Baby Spinach', category: 'Vegetable', price: 7 },
    { id: 'ffp-potato', name: 'Sweet Potato', category: 'Vegetable', price: 11 },
    { id: 'ffp-mushroom', name: 'Button Mushrooms', category: 'Vegetable', price: 13, oldPrice: 15, discount: '-13%' },
    /* ---------- Fruits ---------- */
    { id: 'ffp-strawberry', name: 'Fresh Strawberries', category: 'Fruits', price: 12 },
    { id: 'ffp-avocado', name: 'Australian Avocado', category: 'Fruits', price: 15, oldPrice: 18, discount: '-17%' },
    { id: 'ffp-pomegranate', name: 'Pomegranate', category: 'Fruits', price: 14 },
    { id: 'ffp-mango', name: 'Sweet Mango', category: 'Fruits', price: 16 },
    /* ---------- Drink ---------- */
    { id: 'ffp-orange-juice', name: 'Fresh Orange Juice', category: 'Drink', price: 6 },
    { id: 'ffp-coconut-water', name: 'Coconut Water', category: 'Drink', price: 5 },
    { id: 'ffp-smoothie', name: 'Green Smoothie', category: 'Drink', price: 8 },
    { id: 'ffp-lemon-tea', name: 'Iced Lemon Tea', category: 'Drink', price: 4 },
    /* ---------- Bee Products ---------- */
    { id: 'ffp-honey', name: 'Wild Honey', category: 'Bee Products', price: 18 },
    { id: 'ffp-honeycomb', name: 'Honeycomb', category: 'Bee Products', price: 22 },
    { id: 'ffp-pollen', name: 'Bee Pollen', category: 'Bee Products', price: 15 },
    { id: 'ffp-jelly', name: 'Royal Jelly', category: 'Bee Products', price: 28, oldPrice: 32, discount: '-13%' },
  ] as Omit<Product, 'image'>[]
).map((p, index) => ({
  ...p,
  image: `/assets/p${(index % 8) + 10}.png`,
}))

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
const pad = (n: number) => String(n).padStart(2, '0')

/* ---------- Live countdown shown on one card: 130 days 04:57:55 ---------- */
function Countdown() {
  const [left, setLeft] = useState(130 * 86400 + 4 * 3600 + 57 * 60 + 55)

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const items = [
    { label: 'Days', value: Math.floor(left / 86400) },
    { label: 'Hours', value: Math.floor((left % 86400) / 3600) },
    { label: 'Mins', value: Math.floor((left % 3600) / 60) },
    { label: 'Secs', value: left % 60 },
  ]

  return (
    <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex h-8 w-[30px] flex-col items-center justify-center rounded-md bg-white shadow-sm"
        >
          <span className="text-[10px] font-extrabold leading-none text-[#1d1d1f]">{pad(it.value)}</span>
          <span className="mt-0.5 text-[6px] leading-none text-gray-600">{it.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------- One product card ---------- */
function ProductCard({
  product,
  liked,
  onLike,
  onAdd,
  onOpen,
}: {
  product: Product
  liked: boolean
  onLike: () => void
  onAdd: () => void
  onOpen: () => void
}) {
  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-[6px_8px_14px_rgba(0,0,0,0.13)] transition duration-300 hover:-translate-y-1"
    >
      {/* photo */}
      <div className="relative aspect-square overflow-hidden bg-neutral-300">
        <Img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* top-left badge */}
        {product.soldOut ? (
          <span
            style={{ backgroundColor: '#4aa84a' }}
            className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-[3px] text-[7px] font-bold uppercase text-white"
          >
            Sold Out
          </span>
        ) : (
          product.discount && (
            <span
              style={{ backgroundColor: LIME }}
              className="absolute left-2.5 top-2.5 flex items-center gap-0.5 rounded-full px-2 py-[3px] text-[7px] font-bold text-[#1d1d1f]"
            >
              <Zap size={8} fill="currentColor" strokeWidth={0} />
              {product.discount}
            </span>
          )
        )}

        {/* heart */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onLike()
          }}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={liked}
          className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center transition active:scale-90"
        >
          <Heart
            size={13}
            strokeWidth={2}
            fill={liked ? '#f5214f' : '#ffffff'}
            stroke={liked ? '#f5214f' : '#ffffff'}
            className={liked ? '' : 'opacity-70'}
          />
        </button>

        {product.countdown && <Countdown />}
      </div>

      {/* info */}
      <div className="px-3.5 pb-3.5 pt-3 sm:px-4 sm:pb-4">
        <div className="flex items-center gap-1.5">
          <span className="flex gap-px" aria-label="No ratings yet">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={9} fill="#d5d5d5" stroke="#d5d5d5" />
            ))}
          </span>
          <span className="text-[7px] text-gray-500">(0)</span>
        </div>

        <h4 style={nunito} className="mt-2.5 text-[12px] font-extrabold text-[#1d1d1f] sm:text-[13px]">
          {product.name}
        </h4>

        <div className="mt-2 flex items-end justify-between">
          <p className="flex items-baseline gap-2" style={nunito}>
            <span style={{ color: GREEN }} className="text-[12px] font-extrabold sm:text-[13px]">
              {money(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] font-semibold text-gray-300 line-through">{money(product.oldPrice)}</span>
            )}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onAdd()
            }}
            disabled={product.soldOut}
            aria-label={product.soldOut ? `${product.name} is sold out` : `Add ${product.name} to cart`}
            className={`-mb-0.5 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#eeeeee] text-[#1d1d1f] transition ${
              product.soldOut
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-[#dcdcdc] active:scale-90'
            }`}
          >
            <ShoppingBasket size={13} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </article>
  )
}

/* ===================== SECTION ===================== */
export default function FarmFreshProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [tab, setTab] = useState<Category>('Vegetable')
  const [page, setPage] = useState(0)
  const [liked, setLiked] = useState<Set<string>>(new Set())

  const filtered = products.filter((p) => p.category === tab)
  const pages = Math.ceil(filtered.length / PAGE_SIZE)
  const current = Math.min(page, pages - 1)
  const visible = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE)

  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const handleAdd = (product: Product) => {
    if (product.soldOut) return
    dispatch(addItem({ id: product.id, name: product.name, price: product.price, image: product.image }))
    navigate('/cart') // opens the cart page with the product in it
  }

  const handleOpen = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } })
  }

  return (
    <section style={{ ...nunito, backgroundColor: PINK }} className="relative overflow-hidden py-12 sm:py-14 lg:py-16">
      {/* Loads the font – no other setup needed */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap');`}</style>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-[#1d1d1f] sm:text-4xl">Farm Fresh Products</h2>

        {/* tabs */}
        <div role="tablist" className="mt-4 flex items-end justify-center gap-5 sm:gap-8">
          {TABS.map((t) => {
            const on = t === tab
            return (
              <button
                key={t}
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setTab(t)
                  setPage(0)
                }}
                className="flex flex-col items-center transition active:scale-95"
              >
                <span className="flex h-4 items-end">
                  {on && <Leaf size={14} fill={GREEN} stroke={GREEN} />}
                </span>
                <span
                  style={{ color: on ? GREEN : '#1d1d1f' }}
                  className="mt-0.5 text-[11px] font-bold sm:text-[13px]"
                >
                  {t}
                </span>
              </button>
            )
          })}
        </div>

        {/* cards: 2 across on phones, 4 across on desktop */}
        <div className="mx-auto mt-8 grid max-w-[780px] grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              liked={liked.has(p.id)}
              onLike={() => toggleLike(p.id)}
              onAdd={() => handleAdd(p)}
              onOpen={() => handleOpen(p)}
            />
          ))}
        </div>

        {/* page dots (only when there is more than one page) */}
        {pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => {
              const on = i === current
              return (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Show page ${i + 1}`}
                  aria-current={on}
                  className="flex h-3.5 w-3.5 items-center justify-center rounded-full"
                  style={on ? { border: '1px solid #2b4a3c' } : undefined}
                >
                  <span
                    className="block rounded-full"
                    style={{
                      width: on ? 4 : 3,
                      height: on ? 4 : 3,
                      backgroundColor: on ? '#2b4a3c' : '#8bd50b',
                    }}
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}