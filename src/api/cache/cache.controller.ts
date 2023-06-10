import { BasicResponse, ISaveRequest, IUser, TypedRequest } from "./cache.models";
import { getFromRedis, saveToRedis } from "./cache.service";

export const saveDataToRedis =
  async (req: TypedRequest<ISaveRequest, {}, {}>, res: BasicResponse
) => {
  console.log('Saving data to Redis...' + req.body.data);
  await saveToRedis(req.body);

  res.json({status: 'success'});
};

export const getDataFromRedis =
  async (req: TypedRequest<{}, { page: number }, {}> & IUser, res: BasicResponse
) => {
  console.log(`Getting data from redis for page: ${req.query.page}...`);
  const data = await getFromRedis(req.query.page);

  res.json({status: 'success', data});
};

