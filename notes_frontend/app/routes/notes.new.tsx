import { useNavigation, useActionData, useNavigate } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import * as NotesAPI from "~/utils/notes-api";
import { NoteForm } from "~/components/NoteForm";

/**
 * Action for creating a new note.
 */
// PUBLIC_INTERFACE
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const tags = formData.get("tags")?.toString().split(",").map(t => t.trim()).filter(Boolean) || [];
  // PUBLIC_INTERFACE: Replace with backend call
  const newNote = await NotesAPI.createNote({ title, content, tags });
  if (newNote?.id) return redirect(`/notes/${newNote.id}`);
  return json({ error: "Failed to create note" }, { status: 400 });
}

// PUBLIC_INTERFACE
export default function NewNotePage() {
  const navigation = useNavigation();
  const error = useActionData<{ error?: string }>()?.error;
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Create a New Note</h2>
      {error && <div className="mb-2 p-2 bg-red-100 text-red-700 rounded text-xs">{error}</div>}
      <NoteForm
        method="post"
        busy={navigation.state === "submitting"}
        defaultValues={{}}
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
