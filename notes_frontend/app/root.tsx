import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";

// PUBLIC_INTERFACE
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap",
  },
];

/**
 * Layout for the entire minimalistic notes app. Implements top nav, sidebar for tags, main notes area.
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-white min-h-screen">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Primary color palette injection for Tailwind theme overrides */}
        <style>{`
        :root {
          --color-primary: #1976d2;
          --color-secondary: #424242;
          --color-accent: #ffca28;
        }
        `}</style>
      </head>
      <body className="font-sans text-gray-900 bg-white min-h-screen">
        <div id="app-root" className="flex flex-col h-screen bg-white">
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Outlet />
  );
}
