export const DATA_KEY = 'data';

export interface ISaveRequest {
  data: string;
}

export interface TypedRequest <Body, Query, Params> {
  body: Body;
  query: Query;
  params: Params;
}

export interface IUser {
  user: string;
}

export interface BasicResponse {
  status: number;
  json: any;
}
