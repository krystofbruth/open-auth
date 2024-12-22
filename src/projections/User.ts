import { Document } from "mongodb";

export const SafeUserProjection: Document = {
  password: 0,
};

export const RestrictedUserProjection: Document = {
  username: 1,
  _id: 1,
};
