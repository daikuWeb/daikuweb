// components/LayoutContent.tsx
import { ReactNode } from "react";

interface LayoutContentProps {
  children: ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow">{children}</div>
    </main>
  );
}