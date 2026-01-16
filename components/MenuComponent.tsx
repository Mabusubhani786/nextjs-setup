"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  Mail,
  Settings,
  FileText,
  Home,
  Calendar,
  Bell,
  BarChart3,
  Users,
  Folder,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Extended items for sidebar
const sidebarItems = [
  {
    title: "Overview",
    items: [
      { name: "Home", href: "/", icon: Home },
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "About", href: "/about", icon: User },
      { name: "Team", href: "/team", icon: Users },
      { name: "Contact", href: "/contact", icon: Mail },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Documents", href: "/documents", icon: FileText },
      { name: "Projects", href: "/projects", icon: Folder },
      { name: "Calendar", href: "/calendar", icon: Calendar },
      { name: "Notifications", href: "/notifications", icon: Bell },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

// Sidebar Component - For the actual sidebar content
export function MenuComponent() {
  const pathname = usePathname();
  const { open, state } = useSidebar();

  // Shadcn sidebar uses 'state' for collapsible behavior
  const isCollapsed = state === "collapsed";

  // Mock logout function
  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here
  };

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-r flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader className="border-b p-0">
        <div
          className={cn(
            "flex items-center justify-between h-13",
            isCollapsed ? "px-3" : "px-6"
          )}
        >
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Acme Inc</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
          )}

          <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        {/* Sidebar Menu Groups */}
        <div className="flex-1 overflow-auto py-4">
          {sidebarItems.map((group) => (
            <SidebarGroup key={group.title}>
              {!isCollapsed && (
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={isCollapsed ? item.name : undefined}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3",
                            isCollapsed ? "justify-center" : ""
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <div className="space-y-3">
          {/* User Info */}
          <div
            className={cn(
              "flex items-center",
              isCollapsed ? "justify-center" : "gap-2"
            )}
          >
            <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
              <UserIcon className="h-3.5 w-3.5" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">v2.1.4</p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <Button
            variant="outline"
            size={isCollapsed ? "icon" : "sm"}
            className={cn("w-full h-8", isCollapsed ? "" : "text-xs")}
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className={cn("h-3 w-3", !isCollapsed && "mr-2")} />
            {!isCollapsed && "Logout"}
          </Button>

          {/* Copyright */}
          {!isCollapsed && (
            <p className="text-xs text-center text-muted-foreground">
              © 2024 Acme Inc
            </p>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
