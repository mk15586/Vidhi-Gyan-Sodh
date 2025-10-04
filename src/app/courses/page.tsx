'use client';
import React from 'react';
import CourseCard from '@/components/course-card';
import { courses } from '@/lib/courses';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Course } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const CourseCarousel = ({ courses }: { courses: Course[] }) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2">
        {courses.map((course) => (
          <CarouselItem key={course.id} className="basis-[90%] md:basis-1/3 lg:basis-1/4 pl-2">
            <div className="p-1 h-full">
              <CourseCard course={course} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};


export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = [...new Set(courses.map(course => course.category))];

  const coursesByCategory = categories.reduce((acc, category) => {
    acc[category] = courses.filter(course => course.category === category);
    return acc;
  }, {} as Record<string, Course[]>);

  const filteredCategories = React.useMemo(() => {
    let filtered = categories;
    if (selectedCategory) {
        filtered = filtered.filter(c => c === selectedCategory)
    }

    if (searchTerm) {
        const lowercasedSearch = searchTerm.toLowerCase();
        return filtered.filter(category => {
            const categoryMatch = category.toLowerCase().includes(lowercasedSearch);
            const courseMatch = coursesByCategory[category].some(course => 
                course.title.toLowerCase().includes(lowercasedSearch) || 
                course.instructor.toLowerCase().includes(lowercasedSearch)
            );
            return categoryMatch || courseMatch;
        });
    }

    return filtered;
  }, [searchTerm, selectedCategory, categories, coursesByCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex flex-col gap-6">
        <div className="relative mx-auto w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for courses, categories, or instructors..." 
            className="pl-12 h-12 text-base rounded-full shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge 
                onClick={() => setSelectedCategory(null)}
                variant={selectedCategory === null ? 'default' : 'secondary'}
                className="cursor-pointer text-sm px-4 py-2"
            >
                All Categories
            </Badge>
          {categories.map(category => (
            <Badge 
              key={category}
              onClick={() => handleCategoryClick(category)}
              variant={selectedCategory === category ? 'default' : 'secondary'}
              className="cursor-pointer text-sm px-4 py-2"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {filteredCategories.length > 0 ? filteredCategories.map(category => (
          <section key={category}>
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-4">{category}</h2>
            <CourseCarousel courses={coursesByCategory[category]} />
          </section>
        )) : (
            <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No courses found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
}
