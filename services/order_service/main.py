from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Order(BaseModel):
    item: str
    quantity: int
    total_price: float

orders_db = []

@app.post("/place_order")
async def place_order(order: Order):
    total_price = order.quantity * 10.0  # Assuming a fixed price per item
    order_data = Order(item=order.item, quantity=order.quantity, total_price=total_price)
    orders_db.append(order_data)
    return order_data

@app.get("/orders")
async def get_orders():
    return orders_db
