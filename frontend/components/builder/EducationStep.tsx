import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import type { Resume, Education } from '~backend/resume/types';

interface EducationStepProps {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function EducationStep({ resume, updateResume, onNext }: EducationStepProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      fieldOfStudy: '',
      institution: '',
      graduationDate: '',
      gpa: '',
      coursework: [],
      honors: []
    };

    updateResume({
      education: [...resume.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updatedEducation = resume.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateResume({ education: updatedEducation });
  };

  const removeEducation = (id: string) => {
    const updatedEducation = resume.education.filter(edu => edu.id !== id);
    updateResume({ education: updatedEducation });
  };

  const updateCoursework = (id: string, coursework: string) => {
    const courseworkArray = coursework.split(',').map(course => course.trim()).filter(Boolean);
    updateEducation(id, 'coursework', courseworkArray);
  };

  const updateHonors = (id: string, honors: string) => {
    const honorsArray = honors.split(',').map(honor => honor.trim()).filter(Boolean);
    updateEducation(id, 'honors', honorsArray);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Education</h3>
        <p className="text-gray-600">
          Add your educational background, starting with your highest degree.
        </p>
      </div>

      {resume.education.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No education added yet</p>
          <Button onClick={addEducation}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      )}

      {resume.education.map((education, index) => (
        <Card key={education.id}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-5 w-5 text-gray-400" />
                <h4 className="font-medium text-gray-900">
                  {education.degree || `Education ${index + 1}`}
                </h4>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeEducation(education.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div>
                <Label htmlFor={`fieldOfStudy-${education.id}`}>Field of Study</Label>
                <Input
                  id={`fieldOfStudy-${education.id}`}
                  value={education.fieldOfStudy}
                  onChange={(e) => updateEducation(education.id, 'fieldOfStudy', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  placeholder="University of California"
                />
              </div>
              <div>
                <Label htmlFor={`graduationDate-${education.id}`}>Graduation Date</Label>
                <Input
                  id={`graduationDate-${education.id}`}
                  type="month"
                  value={education.graduationDate}
                  onChange={(e) => updateEducation(education.id, 'graduationDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                <Input
                  id={`gpa-${education.id}`}
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  placeholder="3.8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`coursework-${education.id}`}>Relevant Coursework (Optional)</Label>
              <Textarea
                id={`coursework-${education.id}`}
                value={education.coursework?.join(', ') || ''}
                onChange={(e) => updateCoursework(education.id, e.target.value)}
                placeholder="Data Structures, Algorithms, Software Engineering (separate with commas)"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor={`honors-${education.id}`}>Academic Honors (Optional)</Label>
              <Textarea
                id={`honors-${education.id}`}
                value={education.honors?.join(', ') || ''}
                onChange={(e) => updateHonors(education.id, e.target.value)}
                placeholder="Dean's List, Magna Cum Laude, Phi Beta Kappa (separate with commas)"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {resume.education.length > 0 && (
        <Button variant="outline" onClick={addEducation} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Education
        </Button>
      )}

      <div className="flex justify-end">
        <Button onClick={onNext}>
          Continue to Skills
        </Button>
      </div>
    </div>
  );
}
