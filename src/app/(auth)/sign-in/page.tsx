import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import vibeNetLogo from "@/assets/vibenet-logo.png";
import loginImage from "@/assets/login-image.jpg";

import SignInForm from "@/app/(auth)/sign-in/SignInForm";

export const metadata: Metadata = {
  title: "Sign-In",
};

const SignInPage = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-xl">
        <div className="w-full space-y-10 overflow-auto p-10 md:w-1/2">
          <div className="flex justify-center space-y-1 text-center">
            <Image
              src={vibeNetLogo}
              alt="vibeNet"
              height={52}
              width={52}
              className="mr-3"
            />
            <span className="text-3xl font-bold">VibeNet</span>
          </div>
          <p className="text-center text-muted-foreground">
            A place where even <span className="italic">you</span> can find a
            friend.
          </p>
          <div className="space-y-5">
            <SignInForm />
            <Link href="/sign-up" className="block text-center">
              No account?{" "}
              <span className="text-violet-700 hover:underline dark:text-violet-400">
                Sign Up
              </span>
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt="login image"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};
export default SignInPage;
