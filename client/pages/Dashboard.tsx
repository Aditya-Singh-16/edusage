import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { UserProgress, Activity } from "@shared/types";
import { 
  Trophy, 
  Code2, 
  Brain, 
  Target, 
  Calendar, 
  TrendingUp, 
  Award,
  Clock,
  Star,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/user/progress', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProgress(data.data);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">Please sign in to view your dashboard.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const nextLevelPoints = (user.level * 1000) - user.totalPoints;
  const levelProgress = ((user.totalPoints % 1000) / 1000) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 text-white text-xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Ready to continue your learning journey?</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-purple-600">{user.totalPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {nextLevelPoints} points to next level
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-purple-600">{user.level}</div>
              <Progress value={levelProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hackathons</CardTitle>
              <Code2 className="h-4 w-4 text-brand-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-purple-600">{user.hackathonsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                Completed challenges
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes</CardTitle>
              <Brain className="h-4 w-4 text-brand-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-purple-600">{user.quizzesCompleted}</div>
              <p className="text-xs text-muted-foreground">
                Tests completed
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest achievements and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progress?.recentActivity && progress.recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {progress.recentActivity.map((activity: Activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 flex items-center justify-center">
                            {activity.type.includes('quiz') ? (
                              <Brain className="h-4 w-4 text-white" />
                            ) : (
                              <Code2 className="h-4 w-4 text-white" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-brand-purple-100 text-brand-purple-700">
                            +{activity.points} pts
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No recent activity yet.</p>
                    <p className="text-sm text-gray-500">Start completing quizzes and hackathons to see your progress here!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Progress */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700">
                  <Link to="/quizzes">
                    <Brain className="mr-2 h-4 w-4" />
                    Take a Quiz
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-brand-purple-200 text-brand-purple-700 hover:bg-brand-purple-50">
                  <Link to="/hackathons">
                    <Code2 className="mr-2 h-4 w-4" />
                    Join Hackathon
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/leaderboard">
                    <Trophy className="mr-2 h-4 w-4" />
                    View Leaderboard
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            {progress && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Progress Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Quizzes Passed</span>
                      <span className="font-medium">{progress.quizzesPassed}/{progress.quizzesCompleted}</span>
                    </div>
                    <Progress 
                      value={progress.quizzesCompleted > 0 ? (progress.quizzesPassed / progress.quizzesCompleted) * 100 : 0} 
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Current Streak</span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        🔥 {progress.currentStreak} days
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Global Rank</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                        #{user.rank}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
