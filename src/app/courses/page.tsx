'use client';
import React from 'react';
import CourseCard from '@/components/course-card';
import { courses } from '@/lib/courses';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function CoursesPage() {
  const categories = [...new Set(courses.map(course => course.category))];
  const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };
  
  const handleEnroll = () => {
    // For now, we'll just log the selected courses to the console.
    console.log("Enrolling in:", selectedCourses);
    alert(`Enrolling in ${selectedCourses.length} course(s).`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Our Courses</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore our comprehensive catalog of law courses, from foundational principles to advanced specializations.
        </p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="popular">Popularity</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
       {selectedCourses.length > 0 && (
        <div className="mb-8 flex justify-end">
          <Button onClick={handleEnroll} size="lg">
            Enroll in {selectedCourses.length} Selected Course{selectedCourses.length > 1 ? 's' : ''}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course}
            showCheckbox={true}
            isSelected={selectedCourses.includes(course.id)}
            onSelectChange={() => handleSelectCourse(course.id)}
          />
        ))}
      </div>
    </div>
  );
}
