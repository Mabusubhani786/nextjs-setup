// app/(auth)/layout.tsx
"use client";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* Left side - Black screen with text */}
      <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center">
        <div className="text-center p-8">
          <div className="text-white text-6xl font-bold mb-4">Next.js</div>
          <div className="text-gray-400 text-xl">Full Stack Setup</div>
        </div>
      </div>

      {/* Right side - Auth content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
