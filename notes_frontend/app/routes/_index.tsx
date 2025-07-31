import { Outlet, useNavigate, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import { PlusIcon } from "~/components/Icons";

/**
 * Main landing page wrapper for the notes app.
 * Contains: nav bar, sidebar (categories/tags), main notes area (list/detail via nested outlets), FAB for new note.
 */
export default function IndexLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Key: redirect from / to /notes/
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/notes", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <nav className="flex h-14 items-center px-6 border-b border-gray-200 bg-white">
        <span className="text-lg font-bold tracking-tight" style={{ color: "var(--color-primary)" }}>
          Notes
        </span>
        <span className="flex-1" />
        <span className="text-xs text-gray-400">A minimal notes app</span>
      </nav>
      <div className="flex flex-1">
        {/* Sidebar for tags/categories */}
        <aside className="w-56 shrink-0 border-r border-gray-100 bg-gray-50 h-full p-4 flex flex-col">
          <h2 className="font-semibold text-sm uppercase mb-3 tracking-wide text-gray-500">
            Tags
          </h2>
          <SidebarTags />
        </aside>
        {/* Main Content Area */}
        <main className="flex-1 relative overflow-auto bg-white">
          <Outlet />
          <FloatingActionButton
            onClick={() => navigate("/notes/new")}
            label="New Note"
          />
        </main>
      </div>
    </div>
  );
}

// Floating action button for 'Add Note'
function FloatingActionButton({ onClick, label }: { onClick: () => void, label: string }) {
  return (
    <button
      aria-label={label}
      className="fixed bottom-6 right-8 z-30 rounded-full bg-[var(--color-primary)] hover:bg-blue-700 text-white shadow-lg p-4 transition-colors"
      onClick={onClick}
      type="button"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  );
}

/**
 * Sidebar tag list (stub: fetch real tags from API)
 */
// PUBLIC_INTERFACE
function SidebarTags() {
  // In real implementation, fetch tags from loader or backend.
  // For now, use stubbed tags:
  const tags = ["All", "Work", "Personal", "Ideas"];
  return (
    <ul className="space-y-2">
      {tags.map(tag => (
        <li key={tag}>
          <a
            href={`/notes?tag=${encodeURIComponent(tag)}`}
            className="block px-2 py-1 rounded text-sm hover:bg-[var(--color-accent)] hover:text-black transition-colors"
          >
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
