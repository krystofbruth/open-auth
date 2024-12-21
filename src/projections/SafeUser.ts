import { Document } from "mongodb";

export const SafeUserProjection: Document = {
  password: 0,
};
