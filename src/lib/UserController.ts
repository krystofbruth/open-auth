import { Collection } from "mongodb";

export class UserController {
  private userCollection: Collection;

  constructor(userCollection: Collection) {
    this.userCollection = userCollection;
  }
}
