import { RequestHandler } from "express";
import { AuthResponse, User, ApiResponse } from "@shared/types";

// Mock database - in production, use a real database
const users: User[] = [];
let userIdCounter = 1;

// Helper functions
const generateToken = (userId: string) => {
  return `token_${userId}_${Date.now()}`;
};

const createUser = (name: string, email: string): User => {
  const user: User = {
    id: userIdCounter.toString(),
    name,
    email,
    joinedAt: new Date().toISOString(),
    totalPoints: 0,
    level: 1,
    hackathonsCompleted: 0,
    quizzesCompleted: 0,
    rank: users.length + 1,
  };
  userIdCounter++;
  return user;
};

export const signup: RequestHandler = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      } as ApiResponse<null>);
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User already exists"
      } as ApiResponse<null>);
    }

    // Create new user
    const user = createUser(name, email);
    users.push(user);

    const token = generateToken(user.id);

    const response: AuthResponse = {
      user,
      token
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse<null>);
  }
};

export const login: RequestHandler = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Missing email or password"
      } as ApiResponse<null>);
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      } as ApiResponse<null>);
    }

    // In production, verify password hash
    // For demo, accept any password

    const token = generateToken(user.id);

    const response: AuthResponse = {
      user,
      token
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse<null>);
  }
};

export const getProfile: RequestHandler = (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No token provided"
      } as ApiResponse<null>);
    }

    // Extract user ID from token (simplified)
    const userId = token.split('_')[1];
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      } as ApiResponse<null>);
    }

    res.json({
      success: true,
      data: user
    } as ApiResponse<User>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse<null>);
  }
};

// Export users for other modules
export { users };
