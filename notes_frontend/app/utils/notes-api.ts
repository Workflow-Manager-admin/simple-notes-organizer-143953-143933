type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
};

/**
 * Utility for accessing the notes backend API.
 * This is a stub implementation. Replace logic here w/ real API for backend integration.
 * Reads API URL from ENV: process.env.NOTES_API_URL (must be set in .env)
 */

// PUBLIC_INTERFACE
export async function getNotes(tag?: string | null): Promise<Note[]> {
  // STUB: Use localStorage/fake data for now
  // REPLACE with fetch
  if (typeof window === "undefined") {
    // SSR fallback stub
    return [
      {
        id: "demo1",
        title: "First Note",
        content: "This is a stub note.",
        tags: ["Work"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "demo2",
        title: "Remix Notes",
        content: "Supports create/edit/delete and tagging!",
        tags: ["Ideas"],
        createdAt: new Date().toISOString(),
      },
    ].filter((n) => !tag || tag === "All" || n.tags.includes(tag));
  }
  return []; // On client, SSR used only
}

// PUBLIC_INTERFACE
export async function getNoteById(noteId: string): Promise<Note | null> {
  // STUB: Replace w/ fetch
  const notes = await getNotes(null);
  return notes.find((n) => n.id === noteId) || null;
}

// PUBLIC_INTERFACE
export async function createNote(data: {
  title: string;
  content: string;
  tags: string[];
}): Promise<Note | null> {
  // STUB: Replace w/ fetch POST
  return {
    id: Math.random().toString(36).slice(2, 10),
    title: data.title,
    content: data.content,
    tags: data.tags,
    createdAt: new Date().toISOString(),
  };
}

// PUBLIC_INTERFACE
export async function updateNote(
  noteId: string,
  data: { title: string; content: string; tags: string[] }
): Promise<Note | null> {
  // STUB: Replace w/ fetch PUT
  return {
    id: noteId,
    title: data.title,
    content: data.content,
    tags: data.tags,
    createdAt: new Date().toISOString(),
  };
}

// PUBLIC_INTERFACE
export async function deleteNote(_noteId: string): Promise<boolean> {
  void _noteId; // silence @typescript-eslint/no-unused-vars
  // STUB: Replace w/ fetch DELETE
  return true;
}
