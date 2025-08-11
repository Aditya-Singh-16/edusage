import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Clock, Star } from "lucide-react";

export default function Quizzes() {
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
          {[
            { title: "JavaScript Fundamentals", difficulty: "Beginner", questions: 25, time: "30 min", rating: 4.8 },
            { title: "React & Hooks", difficulty: "Intermediate", questions: 40, time: "45 min", rating: 4.9 },
            { title: "System Design", difficulty: "Advanced", questions: 15, time: "60 min", rating: 4.7 },
            { title: "Data Structures", difficulty: "Intermediate", questions: 35, time: "50 min", rating: 4.6 },
            { title: "Machine Learning", difficulty: "Advanced", questions: 20, time: "40 min", rating: 4.8 },
            { title: "CSS & Styling", difficulty: "Beginner", questions: 30, time: "25 min", rating: 4.5 },
          ].map((quiz, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`${
                      quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}
                  >
                    {quiz.difficulty}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {quiz.rating}
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brand-blue-600" />
                  {quiz.title}
                </CardTitle>
                <CardDescription>
                  Comprehensive assessment covering key concepts and practical applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {quiz.questions} questions
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {quiz.time}
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-700 hover:to-brand-purple-700">
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
