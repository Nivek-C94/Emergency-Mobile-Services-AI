# Emergency-Mobile-Services-AI

Small Express service that proxies chat + booking requests between the assistant UI and the Emergency Mobile Services API.

## Prerequisites
- Node.js 18+
- Access to the Emergency Mobile Services backend (set `EMS_BASE_URL`).
- Gemini API key for LLM responses.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file and fill in the values:
   ```bash
   cp .env.example .env
   ```
3. Run the service:
   ```bash
   npm start
   ```

The server listens on `PORT` (defaults to `5001`).

## Environment variables
See `.env.example` for the full list. The most important values are:
- `EMS_BASE_URL`: Base URL for the Emergency Mobile Services backend that exposes the assistant and pricing endpoints.
- `GEMINI_API_KEY`: API key for Google Gemini.
- `GEMINI_MODEL`: Optional override for the Gemini model name.
- `GOOGLE_PROJECT_ID`: Optional; use when calling Gemini through Vertex AI.

## API
- `POST /chat` – body `{ "message": "..." }`, returns `{ reply }`.
- `POST /bookings` – body must include `name`, `phone`, `device`, and `issue`.
- `GET /bookings/nearby?date=YYYY-MM-DD` – fetch nearby booking slots.
- `GET /test-gemini` – quick Gemini connectivity check.
- `GET /health` – health probe.

## Error handling
Requests to the EMS backend forward HTTP status codes and error messages where possible. Missing required fields return `400` with a descriptive message.
