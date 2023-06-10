import * as redisService from "../../services/redis/redis.service"
import { DATA_KEY, ISaveRequest } from "./cache.models";
import { PAGE_STEP } from "../../services/redis/redis.models";

export const saveToRedis = async (params: ISaveRequest) => {
  await redisService.rPushToRedis({
    key: DATA_KEY,
    data: params.data
  });
};

export const getFromRedis = async (page: number) => {
  const start = (page - 1) * PAGE_STEP;

  return await redisService.lRangeFromRedis({
    key: DATA_KEY,
    start,
    end: start + PAGE_STEP
  })
};


