import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { LeaderboardEntry } from "@shared/types";
import { Trophy, Medal, Award, Star, TrendingUp, Crown } from "lucide-react";

export default function Leaderboard() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.data);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="h-6 w-6 flex items-center justify-center text-gray-600 font-bold">#{rank}</div>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
      <Header />
      
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-600 to-brand-pink-600">Leaderboard</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            See how you rank against students worldwide
          </p>
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="mb-12">
            <div className="flex items-end justify-center gap-8 mb-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 mx-auto bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={leaderboard[1].user.avatar} alt={leaderboard[1].user.name} />
                      <AvatarFallback className="bg-white text-gray-700 text-lg">
                        {leaderboard[1].user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-gray-300 to-gray-500 text-white">
                    #2
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900">{leaderboard[1].user.name}</h3>
                <p className="text-sm text-gray-600">{leaderboard[1].totalPoints.toLocaleString()} points</p>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="h-32 w-32 mx-auto bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <Avatar className="h-28 w-28">
                      <AvatarImage src={leaderboard[0].user.avatar} alt={leaderboard[0].user.name} />
                      <AvatarFallback className="bg-white text-yellow-600 text-xl">
                        {leaderboard[0].user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <Crown className="absolute -top-4 left-1/2 transform -translate-x-1/2 h-8 w-8 text-yellow-500" />
                  <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                    #1
                  </Badge>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{leaderboard[0].user.name}</h3>
                <p className="text-gray-600">{leaderboard[0].totalPoints.toLocaleString()} points</p>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 mx-auto bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={leaderboard[2].user.avatar} alt={leaderboard[2].user.name} />
                      <AvatarFallback className="bg-white text-amber-600 text-lg">
                        {leaderboard[2].user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white">
                    #3
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900">{leaderboard[2].user.name}</h3>
                <p className="text-sm text-gray-600">{leaderboard[2].totalPoints.toLocaleString()} points</p>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-brand-purple-600" />
              Rankings
            </CardTitle>
            <CardDescription>
              Global standings based on total points earned
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div 
                  key={entry.user.id} 
                  className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    user && entry.user.id === user.id 
                      ? 'bg-brand-purple-50 border-2 border-brand-purple-200' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(entry.rank)}
                    </div>

                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 text-white">
                        {entry.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{entry.user.name}</h3>
                        {user && entry.user.id === user.id && (
                          <Badge variant="secondary" className="bg-brand-purple-100 text-brand-purple-700">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">Level {entry.user.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="font-bold text-brand-purple-600">{entry.totalPoints.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{entry.quizzesPassed}</div>
                      <div className="text-xs text-gray-500">Quizzes</div>
                    </div>

                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{entry.hackathonsWon}</div>
                      <div className="text-xs text-gray-500">Hackathons</div>
                    </div>

                    <div className="text-center">
                      <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700">
                        🔥 {entry.streak}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {leaderboard.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No rankings yet</h3>
                <p className="text-gray-600">Be the first to appear on the leaderboard!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User's Position (if not in top rankings) */}
        {user && leaderboard.length > 10 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-purple-600" />
                Your Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-brand-purple-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center w-12">
                    <div className="h-6 w-6 flex items-center justify-center text-brand-purple-600 font-bold">
                      #{user.rank}
                    </div>
                  </div>

                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">Level {user.level}</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="font-bold text-brand-purple-600">{user.totalPoints.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
