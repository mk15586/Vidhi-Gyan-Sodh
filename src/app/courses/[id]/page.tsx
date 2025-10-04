'use client';
import { notFound, useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { courses } from '@/lib/courses';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Clock, BarChart, Users, PlayCircle, Heart, Share2, FileText, Download, BadgeCheck, ShoppingCart, Rocket, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Comments from '@/components/comments';
import { useToast } from "@/hooks/use-toast";
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CoursePage() {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  
  const [course, setCourse] = React.useState<(typeof courses)[0] | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // useParams can be an empty object on first render.
    // We ensure we have an ID before trying to find the course.
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (id) {
      const foundCourse = courses.find((c) => c.id === id);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        // If the ID exists but no course is found, trigger a 404
        notFound();
      }
    }
    // Only set loading to false after we've attempted to find the course
    // or if the id is present.
    if(id) {
      setLoading(false);
    }
  }, [params.id]);


  const handleAddToCart = () => {
    if (!course) return;
    toast({
      title: "Added to Cart!",
      description: `"${course.title}" has been added to your cart.`,
    });
    // Here you would typically add the course to a global cart state
  };

  const handleEnrollNow = () => {
    // Here you would add to cart and then navigate
    handleAddToCart();
    router.push('/checkout');
  };
  
  // Render a loading state until the course has been found.
  if (loading || !course) {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="space-y-4">
                <Skeleton className="h-10 w-1/4" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
                <div className="grid lg:grid-cols-3 gap-12 pt-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-96 w-full" />
                    </div>
                    <div className="lg:col-span-1">
                        <Skeleton className="h-96 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
  }

  const videoPlaceholder = PlaceHolderImages.find(img => img.id === 'course-video-placeholder');
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');


  return (
    <div className="bg-muted/40">
      {/* Hero Section */}
      <section className="bg-primary/5 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">{course.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">{course.title}</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm mb-6">
                <div className="flex items-center gap-2" title="Rating">
                  <span className="font-bold text-lg text-amber-500">{course.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.round(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/50'}`} />
                    ))}
                  </div>
                  <span className="text-muted-foreground">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground" title="Total Lectures"><Users className="h-4 w-4" /> {course.lectures} lectures</div>
                <div className="flex items-center gap-2 text-muted-foreground" title="Duration"><Clock className="h-4 w-4" /> {course.duration}</div>
                <div className="flex items-center gap-2 text-muted-foreground" title="Skill Level"><BarChart className="h-4 w-4" /> {course.level}</div>
              </div>
              <div className="flex items-center gap-2">
                 <Avatar>
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={course.instructor}/>}
                    <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-base">Created by <span className="font-semibold text-primary">{course.instructor}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left/Main column */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <h3 className="font-headline text-xl font-bold mb-4">What you'll learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
                        <li className="flex items-start gap-3"><BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>Master the fundamentals of {course.category}.</span></li>
                        <li className="flex items-start gap-3"><BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>Analyze complex legal scenarios with confidence.</span></li>
                        <li className="flex items-start gap-3"><BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>Understand key case laws and their implications.</span></li>
                        <li className="flex items-start gap-3"><BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>Prepare for judiciary and civil service examinations.</span></li>
                    </ul>
                </CardContent>
            </Card>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="share">Share</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-4">
                 <Card>
                  <CardHeader><CardTitle className="font-headline text-xl">About This Course</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{course.longDescription}</p>
                  </CardContent>
                 </Card>
              </TabsContent>
               <TabsContent value="curriculum" className="mt-4">
                <Card>
                    <CardHeader><CardTitle className="font-headline text-xl">Course Curriculum</CardTitle></CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                        {course.lecturesContent.map((lecture, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="hover:bg-muted/50 px-4 py-3 text-left data-[state=open]:bg-muted/50 rounded-md">
                              <div className="flex items-center gap-3">
                                <PlayCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <div className="flex flex-col items-start">
                                    <span className="font-semibold text-sm">{lecture.title}</span>
                                    <span className="text-xs text-muted-foreground">{lecture.duration}</span>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 bg-background border-l-2 border-primary ml-6">
                              <p className="text-sm text-muted-foreground">Video content and resources for this lecture would appear here. Premium subscribers can access this content.</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-xl flex items-center gap-2">
                          <FileText className="h-5 w-5"/> Study Materials
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Download supplementary materials for this course.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary"/>
                            <span className="font-medium">Lecture Notes (PDF)</span>
                          </div>
                          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/>Download</Button>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary"/>
                            <span className="font-medium">Presentation Slides (PPT)</span>
                          </div>
                          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/>Download</Button>                      </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary"/>
                            <span className="font-medium">Case Studies (ZIP)</span>
                          </div>
                          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/>Download</Button>                      </div>
                      </div>
                    </CardContent>
                  </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                  <Comments />
              </TabsContent>
               <TabsContent value="share" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">Share this course</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Share this course with your friends and colleagues.</p>
                      <div className="flex items-center gap-4">
                          <Button variant="outline" size="icon"><Facebook className="h-5 w-5 text-blue-600"/></Button>
                          <Button variant="outline" size="icon"><Twitter className="h-5 w-5 text-sky-500 fill-sky-500"/></Button>
                          <Button variant="outline" size="icon"><Linkedin className="h-5 w-5 text-blue-700"/></Button>
                      </div>
                    </CardContent>
                  </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right/Sidebar column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
               <Card className="overflow-hidden shadow-xl">
                  <div className="relative aspect-video">
                    {videoPlaceholder && (
                      <Image src={videoPlaceholder.imageUrl} alt={videoPlaceholder.description} fill data-ai-hint={videoPlaceholder.imageHint} className="object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <PlayCircle className="h-20 w-20 text-white/80 hover:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                      <div className="flex items-baseline justify-center gap-2 mb-4">
                        <span className="text-4xl font-bold text-primary">₹{course.price}</span>
                        {course.originalPrice && (
                            <span className="text-xl text-muted-foreground line-through">₹{course.originalPrice}</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button size="lg" className="w-full text-lg py-6" onClick={handleEnrollNow}><Rocket className="mr-2 h-5 w-5"/>Enroll Now</Button>
                        <Button size="lg" variant="outline" className="w-full text-lg py-6" onClick={handleAddToCart}><ShoppingCart className="mr-2 h-5 w-5"/>Add to Cart</Button>
                    </div>
                     <div className="text-center mt-4">
                          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                              <BadgeCheck className="h-4 w-4 text-green-500" /> 30-Day Money-Back Guarantee
                          </p>
                      </div>
                  </CardContent>
                </Card>
                
                <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="sm" className="bg-background"><Heart className="mr-2 h-4 w-4"/>Wishlist</Button>
                    <Button variant="outline" size="sm" className="bg-background"><Share2 className="mr-2 h-4 w-4"/>Share</Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
