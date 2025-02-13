import { Metadata } from "next";

import Notifications from "@/app/(main)/notifications/Notifications";

import TrendsSidebar from "@/components/TrendsSidebar";

export const metadata: Metadata = {
  title: "Notifications",
};

const NotificationsPage = () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-xl font-bold">Notifications</h1>
        </div>
        <Notifications />
      </div>
      <TrendsSidebar />
    </main>
  );
};
export default NotificationsPage;
