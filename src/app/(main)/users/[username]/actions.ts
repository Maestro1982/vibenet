"use server";

import { validationRequest } from "@/auth";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import streamServerClient from "@/lib/stream";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validateValues = updateUserProfileSchema.parse(values);

  const { user } = await validationRequest();

  if (!user) throw new Error("Unauthorized");

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: {
        id: user.id,
      },
      data: validateValues,
      select: getUserDataSelect(user.id),
    });
    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: {
        name: validateValues.displayName,
      },
    });
    return updatedUser;
  });

  return updatedUser;
}
