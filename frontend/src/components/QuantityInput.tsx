export default function QuantityInput({ value, onChange }:{value:number; onChange:(v:number)=>void}){
  return (
    <div className="flex items-center gap-2">
      <button className="px-2 border rounded" onClick={()=>onChange(Math.max(1, value-1))}>-</button>
      <input className="w-12 border rounded text-center" type="number" min={1} value={value} onChange={e=>onChange(Math.max(1, Number(e.target.value)||1))} />
      <button className="px-2 border rounded" onClick={()=>onChange(value+1)}>+</button>
    </div>
  )
}
