"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import CourseCard from "@/components/CourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";
import { mockCourses, mockUser } from "@/lib/mock-data";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const enrolledCourses = mockCourses.filter(course => 
    mockUser.enrolledCourses.includes(course.id)
  );

  const totalProgress = enrolledCourses.reduce((sum, course) => 
    sum + (mockUser.progress[course.id] || 0), 0
  ) / enrolledCourses.length;

  const completedCourses = enrolledCourses.filter(course => 
    mockUser.progress[course.id] === 100
  ).length;

  const totalLearningHours = enrolledCourses.reduce((sum, course) => {
    const hours = parseInt(course.duration.split(' ')[0]);
    return sum + hours;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-1">{mockUser.name}</h2>
                  <p className="text-muted-foreground mb-4">{mockUser.email}</p>
                  <Badge variant="secondary">Student</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Learning Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">Enrolled Courses</span>
                  </div>
                  <span className="font-semibold">{enrolledCourses.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="font-semibold">{completedCourses}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Learning Hours</span>
                  </div>
                  <span className="font-semibold">{totalLearningHours}h</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <span className="text-sm">Avg. Progress</span>
                  </div>
                  <span className="font-semibold">{totalProgress.toFixed(0)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="enrolled" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="enrolled">My Courses</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="enrolled">
                <div className="grid gap-6 sm:grid-cols-2">
                  {enrolledCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                {enrolledCourses.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">No enrolled courses yet</p>
                      <p className="text-sm text-muted-foreground">Start learning by enrolling in a course</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="progress">
                <div className="space-y-4">
                  {enrolledCourses.map(course => {
                    const progress = mockUser.progress[course.id] || 0;
                    return (
                      <Card key={course.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                            </div>
                            <Badge variant={progress === 100 ? "default" : "secondary"}>
                              {progress === 100 ? "Completed" : "In Progress"}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-semibold">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  {enrolledCourses.length === 0 && (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium mb-2">No progress to show</p>
                        <p className="text-sm text-muted-foreground">Enroll in courses to track your progress</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
