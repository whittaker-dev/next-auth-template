"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { IPayloadSignUp } from "./interface/auth.interface";

export const signUp = async (payload: IPayloadSignUp) => {
  try {
    const { email, password, userName, image, name } = payload;
    const userExist = await db.user.findUnique({ where: { email } });

    if (userExist) {
      throw new Error(`Email doesn't exist`);
    }
    const hasPassword = await bcrypt.hash(password, 10);
    
    const newUser = await db.user.create({
      data: {
        email,
        password: hasPassword,
        name,
        userName,
        avatar: (image as string) ?? "",
        updatedAt: new Date(),
      },
    });
    
    //* Send verification token email

    return newUser;
  } catch (error) {
    throw error;
  }
};
