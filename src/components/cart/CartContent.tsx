import { Link } from 'react-router-dom'
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { changeQty, clearCart, removeItem } from '../../redux/cartSlice'
import type { AppDispatch, RootState } from '../../redux/store'

const heading = { fontFamily: "'Fredoka', sans-serif" }

const money = (n: number) => `$${n.toFixed(2)}`

export default function CartContent() {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.cart.items)
  const count = items.reduce((itemCount, item) => itemCount + item.qty, 0)
  const total = items.reduce((cartTotal, item) => cartTotal + item.price * item.qty, 0)

  return (
    <main className="min-h-screen bg-[#f1f5fb] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 style={heading} className="text-3xl sm:text-4xl font-semibold text-black">
            Your Cart <span className="text-[#f5214f]">({count})</span>
          </h1>
          <Link
            to="/pages"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-sm">
              <ShoppingCart size={40} className="text-[#f5214f]" />
            </div>
            <h2 style={heading} className="mt-6 text-2xl font-semibold text-black">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-500">Add some delicious items from our menu!</p>
            <Link
              to="/pages"
              className="mt-6 inline-flex items-center gap-2 bg-[#f5214f] hover:brightness-110 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 p-4 sm:p-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl bg-[#f1f5fb] overflow-hidden flex items-center justify-center">
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
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-bold text-base sm:text-lg text-black leading-snug">{item.name}</h3>
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          aria-label={`Remove ${item.name}`}
                          className="text-gray-400 hover:text-[#f5214f] transition-colors shrink-0"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <p style={heading} className="mt-2 text-[#f5214f] font-semibold text-lg sm:text-xl">
                        {money(item.price)}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border-2 border-gray-200 rounded-lg">
                          <button
                            onClick={() => dispatch(changeQty({ id: item.id, delta: -1 }))}
                            aria-label="Decrease quantity"
                            className="w-10 h-10 flex items-center justify-center hover:text-[#f5214f]"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center text-sm font-bold">{item.qty}</span>
                          <button
                            onClick={() => dispatch(changeQty({ id: item.id, delta: 1 }))}
                            aria-label="Increase quantity"
                            className="w-10 h-10 flex items-center justify-center hover:text-[#f5214f]"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-black">{money(item.price * item.qty)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cart summary */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between text-lg sm:text-xl">
                <span className="font-semibold text-gray-600">Total</span>
                <span style={heading} className="font-semibold text-black">
                  {money(total)}
                </span>
              </div>

              <button
                className="mt-6 w-full bg-[#f5214f] hover:brightness-110 text-white font-bold py-4 rounded-lg transition-colors"
                onClick={() => alert('Connect your checkout here')}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => dispatch(clearCart())}
                className="mt-4 w-full text-sm text-gray-500 hover:text-[#f5214f] transition-colors"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
