"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <nav className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">E-learning</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Courses</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
