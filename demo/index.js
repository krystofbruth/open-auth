const { Auth } = require("../dist/index");
const { MongoClient } = require("mongodb");

async function run() {
  // For local testing purposes
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.db("test").command({ ping: 1 });

  const auth = new Auth({ accessSecret: "some-value", db: client.db("test") });

  client.close();
}

run();
