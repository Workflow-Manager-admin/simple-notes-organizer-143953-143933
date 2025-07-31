import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import * as NotesAPI from "~/utils/notes-api";
import { useMemo } from "react";

type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
};

/**
 * Loader for listing notes (w/ optional tag filter).
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const filterTag = url.searchParams.get("tag");

  // PUBLIC_INTERFACE: Replace with actual API call.
  const notes = await NotesAPI.getNotes(filterTag);

  return json({ notes, tag: filterTag });
}

/**
 * Notes main area: displays note list + nested outlet for details/edit.
 */
export default function NotesLayout() {
  const { notes } = useLoaderData<{ notes: Note[]; tag: string | null }>();
  const location = useLocation();

  // Select note id if in URL
  const noteId = useMemo(() => {
    const match = location.pathname.match(/\/notes\/([^/]+)/);
    return match && match[1] !== "new" ? match[1] : null;
  }, [location.pathname]);

  return (
    <div className="flex flex-row h-full">
      {/* Notes List */}
      <section className="w-80 shrink-0 border-r border-gray-100 bg-white p-4 overflow-y-auto h-full">
        <div className="mb-2 flex items-center">
          <h2 className="text-base font-semibold">Notes</h2>
          <span className="flex-1" />
          <span className="rounded bg-gray-200 text-[var(--color-primary)] text-xs px-2 py-0.5">
            {notes?.length || 0}
          </span>
        </div>
        <ul className="space-y-1">
          {(!notes || notes.length === 0) && (
            <li className="text-sm text-gray-400 italic p-2">No notes found.</li>
          )}
          {notes.map((note: Note) => (
            <li key={note.id}>
              <Link
                prefetch="intent"
                to={`/notes/${note.id}`}
                className={`block px-3 py-2 rounded group transition-colors ${
                  noteId === note.id
                    ? "bg-[var(--color-accent)] font-bold text-black"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="inline-block w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                  <span className="truncate text-sm">{note.title || <em>Untitled</em>}</span>
                </div>
                <small className="block text-xs text-gray-400">{note.tags?.join(", ")}</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {/* Outlet: either detail, edit, or new note */}
      <section className="flex-1 p-6 bg-white h-full overflow-y-auto">
        <Outlet />
      </section>
    </div>
  );
}
