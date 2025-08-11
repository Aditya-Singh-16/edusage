import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Calendar, Users, Clock } from "lucide-react";

export default function Hackathons() {
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
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-brand-purple-100 text-brand-purple-700">
                    {i % 2 === 0 ? 'Active' : 'Upcoming'}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {50 + i * 10} participants
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-brand-purple-600" />
                  Web Dev Challenge #{i}
                </CardTitle>
                <CardDescription>
                  Build a responsive web application using modern frameworks and best practices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Dec {15 + i}, 2024
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    48 hours
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700">
                  {i % 2 === 0 ? 'Join Now' : 'Register'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-brand-purple-50 to-brand-pink-50 border-brand-purple-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🚧 More features coming soon!
              </h3>
              <p className="text-gray-600 mb-4">
                We're working on adding more hackathon categories, team formation tools, and advanced scoring systems.
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
