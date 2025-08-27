from __future__ import annotations
import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .db import Base, engine, get_db
from . import schemas, crud
from .deps import pagination
from .utils import bad_request, not_found

app = FastAPI(title="Ecommerce Simple API")

origins = os.getenv("CORS_ORIGINS", "*").split(",") if os.getenv("CORS_ORIGINS") else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/products", response_model=schemas.PageProducts)
def get_products(
    pg = Depends(pagination),
    category_id: int | None = None,
    sort: str | None = None,  # price_asc | price_desc | latest(default)
    min_price: float | None = None,
    max_price: float | None = None,
    db: Session = Depends(get_db),
):
    items, total = crud.list_products(db, page=pg["page"], page_size=pg["page_size"], category_id=category_id, sort=sort, min_price=min_price, max_price=max_price)
    return {"data": items, "meta": {"page": pg["page"], "page_size": pg["page_size"], "total": total}}

@app.post("/orders", response_model=schemas.OrderOut, status_code=201)
def create_order(payload: schemas.OrderCreate, db: Session = Depends(get_db)):
    if not payload.items:
        bad_request("Order items cannot be empty")
    order = crud.create_order(
        db,
        email=payload.email,
        full_name=payload.full_name,
        address=payload.address,
        items=[(i.product_id, i.quantity) for i in payload.items],
    )
    return order

@app.get("/orders", response_model=dict)
def get_orders(pg = Depends(pagination), db: Session = Depends(get_db)):
    items, total = crud.list_orders(db, page=pg["page"], page_size=pg["page_size"])
    out = []
    for o in items:
        out.append({
            "id": o.id,
            "email": o.email,
            "full_name": o.full_name,
            "address": o.address,
            "items": [{"product_id": it.product_id, "quantity": it.quantity, "unit_price": float(it.unit_price)} for it in o.items],
        })
    return {"data": out, "meta": {"page": pg["page"], "page_size": pg["page_size"], "total": total}}

@app.get("/orders/{order_id}", response_model=schemas.OrderOut)
def get_order_detail(order_id: int, db: Session = Depends(get_db)):
    order = crud.get_order(db, order_id)
    if not order:
        not_found("Order not found")
    return order
