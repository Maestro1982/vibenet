"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Chat as StreamChat } from "stream-chat-react";
import { useTheme } from "next-themes";

import useInitializeChatClient from "@/app/(main)/messages/useInitializeChatClient";

import ChatSidebar from "@/app/(main)/messages/ChatSidebar";
import ChatChannel from "@/app/(main)/messages/ChatChannel";

const Chat = () => {
  const chatClient = useInitializeChatClient();
  const { resolvedTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  if (!chatClient) {
    return <Loader2 className="mx-auto my-3 animate-spin" />;
  }
  return (
    <main className="relative w-full overflow-clip rounded-2xl bg-card shadow-sm">
      <div className="absolute bottom-0 top-0 flex w-full">
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSidebar
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <ChatChannel
            open={!isSidebarOpen}
            openSidebar={() => setIsSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </main>
  );
};
export default Chat;
