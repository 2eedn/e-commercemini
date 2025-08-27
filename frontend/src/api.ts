const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function fetchProducts(params: Record<string, string | number | undefined>) {
  const url = new URL(API_URL + "/products");
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== "") url.searchParams.set(k, String(v)); });
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createOrder(body: { email: string; full_name: string; address: string; items: {product_id:number; quantity:number}[] }) {
  const res = await fetch(API_URL + "/orders", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchOrders(params: { page?: number; page_size?: number }) {
  const url = new URL(API_URL + "/orders");
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== "") url.searchParams.set(k, String(v)); });
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchOrder(id: number) {
  const res = await fetch(API_URL + "/orders/" + id);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
