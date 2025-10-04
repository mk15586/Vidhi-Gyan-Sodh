import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image src="/logo.png" alt="Vidhi Gyan Sodh Logo" width={150} height={40} priority />
    </Link>
  );
};

export default Logo;
