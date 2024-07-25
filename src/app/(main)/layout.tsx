import { redirect } from "next/navigation";

import { validationRequest } from "@/auth";

import SessionProvider from "@/app/(main)/SessionProvider";
import Navbar from "@/app/(main)/Navbar";
import MenuBar from "@/app/(main)/MenuBar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  /*This is for user experience => redirect user to the correct page, when we are gonna fetch data 
    there will always be an authentication check before we show it to the user. So there isn't going
    to be a security issue.*/
  const session = await validationRequest();

  if (!session.user) redirect("/sign-in");

  /* Created a SessionProvider to make it available to all client components so we don't need to
     fetch it again there. Only the SessionProvider is a client component, children still could be 
     server components. In Next.js you can wrap server components into client components through children prop.
     So pages still could be rendered on the server side and only the Session Provider is rendered on the
     client side. We don't lose any server side features here. */
  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
          {children}
        </div>
        {/* Only visible on mobile screens at the bottom */}
        <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
      </div>
    </SessionProvider>
  );
};
export default MainLayout;
