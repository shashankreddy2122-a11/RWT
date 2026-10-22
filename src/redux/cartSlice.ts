import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  qty: number
}

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
}

const STORAGE_KEY = 'tastenest-cart'

const loadCartItems = (): CartItem[] => {
  try {
    const storedItems = localStorage.getItem(STORAGE_KEY)
    return storedItems ? JSON.parse(storedItems) as CartItem[] : []
  } catch {
    return []
  }
}

const initialState: CartState = {
  items: loadCartItems(),
  isCartOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'qty'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.qty += 1
      } else {
        state.items.push({ ...action.payload, qty: 1 })
      }
    },
    changeQty: (state, action: PayloadAction<{ id: string; delta: number }>) => {
      const item = state.items.find((currentItem) => currentItem.id === action.payload.id)
      if (item) item.qty += action.payload.delta
      state.items = state.items.filter((currentItem) => currentItem.qty > 0)
    },
    openCart: (state) => {
      state.isCartOpen = true
    },
    closeCart: (state) => {
      state.isCartOpen = false
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addItem, changeQty, openCart, closeCart, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer