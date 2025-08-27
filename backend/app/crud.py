from __future__ import annotations
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from . import models

def list_products(db: Session, *, page: int, page_size: int, category_id: int | None, sort: str | None, min_price: float | None, max_price: float | None):
    stmt = select(models.Product)
    if category_id:
        stmt = stmt.where(models.Product.category_id == category_id)
    if min_price is not None:
        stmt = stmt.where(models.Product.price >= min_price)
    if max_price is not None:
        stmt = stmt.where(models.Product.price <= max_price)
    if sort == "price_asc":
        stmt = stmt.order_by(models.Product.price.asc())
    elif sort == "price_desc":
        stmt = stmt.order_by(models.Product.price.desc())
    else:
        stmt = stmt.order_by(models.Product.id.desc())

    total = db.execute(select(func.count()).select_from(stmt.subquery())).scalar_one()
    items = db.execute(stmt.limit(page_size).offset((page-1)*page_size)).scalars().all()
    return items, total

def create_order(db: Session, *, email: str, full_name: str, address: str, items: list[tuple[int,int]]):
    product_map = {p.id: p for p in db.query(models.Product).filter(models.Product.id.in_([pid for pid,_ in items])).all()}
    order = models.Order(email=email, full_name=full_name, address=address)
    for pid, qty in items:
        product = product_map.get(pid)
        if not product:
            raise ValueError(f"Product {pid} not found")
        if qty <= 0:
            raise ValueError("Quantity must be > 0")
        order.items.append(models.OrderItem(product_id=pid, quantity=qty, unit_price=float(product.price)))
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

def list_orders(db: Session, *, page: int, page_size: int):
    q = db.query(models.Order).order_by(models.Order.id.desc())
    total = q.count()
    items = q.limit(page_size).offset((page-1)*page_size).all()
    return items, total

def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter_by(id=order_id).first()
