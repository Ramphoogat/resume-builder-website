import { api } from "encore.dev/api";
import { resumeDB } from "./db";
import type { Template } from "./types";

interface ListTemplatesResponse {
  templates: Template[];
}

// Retrieves all available resume templates.
export const listTemplates = api<void, ListTemplatesResponse>(
  { expose: true, method: "GET", path: "/templates" },
  async () => {
    const templates = await resumeDB.queryAll<Template>`
      SELECT id, name, category, preview_image as "previewImage", is_active as "isActive", created_at as "createdAt"
      FROM templates 
      WHERE is_active = true
      ORDER BY category, name
    `;
    return { templates };
  }
);
