import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { authMiddleware } from "./Middleware/authMiddleware.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT
const SECRET = process.env.SECRET

const users = [
  { username: "dana", password: "1234" },
  { username: "admin", password: "admin" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ username: user.username }, SECRET, {  expiresIn: "1h"});
  console.log(token);
  
  res.json({ token });
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are inside protected route",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});