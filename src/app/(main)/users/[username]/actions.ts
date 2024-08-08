"use server";

import { validationRequest } from "@/auth";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validateValues = updateUserProfileSchema.parse(values);

  const { user } = await validationRequest();

  if (!user) throw new Error("Unauthorized");

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: validateValues,
    select: getUserDataSelect(user.id),
  });

  return updatedUser;
}
