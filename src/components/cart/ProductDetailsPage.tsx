import { useState } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { Minus, Plus, ArrowLeft } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addItem, openCart } from '../../redux/cartSlice'
import type { AppDispatch } from '../../redux/store'

const RED = '#f5214f'
const YELLOW = '#ffd400'
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

/* Sample product data - in a real app, this would come from an API or database */
const productsData: Record<string, any> = {
  'comp-crispy-fried-chicken': {
    id: 'comp-crispy-fried-chicken',
    name: 'Crispy Fried Chicken',
    price: 10.85,
    oldPrice: 14.85,
    rating: 5,
    description: 'Our signature crispy fried chicken is marinated for 24 hours in our secret blend of herbs and spices, then fried to golden perfection. Served with your choice of dipping sauce.',
    availability: true,
    sku: 'fast-food-001',
    category: 'Fast Food',
    tags: ['SKU: fast-food-001', 'Category: Fast Food'],
  },
  'comp-bbq-chicken-pizza': {
    id: 'comp-bbq-chicken-pizza',
    name: 'BBQ Chicken Pizza New',
    price: 13.17,
    rating: 4,
    description: 'Delicious BBQ chicken pizza topped with grilled chicken, red onions, cilantro, and our signature BBQ sauce on a crispy crust.',
    availability: true,
    sku: 'fast-food-002',
    category: 'Pizza',
    tags: ['SKU: fast-food-002', 'Category: Pizza'],
  },
  'comp-delicious-black-coffee': {
    id: 'comp-delicious-black-coffee',
    name: 'Delicious Black Coffee',
    price: 11.76,
    oldPrice: 21.76,
    rating: 5,
    description: 'Premium black coffee made from freshly roasted Arabica beans. Rich, bold, and full of flavor.',
    availability: true,
    sku: 'beverage-001',
    category: 'Beverages',
    tags: ['SKU: beverage-001', 'Category: Beverages'],
  },
  'comp-margherita-pizza': {
    id: 'comp-margherita-pizza',
    name: 'Margherita Pizza New',
    price: 15.8,
    rating: 4,
    description: 'Classic margherita pizza with fresh mozzarella, tomatoes, and basil on our signature crust.',
    availability: true,
    sku: 'pizza-001',
    category: 'Pizza',
    tags: ['SKU: pizza-001', 'Category: Pizza'],
  },
  'menu-crispy-fried-chicken-a': {
    id: 'menu-crispy-fried-chicken-a',
    name: 'Crispy Fried Chicken',
    price: 15.1,
    rating: 5,
    description: 'Extra crispy fried chicken with our special seasoning. Perfectly cooked and served hot.',
    availability: true,
    sku: 'menu-001',
    category: 'Fast Food',
    tags: ['SKU: menu-001', 'Category: Fast Food'],
  },
  'menu-zinger-double-burger': {
    id: 'menu-zinger-double-burger',
    name: 'Zinger Double Burger',
    price: 20.1,
    rating: 4,
    description: 'Double zinger burger with two crispy chicken patties, lettuce, and special sauce.',
    availability: true,
    sku: 'menu-002',
    category: 'Burgers',
    tags: ['SKU: menu-002', 'Category: Burgers'],
    image: '/assets/m12.png',
  },
  'menu-margherita-pizza': {
    id: 'menu-margherita-pizza',
    name: 'Margherita Pizza New',
    price: 15.8,
    rating: 4,
    description: 'Classic Italian margherita pizza with fresh ingredients and authentic flavors.',
    availability: true,
    sku: 'menu-003',
    category: 'Pizza',
    tags: ['SKU: menu-003', 'Category: Pizza'],
    image: '/assets/h2.png',
  },
  'menu-crispy-fried-chicken-b': {
    id: 'menu-crispy-fried-chicken-b',
    name: 'Crispy Fried Chicken',
    price: 10.85,
    rating: 5,
    description: 'Our famous crispy fried chicken, marinated and fried to perfection.',
    availability: true,
    sku: 'menu-004',
    category: 'Fast Food',
    tags: ['SKU: menu-004', 'Category: Fast Food'],
  },
  'menu-black-pepper-burger': {
    id: 'menu-black-pepper-burger',
    name: 'Black Pepper Burger',
    price: 10.85,
    rating: 4,
    description: 'Spicy black pepper burger with grilled beef patty and fresh vegetables.',
    availability: true,
    sku: 'menu-005',
    category: 'Burgers',
    tags: ['SKU: menu-005', 'Category: Burgers'],
  },
  'ffp-broccoli': {
    id: 'ffp-broccoli',
    name: 'Green Broccoli',
    price: 20.00,
    rating: 5,
    description: 'Fresh organic broccoli, perfect for healthy meals. Rich in vitamins and minerals.',
    availability: true,
    sku: 'veg-001',
    category: 'Vegetables',
    tags: ['SKU: veg-001', 'Category: Vegetables'],
    image: '/assets/p1.png',
  },
  'ffp-onion-1': {
    id: 'ffp-onion-1',
    name: 'Purple Onion',
    price: 14.00,
    oldPrice: 17.50,
    rating: 4,
    description: 'Fresh purple onions with a mild sweet flavor. Great for salads and cooking.',
    availability: true,
    sku: 'veg-002',
    category: 'Vegetables',
    tags: ['SKU: veg-002', 'Category: Vegetables'],
  },
  'ffp-pepper': {
    id: 'ffp-pepper',
    name: 'Chile Bell Pepper',
    price: 16.00,
    rating: 4,
    description: 'Colorful bell peppers, perfect for stir-fries and salads. Crisp and fresh.',
    availability: true,
    sku: 'veg-003',
    category: 'Vegetables',
    tags: ['SKU: veg-003', 'Category: Vegetables'],
  },
  'ffp-cabbage': {
    id: 'ffp-cabbage',
    name: 'Green Cabbage',
    price: 10.00,
    rating: 4,
    description: 'Fresh green cabbage, ideal for coleslaw and stir-fries. Crunchy and nutritious.',
    availability: true,
    sku: 'veg-004',
    category: 'Vegetables',
    tags: ['SKU: veg-004', 'Category: Vegetables'],
  },
  'ffp-corn': {
    id: 'ffp-corn',
    name: 'Roasted Corn',
    price: 12.00,
    rating: 5,
    description: 'Sweet roasted corn, perfect as a side dish or snack. Naturally sweet and delicious.',
    availability: true,
    sku: 'veg-005',
    category: 'Vegetables',
    tags: ['SKU: veg-005', 'Category: Vegetables'],
    image: '/assets/p16.png',
  },
  'ffp-asparagus': {
    id: 'ffp-asparagus',
    name: 'Organic Asparagus',
    price: 18.00,
    oldPrice: 21.18,
    rating: 5,
    description: 'Premium organic asparagus spears. Tender and flavorful, perfect for grilling.',
    availability: true,
    sku: 'veg-006',
    category: 'Vegetables',
    tags: ['SKU: veg-006', 'Category: Vegetables'],
  },
  'ffp-onion-2': {
    id: 'ffp-onion-2',
    name: 'Purple Onion',
    price: 14.00,
    rating: 4,
    description: 'Fresh purple onions, versatile for many dishes. Mild and sweet flavor.',
    availability: true,
    sku: 'veg-007',
    category: 'Vegetables',
    tags: ['SKU: veg-007', 'Category: Vegetables'],
  },
  'ffp-tomato': {
    id: 'ffp-tomato',
    name: 'Cherry Tomato',
    price: 22.00,
    rating: 5,
    description: 'Sweet cherry tomatoes, perfect for salads and snacking. Bursting with flavor.',
    availability: false,
    sku: 'veg-008',
    category: 'Vegetables',
    tags: ['SKU: veg-008', 'Category: Vegetables'],
  },
}

/* Related products sample - using actual product IDs */
const relatedProducts = [
  {
    id: 'menu-zinger-double-burger',
    name: 'Zinger Double Burger',
    price: 20.1,
    rating: 4,
    image: '/assets/m12.png',
  },
  {
    id: 'menu-margherita-pizza',
    name: 'Margherita Pizza New',
    price: 15.8,
    rating: 4,
    image: '/assets/h2.png',
  },
  {
    id: 'ffp-broccoli',
    name: 'Green Broccoli',
    price: 20.00,
    rating: 5,
    image: '/assets/p1.png',
  },
  {
    id: 'ffp-corn',
    name: 'Roasted Corn',
    price: 12.00,
    rating: 5,
    image: '/assets/p16.png',
  },
]

const ProductDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [quantity, setQuantity] = useState(1)

  const knownProduct = productsData[id || '']
  const fallbackProduct = knownProduct || productsData['comp-crispy-fried-chicken']
  const routeProduct = location.state?.product
  const product = {
    ...fallbackProduct,
    ...routeProduct,
    id: routeProduct?.id ?? id ?? fallbackProduct.id,
    name: routeProduct?.name ?? fallbackProduct.name,
    price: routeProduct?.price ?? fallbackProduct.price,
    oldPrice: routeProduct?.oldPrice ?? knownProduct?.oldPrice,
    rating: routeProduct?.rating ?? knownProduct?.rating ?? 5,
    description: routeProduct?.description ?? knownProduct?.description ?? `${routeProduct?.name ?? fallbackProduct.name}, prepared fresh and served with care.`,
    availability: routeProduct?.availability ?? knownProduct?.availability ?? (routeProduct?.soldOut == null ? true : !routeProduct.soldOut),
    sku: routeProduct?.sku ?? knownProduct?.sku ?? id,
    category: routeProduct?.category ?? knownProduct?.category ?? 'Menu',
    tags: routeProduct?.tags ?? knownProduct?.tags ?? [`SKU: ${id}`, `Category: ${routeProduct?.category ?? knownProduct?.category ?? 'Menu'}`],
    image: routeProduct?.image ?? knownProduct?.image ?? fallbackProduct.image,
  }

  const handleBack = () => {
    navigate(location.state?.returnTo ?? -1)
  }

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    for (let itemCount = 0; itemCount < quantity; itemCount += 1) {
      dispatch(addItem({ id: product.id, name: product.name, price: product.price, image: product.image }))
    }
    dispatch(openCart())
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className="h-4 w-4 sm:h-5 sm:w-5"
        viewBox="0 0 24 24"
        fill={i < rating ? YELLOW : '#e5e7eb'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ))
  }

  return (
    <main style={oswald} className="bg-white pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap');`}</style>

      <div className={CONTAINER}>
        {/* Header with back button and title */}
        <div className="relative mb-10 flex min-h-10 items-center justify-center">
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-black hover:bg-gray-100 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 style={{ color: RED }} className="text-2xl sm:text-3xl font-bold uppercase">
            Product Details
          </h2>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-8"
            />
          </div>

          {/* Right: Product Info */}
          <div style={oswald}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <p className="text-2xl sm:text-3xl font-bold text-black">
                ${product.price.toFixed(2)}
              </p>
              {product.oldPrice && (
                <p className="text-lg text-gray-400 line-through">
                  ${product.oldPrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="mt-3 flex gap-1">
              {renderStars(product.rating)}
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
              {product.description}
            </p>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                checked={product.availability}
                readOnly
                className="h-5 w-5 accent-green-600"
              />
              <span className="text-sm text-gray-700">In Stock</span>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 rounded border border-gray-300 bg-gray-50 px-3 py-2">
                <button
                  onClick={handleDecrease}
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-gray-950 hover:bg-gray-300 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-lg font-bold text-gray-950">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-gray-950 hover:bg-gray-300 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              style={{ backgroundColor: RED }}
              className="mt-6 px-8 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:scale-[0.98]"
            >
              ADD TO CART
            </button>

            {/* SKU and Category */}
            <div className="mt-6 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">SKU:</span> {product.sku}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description and Reviews Section */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left: Description and Reviews */}
          <div className="lg:col-span-2">
            <div className="flex gap-8 border-b border-gray-200 pb-4">
              <button style={{ color: RED }} className="text-sm font-semibold uppercase tracking-wide">
                Description
              </button>
              <button className="text-sm font-semibold uppercase tracking-wide text-gray-500 hover:text-gray-700">
                Reviews
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <Img
                  src={product.image}
                  alt="Product detail"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Additional Info */}
          <div className="space-y-4">
            <div className="rounded border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Weight</p>
              <p className="text-sm font-semibold text-black">500g</p>
            </div>
            <div className="rounded border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Dimensions</p>
              <p className="text-sm font-semibold text-black">20 x 15 x 5 cm</p>
            </div>
            <div className="rounded border border-gray-200 p-4">
              <p className="text-xs text-gray-500">Ingredients</p>
              <p className="text-sm font-semibold text-black">Chicken, Flour, Spices</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <div className="text-center">
            <p style={{ color: RED }} className="text-sm font-semibold uppercase tracking-wide">
              products
            </p>
            <h2 style={oswald} className="mt-2 text-3xl sm:text-4xl font-bold text-black">
              Related Products
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                state={{
                  product: { ...productsData[relatedProduct.id], ...relatedProduct },
                  returnTo: '/menu',
                }}
                className="group overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>

                <div className="mt-3">
                  {/* Rating */}
                  <div className="flex gap-0.5">
                    {renderStars(relatedProduct.rating)}
                  </div>

                  {/* Name */}
                  <h3 style={oswald} className="mt-2 text-sm font-semibold text-black group-hover:text-red-500 transition">
                    {relatedProduct.name}
                  </h3>

                  {/* Price */}
                  <p className="mt-1 text-lg font-bold text-black">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetailsPage
