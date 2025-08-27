import { useQuery } from '@tanstack/react-query'
import { fetchOrder } from '../api'
import { useParams } from 'react-router-dom'

export default function OrderDetailPage(){
  const { id } = useParams()
  const orderId = Number(id)
  const { data, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrder(orderId),
    enabled: !!orderId
  })

  if (isLoading) return <div className="p-4">Memuat...</div>
  if (error) return <div className="p-4 text-red-600">Gagal memuat</div>

  return (
    <div className="container mx-auto p-4 grid gap-4">
      <h1 className="text-2xl font-bold">Order #{data.id}</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-xl p-3">
          <div className="font-medium">Data Pemesan</div>
          <div>Email: {data.email}</div>
          <div>Nama: {data.full_name}</div>
          <div>Alamat: {data.address}</div>
        </div>
        <div className="border rounded-xl p-3">
          <div className="font-medium mb-2">Item</div>
          {data.items.map((it:any, idx:number)=>(
            <div key={idx} className="flex justify-between py-1 border-b last:border-0">
              <span>Produk #{it.product_id} × {it.quantity}</span>
              <span>Rp{(it.unit_price*1000).toLocaleString('id-ID')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
