import { notFound } from 'next/navigation';
import Image from 'next/image';
import { courses } from '@/lib/courses';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Clock, BarChart, Users, PlayCircle, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type CoursePageProps = {
  params: {
    id: string;
  };
};

export default function CoursePage({ params }: CoursePageProps) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  const videoPlaceholder = PlaceHolderImages.find(img => img.id === 'course-video-placeholder');

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 py-12 px-4">
          <div className="md:col-span-2">
            <Badge variant="secondary" className="mb-2 bg-accent text-accent-foreground">{course.category}</Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-primary-foreground/80 mb-4">{course.description}</p>
            <div className="flex items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span>{course.rating} ({course.reviews} reviews)</span>
                </div>
                <span>Created by <span className="font-semibold">{course.instructor}</span></span>
            </div>
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {course.duration}</div>
                <div className="flex items-center gap-2"><BarChart className="h-4 w-4" /> {course.level}</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4" /> {course.lectures} lectures</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader><CardTitle className="font-headline">About this course</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.longDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-headline">Course Content</CardTitle></CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {course.lecturesContent.map((lecture, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-4">
                          <PlayCircle className="h-5 w-5 text-primary" />
                          <span>{lecture.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-12">
                        <div className="flex justify-between items-center text-muted-foreground">
                            <p>Video content for this lecture.</p>
                            <span>{lecture.duration}</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
             <Card className="sticky top-20">
              <CardContent className="p-4">
                 <div className="relative aspect-video mb-4 rounded-md overflow-hidden">
                    {videoPlaceholder && (
                        <Image src={videoPlaceholder.imageUrl} alt={videoPlaceholder.description} fill data-ai-hint={videoPlaceholder.imageHint} className="object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <PlayCircle className="h-16 w-16 text-white/80"/>
                    </div>
                </div>
                <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-primary">₹{course.price}</span>
                    {course.originalPrice && (
                        <span className="ml-2 text-lg text-muted-foreground line-through">₹{course.originalPrice}</span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Button size="lg" className="w-full">Add to Cart</Button>
                    <Button size="lg" variant="outline" className="w-full">
                      <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                    </Button>
                </div>
              </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </>
  );
}
