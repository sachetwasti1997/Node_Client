import { SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export type CurrentUser = {
  id: string;
  email: string;
  iat: number;
};

export type SignRequest = {
  email: string;
  password: string;
};

export class ResponseError {
    constructor(public message: string, public field?: string){}
}
