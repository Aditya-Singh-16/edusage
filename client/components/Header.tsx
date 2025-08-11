import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Menu, X, GraduationCap, Code2, Brain, User, Settings, LogOut, Trophy } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const { user, logout } = useAuth();

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
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
            <Link to="/leaderboard" className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-brand-purple-600 transition-colors">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
            {user && (
              <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-purple-600 transition-colors">
                Dashboard
              </Link>
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs text-brand-purple-600 font-medium">
                        Level {user.level} • {user.totalPoints} points
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => openAuthModal('login')}>
                  Sign in
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700" onClick={() => openAuthModal('signup')}>
                  Sign up
                </Button>
              </>
            )}
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
                      className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Trophy className="h-4 w-4" />
                      Leaderboard
                    </Link>
                    {user && (
                      <Link
                        to="/dashboard"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                  </div>
                  <div className="py-6 space-y-4">
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 px-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 text-white">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">Level {user.level}</p>
                          </div>
                        </div>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                          <Link to="/profile" className="flex items-center w-full">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => openAuthModal('login')}>
                          Sign in
                        </Button>
                        <Button className="w-full bg-gradient-to-r from-brand-purple-600 to-brand-pink-600 hover:from-brand-purple-700 hover:to-brand-pink-700" onClick={() => openAuthModal('signup')}>
                          Sign up
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultTab={authTab}
      />
    </>
  );
}
