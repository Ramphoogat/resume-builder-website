import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Plus } from 'lucide-react';
import backend from '~backend/client';
import type { Resume } from '~backend/resume/types';

interface ProfessionalSummaryStepProps {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ProfessionalSummaryStep({ resume, updateResume, onNext }: ProfessionalSummaryStepProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: suggestionsData } = useQuery({
    queryKey: ['suggestions', 'summary'],
    queryFn: () => backend.resume.getSuggestions({ type: 'summary' }),
    enabled: showSuggestions
  });

  const suggestions = suggestionsData?.suggestions || [];

  const updateSummary = (value: string) => {
    updateResume({ professionalSummary: value });
  };

  const useSuggestion = (suggestion: string) => {
    updateSummary(suggestion);
    setShowSuggestions(false);
  };

  const characterCount = resume.professionalSummary.length;
  const maxCharacters = 500;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Summary</h3>
        <p className="text-gray-600">
          Write a compelling summary that highlights your key qualifications and career objectives.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <span className={`text-sm ${characterCount > maxCharacters ? 'text-red-500' : 'text-gray-500'}`}>
            {characterCount}/{maxCharacters}
          </span>
        </div>
        <Textarea
          id="summary"
          value={resume.professionalSummary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Results-driven professional with expertise in..."
          rows={6}
          className={characterCount > maxCharacters ? 'border-red-300' : ''}
        />
        {characterCount > maxCharacters && (
          <p className="text-sm text-red-500 mt-1">
            Summary is too long. Please keep it under {maxCharacters} characters.
          </p>
        )}
      </div>

      {/* Suggestions */}
      <div>
        <Button
          variant="outline"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="mb-4"
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          {showSuggestions ? 'Hide' : 'Show'} Suggestions
        </Button>

        {showSuggestions && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Sample Professional Summaries</h4>
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-700 mb-3">{suggestion}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => useSuggestion(suggestion)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Use This
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Writing Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Start with your years of experience and key expertise</li>
          <li>• Highlight your most relevant skills and achievements</li>
          <li>• Keep it concise - aim for 2-4 sentences</li>
          <li>• Tailor it to the specific job you're applying for</li>
        </ul>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext}>
          Continue to Experience
        </Button>
      </div>
    </div>
  );
}
