import { api } from "encore.dev/api";
import { resumeDB } from "./db";
import type { Resume } from "./types";

interface ListResumesRequest {
  userId: string;
}

interface ListResumesResponse {
  resumes: Resume[];
}

// Retrieves all resumes for a user.
export const list = api<ListResumesRequest, ListResumesResponse>(
  { expose: true, method: "GET", path: "/resumes" },
  async (req) => {
    const resumes = await resumeDB.queryAll<any>`
      SELECT 
        id, user_id as "userId", title, template_id as "templateId",
        personal_info as "personalInfo", professional_summary as "professionalSummary",
        work_experience as "workExperience", education, skills,
        additional_sections as "additionalSections", customization,
        created_at as "createdAt", updated_at as "updatedAt"
      FROM resumes 
      WHERE user_id = ${req.userId}
      ORDER BY updated_at DESC
    `;

    return {
      resumes: resumes.map(row => ({
        ...row,
        personalInfo: row.personalInfo || {},
        workExperience: row.workExperience || [],
        education: row.education || [],
        skills: row.skills || { technical: [], soft: [], languages: [] },
        additionalSections: row.additionalSections || {},
        customization: row.customization || {}
      }))
    };
  }
);
