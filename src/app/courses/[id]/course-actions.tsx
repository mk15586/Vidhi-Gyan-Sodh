'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Rocket, ShoppingCart } from 'lucide-react';
import type { Course } from '@/lib/types';

export default function CourseActions({ course }: { course: Course }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart!",
      description: `"${course.title}" has been added to your cart.`,
    });
  };

  const handleEnrollNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col gap-3">
        <Button size="lg" className="w-full text-lg py-6" onClick={handleEnrollNow}><Rocket className="mr-2 h-5 w-5"/>Enroll Now</Button>
        <Button size="lg" variant="outline" className="w-full text-lg py-6" onClick={handleAddToCart}><ShoppingCart className="mr-2 h-5 w-5"/>Add to Cart</Button>
    </div>
  );
}
