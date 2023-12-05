import { Router } from "express";
// Registration route
import message_sender from "../rabbitmq/message_sender.js";
import { User } from '../sql_db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = Router();
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;


router.post("/register", async (req, res) => {
  try {
    const { username, password, email, fullName, lastOnline } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      fullName,
      lastOnline,
    });

    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      secretKey
    );
    res.json({ token });
    const text = {
      user: newUser,
      text: "New User Registered",
    };
    message_sender(text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        secretKey
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Loggin In user");
  }
});

export default router;