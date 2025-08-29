import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import AddProductPage from "./pages/AddProductPage";

function App() {
  return (
    <Router>
      <div className="p-4">
        {/* Navbar sederhana */}
        <nav className="mb-6 flex gap-4">
          <Link to="/" className="text-blue-600 hover:underline">Produk</Link>
          <Link to="/orders" className="text-blue-600 hover:underline">Pesanan</Link>
          <Link to="/add-product" className="text-blue-600 hover:underline">Tambah Produk</Link>
        </nav>

        {/* Routing */}
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;