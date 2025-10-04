'use client';
import Link from 'next/link';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Button } from '@/components/ui/button';
import { courses } from '@/lib/courses';
import CourseCard from '@/components/course-card';
import { ArrowRight } from 'lucide-react';
import type { Course } from '@/lib/types';

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

const CourseCarousel = ({ courses, autoplay = false }: { courses: Course[], autoplay?: boolean }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: autoplay,
      }}
      plugins={autoplay ? [plugin.current] : []}
      className="w-full"
    >
      <CarouselContent className="-ml-2">
        {courses.map((course) => (
          <CarouselItem key={course.id} className="basis-[90%] md:basis-1/3 lg:basis-1/4 pl-2">
            <div className="p-1">
              <CourseCard course={course} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {!autoplay && (
        <>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </>
      )}
    </Carousel>
  );
};


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
         <CourseCarousel courses={mostPurchased} autoplay={true} />
      </Section>
    </div>
  );
}
