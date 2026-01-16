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

const COLORS = {
  bg: "#12151a",
  active: "#0B6A3B",
  gold: "#f5e6c8",
  mutedGold: "#d4c4a8",
  hover: "#1a1a1b",
  icon: "#a1b8cb",
  leftBorder: "#963941",
} as const;

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

export function MenuComponent() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className={`flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      style={{
        backgroundColor: COLORS.bg,
        border: 0,
      }}
    >
      <SidebarHeader className="p-0" style={{ backgroundColor: COLORS.bg }}>
        <div
          className={`flex items-center justify-between h-13 ${
            isCollapsed ? "px-3" : "px-6"
          }`}
        >
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: COLORS.active }}
              >
                <span
                  className="font-bold text-sm"
                  style={{ color: COLORS.bg }}
                >
                  A
                </span>
              </div>
              <div>
                <h2
                  className="text-lg font-semibold"
                  style={{ color: COLORS.gold }}
                >
                  Acme Inc
                </h2>
                <p className="text-xs" style={{ color: COLORS.mutedGold }}>
                  Admin Panel
                </p>
              </div>
            </div>
          ) : (
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center mx-auto"
              style={{ backgroundColor: COLORS.active }}
            >
              <span className="font-bold text-sm" style={{ color: COLORS.bg }}>
                A
              </span>
            </div>
          )}
          <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1" style={{ backgroundColor: COLORS.bg }}>
        <div className="flex-1 overflow-auto py-4">
          {sidebarItems.map((group) => (
            <SidebarGroup key={group.title}>
              {!isCollapsed && (
                <SidebarGroupLabel
                  className="uppercase text-xs font-medium mb-2"
                  style={{ color: COLORS.mutedGold }}
                >
                  {group.title}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={isCollapsed ? item.name : undefined}
                          className="transition-all duration-200 my-0.5"
                          style={{
                            backgroundColor: isActive
                              ? COLORS.active
                              : "transparent",
                            color: isActive ? COLORS.bg : COLORS.gold,

                            borderRadius: isActive ? "3px" : "0.5rem",

                            // left indicator with top & bottom gap
                            backgroundImage: isActive
                              ? `linear-gradient(
          to bottom,
          transparent 8px,
          ${COLORS.leftBorder} 8px,
          ${COLORS.leftBorder} calc(100% - 8px),
          transparent calc(100% - 8px)
        )`
                              : "none",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "3px 100%",
                            backgroundPosition: "left center",
                          }}
                          onMouseEnter={(e) =>
                            !isActive &&
                            (e.currentTarget.style.backgroundColor =
                              COLORS.hover)
                          }
                          onMouseLeave={(e) =>
                            !isActive &&
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 ${
                              isCollapsed ? "justify-center" : ""
                            }`}
                          >
                            <item.icon
                              className="h-4 w-4"
                              style={{
                                color: isActive ? COLORS.bg : COLORS.icon,
                              }}
                            />
                            {!isCollapsed && <span>{item.name}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter className="p-3" style={{ backgroundColor: COLORS.bg }}>
        <div className="space-y-3">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div
              className="h-7 w-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: COLORS.hover }}
            >
              <UserIcon
                className="h-3.5 w-3.5"
                style={{ color: COLORS.icon }}
              />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 ml-2">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: COLORS.gold }}
                >
                  John Doe
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: COLORS.mutedGold }}
                >
                  v2.1.4
                </p>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size={isCollapsed ? "icon" : "sm"}
            className="w-full h-8 transition-all duration-200 text-xs font-medium"
            onClick={() => console.log("Logout")}
            title={isCollapsed ? "Logout" : ""}
            style={{
              backgroundColor: "transparent",
              color: COLORS.gold,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.hover;
              e.currentTarget.style.borderColor = COLORS.active;
              e.currentTarget.style.borderLeftColor = COLORS.leftBorder;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = COLORS.hover;
              e.currentTarget.style.borderLeftColor = COLORS.leftBorder;
            }}
          >
            <LogOut className={`h-3 w-3 ${!isCollapsed ? "mr-2" : ""}`} />
            {!isCollapsed && "Logout"}
          </Button>

          {!isCollapsed && (
            <p
              className="text-xs text-center pt-2"
              style={{ color: COLORS.mutedGold }}
            >
              © 2024 Acme Inc
            </p>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
