export interface Service {
  _id: string;
  userId: string;
  title: string;
  description: string;
  image: string;
  details: string[];
  tools: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetServicesResponse {
  result: Service[];
  count: number;
}
