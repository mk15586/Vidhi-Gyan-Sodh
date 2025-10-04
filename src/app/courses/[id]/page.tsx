'use client';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { courses } from '@/lib/courses';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Clock, BarChart, Users, PlayCircle, Heart, Share2, MessageSquare, ThumbsUp, Facebook, Twitter, Linkedin, FileText, Download, BadgeCheck, ShoppingCart, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Comments from '@/components/comments';
import { useToast } from "@/hooks/use-toast"


type CoursePageProps = {
  params: {
    id: string;
  };
};

export default function CoursePage({ params }: CoursePageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // The params object is directly available in client components
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  const handleAddToCart = () => {
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

  const videoPlaceholder = PlaceHolderImages.find(img => img.id === 'course-video-placeholder');
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative aspect-video mb-6 rounded-lg overflow-hidden shadow-lg">
            {videoPlaceholder && (
              <Image src={videoPlaceholder.imageUrl} alt={videoPlaceholder.description} fill data-ai-hint={videoPlaceholder.imageHint} className="object-cover" />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <PlayCircle className="h-20 w-20 text-white/80 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Course Title and Actions */}
          <div className="mb-6">
            <Badge variant="secondary" className="mb-2 bg-accent text-accent-foreground">{course.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-3">{course.title}</h1>
            <div className="flex items-center justify-between">
                <p className="text-lg text-muted-foreground">By <span className="font-semibold text-primary">{course.instructor}</span></p>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm"><ThumbsUp className="mr-2 h-4 w-4"/>Like</Button>
                    <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4"/>Share</Button>
                </div>
            </div>
          </div>

          {/* Tabs for About, Comments, etc. */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList>
              <TabsTrigger value="about">About this course</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="share">Share</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4">
               <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">{course.longDescription}</p>
                   <div className="flex items-center gap-6 text-sm mt-6 border-t pt-4">
                        <div className="flex items-center gap-2" title="Duration"><Clock className="h-4 w-4" /> {course.duration}</div>
                        <div className="flex items-center gap-2" title="Skill Level"><BarChart className="h-4 w-4" /> {course.level}</div>
                        <div className="flex items-center gap-2" title="Total Lectures"><Users className="h-4 w-4" /> {course.lectures} lectures</div>
                         <div className="flex items-center gap-1" title="Rating">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span>{course.rating} ({course.reviews} reviews)</span>
                        </div>
                    </div>
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
            <TabsContent value="comments" className="mt-4">
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

        {/* Playlist Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
             <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Course Playlist</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                    {course.lecturesContent.map((lecture, index) => (
                      <AccordionItem value={`item-${index}`} key={index} className="border-t">
                        <AccordionTrigger className="px-4 py-3 text-left hover:bg-muted/50 data-[state=open]:bg-muted/50">
                          <div className="flex items-start gap-3">
                            <PlayCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm">{lecture.title}</span>
                                <span className="text-xs text-muted-foreground">{lecture.duration}</span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 bg-background">
                          <p className="text-sm text-muted-foreground">Video content and resources for this lecture would appear here. Click on another lecture to switch.</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                    <div className="flex items-baseline justify-center gap-2 mb-4">
                      <span className="text-4xl font-bold text-primary">₹{course.price}</span>
                      {course.originalPrice && (
                          <span className="text-xl text-muted-foreground line-through">₹{course.originalPrice}</span>
                      )}
                  </div>
                  <div className="flex flex-col gap-3">
                      <Button size="lg" className="w-full" onClick={handleAddToCart}><ShoppingCart className="mr-2 h-5 w-5"/>Add to Cart</Button>
                      <Button size="lg" variant="outline" className="w-full" onClick={handleEnrollNow}><Rocket className="mr-2 h-5 w-5"/>Enroll Now</Button>
                  </div>
                   <div className="text-center mt-4">
                        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                            <BadgeCheck className="h-4 w-4 text-green-500" /> 30-Day Money-Back Guarantee
                        </p>
                    </div>
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
