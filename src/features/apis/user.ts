import { apiClient } from "@/app/api/axios";
import { IUser } from "@/lib/interfaces";

class UserApi {
  async getById(id: string): Promise<IUser> {
    try {
      const user = await apiClient.get<IUser>(`/users/${id}`);
      return user as IUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, payload: {}) {
    try {
      const result = await apiClient.put(`/users/${id}`, payload);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
export const userApi = new UserApi();
