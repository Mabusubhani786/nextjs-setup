"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function MenuComponent() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-2">
      {menuItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          asChild
          className={`${pathname === item.href ? "bg-accent" : ""}`}
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}
    </nav>
  );
}
