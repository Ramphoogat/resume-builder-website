export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  phone: string;
  email: string;
  linkedIn?: string;
  portfolio?: string;
  location: string;
  headshot?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  location: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  graduationDate: string;
  gpa?: string;
  coursework?: string[];
  honors?: string[];
}

export interface Skills {
  technical: SkillItem[];
  soft: string[];
  languages: LanguageSkill[];
}

export interface SkillItem {
  name: string;
  proficiency: number; // 1-5
  category: string;
}

export interface LanguageSkill {
  language: string;
  proficiency: string; // Native, Fluent, Conversational, Basic
}

export interface AdditionalSections {
  certifications?: Certification[];
  projects?: Project[];
  volunteer?: VolunteerExperience[];
  awards?: Award[];
  publications?: Publication[];
  associations?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate?: string;
}

export interface VolunteerExperience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
}

export interface Customization {
  font: string;
  colorScheme: string;
  layout: 'single-column' | 'two-column';
  sectionOrder: string[];
  spacing: number;
}

export interface Resume {
  id: number;
  userId: string;
  title: string;
  templateId: string;
  personalInfo: PersonalInfo;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skills;
  additionalSections: AdditionalSections;
  customization: Customization;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  previewImage?: string;
  isActive: boolean;
  createdAt: Date;
}
