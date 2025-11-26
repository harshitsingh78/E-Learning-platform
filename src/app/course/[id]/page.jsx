"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Star, Users, Clock, PlayCircle, CheckCircle, Lock } from "lucide-react";
import { mockCourses } from "@/lib/mock-data";
import { toast } from "sonner";
import Image from "next/image";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
  const course = mockCourses.find(c => c.id === courseId);
  const [isEnrolled, setIsEnrolled] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast.error("Please login to enroll in this course");
      router.push('/login');
      return;
    }

    setIsEnrolled(true);
    toast.success("Successfully enrolled in the course!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden mb-6">
              <div className="relative h-96 w-full bg-gray-900 flex items-center justify-center">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="h-20 w-20 text-white mb-4 mx-auto" />
                    <p className="text-white text-lg">Course Preview</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge>{course.category}</Badge>
                <Badge variant="secondary">{course.level}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <p className="text-muted-foreground">
                Created by <span className="font-semibold text-foreground">{course.instructor}</span>
              </p>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
                <div className="space-y-2">
                  {course.curriculum.map((lesson, index) => (
                    <Card key={lesson.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                        <div>
                          {lesson.locked ? (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="description" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">About this course</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{course.description}</p>
                  <div>
                    <h3 className="font-semibold mb-2">What you'll learn:</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Master the fundamentals and advanced concepts</li>
                      <li>Build real-world projects from scratch</li>
                      <li>Learn industry best practices and techniques</li>
                      <li>Get hands-on experience with practical exercises</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">About the Instructor</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                        {course.instructor.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{course.instructor}</h3>
                        <p className="text-muted-foreground mb-3">Professional Instructor & Industry Expert</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>4.8 Instructor Rating</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>50,000+ Students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-6">₹{course.price}</div>
                
                {isEnrolled ? (
                  <Button className="w-full mb-4" size="lg" disabled>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Enrolled
                  </Button>
                ) : (
                  <Button className="w-full mb-4" size="lg" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                )}

                <Separator className="my-4" />

                <div className="space-y-3">
                  <h3 className="font-semibold">This course includes:</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration} on-demand video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Access on mobile and desktop</span>
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
