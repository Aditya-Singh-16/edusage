import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Hackathon, Submission } from "@shared/types";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  Code2,
  ExternalLink,
  Github,
  Upload,
  CheckCircle,
  AlertCircle,
  Timer
} from "lucide-react";

export default function HackathonDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [submissionForm, setSubmissionForm] = useState({
    title: '',
    description: '',
    githubUrl: '',
    liveUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (id) {
      fetchHackathon();
    }
  }, [id]);

  const fetchHackathon = async () => {
    try {
      const response = await fetch(`/api/hackathons/${id}`);
      if (response.ok) {
        const data = await response.json();
        setHackathon(data.data);
        setSubmissions(data.data.submissions || []);
        
        // Check if user is already joined/submitted
        if (user && data.data.submissions) {
          const userSubmission = data.data.submissions.find((s: Submission) => s.userId === user.id);
          setJoined(!!userSubmission);
        }
      }
    } catch (error) {
      console.error('Error fetching hackathon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!user || !hackathon) return;
    
    // For demo purposes, just mark as joined
    setJoined(true);
    
    // In a real app, you'd make an API call to join the hackathon
    // await fetch(`/api/hackathons/${hackathon.id}/join`, { method: 'POST' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !hackathon || submitting) return;

    setSubmitting(true);
    
    try {
      // For demo purposes, create a mock submission
      const newSubmission: Submission = {
        id: `submission_${Date.now()}`,
        hackathonId: hackathon.id,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        title: submissionForm.title,
        description: submissionForm.description,
        githubUrl: submissionForm.githubUrl,
        liveUrl: submissionForm.liveUrl,
        submittedAt: new Date().toISOString()
      };

      setSubmissions(prev => [...prev, newSubmission]);
      setSubmissionForm({ title: '', description: '', githubUrl: '', liveUrl: '' });
      
      // Update user points
      if (user) {
        user.totalPoints += 100; // Award points for submission
        user.hackathonsCompleted += 1;
      }
      
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'ended':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
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

  const timeRemaining = hackathon ? new Date(hackathon.endDate).getTime() - Date.now() : 0;
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading hackathon details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">Hackathon not found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
      <Header />
      
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" onClick={() => navigate('/hackathons')}>
              ← Back to Hackathons
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={getStatusColor(hackathon.status)}>
                  {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                </Badge>
                <Badge className={getDifficultyColor(hackathon.difficulty)}>
                  {hackathon.difficulty}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{hackathon.title}</h1>
              <p className="text-lg text-gray-600 mt-2">{hackathon.description}</p>
            </div>
            
            {hackathon.status === 'active' && timeRemaining > 0 && (
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-end gap-2 mb-2">
                  <Timer className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-red-600">Time Remaining</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {daysRemaining}d {hoursRemaining}h
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-brand-purple-600" />
                    <span className="text-sm font-medium">Start Date</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(hackathon.startDate).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-purple-600" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{hackathon.duration}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-brand-purple-600" />
                    <span className="text-sm font-medium">Participants</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {hackathon.currentParticipants}/{hackathon.maxParticipants}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-brand-purple-600" />
                    <span className="text-sm font-medium">Prize</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{hackathon.prize}</p>
                </CardContent>
              </Card>
            </div>

            {/* Technologies */}
            <Card>
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {hackathon.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hackathon.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Submissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Submissions ({submissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div key={submission.id} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={submission.userAvatar} alt={submission.userName} />
                            <AvatarFallback>
                              {submission.userName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{submission.title}</h4>
                            <p className="text-sm text-gray-600">by {submission.userName}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{submission.description}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={submission.githubUrl} target="_blank" rel="noopener noreferrer">
                              <GitHub className="h-4 w-4 mr-1" />
                              Code
                            </a>
                          </Button>
                          {submission.liveUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={submission.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Code2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No submissions yet. Be the first!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card>
              <CardHeader>
                <CardTitle>Participation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!user ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please sign in to participate in this hackathon.
                    </AlertDescription>
                  </Alert>
                ) : hackathon.status === 'upcoming' ? (
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      This hackathon hasn't started yet. Registration will open soon.
                    </AlertDescription>
                  </Alert>
                ) : hackathon.status === 'ended' ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      This hackathon has ended. Check out the submissions!
                    </AlertDescription>
                  </Alert>
                ) : !joined ? (
                  <Button 
                    onClick={handleJoin}
                    className="w-full bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700"
                  >
                    Join Hackathon
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        You're participating in this hackathon!
                      </AlertDescription>
                    </Alert>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700">
                          <Upload className="h-4 w-4 mr-2" />
                          Submit Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Submit Your Project</DialogTitle>
                          <DialogDescription>
                            Share your hackathon project with the community.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="title">Project Title</Label>
                            <Input
                              id="title"
                              value={submissionForm.title}
                              onChange={(e) => setSubmissionForm({...submissionForm, title: e.target.value})}
                              placeholder="Enter your project title"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={submissionForm.description}
                              onChange={(e) => setSubmissionForm({...submissionForm, description: e.target.value})}
                              placeholder="Describe your project..."
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="github">GitHub Repository</Label>
                            <Input
                              id="github"
                              type="url"
                              value={submissionForm.githubUrl}
                              onChange={(e) => setSubmissionForm({...submissionForm, githubUrl: e.target.value})}
                              placeholder="https://github.com/username/repo"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="live">Live Demo URL (Optional)</Label>
                            <Input
                              id="live"
                              type="url"
                              value={submissionForm.liveUrl}
                              onChange={(e) => setSubmissionForm({...submissionForm, liveUrl: e.target.value})}
                              placeholder="https://your-demo-url.com"
                            />
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700"
                            disabled={submitting}
                          >
                            {submitting ? 'Submitting...' : 'Submit Project'}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Participants</span>
                      <span>{hackathon.currentParticipants}/{hackathon.maxParticipants}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 h-2 rounded-full"
                        style={{ width: `${(hackathon.currentParticipants / hackathon.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Submissions</span>
                      <span>{submissions.length}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {submissions.length} projects submitted so far
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
