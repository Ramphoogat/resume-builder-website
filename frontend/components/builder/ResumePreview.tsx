import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import type { Resume } from '~backend/resume/types';

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getColorClass = (colorScheme: string) => {
    switch (colorScheme) {
      case 'blue': return 'text-blue-600 border-blue-600';
      case 'green': return 'text-green-600 border-green-600';
      case 'purple': return 'text-purple-600 border-purple-600';
      case 'red': return 'text-red-600 border-red-600';
      case 'teal': return 'text-teal-600 border-teal-600';
      default: return 'text-gray-600 border-gray-600';
    }
  };

  const colorClass = getColorClass(resume.customization.colorScheme);
  const fontFamily = resume.customization.font;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8" style={{ fontFamily }}>
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className={`text-2xl font-bold ${colorClass} mb-2`}>
            {resume.personalInfo.fullName || 'Your Name'}
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            {resume.personalInfo.professionalTitle || 'Professional Title'}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {resume.personalInfo.email && (
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>{resume.personalInfo.email}</span>
              </div>
            )}
            {resume.personalInfo.phone && (
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>{resume.personalInfo.phone}</span>
              </div>
            )}
            {resume.personalInfo.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{resume.personalInfo.location}</span>
              </div>
            )}
            {resume.personalInfo.linkedIn && (
              <div className="flex items-center space-x-1">
                <Linkedin className="h-4 w-4" />
                <span>{resume.personalInfo.linkedIn}</span>
              </div>
            )}
            {resume.personalInfo.portfolio && (
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>{resume.personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resume.professionalSummary && (
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${colorClass} mb-2 border-b border-current pb-1`}>
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {resume.professionalSummary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {resume.workExperience.length > 0 && (
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${colorClass} mb-3 border-b border-current pb-1`}>
              Work Experience
            </h3>
            <div className="space-y-4">
              {resume.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-semibold text-gray-900">{exp.jobTitle}</h4>
                      <p className={`font-medium ${colorClass}`}>{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate || '')}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  {exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                      {exp.responsibilities.filter(resp => resp.trim()).map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${colorClass} mb-3 border-b border-current pb-1`}>
              Education
            </h3>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                      </h4>
                      <p className={`font-medium ${colorClass}`}>{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{formatDate(edu.graduationDate)}</p>
                  </div>
                  {edu.honors && edu.honors.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      Honors: {edu.honors.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0 || resume.skills.languages.length > 0) && (
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${colorClass} mb-3 border-b border-current pb-1`}>
              Skills
            </h3>
            
            {resume.skills.technical.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.technical.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {resume.skills.soft.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.soft.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {resume.skills.languages.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang.language} ({lang.proficiency})
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Additional Sections */}
        {resume.additionalSections.certifications && resume.additionalSections.certifications.length > 0 && (
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${colorClass} mb-3 border-b border-current pb-1`}>
              Certifications
            </h3>
            <div className="space-y-2">
              {resume.additionalSections.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                  </div>
                  <p className="text-sm text-gray-600">{formatDate(cert.date)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.additionalSections.projects && resume.additionalSections.projects.length > 0 && (
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${colorClass} mb-3 border-b border-current pb-1`}>
              Projects
            </h3>
            <div className="space-y-3">
              {resume.additionalSections.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-600">
                      {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                    </p>
                  </div>
                  {project.description && (
                    <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
