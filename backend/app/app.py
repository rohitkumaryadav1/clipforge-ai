"""ClipForge AI API application entry point."""

import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")


class RootResponse(BaseModel):
    name: str
    version: str
    docs: str


class HealthResponse(BaseModel):
    status: str


app = FastAPI(
    title="ClipForge AI API",
    description="Find and prepare short-form clips from YouTube videos.",
    version="0.1.0",
)

web_origin = os.getenv("WEB_ORIGIN", "http://localhost:5500")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[web_origin],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/", response_model=RootResponse, tags=["general"])
def read_root() -> RootResponse:
    """Describe the API and link to its interactive documentation."""
    return RootResponse(name=app.title, version=app.version, docs="/docs")


@app.get("/health", response_model=HealthResponse, tags=["health"])
def health_check() -> HealthResponse:
    """Report that the API process is responding."""
    return HealthResponse(status="ok")
