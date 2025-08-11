import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Quiz } from "@shared/types";
import { Brain, BookOpen, Clock, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Quizzes() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quizzes');
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data.data);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading quizzes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-blue-50">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-600 to-brand-purple-600">Quizzes</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Test your knowledge across various topics and skill levels with our comprehensive quiz platform.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    4.8
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brand-blue-600" />
                  {quiz.title}
                </CardTitle>
                <CardDescription>
                  {quiz.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {quiz.questions.length} questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {quiz.timeLimit} min
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Passing Score</span>
                    <span className="font-medium">{quiz.passingScore}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Points</span>
                    <span className="font-medium text-brand-blue-600">{quiz.totalPoints}</span>
                  </div>
                  
                  <Badge variant="outline" className="w-fit">
                    {quiz.category}
                  </Badge>
                </div>

                {user ? (
                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-700 hover:to-brand-purple-700"
                  >
                    <Link to={`/quiz/${quiz.id}`}>
                      <Play className="h-4 w-4 mr-2" />
                      Start Quiz
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    disabled
                    className="w-full"
                  >
                    Sign in to take quiz
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {quizzes.length === 0 && !loading && (
          <div className="text-center py-12">
            <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes available</h3>
            <p className="text-gray-600">Check back later for new quizzes!</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-brand-blue-50 to-brand-purple-50 border-brand-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🚧 Enhanced quiz features in development!
              </h3>
              <p className="text-gray-600 mb-4">
                We're building adaptive difficulty, detailed analytics, custom quiz creation tools, and much more.
                Help shape the future of our platform!
              </p>
              <Button variant="outline" className="border-brand-blue-300 text-brand-blue-700 hover:bg-brand-blue-100">
                Suggest Features
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
