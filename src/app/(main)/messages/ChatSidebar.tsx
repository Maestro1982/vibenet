import { useCallback, useEffect, useState } from "react";
import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
  useChatContext,
} from "stream-chat-react";
import { MailPlus, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { useSession } from "@/app/(main)/SessionProvider";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import NewChatDialog from "@/app/(main)/messages/NewChatDialog";

interface ChatSidebarProps {
  open: boolean;
  onClose: () => void;
}

const ChatSidebar = ({ open, onClose }: ChatSidebarProps) => {
  const { user } = useSession();

  const queryClient = useQueryClient();

  const { channel } = useChatContext();

  /* Revalidates the messages count whenever we switch between chats */
  useEffect(() => {
    if (channel?.id) {
      queryClient.invalidateQueries({ queryKey: ["unread-messages-count"] });
    }
  }, [channel?.id, queryClient]);

  /* This component will NOT be initialized everytime the component re-renders only when the dependancy changes
  thats why the useCallback is being used */
  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose],
  );

  return (
    <div
      className={cn(
        "size-full flex-col border-e md:flex md:w-72",
        open ? "flex" : "hidden",
      )}
    >
      <MenuHeader onClose={onClose} />
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        showChannelSearch
        options={{
          state: true,
          presence: true,
          limit: 8,
        }}
        sort={{ last_message_at: -1 }}
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
};

interface MenuHeaderProps {
  onClose: () => void;
}

const MenuHeader = ({ onClose }: MenuHeaderProps) => {
  const [showNewChatDialog, setShowNewChatDialog] = useState<boolean>(false);
  return (
    <>
      <div className="flex items-center gap-3 p-2">
        <div className="h-full md:hidden">
          <Button size="default" variant="ghost" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>
        <h1 className="me-auto text-lg font-bold md:ms-2">Messages</h1>
        <Button
          size="icon"
          variant="ghost"
          title="Start new chat"
          onClick={() => setShowNewChatDialog(true)}
        >
          <MailPlus className="size-5" />
        </Button>
      </div>
      {showNewChatDialog && (
        <NewChatDialog
          onOpenChange={setShowNewChatDialog}
          onChatCreated={() => {
            setShowNewChatDialog(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default ChatSidebar;
