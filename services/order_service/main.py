from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

# Allow requests from all origins during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to the actual origin of your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for orders (replace with a database in a real application)
orders_db = []

@app.get("/get_orders", response_model=List[dict])
async def get_orders():
    return orders_db

@app.post("/place_order", response_model=dict)
async def place_order(order: dict):
    new_order = {"id": len(orders_db) + 1, **order}
    orders_db.append(new_order)
    return new_order