import { useState } from 'react'
import { useStore } from '../store'
import QuantityInput from '../components/QuantityInput'
import { createOrder } from '../api'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage(){
  const { cart, removeFromCart, clearCart } = useStore()
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const items = Object.values(cart)
  const total = items.reduce((s,i)=> s + i.product.price * i.quantity, 0)

  async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    setError(null)
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setError('Email tidak valid'); return }
    if(items.length === 0) { setError('Keranjang kosong'); return }

    setLoading(true)
    try{
      const payload = {
        email, full_name: fullName, address,
        items: items.map(i => ({ product_id: i.product.id, quantity: i.quantity }))
      }
      const res = await createOrder(payload)
      clearCart()
      navigate(`/orders/${res.id}`)
    }catch(err:any){
      setError(err?.message || 'Gagal checkout')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 grid gap-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      {items.length === 0 && <div>Keranjang kosong.</div>}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          {items.map(i => (
            <div key={i.product.id} className="border rounded-xl p-3 flex items-center gap-3">
              <img src={i.product.image_url} className="w-16 h-16 object-cover rounded-lg" loading="lazy"/>
              <div className="flex-1">
                <div className="font-medium">{i.product.title}</div>
                <div className="text-sm text-gray-500">Rp{(i.product.price*1000).toLocaleString('id-ID')}</div>
              </div>
              <QuantityInput value={i.quantity} onChange={(v)=>{ i.quantity = v; }}/>
              <button className="text-red-600" onClick={()=>removeFromCart(i.product.id)}>Hapus</button>
            </div>
          ))}
        </div>
        <form className="space-y-3" onSubmit={onSubmit}>
          <input className="w-full border rounded-xl p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input className="w-full border rounded-xl p-2" placeholder="Nama Lengkap" value={fullName} onChange={e=>setFullName(e.target.value)} required/>
          <textarea className="w-full border rounded-xl p-2" placeholder="Alamat" value={address} onChange={e=>setAddress(e.target.value)} required/>
          {error && <div className="text-red-600">{error}</div>}
          <div className="font-semibold">Total: Rp{(total*1000).toLocaleString('id-ID')}</div>
          <button disabled={loading} className="px-4 py-2 rounded-xl bg-black text-white">{loading? 'Memproses...':'Bayar (Guest)'}</button>
        </form>
      </div>
    </div>
  )
}
