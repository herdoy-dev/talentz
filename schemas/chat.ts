export interface Chat {
  _id: string;
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  seller: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
}

export interface getChatsResponse {
  result: Chat[];
  count: number;
}
