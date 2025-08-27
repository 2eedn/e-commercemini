import { useQuery } from '@tanstack/react-query'
import { fetchOrders } from '../api'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function OrdersPage(){
  const [page, setPage] = useState(1)
  const page_size = 10
  const { data, isLoading } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => fetchOrders({ page, page_size })
  })

  return (
    <div className="container mx-auto p-4 grid gap-4">
      <h1 className="text-2xl font-bold">Pesanan</h1>
      {isLoading && <div>Memuat...</div>}
      <div className="space-y-2">
        {data?.data?.map((o:any)=>(
          <Link key={o.id} to={`/orders/${o.id}`} className="block border rounded-xl p-3 hover:bg-gray-50">
            <div className="font-medium">Order #{o.id} • {o.full_name} • {o.email}</div>
            <div className="text-sm text-gray-500">{o.items.length} item</div>
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 border rounded-xl" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <button className="px-3 py-1 border rounded-xl" onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}
