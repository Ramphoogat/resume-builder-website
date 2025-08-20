import { api, APIError } from "encore.dev/api";
import { resumeDB } from "./db";
import type { Resume } from "./types";

interface GetResumeParams {
  id: number;
}

// Retrieves a resume by ID.
export const get = api<GetResumeParams, Resume>(
  { expose: true, method: "GET", path: "/resumes/:id" },
  async (params) => {
    const row = await resumeDB.queryRow<any>`
      SELECT 
        id, user_id as "userId", title, template_id as "templateId",
        personal_info as "personalInfo", professional_summary as "professionalSummary",
        work_experience as "workExperience", education, skills,
        additional_sections as "additionalSections", customization,
        created_at as "createdAt", updated_at as "updatedAt"
      FROM resumes 
      WHERE id = ${params.id}
    `;

    if (!row) {
      throw APIError.notFound("resume not found");
    }

    return {
      ...row,
      personalInfo: row.personalInfo || {},
      workExperience: row.workExperience || [],
      education: row.education || [],
      skills: row.skills || { technical: [], soft: [], languages: [] },
      additionalSections: row.additionalSections || {},
      customization: row.customization || {}
    };
  }
);
