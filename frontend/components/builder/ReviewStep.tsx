import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Download, FileText, Share } from 'lucide-react';
import type { Resume } from '~backend/resume/types';

interface ReviewStepProps {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ReviewStep({ resume }: ReviewStepProps) {
  const calculateCompleteness = () => {
    let score = 0;
    let maxScore = 0;

    // Personal Info (required)
    maxScore += 20;
    if (resume.personalInfo.fullName && resume.personalInfo.email && resume.personalInfo.phone) {
      score += 20;
    }

    // Professional Summary
    maxScore += 15;
    if (resume.professionalSummary && resume.professionalSummary.length > 50) {
      score += 15;
    }

    // Work Experience
    maxScore += 25;
    if (resume.workExperience.length > 0) {
      score += 25;
    }

    // Education
    maxScore += 15;
    if (resume.education.length > 0) {
      score += 15;
    }

    // Skills
    maxScore += 15;
    if (resume.skills.technical.length > 0 || resume.skills.soft.length > 0) {
      score += 15;
    }

    // Additional sections (bonus)
    maxScore += 10;
    const additionalCount = Object.values(resume.additionalSections).filter(section => 
      Array.isArray(section) ? section.length > 0 : section
    ).length;
    if (additionalCount > 0) {
      score += Math.min(10, additionalCount * 2);
    }

    return Math.round((score / maxScore) * 100);
  };

  const getATSScore = () => {
    let score = 100;
    const issues = [];

    // Check for ATS-friendly formatting
    if (resume.customization.layout === 'two-column') {
      score -= 10;
      issues.push('Two-column layout may not be ATS-friendly');
    }

    // Check for contact information
    if (!resume.personalInfo.email || !resume.personalInfo.phone) {
      score -= 15;
      issues.push('Missing essential contact information');
    }

    // Check for work experience
    if (resume.workExperience.length === 0) {
      score -= 20;
      issues.push('No work experience added');
    }

    // Check for skills
    if (resume.skills.technical.length === 0) {
      score -= 10;
      issues.push('No technical skills listed');
    }

    return { score: Math.max(0, score), issues };
  };

  const completeness = calculateCompleteness();
  const atsResult = getATSScore();

  const exportFormats = [
    { name: 'PDF', description: 'Best for applications', icon: FileText },
    { name: 'Word', description: 'Editable format', icon: FileText },
    { name: 'Plain Text', description: 'ATS-optimized', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Review & Export</h3>
        <p className="text-gray-600">
          Review your resume, check the ATS compatibility, and export in your preferred format.
        </p>
      </div>

      {/* Resume Completeness */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">Resume Completeness</h4>
            <Badge variant={completeness >= 80 ? 'default' : completeness >= 60 ? 'secondary' : 'destructive'}>
              {completeness}%
            </Badge>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                completeness >= 80 ? 'bg-green-500' : completeness >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${completeness}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className={`h-4 w-4 ${resume.personalInfo.fullName ? 'text-green-500' : 'text-gray-300'}`} />
              <span>Personal Information</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className={`h-4 w-4 ${resume.professionalSummary ? 'text-green-500' : 'text-gray-300'}`} />
              <span>Professional Summary</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className={`h-4 w-4 ${resume.workExperience.length > 0 ? 'text-green-500' : 'text-gray-300'}`} />
              <span>Work Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className={`h-4 w-4 ${resume.education.length > 0 ? 'text-green-500' : 'text-gray-300'}`} />
              <span>Education</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className={`h-4 w-4 ${resume.skills.technical.length > 0 || resume.skills.soft.length > 0 ? 'text-green-500' : 'text-gray-300'}`} />
              <span>Skills</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className={`h-4 w-4 ${Object.values(resume.additionalSections).some(section => Array.isArray(section) ? section.length > 0 : section) ? 'text-green-500' : 'text-gray-300'}`} />
              <span>Additional Sections</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ATS Compatibility */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">ATS Compatibility Score</h4>
            <Badge variant={atsResult.score >= 80 ? 'default' : atsResult.score >= 60 ? 'secondary' : 'destructive'}>
              {atsResult.score}/100
            </Badge>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                atsResult.score >= 80 ? 'bg-green-500' : atsResult.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${atsResult.score}%` }}
            ></div>
          </div>

          {atsResult.issues.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-gray-900">Recommendations:</h5>
              {atsResult.issues.map((issue, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span className="text-gray-600">{issue}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Export Your Resume</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {exportFormats.map((format) => (
              <div
                key={format.name}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <format.icon className="h-5 w-5 text-blue-600" />
                  <h5 className="font-medium text-gray-900">{format.name}</h5>
                </div>
                <p className="text-sm text-gray-600 mb-3">{format.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-1" />
                  Download {format.name}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" className="flex-1">
              <Share className="h-4 w-4 mr-2" />
              Share Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Final Tips</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Proofread your resume carefully for spelling and grammar errors</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Tailor your resume for each job application</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Use the PDF format for most applications to preserve formatting</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Keep your resume updated with new experiences and skills</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
