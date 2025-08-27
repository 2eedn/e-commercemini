import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api'
import { useStore } from '../store'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'
import { useState } from 'react'

export default function ProductsPage(){
  const { filters, addToCart } = useStore()
  const [page, setPage] = useState(1)
  const pageSize = 12

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', { ...filters, page, page_size: pageSize }],
    queryFn: () => fetchProducts({ ...filters, page, page_size: pageSize })
  })

  return (
    <div className="container mx-auto p-4 grid gap-4">
      <h1 className="text-2xl font-bold">Produk</h1>
      <Filters/>
      {isLoading && <div>Memuat...</div>}
      {error && <div className="text-red-600">Gagal memuat</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data?.map((p:any)=>(
          <ProductCard key={p.id} p={p} onAdd={()=>addToCart(p,1)} />
        ))}
      </div>
      {data && <Pagination page={data.meta.page} total={data.meta.total} pageSize={data.meta.page_size} onPage={setPage} />}
    </div>
  )
}
