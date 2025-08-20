import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import backend from '~backend/client';
import type { Template } from '~backend/resume/types';

export default function TemplatesPage() {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading templates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of expertly designed templates. 
            All templates are ATS-friendly and optimized for modern hiring practices.
          </p>
        </div>

        {/* Templates by Category */}
        {categories.map(category => {
          const categoryTemplates = getTemplatesByCategory(category);
          if (categoryTemplates.length === 0) return null;

          return (
            <div key={category} className="mb-16">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mr-4">{category}</h2>
                <Badge className={getCategoryColor(category)}>
                  {categoryTemplates.length} template{categoryTemplates.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTemplates.map(template => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Create Your Resume?
          </h3>
          <p className="text-gray-600 mb-6">
            Start with any template and customize it to match your style and industry.
          </p>
          <Link to="/builder">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
}

function TemplateCard({ template }: TemplateCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Modern': return 'bg-blue-100 text-blue-800';
      case 'Classic': return 'bg-gray-100 text-gray-800';
      case 'Creative': return 'bg-purple-100 text-purple-800';
      case 'ATS-Friendly': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardContent className="p-0">
        {/* Template Preview */}
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg flex items-center justify-center border-b">
          <div className="bg-white p-4 rounded-lg shadow-sm w-3/4 h-3/4 flex flex-col">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <div className="h-2 bg-gray-300 rounded mb-1"></div>
                <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <div className="h-1.5 bg-gray-200 rounded"></div>
              <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
              <div className="h-1.5 bg-gray-200 rounded w-3/5"></div>
              <div className="mt-3 space-y-1">
                <div className="h-1 bg-gray-100 rounded"></div>
                <div className="h-1 bg-gray-100 rounded w-5/6"></div>
                <div className="h-1 bg-gray-100 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Template Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {template.name}
            </h3>
            <Badge className={getCategoryColor(template.category)}>
              {template.category}
            </Badge>
          </div>
          
          <Link to={`/builder?template=${template.id}`}>
            <Button className="w-full mt-3" variant="outline">
              Use This Template
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
