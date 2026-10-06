import { ChevronRight } from "lucide-react";

interface ChatMessage {
  id: string;
  username: string;
  avatar: string;
  message: string;
  date: string;
  unread: number;
}

const chatMessages: ChatMessage[] = [
  {
    id: "1",
    username: "Oumer_",
    avatar: "O",
    message: "Please do not share your phone number...",
    date: "06-30",
    unread: 6,
  },
];

export const ChatPreview = () => {
  return (
    <div className="px-4 py-2">
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Chat</h3>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="space-y-3">
          {chatMessages.map((chat) => (
            <div key={chat.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F0B90B] flex items-center justify-center text-sm font-semibold text-primary-foreground">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm truncate">{chat.username}</span>
                  <span className="text-xs text-muted-foreground">{chat.date}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-muted-foreground truncate pr-2">{chat.message}</span>
                  <span className="flex-shrink-0 min-w-[18px] h-[18px] bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {chat.unread}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-1 mt-3">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <div className="w-1.5 h-1.5 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
};
