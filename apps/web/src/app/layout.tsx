'use client';
import { ReactNode } from 'react';
import './global.css';

declare global {
  interface String {
    truncate(length: number): string;
  }
}

String.prototype.truncate = function (length: number) {
  return this.substring(0, length) + (this.length > length ? '...' : '');
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-1 flex-col bg-zinc-50 pt-16">{children}</main>
      </body>
    </html>
  );
}
