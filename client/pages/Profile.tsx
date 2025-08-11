import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { UserProgress, Achievement } from "@shared/types";
import { 
  User, 
  Edit, 
  Trophy, 
  Code2, 
  Brain, 
  Star, 
  Calendar,
  Mail,
  MapPin,
  Link as LinkIcon,
  Award,
  TrendingUp
} from "lucide-react";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: '',
    location: '',
    website: ''
  });

  useEffect(() => {
    if (user) {
      fetchUserProgress();
      setEditForm({
        name: user.name,
        bio: '',
        location: '',
        website: ''
      });
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

  const handleSaveProfile = () => {
    if (user) {
      updateUser({ name: editForm.name });
      // In a real app, you'd make an API call to update the profile
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">Please sign in to view your profile.</p>
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
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const nextLevelPoints = (user.level * 1000) - user.totalPoints;
  const levelProgress = ((user.totalPoints % 1000) / 1000) * 100;

  const mockAchievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first quiz',
      icon: '🎯',
      unlockedAt: '2024-01-01T00:00:00Z',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Code Warrior',
      description: 'Participated in your first hackathon',
      icon: '⚔️',
      unlockedAt: '2024-01-15T00:00:00Z',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Knowledge Seeker',
      description: 'Passed 5 quizzes in a row',
      icon: '📚',
      unlockedAt: '2024-01-20T00:00:00Z',
      rarity: 'epic'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-700';
      case 'rare':
        return 'bg-blue-100 text-blue-700';
      case 'epic':
        return 'bg-purple-100 text-purple-700';
      case 'legendary':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
      <Header />
      
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Update your profile information
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={editForm.location}
                            onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                            placeholder="Your location"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={editForm.website}
                            onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                            placeholder="Your website URL"
                          />
                        </div>
                        <Button onClick={handleSaveProfile} className="w-full">
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 text-white text-2xl">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">Level {user.level} • #{user.rank} Global</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(user.joinedAt).toLocaleDateString()}
                  </div>
                  {editForm.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {editForm.location}
                    </div>
                  )}
                  {editForm.website && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <LinkIcon className="h-4 w-4" />
                      <a href={editForm.website} target="_blank" rel="noopener noreferrer" className="text-brand-purple-600 hover:underline">
                        {editForm.website}
                      </a>
                    </div>
                  )}
                </div>

                {editForm.bio && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-700">{editForm.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-purple-600 mb-2">
                      Level {user.level}
                    </div>
                    <p className="text-sm text-gray-600">
                      {nextLevelPoints} points to next level
                    </p>
                  </div>
                  <Progress value={levelProgress} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{user.totalPoints % 1000} pts</span>
                    <span>1,000 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Total Points</span>
                  </div>
                  <div className="text-2xl font-bold text-brand-purple-600">
                    {user.totalPoints.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-brand-blue-500" />
                    <span className="text-sm font-medium">Quizzes</span>
                  </div>
                  <div className="text-2xl font-bold text-brand-purple-600">
                    {user.quizzesCompleted}
                  </div>
                  <p className="text-xs text-gray-500">
                    {progress?.quizzesPassed || 0} passed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="h-4 w-4 text-brand-pink-500" />
                    <span className="text-sm font-medium">Hackathons</span>
                  </div>
                  <div className="text-2xl font-bold text-brand-purple-600">
                    {user.hackathonsCompleted}
                  </div>
                  <p className="text-xs text-gray-500">
                    {progress?.hackathonsWon || 0} won
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Global Rank</span>
                  </div>
                  <div className="text-2xl font-bold text-brand-purple-600">
                    #{user.rank}
                  </div>
                  <p className="text-xs text-gray-500">
                    🔥 {progress?.currentStreak || 0} day streak
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements ({mockAchievements.length})
                </CardTitle>
                <CardDescription>
                  Unlock achievements by completing challenges and reaching milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {mockAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <Badge className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {mockAchievements.length === 0 && (
                  <div className="text-center py-8">
                    <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No achievements yet. Start completing challenges to unlock them!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest accomplishments and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progress?.recentActivity && progress.recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {progress.recentActivity.map((activity) => (
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
                    <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No recent activity.</p>
                    <p className="text-sm text-gray-500">Complete quizzes and hackathons to see your progress here!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
