// src/app/layout.tsx
import React from 'react';
import ".//globals.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header>
        
        </header>
        <main>{children}</main>
        <footer>
          
        </footer>
      </body>
    </html>
  );
}
