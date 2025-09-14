import { postRequest } from './instance';

export interface RegisterPayload {
  email: string;
  fullName: string;
  password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  return postRequest<{ success: boolean; message?: string }>('/registerUser', payload);
};
