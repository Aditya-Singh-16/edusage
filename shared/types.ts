export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  totalPoints: number;
  level: number;
  hackathonsCompleted: number;
  quizzesCompleted: number;
  rank: number;
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  startDate: string;
  endDate: string;
  duration: string;
  maxParticipants: number;
  currentParticipants: number;
  prize: string;
  technologies: string[];
  status: 'upcoming' | 'active' | 'ended';
  requirements: string[];
  submissions?: Submission[];
  createdBy: string;
}

export interface Submission {
  id: string;
  hackathonId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  submittedAt: string;
  score?: number;
  feedback?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  questions: Question[];
  timeLimit: number; // in minutes
  passingScore: number;
  totalPoints: number;
  attempts: number;
  createdAt: string;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'coding';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
  codeSnippet?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: QuizAnswer[];
  score: number;
  totalPoints: number;
  percentage: number;
  timeSpent: number;
  completedAt: string;
  passed: boolean;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | number;
  isCorrect: boolean;
  points: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  totalPoints: number;
  hackathonsWon: number;
  quizzesPassed: number;
  streak: number;
}

export interface UserProgress {
  userId: string;
  totalPoints: number;
  level: number;
  hackathonsCompleted: number;
  hackathonsWon: number;
  quizzesCompleted: number;
  quizzesPassed: number;
  currentStreak: number;
  longestStreak: number;
  recentActivity: Activity[];
  achievements: Achievement[];
}

export interface Activity {
  id: string;
  type: 'hackathon_join' | 'hackathon_submit' | 'hackathon_win' | 'quiz_complete' | 'quiz_pass' | 'achievement_unlock';
  title: string;
  description: string;
  points: number;
  timestamp: string;
  relatedId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// API Response types
export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
