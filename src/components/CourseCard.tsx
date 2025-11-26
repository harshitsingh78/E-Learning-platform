"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock } from "lucide-react";
import type { Course } from "@/lib/mock-data";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/course/${course.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">{course.level}</Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">{course.category}</Badge>
          </div>
          <h3 className="mb-2 text-lg font-semibold line-clamp-2">{course.title}</h3>
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>
          <div className="text-lg font-bold">₹{course.price}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
