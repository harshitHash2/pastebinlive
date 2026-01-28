# PasteBin Like Application

Frontend: Next.js (React + Bootstrap)
Backend: Node.js + Express
Database: Redis (ioredis)

## Project Structure


pastebin-project/


backend/ → Express API server
frontend/ → Next.js application

## Run Backend
cd server
npm install
Create .env:
REDIS_URL=redis://username:password@host:port
FRONTEND_URL=http://localhost:3000
PORT=5000
npm run dev


### API Routes

POST /api/pastes
Body:
{
"content": "string",
"ttl_seconds": 60, // optional
"max_views": 5 // optional
}



GET /api/pastes/:id

{
  id: 'L5m82ocb',
  content: 'sdfgthyt',
  created_at: 1769605142631,
  expires_at: null,
  max_views: null,
  views: 1
}

## Run Frontend
cd client
npm install
npm run dev
