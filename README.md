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
Create .env.local: 
    NEXT_PUBLIC_API_URL=https://localhost.onrender.com
npm install
npm run dev


# Run live url 

First hit the endpoint for backend service to spin up as render free service spin down after every 15 minute of inactivity

Backend URL: https://pastebinlive.onrender.com/API/HEALTHZ

then access the frontend url
Frontend URL : https://pastebinlive.vercel.app/

# What could be Better

- Implement the routes logic for node js application in separate file in controllers.
- DB can be integrated
- Running the Node js application using pm2 like services to utillize the CPU multicore utilization for our application on a server.