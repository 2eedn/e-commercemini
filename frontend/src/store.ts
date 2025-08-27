import { create } from 'zustand'
import type { Product } from './types'

interface CartItem { product: Product; quantity: number }
interface Filters { category_id?: number; min_price?: number; max_price?: number; sort?: 'price_asc'|'price_desc'|'' }

interface StoreState {
  cart: Record<number, CartItem>
  filters: Filters
  setFilters: (f: Partial<Filters>) => void
  addToCart: (p: Product, qty?: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

export const useStore = create<StoreState>((set, get) => ({
  cart: {},
  filters: {},
  setFilters: (f) => set({ filters: { ...get().filters, ...f } }),
  addToCart: (p, qty = 1) => set(state => {
    const cur = state.cart[p.id]?.quantity ?? 0
    return { cart: { ...state.cart, [p.id]: { product: p, quantity: cur + qty } } }
  }),
  removeFromCart: (id) => set(state => { const c = { ...state.cart }; delete c[id]; return { cart: c } }),
  clearCart: () => set({ cart: {} }),
}))
