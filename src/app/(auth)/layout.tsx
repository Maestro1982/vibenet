import { redirect } from "next/navigation";

import { validationRequest } from "@/auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validationRequest();

  if (user) redirect("/");

  return <>{children}</>;
};
export default AuthLayout;
