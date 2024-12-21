import { Collection, Db } from "mongodb";
import { UserController } from "./controllers/UserController";

interface AuthOptions {
  accessSecret: string;
  db: Db;
}

export class Auth {
  private db: Db;
  private userCollection: Collection;
  private accessSecret: string;
  public user: UserController;

  /** Creates a new auth instance. */
  constructor(configuration: AuthOptions) {
    this.validateOptions(configuration);

    this.accessSecret = configuration.accessSecret;
    this.db = configuration.db;
    this.userCollection = this.db.collection("open-auth_users");

    this.user = new UserController(this.userCollection);
  }

  /** Validates the configuration passed from the user, throws in case of a validation error. Aims to prevent undefined behavior across the library. */
  private validateOptions(input: unknown): input is AuthOptions {
    if (!(input instanceof Object)) {
      throw new Error(`Incorrect data type of auth options ${typeof input}`);
    }

    let options = input as { [key: string]: unknown };

    if (typeof options.accessSecret !== "string") {
      throw new Error(
        `Option accessSecret invalid data type ${typeof options.accessSecret}`
      );
    }

    if (!(options.db instanceof Object)) {
      throw new Error(`Option db invalid data type ${options.db}`);
    }

    const db = options.db as { [key: string]: unknown };
    if (typeof db.collection !== "function") {
      throw new Error(
        `Option db function check invalid, are you passing a MongoDB Db instance into the db option?`
      );
    }

    return true;
  }
}
