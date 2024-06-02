import { apiClient } from "@/app/api/axios";
import { IPayloadSignIn, IPayloadSignUp, IUser } from "@/lib/interfaces";

class AuthApi {
  async signUp(payload: IPayloadSignUp): Promise<IUser> {
    try {
      const newUser = await apiClient.post(`/auth/sign-up`, payload);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async signIn(payload: IPayloadSignIn): Promise<IUser> {
    "use server";
    try {
      const user = await apiClient.post(`/auth/sign-in`, payload);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export const authApi = new AuthApi();
