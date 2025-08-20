import { api } from "encore.dev/api";
import { resumeDB } from "./db";
import type { Resume, PersonalInfo, Skills, AdditionalSections, Customization } from "./types";

interface CreateResumeRequest {
  userId: string;
  title?: string;
  templateId: string;
}

interface CreateResumeResponse {
  resume: Resume;
}

// Creates a new resume with default values.
export const create = api<CreateResumeRequest, CreateResumeResponse>(
  { expose: true, method: "POST", path: "/resumes" },
  async (req) => {
    const defaultPersonalInfo: PersonalInfo = {
      fullName: "",
      professionalTitle: "",
      phone: "",
      email: "",
      location: ""
    };

    const defaultSkills: Skills = {
      technical: [],
      soft: [],
      languages: []
    };

    const defaultAdditionalSections: AdditionalSections = {};

    const defaultCustomization: Customization = {
      font: "Inter",
      colorScheme: "blue",
      layout: "two-column",
      sectionOrder: ["personal", "summary", "experience", "education", "skills"],
      spacing: 1
    };

    const result = await resumeDB.queryRow<{ id: number; created_at: Date; updated_at: Date }>`
      INSERT INTO resumes (
        user_id, title, template_id, personal_info, professional_summary,
        work_experience, education, skills, additional_sections, customization
      ) VALUES (
        ${req.userId}, 
        ${req.title || 'Untitled Resume'}, 
        ${req.templateId},
        ${JSON.stringify(defaultPersonalInfo)},
        '',
        '[]',
        '[]',
        ${JSON.stringify(defaultSkills)},
        ${JSON.stringify(defaultAdditionalSections)},
        ${JSON.stringify(defaultCustomization)}
      )
      RETURNING id, created_at, updated_at
    `;

    if (!result) {
      throw new Error("Failed to create resume");
    }

    const resume: Resume = {
      id: result.id,
      userId: req.userId,
      title: req.title || 'Untitled Resume',
      templateId: req.templateId,
      personalInfo: defaultPersonalInfo,
      professionalSummary: '',
      workExperience: [],
      education: [],
      skills: defaultSkills,
      additionalSections: defaultAdditionalSections,
      customization: defaultCustomization,
      createdAt: result.created_at,
      updatedAt: result.updated_at
    };

    return { resume };
  }
);
