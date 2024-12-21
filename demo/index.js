const { Auth } = require("../dist/index");
const { MongoClient, ObjectId } = require("mongodb");

async function run() {
  // For local testing purposes
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.db("test").command({ ping: 1 });

  const auth = new Auth({ accessSecret: "some-value", db: client.db("test") });
  console.log(await auth.user.find(new ObjectId("507f1f77bcf86cd799439011")));

  client.close();
}

run();
