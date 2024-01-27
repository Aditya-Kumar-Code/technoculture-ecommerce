from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

# CORS settings for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Order(BaseModel):
    item: str
    quantity: int

@app.post("/place_order", response_model=dict)
async def place_order(order: Order):
    payment_response = requests.post("http://payment-service/process_payment", json={"order": order.dict()})
    inventory_response = requests.post("http://inventory-service/update_inventory", json={"order": order.dict()})
    payment_result, inventory_result = payment_response.json(), inventory_response.json()
    return {"message": "Order placed successfully", "payment_result": payment_result, "inventory_result": inventory_result}
