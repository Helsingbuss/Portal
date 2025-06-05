# backend/app/main.py
from fastapi import FastAPI
from app.routers import auth

app = FastAPI()

app.include_router(auth.router)


# backend/app/routers/auth.py
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from supabase import create_client, Client
import os

SUPABASE_URL = "https://gfjchjixpsfgxoprdsfx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmamNoaml4cHNmZ3hvcHJkc2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMjYyMjMsImV4cCI6MjA2NDcwMjIyM30.MAl-fl15C6ua-CL3-76UOCwmWs0smNapTvMLmwvT8MQ"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

router = APIRouter()

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    auth = supabase.auth.sign_in_with_password({
        "email": form_data.username,
        "password": form_data.password
    })
    
    if not auth or not auth.session:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "access_token": auth.session.access_token,
        "token_type": "bearer"
    }
