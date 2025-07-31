import { useLoaderData, useNavigate, useActionData, useNavigation } from "@remix-run/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as NotesAPI from "~/utils/notes-api";
import { NoteForm } from "~/components/NoteForm";

// PUBLIC_INTERFACE
export async function loader({ params }: LoaderFunctionArgs) {
  const { noteId } = params;
  // PUBLIC_INTERFACE: Replace with backend call
  const note = await NotesAPI.getNoteById(noteId!);
  if (!note) throw new Response("Note Not Found", { status: 404 });
  return json({ note });
}

// PUBLIC_INTERFACE
export async function action({ request, params }: ActionFunctionArgs) {
  const { noteId } = params;
  const formData = await request.formData();
  const title = formData.get("title")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const tags = formData.get("tags")?.toString().split(",").map((t) => t.trim()).filter(Boolean) || [];
  // PUBLIC_INTERFACE: Replace with backend call
  const updatedNote = await NotesAPI.updateNote(noteId!, { title, content, tags });
  if (updatedNote?.id) return redirect(`/notes/${updatedNote.id}`);
  return json({ error: "Failed to update note" }, { status: 400 });
}

/**
 * Edit note form page.
 */
export default function EditNotePage() {
  const { note } = useLoaderData<typeof loader>();
  const error = useActionData<{ error?: string }>()?.error;
  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Edit Note</h2>
      {error && <div className="mb-2 p-2 bg-red-100 text-red-700 rounded text-xs">{error}</div>}
      <NoteForm
        method="post"
        busy={navigation.state === "submitting"}
        defaultValues={note}
      >
        <button
          type="button"
          className="px-5 py-1.5 mr-2 border rounded text-gray-700 bg-gray-100 hover:bg-gray-200"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-1.5 rounded text-white bg-[var(--color-primary)] hover:bg-blue-800 ml-2"
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Saving..." : "Save"}
        </button>
      </NoteForm>
    </div>
  );
}
