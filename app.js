const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");
const url =
  "mongodb+srv://marvsFirstDB:QIFzLVg3JCWGcckR@cluster0.pkeuq1h.mongodb.net/";
const dbName = "sample";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("users");
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
    await client.close();
  }
});

app.post("/update-balance", async (req, res) => {
  const { email, deposit } = req.body;
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("users");

    console.log("Email:", email);
    const user = await collection.findOne({ email: email });
    if (!user) {
      throw new Error("User not found.");
    }

    const updatedBalance = user.balance + deposit;
    const result = await collection.updateOne(
      { email: email },
      { $set: { balance: updatedBalance } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).send({
        message: "Balance updated successfully.",
        balance: updatedBalance,
      });
    } else {
      throw new Error("User not found or balance not updated.");
    }
  } catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).send({ message: "Internal Server Error" });
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
