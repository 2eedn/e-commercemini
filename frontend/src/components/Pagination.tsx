export default function Pagination({ page, total, pageSize, onPage }: {page:number; total:number; pageSize:number; onPage:(p:number)=>void}){
  const pages = Math.max(1, Math.ceil(total / pageSize))
  return (
    <div className="flex gap-2 items-center">
      <button className="px-3 py-1 border rounded-xl" disabled={page<=1} onClick={()=>onPage(page-1)}>Prev</button>
      <span>{page} / {pages}</span>
      <button className="px-3 py-1 border rounded-xl" disabled={page>=pages} onClick={()=>onPage(page+1)}>Next</button>
    </div>
  )
}
