import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import signUpImage from "@/assets/signup-image.jpg";
import vibeNetLogo from "@/assets/vibenet-logo.png";

import SignUpForm from "@/app/(auth)/sign-up/SignUpForm";

export const metadata: Metadata = {
  title: "Sign-Up",
};

const SignUpPage = () => {
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
            <SignUpForm />
            <Link href="/sign-in" className="block text-center">
              Already an account?{" "}
              <span className="text-violet-700 hover:underline">Sign In</span>
            </Link>
          </div>
        </div>
        <Image
          src={signUpImage}
          alt="sign-up image"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};
export default SignUpPage;
