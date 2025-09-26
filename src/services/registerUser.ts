/*src/services/registerUser.ts*/

import { postRequest } from './instance';

export interface RegisterPayload {
  email: string;
  fullName: string;
  password: string;
};

export const registerUser = async (payload: RegisterPayload) => {
  return postRequest<{ success: boolean; message: string; userId: string }>('/registerUser', payload);
};


export interface VerifyPayload {
  userId: string;
  code: string;
};

export const verifyCode = async (payload: VerifyPayload) => {
  return postRequest<{ success: boolean; message: string }>('/verifyUser',payload);
};


export interface Fogot{
    email: string;
};

export const fogotPasPost = async (payload: Fogot) => {
    return postRequest<{ success: boolean; message: string; userId: string }>('/fogotPassword',payload);
};



export interface NewPass{
  userId: string;
  password: string;
};

export const newPassPost = async (payload: NewPass) => {
  return postRequest<{success: boolean; message: string}>('/newPassApi', payload);
};

export interface newPasswordEmail{
  userId: string;
}

export const newPasswordEmail = async (payload: newPasswordEmail) => {
  return postRequest<{success: boolean; message: string}>('/newPasswordEmail', payload)
}


export interface ConfirmNewData {
  email: string;
  fullName: string;
  password: string;
};

export const newConfirmNewData = async (payload: ConfirmNewData) => {
  return postRequest<{success: boolean; message: string}>('/newConfirmNewData', payload);
};