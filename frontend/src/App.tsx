import { Routes, Route, Link } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import './styles.css'
import { useStore } from './store'

export default function App(){
  const { cart } = useStore()
  const count = Object.values(cart).reduce((s,i)=> s+i.quantity, 0)

  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link to="/" className="font-bold">E‑Com</Link>
          <div className="flex gap-4">
            <Link to="/">Produk</Link>
            <Link to="/orders">Pesanan</Link>
            <Link to="/checkout">Checkout ({count})</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>
        <Route path="/orders/:id" element={<OrderDetailPage/>}/>
      </Routes>
    </div>
  )
}
