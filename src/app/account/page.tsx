import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CourseCard from '@/components/course-card';
import { courses } from '@/lib/courses';
import { Switch } from '@/components/ui/switch';
import { User, Heart, Settings } from 'lucide-react';

export default function AccountPage() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');
  const wishlistItems = courses.slice(4, 8);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8 flex flex-col items-center text-center">
        {userAvatar && (
          <div className="relative h-24 w-24 rounded-full mb-4">
            <Image
              src={userAvatar.imageUrl}
              alt="User avatar"
              fill
              className="rounded-full object-cover"
              data-ai-hint={userAvatar.imageHint}
            />
          </div>
        )}
        <h1 className="text-3xl font-headline font-bold">Advocate</h1>
        <p className="text-muted-foreground">advocate@example.com</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-2 hidden sm:inline-block"/>Profile</TabsTrigger>
          <TabsTrigger value="wishlist"><Heart className="h-4 w-4 mr-2 hidden sm:inline-block"/>Wishlist</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-2 hidden sm:inline-block"/>Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="font-headline">Profile Information</CardTitle>
              <CardDescription>Update your account's profile information and email address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Advocate" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="advocate@example.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
            <Separator />
             <CardHeader>
              <CardTitle className="font-headline">Change Password</CardTitle>
              <CardDescription>Set a new password for your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
               <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">My Wishlist</CardTitle>
                    <CardDescription>Your collection of courses you want to take.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlistItems.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="font-headline">Notification Settings</CardTitle>
              <CardDescription>Manage your email and push notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="promotions" className="flex flex-col space-y-1">
                  <span>Promotional Emails</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Receive emails about new courses, special offers, and more.
                  </span>
                </Label>
                <Switch id="promotions" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="course-updates" className="flex flex-col space-y-1">
                  <span>Course Updates</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Get notified when instructors update course content.
                  </span>
                </Label>
                <Switch id="course-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="reminders" className="flex flex-col space-y-1">
                  <span>Learning Reminders</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Receive reminders to continue your learning journey.
                  </span>
                </Label>
                <Switch id="reminders" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
