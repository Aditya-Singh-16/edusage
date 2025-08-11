import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Quiz, Question, QuizAttempt } from "@shared/types";
import { Clock, Brain, CheckCircle, XCircle, ArrowRight, ArrowLeft } from "lucide-react";

export default function QuizTake() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | number)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizAttempt | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    if (id) {
      fetchQuiz();
    }
  }, [id]);

  useEffect(() => {
    if (quiz && timeLeft > 0 && !result) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit(true); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, quiz, result]);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`/api/quizzes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setQuiz(data.data);
        setTimeLeft(data.data.timeLimit * 60); // Convert minutes to seconds
        setAnswers(new Array(data.data.questions.length).fill(''));
        setStartTime(Date.now());
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (answer: string | number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (timeUp = false) => {
    if (!quiz || !user || submitting) return;

    setSubmitting(true);
    
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch('/api/quizzes/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          quizId: quiz.id,
          answers,
          timeSpent
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.data);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">Please sign in to take quizzes.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading quiz...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">Quiz not found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show results
  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-blue-50">
        <Header />
        <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                {result.passed ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-500" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {result.passed ? 'Congratulations!' : 'Better luck next time!'}
              </CardTitle>
              <CardDescription>
                You've completed the {quiz.title} quiz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-brand-blue-600">{result.score}</div>
                  <div className="text-sm text-gray-600">Points Earned</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-brand-blue-600">{result.percentage.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-brand-blue-600">{Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-600">Time Taken</div>
                </div>
              </div>

              {result.passed && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Great job! You passed the quiz with a score of {result.percentage.toFixed(1)}%.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/quizzes')}
                  variant="outline"
                >
                  Back to Quizzes
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-700 hover:to-brand-purple-700"
                >
                  View Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-blue-50">
      <Header />
      
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {quiz.questions.length}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                <Clock className="h-4 w-4 mr-1" />
                {formatTime(timeLeft)}
              </Badge>
              <Badge variant="secondary" className="bg-brand-blue-100 text-brand-blue-700">
                <Brain className="h-4 w-4 mr-1" />
                {question.points} pts
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{question.question}</CardTitle>
            {question.codeSnippet && (
              <div className="mt-4">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{question.codeSnippet}</code>
                </pre>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {question.type === 'multiple-choice' && question.options && (
              <RadioGroup 
                value={answers[currentQuestion]?.toString() || ''} 
                onValueChange={(value) => handleAnswerChange(parseInt(value))}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === 'true-false' && (
              <RadioGroup 
                value={answers[currentQuestion]?.toString() || ''} 
                onValueChange={(value) => handleAnswerChange(parseInt(value))}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="1" id="true" />
                  <Label htmlFor="true" className="flex-1 cursor-pointer">True</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="0" id="false" />
                  <Label htmlFor="false" className="flex-1 cursor-pointer">False</Label>
                </div>
              </RadioGroup>
            )}

            {question.type === 'coding' && (
              <div className="space-y-2">
                <Label htmlFor="code-answer">Your Answer:</Label>
                <Textarea
                  id="code-answer"
                  placeholder="Write your code here..."
                  value={answers[currentQuestion]?.toString() || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="font-mono min-h-[150px]"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-brand-blue-600 text-white'
                    : answers[index] !== undefined && answers[index] !== ''
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {isLastQuestion ? (
            <Button 
              onClick={() => handleSubmit()}
              disabled={submitting}
              className="bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-700 hover:to-brand-purple-700"
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          ) : (
            <Button onClick={nextQuestion}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
