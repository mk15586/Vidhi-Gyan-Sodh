import Image from 'next/image';
import Link from 'next/link';
import { Star, Users } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const image = PlaceHolderImages.find(img => img.id === course.imageId);

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/courses/${course.id}`} aria-label={course.title}>
          <div className="relative aspect-[16/9]">
            {image ? (
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    data-ai-hint={image.imageHint}
                    className="object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary">
                    <p>No image</p>
                </div>
            )}
             <Badge variant="secondary" className="absolute top-3 right-3">{course.level}</Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-2 font-headline text-lg leading-snug">
          <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">
            {course.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">By {course.instructor}</p>
        <div className="mt-2 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-muted-foreground">({course.reviews})</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-primary">₹{course.price}</p>
          {course.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</p>
          )}
        </div>
        <Button asChild size="sm">
          <Link href={`/courses/${course.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
