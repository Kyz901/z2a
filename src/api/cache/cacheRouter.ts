import { Router } from "express";
import { getDataFromRedis, saveDataToRedis } from "./cache.controller";
import { validateToken } from "./cache.middlewares";

export const cacheRouter = Router();

cacheRouter.get("/",
  validateToken,
  getDataFromRedis
);

cacheRouter.post("/",
  saveDataToRedis
);
