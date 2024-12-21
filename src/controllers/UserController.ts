import { Collection, ObjectId, WithId, Document } from "mongodb";
import { SafeUserProjection } from "../projections/SafeUser";

/** An object that orchestrates access, creation, modificiation and deletion of user identities. */
export class UserController {
  private userCollection: Collection;

  constructor(userCollection: Collection) {
    this.userCollection = userCollection;
  }

  /** Returns an array of safe user documents. */
  public async findAll() {
    const users = [];
    const cursor = this.userCollection.find(
      {},
      { projection: SafeUserProjection }
    );
    let user: WithId<Document> | null = await cursor.next();

    while (user !== null) {
      users.push(user);
    }
  }

  /** Returns a safe user document or null if no match was found. Expects a mongo ObjectId as an input (meaning input should be sanitized beforehand). */
  public async find(userId: ObjectId) {
    const users = await this.userCollection.findOne(
      { _id: userId },
      { projection: SafeUserProjection }
    );
    return users;
  }

  /** Creates a new user identity. Expects a username and password. Optionally you may define custom properties that will then be assigned to the user under the `additional` property. */
  public async create(
    username: string,
    password: string,
    additional?: Object
  ) {}
}
