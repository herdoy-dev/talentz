export interface Message {
  _id: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  message: string;
  files: string[];
  createdAt: Date;
}

export interface getMessagesResponse {
  result: Message[];
  count: number;
}
