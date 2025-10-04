import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { courses } from '@/lib/courses';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CheckoutPage() {
  const cartItems = courses.slice(0, 3);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0) * 1.18; // with tax

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">Checkout</h1>
      </div>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Payment Information</CardTitle>
              <CardDescription>Select a payment method to complete the purchase.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="pt-6">
                   <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="**** **** **** 1234" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry-month">Expires</Label>
                        <Input id="expiry-month" placeholder="MM" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="expiry-year" className="invisible">Year</Label>
                        <Input id="expiry-year" placeholder="YY" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <Button size="lg" className="w-full">Pay ₹{total.toFixed(2)}</Button>
                  </div>
                </TabsContent>
                <TabsContent value="upi" className="pt-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input id="upi-id" placeholder="yourname@upi" />
                    </div>
                     <Button size="lg" className="w-full">Pay ₹{total.toFixed(2)}</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const image = PlaceHolderImages.find(p => p.id === item.imageId);
                  return (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-10 rounded overflow-hidden">
                          {image && <Image src={image.imageUrl} alt={item.title} fill className="object-cover" data-ai-hint={image.imageHint} />}
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <span className="font-semibold">₹{item.price.toFixed(2)}</span>
                    </div>
                  );
                })}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                 <p className="text-xs text-muted-foreground text-center pt-4">By completing your purchase you agree to our Terms of Service.</p>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-4">
            <Button variant="link" asChild>
                <Link href="/cart">Back to Cart</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
