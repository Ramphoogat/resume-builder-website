import { api } from "encore.dev/api";

interface GetSuggestionsRequest {
  type: 'summary' | 'skills' | 'responsibilities';
  industry?: string;
  jobTitle?: string;
}

interface GetSuggestionsResponse {
  suggestions: string[];
}

// Provides content suggestions based on industry and job title.
export const getSuggestions = api<GetSuggestionsRequest, GetSuggestionsResponse>(
  { expose: true, method: "GET", path: "/suggestions" },
  async (req) => {
    const suggestions: string[] = [];

    if (req.type === 'summary') {
      suggestions.push(
        "Results-driven professional with expertise in driving business growth and operational excellence.",
        "Experienced leader with a proven track record of delivering innovative solutions and managing high-performing teams.",
        "Detail-oriented professional with strong analytical skills and a passion for continuous improvement.",
        "Strategic thinker with excellent communication skills and ability to work effectively in fast-paced environments."
      );
    } else if (req.type === 'skills') {
      if (req.industry === 'technology') {
        suggestions.push(
          "JavaScript", "Python", "React", "Node.js", "AWS", "Docker", "Git", "SQL", "MongoDB", "TypeScript"
        );
      } else if (req.industry === 'marketing') {
        suggestions.push(
          "Digital Marketing", "SEO/SEM", "Google Analytics", "Social Media Marketing", "Content Strategy", "Email Marketing", "A/B Testing", "Marketing Automation"
        );
      } else {
        suggestions.push(
          "Project Management", "Data Analysis", "Communication", "Leadership", "Problem Solving", "Team Collaboration", "Time Management", "Critical Thinking"
        );
      }
    } else if (req.type === 'responsibilities') {
      suggestions.push(
        "Led cross-functional teams to deliver projects on time and within budget",
        "Developed and implemented strategic initiatives that increased efficiency by 25%",
        "Collaborated with stakeholders to identify requirements and deliver solutions",
        "Managed client relationships and maintained 95% customer satisfaction rate",
        "Analyzed data to identify trends and opportunities for improvement",
        "Mentored junior team members and facilitated knowledge sharing sessions"
      );
    }

    return { suggestions };
  }
);
