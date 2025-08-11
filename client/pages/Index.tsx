import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { ArrowRight, Code2, Trophy, Brain, Users, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-600/10 via-brand-pink-500/10 to-brand-blue-500/10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Master Your Skills with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-600 to-brand-pink-600"> EduSage</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Challenge yourself with hackathons and quizzes. Test your knowledge, compete with peers, and accelerate your learning journey.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-brand-purple-200 text-brand-purple-700 hover:bg-brand-purple-50">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-purple-600">Everything you need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Learn, compete, and excel
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides comprehensive tools for skill assessment and improvement through interactive challenges.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Code2 className="h-5 w-5 flex-none text-brand-purple-600" />
                  Coding Hackathons
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Real-world coding challenges that simulate industry scenarios. Build projects, solve problems, and showcase your skills.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Brain className="h-5 w-5 flex-none text-brand-pink-600" />
                  Interactive Quizzes
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Comprehensive quizzes across multiple domains. Test your knowledge and identify areas for improvement.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Trophy className="h-5 w-5 flex-none text-brand-blue-600" />
                  Leaderboards
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Compete with students globally. Track your progress and see how you rank against your peers.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-purple-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-brand-purple-300">Active Students</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                12,000+
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-brand-purple-300">Challenges Completed</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                50,000+
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-brand-purple-300">Skills Assessed</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                100+
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to level up your skills?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of students who are already improving their skills through our platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700">
                Start Learning Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-xs leading-5 text-gray-400">
              © 2024 EduSage. All rights reserved.
            </p>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-400">
              Building the future of education, one challenge at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
