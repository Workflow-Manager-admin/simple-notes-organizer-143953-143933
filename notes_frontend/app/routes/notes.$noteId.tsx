import { useLoaderData, useNavigate } from "@remix-run/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as NotesAPI from "~/utils/notes-api";

/**
 * Loader for a single note detail.
 */
export async function loader({ params }: LoaderFunctionArgs) {
  const { noteId } = params;
  // PUBLIC_INTERFACE: Replace with actual API call.
  const note = await NotesAPI.getNoteById(noteId!);
  if (!note) throw new Response("Note Not Found", { status: 404 });
  return json({ note });
}

/**
 * Action for edit or delete.
 */
export async function action({ request, params }: ActionFunctionArgs) {
  const { noteId } = params;
  const formData = await request.formData();
  const intent = formData.get("_intent");

  if (intent === "delete") {
    await NotesAPI.deleteNote(noteId!);
    return redirect("/notes");
  }
  return null;
}

/**
 * Note detail view. Allows viewing, editing, deletion.
 */
export default function NoteDetails() {
  const { note } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  // Date formatting
  const createdAt = note?.createdAt ? new Date(note.createdAt).toLocaleString() : "";

  return (
    <article className="max-w-2xl mx-auto p-4 shadow-none rounded bg-white h-fit transition-shadow border border-gray-100">
      <div className="flex items-start gap-4">
        <h2 className="text-xl font-semibold flex-1">{note.title}</h2>
        <button
          className="px-3 py-1 rounded bg-[var(--color-primary)] text-white text-xs font-medium hover:bg-blue-800 transition-colors"
          onClick={() => navigate(`/notes/${note.id}/edit`)}
        >
          Edit
        </button>
        <form method="post" onSubmit={(e) => {
          if (!confirm("Delete this note?")) e.preventDefault();
        }}>
          <input type="hidden" name="_intent" value="delete" />
          <button
            type="submit"
            className="px-2 py-1 rounded text-xs font-medium text-white bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] hover:text-black transition-colors"
          >
            Delete
          </button>
        </form>
      </div>
      <div className="text-xs text-gray-400 mt-0.5 mb-4">{createdAt}</div>
      <div className="prose prose-sm whitespace-pre-wrap mt-2 mb-4">{note.content}</div>
      <div className="flex flex-wrap gap-2">
        {note.tags?.map((tag: string) => (
          <span
            key={tag}
            className="inline-block px-2 py-0.5 rounded bg-[var(--color-accent)] text-xs font-bold text-black"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
