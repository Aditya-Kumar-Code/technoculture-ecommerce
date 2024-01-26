from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Payment(BaseModel):
    order_id: int
    amount: float

@app.post("/process_payment")
async def process_payment(payment: Payment):
    # Simplified logic: Assume payment is always successful
    return {"status": "success", "message": f"Payment processed for Order {payment.order_id}, Amount: ${payment.amount}"}
