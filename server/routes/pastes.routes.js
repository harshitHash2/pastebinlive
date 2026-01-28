import express from "express";
import Redis from "ioredis";
import { nanoid } from "nanoid";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const redis = new Redis(process.env.REDIS_URL);

router.post("/", async (req,res)=>{
  const {content, ttl_seconds, max_views} = req.body;
  if(!content) return res.status(400).json({error:"content is required"});

  const id = nanoid(8);
  const now = Date.now();
  const paste = {
    id, content,
    created_at: now,
    expires_at: ttl_seconds ? now + ttl_seconds*1000 : null,
    max_views: max_views ?? null,
    views:0
  };

  await redis.set(`paste:${id}`, JSON.stringify(paste));
  res.json({id, url:`${process.env.FRONTEND_URL}/p/${id}`});
});

router.get("/:id", async (req,res)=>{
  const raw = await redis.get(`paste:${req.params.id}`);
  if(!raw) return res.status(404).json({error:"not found"});
  const p = JSON.parse(raw);
  const now = Date.now();
  if(p.expires_at && now>p.expires_at) return res.status(404).json({error:"expired"});
  if(p.max_views!==null && p.views>=p.max_views) return res.status(404).json({error:"no views"});
  p.views++;
  await redis.set(`paste:${req.params.id}`, JSON.stringify(p));
  console.log("Serving paste:",p);
  res.json({content:p});
});
export default router;