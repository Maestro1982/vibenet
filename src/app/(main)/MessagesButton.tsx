"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { MessageCountInfo } from "@/lib/types";
import kyInstance from "@/lib/ky";

import { Button } from "@/components/ui/button";

interface MessageButtonProps {
  initialState: MessageCountInfo;
}

const MessagesButton = ({ initialState }: MessageButtonProps) => {
  const { data } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: () =>
      kyInstance.get("/api/messages/unread-count").json<MessageCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000, // refetch every minute the get api
  });

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Messages"
      asChild
    >
      <Link href="/messages">
        <div className="relative">
          <Mail />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1 text-xs font-medium tabular-nums text-primary-foreground">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Messages</span>
      </Link>
    </Button>
  );
};
export default MessagesButton;
