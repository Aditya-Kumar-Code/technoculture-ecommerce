from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class InventoryItem(BaseModel):
    product_name: str
    quantity_available: int

inventory_db = [
    {"product_name": "Product A", "quantity_available": 10},
    {"product_name": "Product B", "quantity_available": 5},
]

@app.get("/check_inventory/{product_name}")
async def check_inventory(product_name: str):
    item = next((item for item in inventory_db if item["product_name"] == product_name), None)
    if item:
        return {"product_name": item["product_name"], "quantity_available": item["quantity_available"]}
    else:
        raise HTTPException(status_code=404, detail="Product not found in inventory")

@app.post("/reduce_inventory")
async def reduce_inventory(item: InventoryItem):
    for inventory_item in inventory_db:
        if inventory_item["product_name"] == item.product_name:
            if inventory_item["quantity_available"] >= item.quantity_available:
                inventory_item["quantity_available"] -= item.quantity_available
                return {"status": "success", "message": f"Inventory reduced for {item.product_name}"}
            else:
                raise HTTPException(status_code=400, detail="Not enough quantity available in inventory")
    raise HTTPException(status_code=404, detail="Product not found in inventory")
