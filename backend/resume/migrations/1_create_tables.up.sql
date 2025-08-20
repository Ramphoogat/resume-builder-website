CREATE TABLE resumes (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  template_id TEXT NOT NULL,
  personal_info JSONB NOT NULL DEFAULT '{}',
  professional_summary TEXT DEFAULT '',
  work_experience JSONB NOT NULL DEFAULT '[]',
  education JSONB NOT NULL DEFAULT '[]',
  skills JSONB NOT NULL DEFAULT '{}',
  additional_sections JSONB NOT NULL DEFAULT '{}',
  customization JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  preview_image TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Insert default templates
INSERT INTO templates (id, name, category) VALUES
  ('modern-1', 'Modern Professional', 'Modern'),
  ('modern-2', 'Clean Minimal', 'Modern'),
  ('modern-3', 'Tech Focus', 'Modern'),
  ('classic-1', 'Traditional', 'Classic'),
  ('classic-2', 'Executive', 'Classic'),
  ('classic-3', 'Academic', 'Classic'),
  ('creative-1', 'Designer', 'Creative'),
  ('creative-2', 'Marketing Pro', 'Creative'),
  ('ats-1', 'ATS Optimized', 'ATS-Friendly'),
  ('ats-2', 'Simple ATS', 'ATS-Friendly'),
  ('ats-3', 'Corporate ATS', 'ATS-Friendly');
