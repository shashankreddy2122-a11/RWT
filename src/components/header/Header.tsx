import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { changeQty, clearCart, closeCart, openCart, removeItem } from '../../redux/cartSlice'
import type { AppDispatch, RootState } from '../../redux/store'

const navItems = ['Home', 'About', 'Menu', 'Pages', 'Blog', 'Contact']
const navPaths: Record<string, string> = {
  Home: '/',
  About: '/about',
  Menu: '/menu',
  Pages: '/pages',
  Blog: '/blog',
  Contact: '/contact',
}

const oswald = { fontFamily: "'Oswald', sans-serif" }
const fredoka = { fontFamily: "'Fredoka', sans-serif" }

const money = (n: number) => `$${n.toFixed(2)}`

const Header = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.cart.items)
  const isOpen = useSelector((state: RootState) => state.cart.isCartOpen)
  const count = items.reduce((itemCount, item) => itemCount + item.qty, 0)
  const total = items.reduce((cartTotal, item) => cartTotal + item.price * item.qty, 0)

  // lock page scroll while the mobile menu or the cart is open
  useEffect(() => {
    document.body.style.overflow = open || isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, isOpen])

  // close with Escape key, and when the screen grows to desktop size
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        dispatch(closeCart())
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [dispatch])

  return (
    <>
      {/* Loads the fonts – no other setup needed */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Fredoka:wght@500;600&display=swap');`}</style>

      <header className="sticky top-0 z-30 bg-white border-t-2 border-[#1f5a4a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
            {/* Logo (image from public/logo.png) */}
            <Link to="/" className="flex-shrink-0" aria-label="TasteNest home">
              <img
                src="/assets/l.png"
                alt="TasteNest – Fast Food Restaurant"
                className="h-14 sm:h-16 lg:h-20 w-auto"
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-10" style={oswald}>
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={navPaths[item]}
                  className="text-[14px] font-semibold uppercase tracking-wider text-[#1a1a1a] hover:text-[#e8160c] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Right side: cart, reserve button, hamburger */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Cart with live count */}
              <button
                onClick={() => dispatch(openCart())}
                aria-label={`Open cart, ${count} items`}
                className="relative w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 text-[#1a1a1a] hover:text-[#e8160c] hover:border-[#e8160c] transition-colors"
              >
                <ShoppingCart size={19} strokeWidth={2.2} />
                <span className="absolute -top-1 -right-1 bg-[#e8160c] text-white text-[10px] font-semibold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
                  {count > 99 ? '99+' : count}
                </span>
              </button>

              {/* Reserve button (brush-stroke shape) – desktop only */}
              <Link
                to="/reservation"
                style={{
                  ...oswald,
                  clipPath:
                    'polygon(1% 12%, 10% 4%, 40% 8%, 72% 2%, 99% 0%, 98% 40%, 100% 72%, 97% 100%, 60% 96%, 30% 100%, 4% 94%, 0% 55%)',
                }}
                className="hidden lg:flex items-center justify-center bg-[#e8160c] hover:bg-[#c91208] text-white font-semibold text-[14px] uppercase tracking-wider px-7 py-4 transition-colors"
              >
                Reserve a table
              </Link>

              {/* Hamburger – mobile / tablet only */}
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-full border border-gray-200 hover:border-[#e8160c] group transition-colors"
              >
                <span className="block w-5 h-[2px] bg-[#1a1a1a] group-hover:bg-[#e8160c] transition-colors" />
                <span className="block w-5 h-[2px] bg-[#1a1a1a] group-hover:bg-[#e8160c] transition-colors" />
                <span className="block w-5 h-[2px] bg-[#1a1a1a] group-hover:bg-[#e8160c] transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============ Mobile menu ============ */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <aside
        id="mobile-menu"
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-80 max-w-[85%] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-28 border-b border-gray-100">
          <img src="/assets/l.png" alt="TasteNest" className="h-20 w-auto" />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-[#1a1a1a] hover:text-[#e8160c] hover:border-[#e8160c] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-2" style={oswald}>
          {navItems.map((item) => (
            <Link
              key={item}
              to={navPaths[item]}
              onClick={() => setOpen(false)}
              className="block py-4 border-b border-gray-100 text-[15px] font-semibold uppercase tracking-wider text-[#1a1a1a] hover:text-[#e8160c] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="p-5">
          <Link
            to="/reservation"
            onClick={() => setOpen(false)}
            style={oswald}
            className="block text-center bg-[#e8160c] hover:bg-[#c91208] text-white font-semibold text-[15px] uppercase tracking-wider py-3.5 transition-colors"
          >
            Reserve a table
          </Link>
        </div>
      </aside>

      {/* ============ Cart panel ============ */}
      <div
        onClick={() => dispatch(closeCart())}
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <aside
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart top */}
        <div className="flex items-center justify-between px-5 sm:px-6 h-20 border-b border-gray-100">
          <h2 style={fredoka} className="text-2xl font-semibold text-black">
            Your Cart <span className="text-[#f5214f]">({count})</span>
          </h2>
          <button
            onClick={() => dispatch(closeCart())}
            aria-label="Close cart"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-[#1a1a1a] hover:text-[#e8160c] hover:border-[#e8160c] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 rounded-full bg-[#f1f5fb] flex items-center justify-center">
              <ShoppingCart size={34} className="text-[#f5214f]" />
            </div>
            <p style={fredoka} className="mt-5 text-xl font-semibold text-black">
              Your cart is empty
            </p>
            <p className="mt-1 text-sm text-gray-500">Tap the bag on a dish to add it here.</p>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-5 sm:px-6 divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-5">
                <div className="w-20 h-20 shrink-0 rounded-xl bg-[#f1f5fb] overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-sm text-black leading-snug">{item.name}</p>
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      aria-label={`Remove ${item.name}`}
                      className="text-gray-400 hover:text-[#f5214f] transition-colors shrink-0"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <p style={fredoka} className="mt-1 text-[#f5214f] font-semibold">
                    {money(item.price)}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border-2 border-gray-200 rounded-lg">
                      <button
                        onClick={() => dispatch(changeQty({ id: item.id, delta: -1 }))}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 flex items-center justify-center hover:text-[#f5214f]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                      <button
                        onClick={() => dispatch(changeQty({ id: item.id, delta: 1 }))}
                        aria-label="Increase quantity"
                        className="w-8 h-8 flex items-center justify-center hover:text-[#f5214f]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-black">{money(item.price * item.qty)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Cart bottom */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">Total</span>
              <span style={fredoka} className="text-2xl font-semibold text-black">
                {money(total)}
              </span>
            </div>
            <button
              className="mt-4 w-full bg-[#f5214f] hover:brightness-110 text-white font-bold py-3.5 rounded-lg transition"
              onClick={() => alert('Connect your checkout here')}
            >
              Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-3 w-full text-sm text-gray-500 hover:text-[#f5214f] transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

export default Header