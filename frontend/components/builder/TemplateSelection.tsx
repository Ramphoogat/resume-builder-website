import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import backend from '~backend/client';
import type { Resume } from '~backend/resume/types';

interface TemplateSelectionProps {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function TemplateSelection({ resume, updateResume, onNext }: TemplateSelectionProps) {
  const { data: templatesData, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => backend.resume.listTemplates()
  });

  const templates = templatesData?.templates || [];
  const categories = ['Modern', 'Classic', 'Creative', 'ATS-Friendly'];

  const getTemplatesByCategory = (category: string) => {
    return templates.filter(template => template.category === category);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Modern': return 'bg-blue-100 text-blue-800';
      case 'Classic': return 'bg-gray-100 text-gray-800';
      case 'Creative': return 'bg-purple-100 text-purple-800';
      case 'ATS-Friendly': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const selectTemplate = (templateId: string) => {
    updateResume({ templateId });
    onNext();
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Choose Your Template</h3>
        <p className="text-gray-600">
          Select a professional template that matches your industry and style preferences.
        </p>
      </div>

      {categories.map(category => {
        const categoryTemplates = getTemplatesByCategory(category);
        if (categoryTemplates.length === 0) return null;

        return (
          <div key={category}>
            <div className="flex items-center mb-4">
              <h4 className="text-md font-medium text-gray-900 mr-3">{category}</h4>
              <Badge className={getCategoryColor(category)}>
                {categoryTemplates.length} template{categoryTemplates.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryTemplates.map(template => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    resume.templateId === template.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => selectTemplate(template.id)}
                >
                  <CardContent className="p-4">
                    {/* Template Preview */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <div className="bg-white p-3 rounded shadow-sm w-3/4 h-3/4 flex flex-col">
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="h-3 w-3 text-blue-600" />
                          <div className="flex-1">
                            <div className="h-1.5 bg-gray-300 rounded mb-1"></div>
                            <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                          </div>
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="h-1 bg-gray-200 rounded"></div>
                          <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                          <div className="h-1 bg-gray-200 rounded w-3/5"></div>
                          <div className="mt-2 space-y-0.5">
                            <div className="h-0.5 bg-gray-100 rounded"></div>
                            <div className="h-0.5 bg-gray-100 rounded w-5/6"></div>
                            <div className="h-0.5 bg-gray-100 rounded w-4/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="text-center">
                      <h5 className="font-medium text-gray-900 text-sm">{template.name}</h5>
                      {resume.templateId === template.id && (
                        <p className="text-xs text-blue-600 mt-1">Selected</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
