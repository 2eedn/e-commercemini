import { useStore } from '../store'
import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks'

export default function Filters() {
  const { setFilters, filters } = useStore()
  const [min, setMin] = useState<number | undefined>(filters.min_price)
  const [max, setMax] = useState<number | undefined>(filters.max_price)
  const debMin = useDebounce(min)
  const debMax = useDebounce(max)

  useEffect(() => setFilters({ min_price: debMin }), [debMin])
  useEffect(() => setFilters({ max_price: debMax }), [debMax])

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <select className="border rounded-xl p-2" value={filters.category_id ?? ''} onChange={e=>setFilters({ category_id: e.target.value ? Number(e.target.value): undefined })}>
        <option value="">Semua Kategori</option>
        <option value="1">Elektronik</option>
        <option value="2">Fashion</option>
        <option value="3">Rumah Tangga</option>
      </select>
      <select className="border rounded-xl p-2" value={filters.sort ?? ''} onChange={e=>setFilters({ sort: e.target.value as any })}>
        <option value="">Terbaru</option>
        <option value="price_asc">Harga Termurah</option>
        <option value="price_desc">Harga Termahal</option>
      </select>

      <div className="flex items-center gap-2">
        <input className="border rounded-xl p-2 w-32" type="number" placeholder="Min" value={min ?? ''} onChange={e=>setMin(e.target.value? Number(e.target.value): undefined)} />
        <input className="border rounded-xl p-2 w-32" type="number" placeholder="Max" value={max ?? ''} onChange={e=>setMax(e.target.value? Number(e.target.value): undefined)} />
      </div>
    </div>
  )
}
