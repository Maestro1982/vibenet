import { Metadata } from "next";

import Chat from "@/app/(main)/messages/Chat";

export const metadata: Metadata = {
  title: "Messages",
};

const MessagesPage = () => {
  return <Chat />;
};
export default MessagesPage;
