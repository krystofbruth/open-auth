const { Auth } = require("../dist/index");
const { MongoClient, ObjectId } = require("mongodb");

async function run() {
  // For local testing purposes
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.db("test").command({ ping: 1 });

  const auth = new Auth({ accessSecret: "some-value", db: client.db("test") });
  // const newuser = auth.user.create("bob", "Pomoc123", { mobile: "123456789" });

  console.log(await auth.user.findAll());

  client.close();
}

run();
