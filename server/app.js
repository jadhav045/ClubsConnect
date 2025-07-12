import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import routes from "./routes/index.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passportConfig.js"; // Load Google strategy
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Session setup for Passport (required for Google OAuth)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "clubsconnect_secret",
    resave: false,
    saveUninitialized: false
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", routes);
app.use("/api/auth", authRoutes); // Google OAuth endpoints

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ClubsConnect API 🚀" });
});

export default app;
