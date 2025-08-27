from __future__ import annotations
from .db import SessionLocal, Base, engine
from .models import Category, Product

Base.metadata.create_all(bind=engine)

db = SessionLocal()
# Avoid duplicate seed
if db.query(Category).count() == 0:
    cat_map = {}
    for name in ["Elektronik", "Fashion", "Rumah Tangga"]:
        c = Category(name=name)
        db.add(c)
        db.flush()
        cat_map[name] = c.id

    products = [
        ("Headphone X1", 499_000, "https://picsum.photos/seed/hp/640/480", "Elektronik"),
        ("T-Shirt Katun", 99_000, "https://picsum.photos/seed/ts/640/480", "Fashion"),
        ("Blender Pro", 399_000, "https://picsum.photos/seed/bl/640/480", "Rumah Tangga"),
        ("Keyboard Mekanik", 799_000, "https://picsum.photos/seed/kb/640/480", "Elektronik"),
        ("Set Pisau Dapur", 259_000, "https://picsum.photos/seed/knife/640/480", "Rumah Tangga"),
    ]

    for title, price, img, cat in products:
        db.add(Product(title=title, price=price/1000, image_url=img, description=f"{title} berkualitas.", category_id=cat_map[cat]))

    db.commit()
    print("Seeded sample categories & products.")
else:
    print("Seed skipped (data exists).")
