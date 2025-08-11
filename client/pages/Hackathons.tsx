import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Hackathon } from "@shared/types";
import { Code2, Calendar, Users, Clock, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hackathons() {
  const { user } = useAuth();
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const response = await fetch('/api/hackathons');
      if (response.ok) {
        const data = await response.json();
        setHackathons(data.data);
      }
    } catch (error) {
      console.error('Error fetching hackathons:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading hackathons...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-600 to-brand-pink-600">Hackathons</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Challenge yourself with real-world coding problems and compete with developers worldwide.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {hackathons.map((hackathon) => (
            <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(hackathon.status)}>
                      {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                    </Badge>
                    <Badge className={getDifficultyColor(hackathon.difficulty)}>
                      {hackathon.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                    Prize
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-brand-purple-600" />
                  {hackathon.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {hackathon.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(hackathon.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {hackathon.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{hackathon.currentParticipants}/{hackathon.maxParticipants} participants</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {hackathon.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {hackathon.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hackathon.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-brand-purple-600">{hackathon.prize}</p>
                  </div>
                </div>

                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700"
                >
                  <Link to={`/hackathon/${hackathon.id}`}>
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {hackathons.length === 0 && !loading && (
          <div className="text-center py-12">
            <Code2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hackathons available</h3>
            <p className="text-gray-600">Check back later for new coding challenges!</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-brand-purple-50 to-brand-pink-50 border-brand-purple-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🚧 More features coming soon!
              </h3>
              <p className="text-gray-600 mb-4">
                We're working on adding team formation tools, automated judging, mentorship programs, and advanced project showcases.
                Stay tuned for updates!
              </p>
              <Button variant="outline" className="border-brand-purple-300 text-brand-purple-700 hover:bg-brand-purple-100">
                Request Features
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
