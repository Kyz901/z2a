import { createClient } from 'redis';
import { ILRangeParams, IRPush } from "./redis.models";

export const rPushToRedis = async (params: IRPush) => {
  const client = createClient();
  await client.connect();

  const { key, data } = params;

  await client.rPush(key, [data]);
  await client.disconnect();
};

export const lRangeFromRedis = async (params: ILRangeParams) => {
  const client = createClient();
  await client.connect();

  const { key, start, end } = params;
  const data = await client.lRange(key, start, end);

  await client.disconnect();

  return data;
};
