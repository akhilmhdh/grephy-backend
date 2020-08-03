import { InsertOneWriteOpResult, UpdateWriteOpResult } from 'mongodb';

export interface response {
    err: string | null;
    value:
        | InsertOneWriteOpResult<{ _id: unknown }>
        | UpdateWriteOpResult
        | (any | null);
}

interface data {
    name: string;
    description: string;
    title: string;
    xAxis: string;
    yAxis: string;
}

export interface createGraph {
    _user: string;
    _channel: string;
    data: data;
}
