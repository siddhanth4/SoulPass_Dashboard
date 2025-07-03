"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/admin", label: "Admin" },
  { href: "/student", label: "Student" },
  { href: "/verify", label: "Verify" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Award className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline">CertiChain</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant={pathname.startsWith(link.href) ? "secondary" : "ghost"}
              asChild
            >
              <Link
                href={link.href}
              >
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
