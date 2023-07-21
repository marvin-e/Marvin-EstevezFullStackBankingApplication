const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

/*****MongoDB connection string *******/
const dbName = "sample"; // use your MongoDB database name

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Create account route
app.post("/create-account", async (req, res) => {
  const { name, email, password } = req.body;
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User with this email already exists" });
    }
    const result = await db
      .collection("users")
      .insertOne({ name, email, password, balance: 0 });
    res.send({ id: result.insertedId });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Connect to the MongoDB server
  const client = new MongoClient(url);

  try {
    await client.connect();

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection("users");

    // Find the user with the given email and password
    const user = await collection.findOne({ email, password });

    if (user) {
      req.user = { email };
      res
        .status(200)
        .json({ message: "Login successful", balance: user.balance });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error occurred while logging in:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

app.post("/update-balance", async (req, res) => {
  const { email, balance } = req.body;
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Update the user's balance
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: balance } },
        { returnOriginal: false }
      );

    if (result.value) {
      res.status(200).json({ message: "Balance updated successfully" });
    } else {
      res
        .status(400)
        .json({ message: "User not found or balance not changed" });
    }
  } catch (error) {
    console.error("Error occurred while updating balance:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating balance" });
  } finally {
    await client.close();
  }
});

app.get("/fetch-users", async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = await db.collection("users").find().toArray();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
