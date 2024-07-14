import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";

dotenv.config()
const app = express();
const uri = process.env.MONGODB_URI;
const port = process.env.API_PORT;

const corsOptions = {
  origin: 'https://syncboardfrontend-lali5adx9-sathwik-kodamarthis-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

let db;

async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB");
  db = client.db("Syncboard");
}

connectToDatabase();

app.get("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await db.collection("Objective").findOne({ userId });
    res.json(result ? result.tasks : []);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching todos", details: error.message });
  }
});

app.post("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const newTodo = req.body;
    console.log("Received todo:", newTodo);
    console.log("User ID:", userId);

    if (!newTodo || !newTodo.taskId || !newTodo.title) {
      console.log("Invalid todo data");
      return res
        .status(400)
        .json({ error: "Invalid todo data. Required fields: taskId, title" });
    }

    const todoToInsert = {
      taskId: newTodo.taskId,
      title: newTodo.title,
      description: newTodo.description || "",
      deadline: newTodo.deadline || null,
      completed: newTodo.completed || false,
    };

    const result = await db
      .collection("Objective")
      .updateOne(
        { userId },
        { $push: { tasks: todoToInsert } },
        { upsert: true }
      );

    console.log("Database operation result:", result);
    res.json({ success: result.modifiedCount > 0 || result.upsertedCount > 0 });
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ error: "Error adding todo", details: error.message });
  }
});

app.put("/todos/:userId/:taskId", async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const updates = req.body;
    if (!updates) {
      return res.status(400).json({ error: "Invalid update data" });
    }
    const result = await db
      .collection("Objective")
      .updateOne(
        { userId, "tasks.taskId": parseInt(taskId) },
        { $set: { "tasks.$": updates } }
      );
    res.json({ success: result.modifiedCount > 0 });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating todo", details: error.message });
  }
});

app.delete("/todos/:userId/:taskId", async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const result = await db
      .collection("Objective")
      .updateOne(
        { userId },
        { $pull: { tasks: { taskId: parseInt(taskId) } } }
      );
    res.json({ success: result.modifiedCount > 0 });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting todo", details: error.message });
  }
});

app.get("/canvas/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await db.collection("Canvas").find({ userId }).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching canvas elements",
      details: error.message,
    });
  }
});

app.post("/canvas/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const elements = req.body.elements;
    if (!elements || !Array.isArray(elements)) {
      return res.status(400).json({ error: "Invalid canvas data" });
    }
    const result = await db
      .collection("Canvas")
      .updateOne({ userId }, { $set: { elements } }, { upsert: true });
    res.json({ success: result.modifiedCount > 0 || result.upsertedCount > 0 });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error saving canvas", details: error.message });
  }
});

app.put("/canvas/:userId/:elementId", async (req, res) => {
  try {
    const { userId, elementId } = req.params;
    const updates = req.body;
    if (!updates) {
      return res.status(400).json({ error: "Invalid update data" });
    }
    const result = await db
      .collection("Canvas")
      .updateOne(
        { userId, "elements.uid": elementId },
        { $set: { "elements.$": updates } }
      );
    res.json({ success: result.modifiedCount > 0 });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating canvas element", details: error.message });
  }
});

app.delete("/canvas/:userId/:elementId", async (req, res) => {
  try {
    const { userId, elementId } = req.params;
    const result = await db
      .collection("Canvas")
      .updateOne({ userId }, { $pull: { elements: { uid: elementId } } });
    res.json({ success: result.modifiedCount > 0 });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting canvas element", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
