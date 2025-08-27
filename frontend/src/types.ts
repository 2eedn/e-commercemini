export interface Category { id: number; name: string }
export interface Product { id: number; title: string; description?: string; price: number; image_url?: string; category_id?: number }
export interface OrderItem { product_id: number; quantity: number; unit_price?: number }
export interface Order { id: number; email: string; full_name: string; address: string; items: OrderItem[] }
export interface PageMeta { page: number; page_size: number; total: number }
export interface PageProducts { data: Product[]; meta: PageMeta }
