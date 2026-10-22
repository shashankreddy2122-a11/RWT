import { useNavigate } from 'react-router-dom'
import { BookOpen, ConciergeBell, Bike, ShoppingBag, Play, Coffee, Martini, Store, Donut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cartSlice'
import type { AppDispatch } from '../../redux/store'

const IMAGES = {
  howPhoto: '/assets/m11.png', // couple at the table
  servicesBowl: '/assets/m17.png', // big bowl of curry
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

/* ===================== 1. HOW WE WORK ===================== */
const steps = [
  { n: 1, title: 'Explore Menu', Icon: BookOpen },
  { n: 2, title: 'Choose a Dish', Icon: ConciergeBell },
  { n: 3, title: 'Place Order', Icon: Bike },
]

const STEP_TEXT = 'A range of powerful tools for viewing, querying and filtering your data.'

/* circular photo with the white play circle on its left edge */
const PhotoCircle = ({ className = '' }: { className?: string }) => (
  <div className={`relative aspect-square ${className}`}>
    <div className="h-full w-full overflow-hidden rounded-full bg-neutral-300 shadow-xl">
      <Img src={IMAGES.howPhoto} alt="Guests enjoying a meal" className="h-full w-full object-cover" />
    </div>
    <button
      aria-label="Watch video"
      className="absolute -left-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:scale-105 transition sm:h-16 sm:w-16"
    >
      <Play size={20} fill={RED} stroke={RED} />
    </button>
  </div>
)

const HowWeWork = () => (
  <section className="relative bg-white pb-2">
    {/* red shape */}
    <div
      style={{ backgroundColor: RED }}
      className="relative overflow-hidden rounded-b-[36px] lg:mr-[14%] lg:rounded-b-none lg:rounded-r-[220px]"
    >
      <div className={`${CONTAINER} relative py-12 sm:py-14 lg:py-16`}>
        <div className="lg:max-w-[560px]">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white">Easy Order in 3 Steps</p>
          <h2 style={heading} className="mt-2 text-4xl sm:text-5xl lg:text-[44px] font-semibold text-white">
            How We Work
          </h2>

          <div className="mt-8 grid grid-cols-1 min-[480px]:grid-cols-3 gap-8 min-[480px]:gap-5">
            {steps.map(({ n, title, Icon }) => (
              <div key={title}>
                <div className="relative h-16 w-16 sm:h-[68px] sm:w-[68px]">
                  <div
                    style={{ backgroundColor: YELLOW }}
                    className="flex h-full w-full items-center justify-center rounded-full border-2 border-black text-black"
                  >
                    <Icon size={26} strokeWidth={1.7} />
                  </div>
                  <span
                    style={heading}
                    className="absolute -left-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black text-[10px] font-semibold text-white"
                  >
                    {n}
                  </span>
                </div>
                <h4 style={heading} className="mt-4 text-sm sm:text-base font-semibold text-white">
                  {title}
                </h4>
                <p className="mt-1.5 text-[10px] sm:text-[11px] leading-snug text-white/90 max-w-[170px]">{STEP_TEXT}</p>
              </div>
            ))}
          </div>

          {/* photo inside the red shape on phones and tablets */}
          <div className="mt-12 flex justify-center lg:hidden">
            <PhotoCircle className="w-56 sm:w-64" />
          </div>
        </div>
      </div>
    </div>

    {/* photo overlapping the right end of the red shape (desktop) */}
    <div className="hidden lg:block absolute right-[6%] top-1/2 w-[260px] xl:w-[290px] -translate-y-1/2">
      {/* "Watch and Follow" with a dashed arrow */}
      <div className="absolute -top-14 -left-24 flex items-start gap-1">
        <p className="text-[10px] font-bold text-black">Watch and Follow</p>
        <svg viewBox="0 0 50 40" className="h-9 w-12" fill="none" stroke={YELLOW} strokeWidth="1.6" strokeDasharray="3 3" strokeLinecap="round" aria-hidden="true">
          <path d="M4 36 C6 14, 24 6, 44 10" />
          <path d="M38 5 L45 10 L38 15" strokeDasharray="0" />
        </svg>
      </div>
      <PhotoCircle className="w-full" />
    </div>
  </section>
)

/* ===================== 2. FAST FOOD MENUS ===================== */
const dishImages = ['h10.png', 'h11.png', 'm12.png', 'h7.png', 'm13.png', 'h10.png', 'h7.png', 'm18.png']

const dishes = [
  { id: 'menu-shroom-bacon-burger', name: 'Shroom Bacon Burger', price: 11.76 },
  { id: 'menu-delicious-black-coffee', name: 'Delicious Black Coffee', price: 11.76 },
  { id: 'menu-bbq-chicken-pizza', name: 'BBQ Chicken Pizza New', price: 13.17 },
  { id: 'menu-crispy-fried-chicken-a', name: 'Crispy Fried Chicken', price: 15.1 },
  { id: 'menu-zinger-double-burger', name: 'Zinger Double Burger', price: 20.1 },
  { id: 'menu-margherita-pizza', name: 'Margherita Pizza New', price: 15.8 },
  { id: 'menu-crispy-fried-chicken-b', name: 'Crispy Fried Chicken', price: 10.85 },
  { id: 'menu-black-pepper-burger', name: 'Black Pepper Burger', price: 10.85 },
].map((d, i) => ({ ...d, image: `/assets/${dishImages[i]}` }))

const DishCard = ({
  dish,
  onAdd,
  onProductClick,
}: {
  dish: (typeof dishes)[number]
  onAdd: () => void
  onProductClick: () => void
}) => (
  <article
    onClick={onProductClick}
    className="relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition"
  >
    {/* image on a red half-circle */}
    <div className="relative h-[88px] w-[88px] shrink-0 sm:h-24 sm:w-24">
      <span style={{ backgroundColor: RED }} className="absolute -left-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full sm:h-28 sm:w-28" />
      <Img src={dish.image} alt={dish.name} className="relative h-full w-full object-contain drop-shadow-md" />
    </div>

    <div className="min-w-0 flex-1 pr-8">
      <h4 style={heading} className="text-sm sm:text-[15px] font-semibold leading-snug text-black">
        {dish.name}
      </h4>
      <p style={{ ...heading, color: RED }} className="mt-2 text-sm sm:text-base font-semibold">
        ${dish.price.toFixed(2)}
      </p>
    </div>

    <button
      onClick={(e) => {
        e.stopPropagation()
        onAdd()
      }}
      aria-label={`Add ${dish.name} to cart`}
      style={{ backgroundColor: YELLOW }}
      className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-md text-black hover:brightness-95 active:scale-95 transition"
    >
      <ShoppingBag size={14} />
    </button>
  </article>
)

const OpeningTimes = () => (
  <article
    style={{ backgroundColor: YELLOW }}
    className="rounded-xl p-4 sm:p-5 sm:col-span-2 lg:col-span-1 flex flex-col"
  >
    <h4 style={heading} className="text-center text-base sm:text-lg font-semibold uppercase text-black">
      Opening Times
    </h4>

    <dl className="mt-3 space-y-1.5 text-[11px] sm:text-xs font-bold text-black">
      {[
        ['Mon', '17:00 to 22:00'],
        ['Tue', '17:00 to 22:00'],
      ].map(([day, time]) => (
        <div key={day} className="flex items-center justify-between border-b border-black/30 pb-1.5 px-1">
          <dt>{day}</dt>
          <dd>{time}</dd>
        </div>
      ))}
    </dl>

    <div style={{ backgroundColor: RED }} className="mt-4 rounded-lg px-3 py-2.5 text-center">
      <a
        href="tel:+1234567891"
        style={heading}
        className="text-base sm:text-lg font-semibold text-white underline underline-offset-4 hover:opacity-90"
      >
        +1 234 567 891
      </a>
      <p className="mt-1 text-[9px] sm:text-[10px] font-bold text-white">Avenue New Town: 129 United States</p>
    </div>
  </article>
)

const FastFoodMenus = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleAdd = (d: (typeof dishes)[number]) => {
    dispatch(addItem({ id: d.id, name: d.name, price: d.price, image: d.image }))
    navigate('/cart') // opens the cart page with the product in it
  }

  const handleProductClick = (d: (typeof dishes)[number]) => {
    navigate(`/product/${d.id}`, { state: { product: d } })
  }

  return (
    <section className="bg-[#f1f5fb] py-14 sm:py-16 lg:py-20 mt-10 sm:mt-12">
      <div className={CONTAINER}>
        <SectionTitle>Fast Food Menus</SectionTitle>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((d) => (
            <DishCard key={d.id} dish={d} onAdd={() => handleAdd(d)} onProductClick={() => handleProductClick(d)} />
          ))}
          <OpeningTimes />
        </div>
      </div>
    </section>
  )
}

/* ===================== 3. FOOD SERVICES ===================== */
const services = [
  { title: 'Afternoon Tea', Icon: Coffee },
  { title: 'Wine & Cocktails', Icon: Martini },
  { title: 'Takeaway & Delivery', Icon: Store },
  { title: 'Alfresco Dining', Icon: Donut },
]

const FoodServices = () => (
  <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
    <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16`}>
      {/* text + services */}
      <div className="max-w-xl">
        <p style={{ color: RED }} className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">
          Food Services
        </p>
        <h2
          style={heading}
          className="mt-2 max-w-sm text-3xl sm:text-4xl lg:text-[40px] font-semibold leading-[1.2] text-black"
        >
          We Provide Best Services
        </h2>

        <div className="mt-10 grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-8 gap-y-10">
          {services.map(({ title, Icon }) => (
            <div key={title}>
              {/* yellow circle with an outer ring */}
              <div style={{ borderColor: YELLOW }} className="h-20 w-20 rounded-full border-2 p-1.5 sm:h-[88px] sm:w-[88px]">
                <div
                  style={{ backgroundColor: YELLOW }}
                  className="flex h-full w-full items-center justify-center rounded-full text-black"
                >
                  <Icon size={32} strokeWidth={1.5} />
                </div>
              </div>
              <h4 style={heading} className="mt-5 text-sm sm:text-base font-semibold text-black">
                {title}
              </h4>
              <p className="mt-1.5 max-w-[210px] text-[10px] sm:text-[11px] leading-snug text-gray-600">
                Nisl quam nestibulum ac quam nec aucan gula Orci senastela quam nestl.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* bowl + decorations */}
      <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px]">
        <Img src={IMAGES.servicesBowl} alt="Bowl of curry" className="absolute inset-[8%] h-[84%] w-[84%] object-contain drop-shadow-2xl" />
      </div>
    </div>
  </section>
)

/* ===================== Everything under Choose a Category ===================== */
export const MenuExtras = () => (
  <>
    <HowWeWork />
    <FastFoodMenus />
    <FoodServices />
  </>
)