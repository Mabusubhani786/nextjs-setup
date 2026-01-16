"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, Settings, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const COLORS = {
  bg: "#0d0d0e",
  active: "#789bb8",
  gold: "#f5e6c8",
  mutedGold: "#d4c4a8",
  hover: "#1a1a1b",
  border: "#2a3943",
  icon: "#a1b8cb",
  destructive: "#ef4444",
} as const;

const HeaderComponent = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <header
      className={cn("sticky top-0 z-50 transition-all duration-300")}
      style={{
        backgroundColor: COLORS.bg,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="px-4">
        <div className="flex h-13 items-center justify-between">
          {/* Left Section - Collapsible Icon & Logo */}
          <div className="flex items-center gap-4">
            {/* Desktop Sidebar Trigger */}
            <SidebarTrigger
              className="hidden md:flex"
              style={{ color: COLORS.mutedGold }}
            />
          </div>

          {/* Right Section - Search & Icons */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Dynamic width based on sidebar */}
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: COLORS.mutedGold }}
              />
              <Input
                placeholder="Search..."
                className={cn("pl-9 h-9 transition-all duration-300 border")}
                style={{
                  backgroundColor: COLORS.hover,
                  borderColor: COLORS.border,
                  color: COLORS.gold,
                }}
                type="search"
              />
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              aria-label="Search"
              style={{ color: COLORS.icon }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.hover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8"
              aria-label="Notifications"
              style={{ color: COLORS.icon }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.hover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <Bell className="h-4 w-4" />
              <span
                className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
                style={{ backgroundColor: COLORS.destructive }}
              ></span>
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label="Settings"
              style={{ color: COLORS.icon }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.hover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <Settings className="h-4 w-4" />
            </Button>

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 px-2 gap-2"
                  aria-label="User menu"
                  style={{ color: COLORS.gold }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div
                    className="h-6 w-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: COLORS.hover }}
                  >
                    <User className="h-3 w-3" style={{ color: COLORS.icon }} />
                  </div>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56"
                style={{
                  backgroundColor: COLORS.bg,
                  borderColor: COLORS.border,
                  color: COLORS.gold,
                }}
              >
                <DropdownMenuLabel style={{ color: COLORS.gold }}>
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator
                  style={{ backgroundColor: COLORS.border }}
                />
                <DropdownMenuItem
                  style={{ color: COLORS.gold }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <User
                    className="mr-2 h-4 w-4"
                    style={{ color: COLORS.icon }}
                  />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  style={{ color: COLORS.gold }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <Settings
                    className="mr-2 h-4 w-4"
                    style={{ color: COLORS.icon }}
                  />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  style={{ color: COLORS.gold }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <Bell
                    className="mr-2 h-4 w-4"
                    style={{ color: COLORS.icon }}
                  />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator
                  style={{ backgroundColor: COLORS.border }}
                />
                <DropdownMenuItem
                  className="text-destructive"
                  style={{ color: COLORS.destructive }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
