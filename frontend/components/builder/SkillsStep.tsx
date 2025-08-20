import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import backend from '~backend/client';
import type { Resume, Skills, SkillItem, LanguageSkill } from '~backend/resume/types';

interface SkillsStepProps {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function SkillsStep({ resume, updateResume, onNext }: SkillsStepProps) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: suggestionsData } = useQuery({
    queryKey: ['suggestions', 'skills'],
    queryFn: () => backend.resume.getSuggestions({ type: 'skills' }),
    enabled: showSuggestions
  });

  const suggestions = suggestionsData?.suggestions || [];

  const updateSkills = (skills: Skills) => {
    updateResume({ skills });
  };

  const addTechnicalSkill = () => {
    if (!newTechnicalSkill.trim()) return;

    const newSkill: SkillItem = {
      name: newTechnicalSkill.trim(),
      proficiency: 3,
      category: 'General'
    };

    updateSkills({
      ...resume.skills,
      technical: [...resume.skills.technical, newSkill]
    });
    setNewTechnicalSkill('');
  };

  const removeTechnicalSkill = (index: number) => {
    const updatedSkills = resume.skills.technical.filter((_, i) => i !== index);
    updateSkills({
      ...resume.skills,
      technical: updatedSkills
    });
  };

  const updateTechnicalSkill = (index: number, field: keyof SkillItem, value: any) => {
    const updatedSkills = resume.skills.technical.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    updateSkills({
      ...resume.skills,
      technical: updatedSkills
    });
  };

  const addSoftSkill = () => {
    if (!newSoftSkill.trim()) return;

    updateSkills({
      ...resume.skills,
      soft: [...resume.skills.soft, newSoftSkill.trim()]
    });
    setNewSoftSkill('');
  };

  const removeSoftSkill = (index: number) => {
    const updatedSkills = resume.skills.soft.filter((_, i) => i !== index);
    updateSkills({
      ...resume.skills,
      soft: updatedSkills
    });
  };

  const addLanguage = () => {
    if (!newLanguage.trim()) return;

    const newLang: LanguageSkill = {
      language: newLanguage.trim(),
      proficiency: 'Conversational'
    };

    updateSkills({
      ...resume.skills,
      languages: [...resume.skills.languages, newLang]
    });
    setNewLanguage('');
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = resume.skills.languages.filter((_, i) => i !== index);
    updateSkills({
      ...resume.skills,
      languages: updatedLanguages
    });
  };

  const updateLanguage = (index: number, field: keyof LanguageSkill, value: string) => {
    const updatedLanguages = resume.skills.languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    updateSkills({
      ...resume.skills,
      languages: updatedLanguages
    });
  };

  const addSuggestedSkill = (suggestion: string) => {
    const newSkill: SkillItem = {
      name: suggestion,
      proficiency: 3,
      category: 'General'
    };

    updateSkills({
      ...resume.skills,
      technical: [...resume.skills.technical, newSkill]
    });
  };

  const renderStars = (proficiency: number, onChange: (value: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 cursor-pointer ${
              star <= proficiency ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Skills</h3>
        <p className="text-gray-600">
          Add your technical skills, soft skills, and languages to showcase your capabilities.
        </p>
      </div>

      {/* Technical Skills */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">Technical Skills</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              Suggestions
            </Button>
          </div>

          {showSuggestions && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="text-sm font-medium text-blue-900 mb-2">Suggested Skills</h5>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => addSuggestedSkill(suggestion)}
                  >
                    {suggestion}
                    <Plus className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-2 mb-4">
            <Input
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              placeholder="Add a technical skill"
              onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
            />
            <Button onClick={addTechnicalSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {resume.skills.technical.map((skill, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <Input
                    value={skill.name}
                    onChange={(e) => updateTechnicalSkill(index, 'name', e.target.value)}
                    className="font-medium"
                  />
                </div>
                <div className="w-32">
                  <Select
                    value={skill.category}
                    onValueChange={(value) => updateTechnicalSkill(index, 'category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programming">Programming</SelectItem>
                      <SelectItem value="Frameworks">Frameworks</SelectItem>
                      <SelectItem value="Tools">Tools</SelectItem>
                      <SelectItem value="Databases">Databases</SelectItem>
                      <SelectItem value="Cloud">Cloud</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Proficiency:</span>
                  {renderStars(skill.proficiency, (value) => updateTechnicalSkill(index, 'proficiency', value))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeTechnicalSkill(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Soft Skills</h4>

          <div className="flex space-x-2 mb-4">
            <Input
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              placeholder="Add a soft skill"
              onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
            />
            <Button onClick={addSoftSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {resume.skills.soft.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                <span>{skill}</span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSoftSkill(index)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Languages</h4>

          <div className="flex space-x-2 mb-4">
            <Input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Add a language"
              onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
            />
            <Button onClick={addLanguage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {resume.skills.languages.map((language, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <Input
                    value={language.language}
                    onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                  />
                </div>
                <div className="w-40">
                  <Select
                    value={language.proficiency}
                    onValueChange={(value) => updateLanguage(index, 'proficiency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Native">Native</SelectItem>
                      <SelectItem value="Fluent">Fluent</SelectItem>
                      <SelectItem value="Conversational">Conversational</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeLanguage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext}>
          Continue to Additional Sections
        </Button>
      </div>
    </div>
  );
}
