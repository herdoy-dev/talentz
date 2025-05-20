import { create } from "zustand";
import { Chat } from "./schemas/chat";

type ChatStoreType = {
  currentChat: Chat | undefined;
  setCurrentChat: (chat: Chat) => void;
};

export const useChatStore = create<ChatStoreType>()((set) => ({
  currentChat: undefined,
  setCurrentChat: (chat) => set((state) => ({ currentChat: chat })),
}));
