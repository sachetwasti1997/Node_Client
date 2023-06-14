import { SerializedError } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export type CurrentUser = {
  id: string;
  email: string;
  iat: number;
};

export type SignRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export class ResponseError {
  constructor(public message: string, public field?: string) {}
}

export type TicketRequest = {
  title: string;
  price: string;
  description: string;
};

export type TicketResp = {
  title: string;
  price: string;
  userId: string;
  version: number;
  id: string;
  description: string;
};

export type Order = {
  id: string;
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketResp;
  version: number;
};
