import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { GripVertical } from 'lucide-react';
import type { Resume, Customization } from '~backend/resume/types';

interface CustomizationStepProps {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CustomizationStep({ resume, updateResume, onNext }: CustomizationStepProps) {
  const updateCustomization = (field: keyof Customization, value: any) => {
    updateResume({
      customization: {
        ...resume.customization,
        [field]: value
      }
    });
  };

  const fonts = [
    { name: 'Inter', label: 'Inter (Modern)' },
    { name: 'Arial', label: 'Arial (Classic)' },
    { name: 'Calibri', label: 'Calibri (Professional)' },
    { name: 'Times New Roman', label: 'Times New Roman (Traditional)' }
  ];

  const colorSchemes = [
    { name: 'blue', label: 'Professional Blue', color: 'bg-blue-600' },
    { name: 'gray', label: 'Classic Gray', color: 'bg-gray-600' },
    { name: 'green', label: 'Fresh Green', color: 'bg-green-600' },
    { name: 'purple', label: 'Creative Purple', color: 'bg-purple-600' },
    { name: 'red', label: 'Bold Red', color: 'bg-red-600' },
    { name: 'teal', label: 'Modern Teal', color: 'bg-teal-600' }
  ];

  const sections = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'summary', label: 'Professional Summary' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'additional', label: 'Additional Sections' }
  ];

  const reorderSection = (fromIndex: number, toIndex: number) => {
    const newOrder = [...resume.customization.sectionOrder];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);
    updateCustomization('sectionOrder', newOrder);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Customization & Formatting</h3>
        <p className="text-gray-600">
          Customize the appearance and layout of your resume to match your style.
        </p>
      </div>

      {/* Font Selection */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Font Selection</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fonts.map((font) => (
              <div
                key={font.name}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  resume.customization.font === font.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateCustomization('font', font.name)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900" style={{ fontFamily: font.name }}>
                      {font.label}
                    </h5>
                    <p className="text-sm text-gray-600" style={{ fontFamily: font.name }}>
                      Sample text in {font.name}
                    </p>
                  </div>
                  {resume.customization.font === font.name && (
                    <Badge variant="default">Selected</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Color Scheme</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorSchemes.map((scheme) => (
              <div
                key={scheme.name}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  resume.customization.colorScheme === scheme.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateCustomization('colorScheme', scheme.name)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full ${scheme.color}`}></div>
                  <div>
                    <h5 className="font-medium text-gray-900">{scheme.label}</h5>
                    {resume.customization.colorScheme === scheme.name && (
                      <Badge variant="default" className="mt-1">Selected</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Layout Options */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Layout</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                resume.customization.layout === 'single-column'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => updateCustomization('layout', 'single-column')}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">Single Column</h5>
                {resume.customization.layout === 'single-column' && (
                  <Badge variant="default">Selected</Badge>
                )}
              </div>
              <div className="bg-white border rounded p-2">
                <div className="space-y-1">
                  <div className="h-2 bg-gray-300 rounded"></div>
                  <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Traditional layout, ATS-friendly</p>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                resume.customization.layout === 'two-column'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => updateCustomization('layout', 'two-column')}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">Two Column</h5>
                {resume.customization.layout === 'two-column' && (
                  <Badge variant="default">Selected</Badge>
                )}
              </div>
              <div className="bg-white border rounded p-2">
                <div className="grid grid-cols-3 gap-1">
                  <div className="col-span-2 space-y-1">
                    <div className="h-2 bg-gray-300 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-gray-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Modern layout, space-efficient</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Order */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Section Order</h4>
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop to reorder sections in your resume.
          </p>
          <div className="space-y-2">
            {resume.customization.sectionOrder.map((sectionId, index) => {
              const section = sections.find(s => s.id === sectionId);
              if (!section) return null;

              return (
                <div
                  key={sectionId}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white"
                >
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  <span className="flex-1 font-medium text-gray-900">{section.label}</span>
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Spacing */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Spacing</h4>
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Section Spacing: {resume.customization.spacing}
            </Label>
            <div className="mt-2">
              <Slider
                value={[resume.customization.spacing]}
                onValueChange={(value) => updateCustomization('spacing', value[0])}
                max={3}
                min={0.5}
                step={0.5}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Compact</span>
              <span>Normal</span>
              <span>Spacious</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext}>
          Continue to Review
        </Button>
      </div>
    </div>
  );
}
