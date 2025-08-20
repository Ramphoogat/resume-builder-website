import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import type { Resume, PersonalInfo } from '~backend/resume/types';

interface PersonalInfoStepProps {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PersonalInfoStep({ resume, updateResume, onNext }: PersonalInfoStepProps) {
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    updateResume({
      personalInfo: {
        ...resume.personalInfo,
        [field]: value
      }
    });
  };

  const isValid = resume.personalInfo.fullName && resume.personalInfo.email && resume.personalInfo.phone;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
        <p className="text-gray-600">
          Add your contact information and professional details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={resume.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            placeholder="John Smith"
          />
        </div>

        <div>
          <Label htmlFor="professionalTitle">Professional Title *</Label>
          <Input
            id="professionalTitle"
            value={resume.personalInfo.professionalTitle}
            onChange={(e) => updatePersonalInfo('professionalTitle', e.target.value)}
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={resume.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="john.smith@email.com"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={resume.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="linkedIn">LinkedIn Profile</Label>
          <Input
            id="linkedIn"
            value={resume.personalInfo.linkedIn || ''}
            onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
            placeholder="linkedin.com/in/johnsmith"
          />
        </div>

        <div>
          <Label htmlFor="portfolio">Portfolio/Website</Label>
          <Input
            id="portfolio"
            value={resume.personalInfo.portfolio || ''}
            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
            placeholder="johnsmith.dev"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={resume.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div>
        <Label>Professional Headshot (Optional)</Label>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <Button variant="outline" size="sm">
                Upload a photo
              </Button>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
          </div>
        </div>
      </div>

      {!isValid && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Please fill in all required fields (marked with *) to continue.
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!isValid}>
          Continue to Summary
        </Button>
      </div>
    </div>
  );
}
