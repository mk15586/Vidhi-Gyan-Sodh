import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { courses } from '@/lib/courses';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { X } from 'lucide-react';

export default function CartPage() {
  const cartItems = courses.slice(0, 3); // Mock cart items
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const taxes = subtotal * 0.18; // Mock 18% tax
  const total = subtotal + taxes;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-8">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{cartItems.length} Courses in Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const image = PlaceHolderImages.find(img => img.id === item.imageId);
                  return (
                    <div key={item.id} className="flex gap-4 items-start">
                      <div className="relative w-32 h-20 rounded-md overflow-hidden flex-shrink-0">
                        {image && <Image src={image.imageUrl} alt={item.title} fill className="object-cover" data-ai-hint={image.imageHint}/>}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold font-headline">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">By {item.instructor}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold text-primary">₹{item.price}</p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="font-headline">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
