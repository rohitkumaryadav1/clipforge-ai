# ClipForge AI

ClipForge AI is a browser-based platform where creators provide a YouTube link and get its strongest hook moments shaped into Shorts-ready clips. Automatic publishing to social platforms is a later product phase. This repository has the first product UI, but YouTube import, hook analysis, clip generation, and publishing are not connected yet.

## Architecture

- **Frontend (`frontend/`)**: Plain HTML, CSS, and vanilla JavaScript. The first screen centers on the YouTube link workflow. It checks link format in the browser and clearly reports that import and analysis are not connected.
- **Backend (`backend/`)**: Python with FastAPI, served by Uvicorn from `backend/app/app.py`. Pydantic response models validate the root and health responses. The `routes/`, `services/`, and `utils/` packages are reserved for API routes, YouTube ingestion and clip workflows, and shared helpers.
- **Video processing**: FFmpeg is planned for later clip generation and export. It is not a Python dependency and was not found on PATH during environment inspection.
- **Publishing**: Automatic upload to Shorts platforms is a later phase.
- **Runtime data**: No database, authentication, or cloud storage is configured. Downloaded source media and generated clips must stay out of Git.

FastAPI reads local settings from the project root `.env` file via `python-dotenv`. `.env.example` documents the development settings. The frontend does not yet call the API, and link validation does not download or analyze video.

## Requirements

- Python 3.11 or newer
- The existing root-level virtual environment at `venv/`
- A modern browser
- FFmpeg later, when video processing is implemented

## Install backend dependencies

From the project root, use the existing virtual environment. Do not create a second one.

```powershell
.\venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

## Run locally

Copy `.env.example` to `.env` if you need to change the browser origin.

Start the API from the project root:

```powershell
.\venv\Scripts\python.exe -m uvicorn backend.app.app:app --reload --host 127.0.0.1 --port 8000
```

In a second terminal, serve the static frontend:

```powershell
cd frontend
python -m http.server 5500
```

Open `http://localhost:5500` to see the UI. The API endpoints are `http://127.0.0.1:8000/` and `http://127.0.0.1:8000/health`; interactive API documentation is at `http://127.0.0.1:8000/docs`.

## Project structure

```text
.
|-- backend/
|   |-- app/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- utils/
|   |   |-- __init__.py
|   |   `-- app.py
|   `-- requirements.txt
|-- frontend/
|   |-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- js/
|   |   `-- app.js
|   `-- index.html
|-- .env.example
|-- .gitignore
|-- AGENTS.md
`-- README.md
```

## Current API

- `GET /` returns API name, version, and the documentation path.
- `GET /health` reports whether the API process responds.
- `/docs` provides FastAPI's generated Swagger UI.

These endpoints do not fetch YouTube videos or analyze hooks. Implement and verify each product capability as its own milestone.
