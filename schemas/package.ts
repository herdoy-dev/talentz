export interface Package {
  _id: string;
  serviceId: string;
  price: string;
  label: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetPackageResponse {
  result: Package[];
  count: number;
}
