import { cn } from "@/lib/utils";
import Link from "next/link";
import { Scale } from 'lucide-react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-lg font-bold text-primary", className)}>
       <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <Scale className="h-6 w-6" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-headline text-xl font-bold">Vidhi Gyan</span>
        <span className="text-xs font-body font-semibold text-accent -mt-1">Sodh</span>
      </div>
    </Link>
  );
};

export default Logo;
