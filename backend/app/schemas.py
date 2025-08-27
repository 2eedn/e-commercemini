from __future__ import annotations
from typing import Optional, List
from pydantic import BaseModel, EmailStr, PositiveInt, field_validator

# Product
class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    category_id: Optional[int] = None

    @field_validator("price")
    @classmethod
    def validate_price(cls, v: float) -> float:
        if v < 0:
            raise ValueError("Price must be >= 0")
        return round(v, 2)

class ProductOut(ProductBase):
    id: int
    class Config:
        from_attributes = True

class CategoryOut(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

# Order
class OrderItemIn(BaseModel):
    product_id: int
    quantity: PositiveInt

class OrderCreate(BaseModel):
    email: EmailStr
    full_name: str
    address: str
    items: List[OrderItemIn]

class OrderItemOut(BaseModel):
    product_id: int
    quantity: int
    unit_price: float

class OrderOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    address: str
    items: List[OrderItemOut]
    class Config:
        from_attributes = True

class PageMeta(BaseModel):
    page: int
    page_size: int
    total: int

class PageProducts(BaseModel):
    data: list[ProductOut]
    meta: PageMeta
