const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let reminders = [];

// Fetch all reminders
app.get("/api/reminders", (req, res) => {
  res.json(reminders);
});

// Add a new reminder
app.post("/api/reminders", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  const newReminder = { title, description };
  reminders.push(newReminder);
  res.status(201).json(newReminder);
});

// Delete a reminder
app.delete("/api/reminders/:title", (req, res) => {
  const { title } = req.params;
  reminders = reminders.filter((reminder) => reminder.title !== title);
  res.json({ message: "Reminder deleted!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
