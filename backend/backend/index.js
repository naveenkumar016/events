import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { register, login } from './controllers/authController.js'; // Replace with the correct path

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // Add this line to parse JSON in the request body
app.use(cookieParser());
app.use(cors({
  origin: true,
}));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

app.post('/api/v1/auth/register', register);
app.post('/api/v1/auth/login', login);

// Placeholder route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Other routes (replace this with your actual routes)
app.get("/example", (req, res) => {
  res.send("This is an example route");
});

// Start the server
app.listen(port, () => {
  connectDB(); // Call the connectDB function
  console.log("Server is running on port " + port);
});