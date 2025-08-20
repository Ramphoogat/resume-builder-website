import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical, Lightbulb } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import backend from '~backend/client';
import type { Resume, WorkExperience } from '~backend/resume/types';

interface WorkExperienceStepProps {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function WorkExperienceStep({ resume, updateResume, onNext }: WorkExperienceStepProps) {
  const [showSuggestions, setShowSuggestions] = useState<string | null>(null);

  const { data: suggestionsData } = useQuery({
    queryKey: ['suggestions', 'responsibilities'],
    queryFn: () => backend.resume.getSuggestions({ type: 'responsibilities' }),
    enabled: !!showSuggestions
  });

  const suggestions = suggestionsData?.suggestions || [];

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      location: '',
      responsibilities: ['']
    };

    updateResume({
      workExperience: [...resume.workExperience, newExperience]
    });
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    const updatedExperience = resume.workExperience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateResume({ workExperience: updatedExperience });
  };

  const removeExperience = (id: string) => {
    const updatedExperience = resume.workExperience.filter(exp => exp.id !== id);
    updateResume({ workExperience: updatedExperience });
  };

  const addResponsibility = (experienceId: string) => {
    const updatedExperience = resume.workExperience.map(exp =>
      exp.id === experienceId
        ? { ...exp, responsibilities: [...exp.responsibilities, ''] }
        : exp
    );
    updateResume({ workExperience: updatedExperience });
  };

  const updateResponsibility = (experienceId: string, index: number, value: string) => {
    const updatedExperience = resume.workExperience.map(exp =>
      exp.id === experienceId
        ? {
            ...exp,
            responsibilities: exp.responsibilities.map((resp, i) =>
              i === index ? value : resp
            )
          }
        : exp
    );
    updateResume({ workExperience: updatedExperience });
  };

  const removeResponsibility = (experienceId: string, index: number) => {
    const updatedExperience = resume.workExperience.map(exp =>
      exp.id === experienceId
        ? {
            ...exp,
            responsibilities: exp.responsibilities.filter((_, i) => i !== index)
          }
        : exp
    );
    updateResume({ workExperience: updatedExperience });
  };

  const useSuggestion = (experienceId: string, suggestion: string) => {
    addResponsibility(experienceId);
    const experience = resume.workExperience.find(exp => exp.id === experienceId);
    if (experience) {
      const lastIndex = experience.responsibilities.length - 1;
      updateResponsibility(experienceId, lastIndex, suggestion);
    }
    setShowSuggestions(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Work Experience</h3>
        <p className="text-gray-600">
          Add your work history, starting with your most recent position.
        </p>
      </div>

      {resume.workExperience.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <Button onClick={addExperience}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Job
          </Button>
        </div>
      )}

      {resume.workExperience.map((experience, index) => (
        <Card key={experience.id}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-5 w-5 text-gray-400" />
                <h4 className="font-medium text-gray-900">
                  {experience.jobTitle || `Position ${index + 1}`}
                </h4>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeExperience(experience.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`jobTitle-${experience.id}`}>Job Title</Label>
                <Input
                  id={`jobTitle-${experience.id}`}
                  value={experience.jobTitle}
                  onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <Label htmlFor={`company-${experience.id}`}>Company</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Tech Company Inc."
                />
              </div>
              <div>
                <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                <Input
                  id={`endDate-${experience.id}`}
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  disabled={experience.isCurrentJob}
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.isCurrentJob}
                    onCheckedChange={(checked) => {
                      updateExperience(experience.id, 'isCurrentJob', checked);
                      if (checked) {
                        updateExperience(experience.id, 'endDate', '');
                      }
                    }}
                  />
                  <Label htmlFor={`current-${experience.id}`} className="text-sm">
                    I currently work here
                  </Label>
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor={`location-${experience.id}`}>Location</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Responsibilities & Achievements</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSuggestions(showSuggestions === experience.id ? null : experience.id)}
                >
                  <Lightbulb className="h-4 w-4 mr-1" />
                  Suggestions
                </Button>
              </div>

              {showSuggestions === experience.id && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="text-sm font-medium text-blue-900 mb-2">Suggested Responsibilities</h5>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start justify-between text-sm">
                        <span className="text-blue-800 flex-1">{suggestion}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => useSuggestion(experience.id, suggestion)}
                          className="ml-2"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {experience.responsibilities.map((responsibility, respIndex) => (
                <div key={respIndex} className="flex items-start space-x-2 mb-2">
                  <span className="text-gray-400 mt-2">•</span>
                  <Textarea
                    value={responsibility}
                    onChange={(e) => updateResponsibility(experience.id, respIndex, e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={2}
                    className="flex-1"
                  />
                  {experience.responsibilities.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeResponsibility(experience.id, respIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => addResponsibility(experience.id)}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Responsibility
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {resume.workExperience.length > 0 && (
        <Button variant="outline" onClick={addExperience} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Position
        </Button>
      )}

      <div className="flex justify-end">
        <Button onClick={onNext}>
          Continue to Education
        </Button>
      </div>
    </div>
  );
}
