import { Collection, ObjectId, WithId, Document } from "mongodb";
import { SafeUserProjection } from "../projections/User";
import EventEmitter from "events";

/** An object that orchestrates access, creation, modificiation and deletion of user identities. */
export class UserController extends EventEmitter {
  private userCollection: Collection;
  private ready: boolean;

  constructor(userCollection: Collection) {
    super();

    this.userCollection = userCollection;
    this.ready = false;
  }

  /** Only for internal use by the lib, do not use outside of the library. Should be called only once. Initializes the user collection. */
  public async init() {
    // Prevent running if the usercontroller has already been initialized.
    if (!this.ready) {
    }
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
