import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Menu, X, GraduationCap, Code2, Brain } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EduSage</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/hackathons" className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-brand-purple-600 transition-colors">
            <Code2 className="h-4 w-4" />
            Hackathons
          </Link>
          <Link to="/quizzes" className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-brand-purple-600 transition-colors">
            <Brain className="h-4 w-4" />
            Quizzes
          </Link>
          <Link to="/leaderboard" className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-purple-600 transition-colors">
            Leaderboard
          </Link>
          <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-purple-600 transition-colors">
            About
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700">
            Sign up
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">EduSage</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/hackathons"
                    className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Code2 className="h-4 w-4" />
                    Hackathons
                  </Link>
                  <Link
                    to="/quizzes"
                    className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Brain className="h-4 w-4" />
                    Quizzes
                  </Link>
                  <Link
                    to="/leaderboard"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Leaderboard
                  </Link>
                  <Link
                    to="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </div>
                <div className="py-6 space-y-4">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign in
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700">
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
