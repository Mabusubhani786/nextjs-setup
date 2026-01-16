// app/(mainlayout)/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { MenuComponent } from "@/components/MenuComponent";
import HeaderComponent from "@/components/HeaderComponent";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <MenuComponent />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderComponent />
          <main className="flex-1 overflow-auto">
            <div className="container p-3">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
