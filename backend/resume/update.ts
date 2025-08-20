import { api, APIError } from "encore.dev/api";
import { resumeDB } from "./db";
import type { Resume, PersonalInfo, WorkExperience, Education, Skills, AdditionalSections, Customization } from "./types";

interface UpdateResumeRequest {
  id: number;
  title?: string;
  templateId?: string;
  personalInfo?: PersonalInfo;
  professionalSummary?: string;
  workExperience?: WorkExperience[];
  education?: Education[];
  skills?: Skills;
  additionalSections?: AdditionalSections;
  customization?: Customization;
}

interface UpdateResumeResponse {
  resume: Resume;
}

// Updates an existing resume.
export const update = api<UpdateResumeRequest, UpdateResumeResponse>(
  { expose: true, method: "PUT", path: "/resumes/:id" },
  async (req) => {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (req.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(req.title);
    }

    if (req.templateId !== undefined) {
      updates.push(`template_id = $${paramIndex++}`);
      values.push(req.templateId);
    }

    if (req.personalInfo !== undefined) {
      updates.push(`personal_info = $${paramIndex++}`);
      values.push(JSON.stringify(req.personalInfo));
    }

    if (req.professionalSummary !== undefined) {
      updates.push(`professional_summary = $${paramIndex++}`);
      values.push(req.professionalSummary);
    }

    if (req.workExperience !== undefined) {
      updates.push(`work_experience = $${paramIndex++}`);
      values.push(JSON.stringify(req.workExperience));
    }

    if (req.education !== undefined) {
      updates.push(`education = $${paramIndex++}`);
      values.push(JSON.stringify(req.education));
    }

    if (req.skills !== undefined) {
      updates.push(`skills = $${paramIndex++}`);
      values.push(JSON.stringify(req.skills));
    }

    if (req.additionalSections !== undefined) {
      updates.push(`additional_sections = $${paramIndex++}`);
      values.push(JSON.stringify(req.additionalSections));
    }

    if (req.customization !== undefined) {
      updates.push(`customization = $${paramIndex++}`);
      values.push(JSON.stringify(req.customization));
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = NOW()`);
    values.push(req.id);

    const query = `
      UPDATE resumes 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING 
        id, user_id as "userId", title, template_id as "templateId",
        personal_info as "personalInfo", professional_summary as "professionalSummary",
        work_experience as "workExperience", education, skills,
        additional_sections as "additionalSections", customization,
        created_at as "createdAt", updated_at as "updatedAt"
    `;

    const row = await resumeDB.rawQueryRow<any>(query, ...values);

    if (!row) {
      throw APIError.notFound("resume not found");
    }

    return {
      resume: {
        ...row,
        personalInfo: row.personalInfo || {},
        workExperience: row.workExperience || [],
        education: row.education || [],
        skills: row.skills || { technical: [], soft: [], languages: [] },
        additionalSections: row.additionalSections || {},
        customization: row.customization || {}
      }
    };
  }
);
