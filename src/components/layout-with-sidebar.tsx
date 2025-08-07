"use client"

import { ReactNode } from 'react';

export default function LayoutWithSidebar({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 hidden md:block border-r p-4">Sidebar</aside>
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4">Freeshare</div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
