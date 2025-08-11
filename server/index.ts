import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import route handlers
import { handleDemo } from "./routes/demo";
import { signup, login, getProfile } from "./routes/auth";
import { 
  getHackathons, 
  getHackathon, 
  getQuizzes, 
  getQuiz, 
  submitQuiz, 
  getLeaderboard, 
  getUserProgress 
} from "./routes/data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  
  // Demo routes
  app.get("/api/ping", (req, res) => {
    res.json({ message: "Server is running!" });
  });
  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/login", login);
  app.get("/api/auth/profile", getProfile);

  // Data routes
  app.get("/api/hackathons", getHackathons);
  app.get("/api/hackathons/:id", getHackathon);
  app.get("/api/quizzes", getQuizzes);
  app.get("/api/quizzes/:id", getQuiz);
  app.post("/api/quizzes/submit", submitQuiz);
  app.get("/api/leaderboard", getLeaderboard);
  app.get("/api/user/progress", getUserProgress);

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(__dirname, "../spa");
    app.use(express.static(distPath));

    // Serve React app for all non-API routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.PORT || 8080;
  const server = createServer();
  
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
