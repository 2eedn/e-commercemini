# E‑Commerce Sederhana (React + TypeScript + FastAPI + PostgreSQL)

Monorepo berisi **frontend** (React + TS) dan **backend** (FastAPI) dengan **PostgreSQL**.
Mendukung: daftar produk (filter + paginasi), checkout guest, simpan & tampilkan order.

## 🚀 Fitur
- List produk: filter kategori, sort harga, rentang harga, paginasi.
- Checkout guest: validasi email, jumlah > 0, simpan ke DB.
- Daftar & detail pesanan.
- Type-safe: TypeScript (frontend), Pydantic v2 (backend).
- Optimisasi: lazy-load image, memoization, debouncing filter, index DB.

## 🧰 Prasyarat
- Node.js >= 18, PNPM/NPM/Yarn (pilih salah satu)
- Python >= 3.11 + pip
- Docker (opsional, untuk cepat jalan)
- PostgreSQL (lokal/remote) — default via Docker Compose

## 📦 Cara Jalan (semua dengan Docker Compose) — Termudah
```bash
# 1) Jalankan DB + backend + seed data
docker-compose up --build -d db backend
# (opsional) seed data
docker-compose run --rm backend python -m app.seed

# 2) Jalankan frontend (dev server hot-reload)
docker-compose up --build -d frontend

# 3) Akses
# Frontend: http://localhost:5173
# Backend:  http://localhost:8000/docs
```

## 🧑‍🍳 Setup Manual (tanpa Docker)
### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -U pip
pip install -e .
# siapkan PostgreSQL dan salin .env.example ke .env, lalu sesuaikan
cp ../.env.example .env  # atau buat sendiri
uvicorn app.main:app --reload --port 8000
# seed (opsional)
python -m app.seed
```

### Frontend
```bash
cd frontend
npm i
# set VITE_API_URL sesuai alamat backend (default: http://localhost:8000)
echo "VITE_API_URL=http://localhost:8000" > .env.local
npm run dev
```

## 🔧 Environment
Buat file `.env` (backend) dari `.env.example`:
```
DATABASE_URL=postgresql+psycopg2://postgres:postgres@db:5432/ecommerce
CORS_ORIGINS=*
```

## 🗂️ Struktur
```
ecommerce-simple/
├─ README.md
├─ docker-compose.yml
├─ .env.example
├─ backend/
│  ├─ pyproject.toml
│  ├─ app/
│  │  ├─ __init__.py
│  │  ├─ main.py
│  │  ├─ db.py
│  │  ├─ models.py
│  │  ├─ schemas.py
│  │  ├─ crud.py
│  │  ├─ deps.py
│  │  ├─ seed.py
│  │  └─ utils.py
├─ frontend/
│  ├─ index.html
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ vite.config.ts
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  └─ src/...
```

## 🧪 Evaluasi (Checklist)
- Type safety: TS interfaces, Pydantic models/validators.
- State handling: Zustand (cart, filters), React Query.
- Performance: lazy images, memoized components, debounce input; DB index untuk filter.
- Repo & Docs: struktur modular + README.
- Deployment (opsional): Vercel/Netlify (frontend), Railway/Fly.io (backend), Supabase/Railway (DB).

## 🌐 Endpoint Utama
- `GET /products?page=&page_size=&category_id=&min_price=&max_price=&sort=`
- `POST /orders` (email, full_name, address, items[{product_id, quantity}])
- `GET /orders` (paginasi)
- `GET /orders/{id}`

Selamat mencoba!
