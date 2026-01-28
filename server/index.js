
import express from "express";
import cors from "cors";
import Redis from "ioredis";

import dotenv from 'dotenv';
dotenv.config();
import pasteRoutes from "./routes/pastes.routes.js";

const app = express();
app.use(cors({
origin: "*",
}));
app.use(express.json());
console.log("REDIS_URL:", process.env.REDIS_URL);
const redis = new Redis(process.env.REDIS_URL);
// const connectionOptions = {
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   username: process.env.REDIS_USERNAME,
//   password: process.env.REDIS_PASSWORD,
//   maxRetriesPerRequest: null,

// };


// const redis = new IORedis(connectionOptions);

app.get("/api/healthz", async (req,res)=>{
    console.log('from me');
  try{ await redis.ping(); res.json({ok:true}); }
  catch{ res.status(500).json({ok:false}); }
});

app.use("/api/pastes", pasteRoutes);

app.listen(5000, ()=>console.log("Backend running on the 5000"));
