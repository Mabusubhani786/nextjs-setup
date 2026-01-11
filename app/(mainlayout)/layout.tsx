// app/(mainlayout)/layout.tsx
import { MenuComponent } from "@/components/MenuComponent";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <MenuComponent />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
}
