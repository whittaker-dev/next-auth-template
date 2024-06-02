import { apiClient } from "@/app/api/axios";
import { IPayloadUpdateUser, IUser } from "@/features/apis/interfaces";
import { IFileUpload } from "@/utils/shared";
import axios from "axios";

class UserApi {
  async getById(id: string): Promise<IUser> {
    try {
      const user = await apiClient.get<IUser>(`/users/${id}`);
      return user as IUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, payload: IPayloadUpdateUser) {
    try {
      const result = await apiClient.put(`/users/${id}`, payload);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async generatePreSignUrl(userId: string, payload: IFileUpload) {
    try {
      const url = await apiClient.post(`/users/profile-image/pre-sign-url`, {
        userId,
        file: payload,
      });
      return url;
    } catch (error) {
      throw error;
    }
  }

  async uploadAvatarToService(url: string, file: File) {
    try {
      await axios.put(`${url}`, file, {
        headers: { "Content-Type": file.type },
      });
    } catch (error) {
      throw error;
    }
  }
}
export const userApi = new UserApi();
