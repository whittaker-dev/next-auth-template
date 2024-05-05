"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const updateUser = async (data: Partial<User>) => {
  return await db.user.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
    },
  });
};
