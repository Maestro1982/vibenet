"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia, validationRequest } from "@/auth";

export async function logout() {
  const { session } = await validationRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/sign-in");
}
