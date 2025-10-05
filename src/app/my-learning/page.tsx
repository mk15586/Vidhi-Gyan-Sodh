import CourseCard from '@/components/course-card';
import { courses } from '@/lib/courses';
import type { Course } from '@/lib/types';

// Mock data for enrolled courses with progress
const enrolledCourses: (Course & { progress: number })[] = [
  { ...courses[0], progress: 75 },
  { ...courses[2], progress: 40 },
  { ...courses[4], progress: 95 },
  { ...courses[6], progress: 15 },
  { ...courses[1], progress: 0 },
  { ...courses[5], progress: 100 },
];

export default function MyLearningPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">My Learning</h1>
        <p className="text-muted-foreground mt-2">Continue your learning journey and master new skills.</p>
      </div>
      
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enrolledCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course}
              progress={course.progress}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-2">No Courses Yet</h2>
            <p className="text-muted-foreground">You haven't enrolled in any courses. Explore our catalog to get started!</p>
        </div>
      )}
    </div>
  );
}
