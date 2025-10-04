import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { courses, Course } from '@/lib/courses';
import CourseCard from '@/components/course-card';
import { ArrowRight } from 'lucide-react';

const Section = ({ title, children, href }: { title: string, children: React.ReactNode, href: string }) => (
  <section className="py-8 md:py-12">
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary">{title}</h2>
        <Button asChild variant="ghost" className="text-primary hover:bg-primary/10">
          <Link href={href}>
            See All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      {children}
    </div>
  </section>
);

const CourseCarousel = ({ courses }: { courses: Course[] }) => (
  <Carousel
    opts={{
      align: 'start',
      loop: true,
    }}
    className="w-full"
  >
    <CarouselContent>
      {courses.map((course) => (
        <CarouselItem key={course.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-1">
            <CourseCard course={course} />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="hidden md:flex" />
    <CarouselNext className="hidden md:flex" />
  </Carousel>
);

export default function Home() {
  const continueWatching = courses.slice(0, 8);
  const recommendedCourses = courses.slice(8, 16);
  const mostPurchased = courses.slice(16, 20);

  return (
    <div>
      <Section title="Continue Watching" href="/courses">
        <CourseCarousel courses={continueWatching} />
      </Section>

      <Section title="Recommended For You" href="/courses">
        <CourseCarousel courses={recommendedCourses} />
      </Section>
      
      <Section title="Most Purchased" href="/courses">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mostPurchased.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Section>
    </div>
  );
}
