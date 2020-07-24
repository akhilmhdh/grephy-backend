import { InsertOneWriteOpResult, ObjectID, UpdateWriteOpResult } from "mongodb";

export interface response {
  err: string | null;
  value:
    | InsertOneWriteOpResult<{ _id: unknown }>
    | UpdateWriteOpResult
    | (any | null);
}

export interface querySchema {
  _id: ObjectID;
  _user: string;
}

export interface createChannel {
  _user: string;
  name: string;
  description: string;
}

export interface updateChannel {
  name: string;
  description: string;
}
