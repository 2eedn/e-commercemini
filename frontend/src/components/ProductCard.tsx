import React from 'react'
import type { Product } from '../types'

type Props = { p: Product; onAdd: () => void }
const ProductCard = React.memo(({ p, onAdd }: Props) => {
  return (
    <div className="rounded-2xl shadow p-4 flex flex-col gap-2">
      <img loading="lazy" src={p.image_url} alt={p.title} className="w-full h-40 object-cover rounded-xl" />
      <div className="font-medium">{p.title}</div>
      <div className="text-sm text-gray-500 line-clamp-2">{p.description}</div>
      <div className="mt-auto flex items-center justify-between">
        <div className="font-semibold">Rp{(p.price * 1000).toLocaleString('id-ID')}</div>
        <button onClick={onAdd} className="px-3 py-1 rounded-xl bg-black text-white">Tambah</button>
      </div>
    </div>
  )
})
export default ProductCard
