import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const examples = [
  {
    id: 1,
    title: 'Software Engineer Resume',
    industry: 'Technology',
    experience: 'Mid-Level',
    description: 'Full-stack developer with 5 years of experience in React, Node.js, and cloud technologies.',
    skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Python'],
    template: 'Modern Professional'
  },
  {
    id: 2,
    title: 'Marketing Manager Resume',
    industry: 'Marketing',
    experience: 'Senior',
    description: 'Digital marketing professional with expertise in campaign management and analytics.',
    skills: ['Digital Marketing', 'SEO', 'Google Analytics', 'Campaign Management'],
    template: 'Clean Minimal'
  },
  {
    id: 3,
    title: 'Data Scientist Resume',
    industry: 'Technology',
    experience: 'Senior',
    description: 'Data scientist with machine learning expertise and statistical analysis background.',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics'],
    template: 'ATS Optimized'
  },
  {
    id: 4,
    title: 'UX Designer Resume',
    industry: 'Design',
    experience: 'Mid-Level',
    description: 'User experience designer focused on creating intuitive and accessible digital products.',
    skills: ['Figma', 'User Research', 'Prototyping', 'Usability Testing'],
    template: 'Designer'
  },
  {
    id: 5,
    title: 'Project Manager Resume',
    industry: 'Management',
    experience: 'Senior',
    description: 'Agile project manager with PMP certification and cross-functional team leadership experience.',
    skills: ['Project Management', 'Agile', 'Scrum', 'Leadership', 'Risk Management'],
    template: 'Executive'
  },
  {
    id: 6,
    title: 'Recent Graduate Resume',
    industry: 'Entry-Level',
    experience: 'Entry-Level',
    description: 'Computer science graduate with internship experience and strong academic background.',
    skills: ['Java', 'Python', 'Git', 'Problem Solving', 'Team Collaboration'],
    template: 'Simple ATS'
  }
];

export default function ExamplesPage() {
  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Entry-Level': return 'bg-green-100 text-green-800';
      case 'Mid-Level': return 'bg-blue-100 text-blue-800';
      case 'Senior': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case 'Technology': return 'bg-blue-100 text-blue-800';
      case 'Marketing': return 'bg-orange-100 text-orange-800';
      case 'Design': return 'bg-pink-100 text-pink-800';
      case 'Management': return 'bg-indigo-100 text-indigo-800';
      case 'Entry-Level': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Examples & Inspiration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse real resume examples from various industries and experience levels. 
            Get inspired and see what makes a great resume in your field.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {examples.map(example => (
            <Card key={example.id} className="group hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {example.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getIndustryColor(example.industry)}>
                        {example.industry}
                      </Badge>
                      <Badge className={getExperienceColor(example.experience)}>
                        {example.experience}
                      </Badge>
                    </div>
                  </div>
                  <FileText className="h-8 w-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {example.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {example.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {example.skills.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{example.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Template */}
                <p className="text-xs text-gray-500 mb-4">
                  Template: {example.template}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Writing Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Use action verbs to start bullet points
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Quantify achievements with numbers and percentages
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Tailor your resume to each job application
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Keep it concise - aim for 1-2 pages maximum
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Formatting Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Use consistent formatting throughout
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Choose professional fonts like Arial or Calibri
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Ensure adequate white space for readability
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Save and send as PDF to preserve formatting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
