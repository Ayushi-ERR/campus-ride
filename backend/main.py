import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "https://campus-ride-gold-five.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Models ----------

class Ride(BaseModel):
    id: str
    driverName: str
    rating: str
    from_location: str = Field(alias="from")
    to: str
    date: str
    time: str
    car: str
    registrationNumber: str
    seats: str
    price: str

    model_config = {"populate_by_name": True}


class User(BaseModel):
    email: str
    status: str  # "pending" or "verified"


class UserStatusUpdate(BaseModel):
    status: str


# ---------- Rides Endpoints ----------

@app.get("/rides")
def get_rides():
    response = supabase.table("rides").select("*").execute()
    return response.data


@app.post("/rides")
def create_ride(ride: Ride):
    ride_data = {
        "id": ride.id,
        "driverName": ride.driverName,
        "rating": ride.rating,
        "from": ride.from_location,
        "to": ride.to,
        "date": ride.date,
        "time": ride.time,
        "car": ride.car,
        "registrationNumber": ride.registrationNumber,
        "seats": ride.seats,
        "price": ride.price,
    }
    response = supabase.table("rides").insert(ride_data).execute()
    return response.data


@app.delete("/rides/{ride_id}")
def delete_ride(ride_id: str):
    response = supabase.table("rides").delete().eq("id", ride_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Ride not found")
    return {"message": "Ride deleted successfully"}


# ---------- Users Endpoints ----------

@app.get("/users")
def get_users():
    response = supabase.table("users").select("*").execute()
    return response.data


@app.post("/users")
def create_user(user: User):
    user_data = {"email": user.email, "status": user.status}
    response = supabase.table("users").insert(user_data).execute()
    return response.data


@app.patch("/users/{email}")
def update_user_status(email: str, body: UserStatusUpdate):
    response = supabase.table("users").update({"status": body.status}).eq("email", email).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="User not found")
    return response.data