import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Save, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import backend from '~backend/client';
import type { Resume } from '~backend/resume/types';

import TemplateSelection from '../components/builder/TemplateSelection';
import PersonalInfoStep from '../components/builder/PersonalInfoStep';
import ProfessionalSummaryStep from '../components/builder/ProfessionalSummaryStep';
import WorkExperienceStep from '../components/builder/WorkExperienceStep';
import EducationStep from '../components/builder/EducationStep';
import SkillsStep from '../components/builder/SkillsStep';
import AdditionalSectionsStep from '../components/builder/AdditionalSectionsStep';
import CustomizationStep from '../components/builder/CustomizationStep';
import ReviewStep from '../components/builder/ReviewStep';
import ResumePreview from '../components/builder/ResumePreview';

const steps = [
  { id: 'template', title: 'Template', component: TemplateSelection },
  { id: 'personal', title: 'Personal Info', component: PersonalInfoStep },
  { id: 'summary', title: 'Summary', component: ProfessionalSummaryStep },
  { id: 'experience', title: 'Experience', component: WorkExperienceStep },
  { id: 'education', title: 'Education', component: EducationStep },
  { id: 'skills', title: 'Skills', component: SkillsStep },
  { id: 'additional', title: 'Additional', component: AdditionalSectionsStep },
  { id: 'customize', title: 'Customize', component: CustomizationStep },
  { id: 'review', title: 'Review', component: ReviewStep }
];

export default function ResumeBuilder() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useState(0);
  const [resume, setResume] = useState<Resume | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Load existing resume or create new one
  const { data: existingResume, isLoading } = useQuery({
    queryKey: ['resume', id],
    queryFn: () => backend.resume.get({ id: parseInt(id!) }),
    enabled: !!id
  });

  const createResumeMutation = useMutation({
    mutationFn: backend.resume.create,
    onSuccess: (data) => {
      setResume(data.resume);
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
    onError: (error) => {
      console.error('Failed to create resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to create resume. Please try again.',
        variant: 'destructive'
      });
    }
  });

  const updateResumeMutation = useMutation({
    mutationFn: backend.resume.update,
    onSuccess: (data) => {
      setResume(data.resume);
      queryClient.invalidateQueries({ queryKey: ['resume', data.resume.id] });
      toast({
        title: 'Saved',
        description: 'Your resume has been saved successfully.',
      });
    },
    onError: (error) => {
      console.error('Failed to update resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to save resume. Please try again.',
        variant: 'destructive'
      });
    }
  });

  // Initialize resume
  useEffect(() => {
    if (id && existingResume) {
      setResume(existingResume);
    } else if (!id && templateId && !resume) {
      // Create new resume with selected template
      createResumeMutation.mutate({
        userId: 'user-1', // TODO: Replace with actual user ID when auth is implemented
        templateId: templateId
      });
    }
  }, [id, existingResume, templateId, resume]);

  const updateResume = (updates: Partial<Resume>) => {
    if (!resume) return;

    const updatedResume = { ...resume, ...updates };
    setResume(updatedResume);

    // Auto-save after a delay
    setTimeout(() => {
      updateResumeMutation.mutate({
        id: updatedResume.id,
        ...updates
      });
    }, 1000);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (!resume && !templateId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please select a template to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">
                {resume?.title || 'New Resume'}
              </h1>
              <div className="hidden sm:block">
                <Progress value={progress} className="w-32" />
              </div>
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewOpen(true)}
                className="hidden md:flex"
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateResumeMutation.mutate({ id: resume!.id })}
                disabled={updateResumeMutation.isPending}
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {resume && (
              <CurrentStepComponent
                resume={resume}
                updateResume={updateResume}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
              {resume && <ResumePreview resume={resume} />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="bg-white h-full overflow-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="p-4">
              {resume && <ResumePreview resume={resume} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
