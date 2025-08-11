import { RequestHandler } from "express";
import { Hackathon, Quiz, Question, LeaderboardEntry, UserProgress, Activity, Achievement, Submission, QuizAttempt } from "@shared/types";
import { users } from "./auth";

// Mock data storage
const hackathons: Hackathon[] = [
  {
    id: "1",
    title: "Full-Stack E-commerce Challenge",
    description: "Build a complete e-commerce platform with React, Node.js, and PostgreSQL. Include user authentication, product catalog, shopping cart, and payment integration.",
    difficulty: "Advanced",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-01-17T23:59:59Z",
    duration: "48 hours",
    maxParticipants: 100,
    currentParticipants: 87,
    prize: "$5,000 + Internship Opportunities",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    status: "active",
    requirements: [
      "Responsive design",
      "User authentication",
      "Product management",
      "Shopping cart functionality",
      "Payment integration",
      "Clean code and documentation"
    ],
    createdBy: "admin"
  },
  {
    id: "2",
    title: "AI-Powered Study Assistant",
    description: "Create an intelligent study assistant using machine learning to help students learn more effectively.",
    difficulty: "Intermediate",
    startDate: "2024-01-20T00:00:00Z",
    endDate: "2024-01-22T23:59:59Z",
    duration: "48 hours",
    maxParticipants: 150,
    currentParticipants: 120,
    prize: "$3,000 + Tech Mentorship",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    status: "upcoming",
    requirements: [
      "ML-powered recommendations",
      "Interactive UI",
      "Progress tracking",
      "Content generation"
    ],
    createdBy: "admin"
  },
  {
    id: "3",
    title: "Mobile Fitness Tracker",
    description: "Develop a cross-platform mobile app for fitness tracking with social features and gamification.",
    difficulty: "Beginner",
    startDate: "2024-01-25T00:00:00Z",
    endDate: "2024-01-27T23:59:59Z",
    duration: "48 hours",
    maxParticipants: 200,
    currentParticipants: 156,
    prize: "$2,000 + Fitness Tech Bundle",
    technologies: ["React Native", "Firebase", "Node.js"],
    status: "upcoming",
    requirements: [
      "Activity tracking",
      "Social features",
      "Gamification elements",
      "Data visualization"
    ],
    createdBy: "admin"
  }
];

const quizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, arrays, and objects.",
    difficulty: "Beginner",
    category: "Programming",
    timeLimit: 30,
    passingScore: 70,
    totalPoints: 100,
    attempts: 0,
    createdAt: "2024-01-01T00:00:00Z",
    questions: [
      {
        id: "1",
        type: "multiple-choice",
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var name = 'John';", "variable name = 'John';", "v name = 'John';", "declare name = 'John';"],
        correctAnswer: 0,
        explanation: "In JavaScript, variables are declared using 'var', 'let', or 'const' keywords.",
        points: 10
      },
      {
        id: "2",
        type: "multiple-choice",
        question: "Which method is used to add an element to the end of an array?",
        options: ["append()", "push()", "add()", "insert()"],
        correctAnswer: 1,
        explanation: "The push() method adds one or more elements to the end of an array.",
        points: 10
      },
      {
        id: "3",
        type: "true-false",
        question: "JavaScript is a statically typed language.",
        correctAnswer: 0,
        explanation: "JavaScript is a dynamically typed language, not statically typed.",
        points: 10
      }
    ]
  },
  {
    id: "2",
    title: "React & Hooks",
    description: "Advanced React concepts including hooks, context, and performance optimization.",
    difficulty: "Intermediate",
    category: "Frontend",
    timeLimit: 45,
    passingScore: 75,
    totalPoints: 150,
    attempts: 0,
    createdAt: "2024-01-01T00:00:00Z",
    questions: [
      {
        id: "1",
        type: "multiple-choice",
        question: "What hook is used to manage state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation: "useState is the basic hook for managing state in functional components.",
        points: 15
      },
      {
        id: "2",
        type: "coding",
        question: "Write a custom hook that manages a counter with increment and decrement functions.",
        correctAnswer: "function useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  const increment = () => setCount(count + 1);\n  const decrement = () => setCount(count - 1);\n  return { count, increment, decrement };\n}",
        explanation: "Custom hooks should start with 'use' and can encapsulate stateful logic.",
        points: 25,
        codeSnippet: "function useCounter(initialValue = 0) {\n  // Your implementation here\n}"
      }
    ]
  }
];

const submissions: Submission[] = [];
const quizAttempts: QuizAttempt[] = [];

// API Handlers
export const getHackathons: RequestHandler = (req, res) => {
  res.json({
    success: true,
    data: hackathons
  });
};

export const getHackathon: RequestHandler = (req, res) => {
  const { id } = req.params;
  const hackathon = hackathons.find(h => h.id === id);
  
  if (!hackathon) {
    return res.status(404).json({
      success: false,
      error: "Hackathon not found"
    });
  }

  res.json({
    success: true,
    data: hackathon
  });
};

export const getQuizzes: RequestHandler = (req, res) => {
  res.json({
    success: true,
    data: quizzes
  });
};

export const getQuiz: RequestHandler = (req, res) => {
  const { id } = req.params;
  const quiz = quizzes.find(q => q.id === id);
  
  if (!quiz) {
    return res.status(404).json({
      success: false,
      error: "Quiz not found"
    });
  }

  res.json({
    success: true,
    data: quiz
  });
};

export const submitQuiz: RequestHandler = (req, res) => {
  try {
    const { quizId, answers, timeSpent } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication required"
      });
    }

    const userId = token.split('_')[1];
    const user = users.find(u => u.id === userId);
    const quiz = quizzes.find(q => q.id === quizId);

    if (!user || !quiz) {
      return res.status(404).json({
        success: false,
        error: "User or quiz not found"
      });
    }

    // Calculate score
    let score = 0;
    const processedAnswers = quiz.questions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) score += question.points;
      
      return {
        questionId: question.id,
        answer: userAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0
      };
    });

    const percentage = (score / quiz.totalPoints) * 100;
    const passed = percentage >= quiz.passingScore;

    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      quizId,
      userId,
      answers: processedAnswers,
      score,
      totalPoints: quiz.totalPoints,
      percentage,
      timeSpent,
      completedAt: new Date().toISOString(),
      passed
    };

    quizAttempts.push(attempt);

    // Update user stats
    user.quizzesCompleted++;
    user.totalPoints += score;
    if (passed) {
      user.level = Math.floor(user.totalPoints / 1000) + 1;
    }

    res.json({
      success: true,
      data: attempt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export const getLeaderboard: RequestHandler = (req, res) => {
  const leaderboard: LeaderboardEntry[] = users
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((user, index) => ({
      rank: index + 1,
      user,
      totalPoints: user.totalPoints,
      hackathonsWon: 0, // Mock data
      quizzesPassed: user.quizzesCompleted,
      streak: Math.floor(Math.random() * 10) + 1 // Mock data
    }));

  res.json({
    success: true,
    data: leaderboard
  });
};

export const getUserProgress: RequestHandler = (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication required"
      });
    }

    const userId = token.split('_')[1];
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    const userAttempts = quizAttempts.filter(a => a.userId === userId);
    const recentActivity: Activity[] = userAttempts.slice(-5).map(attempt => ({
      id: attempt.id,
      type: attempt.passed ? 'quiz_pass' : 'quiz_complete',
      title: attempt.passed ? 'Quiz Passed!' : 'Quiz Completed',
      description: `Scored ${attempt.percentage.toFixed(1)}%`,
      points: attempt.score,
      timestamp: attempt.completedAt
    }));

    const progress: UserProgress = {
      userId,
      totalPoints: user.totalPoints,
      level: user.level,
      hackathonsCompleted: user.hackathonsCompleted,
      hackathonsWon: 0,
      quizzesCompleted: user.quizzesCompleted,
      quizzesPassed: userAttempts.filter(a => a.passed).length,
      currentStreak: Math.floor(Math.random() * 10) + 1,
      longestStreak: Math.floor(Math.random() * 20) + 5,
      recentActivity,
      achievements: []
    };

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Export data for other modules
export { hackathons, quizzes, submissions, quizAttempts };
