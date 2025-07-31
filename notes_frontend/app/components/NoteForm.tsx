import { useState } from "react";
import { Form } from "@remix-run/react";

type NoteFormProps = {
  defaultValues?: { title?: string; content?: string; tags?: string[] };
  method: "post" | "put";
  children?: React.ReactNode;
};

/**
 * Reusable form for create or edit note.
 * @param defaultValues optional defaults
 */
export function NoteForm({
  defaultValues,
  method,
  children,
}: NoteFormProps) {
  const [tagsInput, setTagsInput] = useState(
    defaultValues?.tags?.join(", ") || ""
  );
  return (
    <Form method={method} replace={false} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Title
          <input
            type="text"
            name="title"
            defaultValue={defaultValues?.title || ""}
            maxLength={255}
            required
            className="mt-1 block w-full rounded border border-gray-200 py-2 px-3 text-gray-900 bg-white focus:border-[var(--color-primary)] focus:outline-none"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Content
          <textarea
            name="content"
            defaultValue={defaultValues?.content || ""}
            rows={7}
            required
            className="mt-1 block w-full rounded border border-gray-200 py-2 px-3 text-gray-900 bg-white focus:border-[var(--color-primary)] focus:outline-none resize-vertical"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Tags (comma-separated)
          <input
            type="text"
            name="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. work, ideas"
            className="mt-1 block w-full rounded border border-gray-200 py-2 px-3 text-gray-900 bg-white focus:border-[var(--color-primary)] focus:outline-none"
          />
        </label>
      </div>
      <div className="flex flex-row gap-3 items-center">
        {children}
      </div>
    </Form>
  );
}
