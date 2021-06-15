export type UserType = {
  uid: string;
  name: string;
  email: string;
  createDate: string;
  updateDate: string;
  subscribersCount: number;
  subscriptionsCount: number;
  imageUrl: string;
  messaging: {
    web: string;
    mobile: string;
  };
};
