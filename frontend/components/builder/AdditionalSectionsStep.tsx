import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';
import type { Resume, AdditionalSections, Certification, Project, VolunteerExperience, Award, Publication } from '~backend/resume/types';

interface AdditionalSectionsStepProps {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function AdditionalSectionsStep({ resume, updateResume, onNext }: AdditionalSectionsStepProps) {
  const updateAdditionalSections = (sections: AdditionalSections) => {
    updateResume({ additionalSections: sections });
  };

  // Certifications
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expirationDate: ''
    };

    updateAdditionalSections({
      ...resume.additionalSections,
      certifications: [...(resume.additionalSections.certifications || []), newCert]
    });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    const updated = (resume.additionalSections.certifications || []).map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    updateAdditionalSections({
      ...resume.additionalSections,
      certifications: updated
    });
  };

  const removeCertification = (id: string) => {
    const updated = (resume.additionalSections.certifications || []).filter(cert => cert.id !== id);
    updateAdditionalSections({
      ...resume.additionalSections,
      certifications: updated
    });
  };

  // Projects
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      startDate: '',
      endDate: ''
    };

    updateAdditionalSections({
      ...resume.additionalSections,
      projects: [...(resume.additionalSections.projects || []), newProject]
    });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updated = (resume.additionalSections.projects || []).map(project =>
      project.id === id ? { ...project, [field]: value } : project
    );
    updateAdditionalSections({
      ...resume.additionalSections,
      projects: updated
    });
  };

  const removeProject = (id: string) => {
    const updated = (resume.additionalSections.projects || []).filter(project => project.id !== id);
    updateAdditionalSections({
      ...resume.additionalSections,
      projects: updated
    });
  };

  const updateProjectTechnologies = (id: string, technologies: string) => {
    const techArray = technologies.split(',').map(tech => tech.trim()).filter(Boolean);
    updateProject(id, 'technologies', techArray);
  };

  // Volunteer Experience
  const addVolunteer = () => {
    const newVolunteer: VolunteerExperience = {
      id: Date.now().toString(),
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };

    updateAdditionalSections({
      ...resume.additionalSections,
      volunteer: [...(resume.additionalSections.volunteer || []), newVolunteer]
    });
  };

  const updateVolunteer = (id: string, field: keyof VolunteerExperience, value: string) => {
    const updated = (resume.additionalSections.volunteer || []).map(vol =>
      vol.id === id ? { ...vol, [field]: value } : vol
    );
    updateAdditionalSections({
      ...resume.additionalSections,
      volunteer: updated
    });
  };

  const removeVolunteer = (id: string) => {
    const updated = (resume.additionalSections.volunteer || []).filter(vol => vol.id !== id);
    updateAdditionalSections({
      ...resume.additionalSections,
      volunteer: updated
    });
  };

  // Awards
  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      description: ''
    };

    updateAdditionalSections({
      ...resume.additionalSections,
      awards: [...(resume.additionalSections.awards || []), newAward]
    });
  };

  const updateAward = (id: string, field: keyof Award, value: string) => {
    const updated = (resume.additionalSections.awards || []).map(award =>
      award.id === id ? { ...award, [field]: value } : award
    );
    updateAdditionalSections({
      ...resume.additionalSections,
      awards: updated
    });
  };

  const removeAward = (id: string) => {
    const updated = (resume.additionalSections.awards || []).filter(award => award.id !== id);
    updateAdditionalSections({
      ...resume.additionalSections,
      awards: updated
    });
  };

  // Publications
  const addPublication = () => {
    const newPublication: Publication = {
      id: Date.now().toString(),
      title: '',
      publisher: '',
      date: '',
      url: ''
    };

    updateAdditionalSections({
      ...resume.additionalSections,
      publications: [...(resume.additionalSections.publications || []), newPublication]
    });
  };

  const updatePublication = (id: string, field: keyof Publication, value: string) => {
    const updated = (resume.additionalSections.publications || []).map(pub =>
      pub.id === id ? { ...pub, [field]: value } : pub
    );
    updateAdditionalSections({
      ...resume.additionalSections,
      publications: updated
    });
  };

  const removePublication = (id: string) => {
    const updated = (resume.additionalSections.publications || []).filter(pub => pub.id !== id);
    updateAdditionalSections({
      ...resume.additionalSections,
      publications: updated
    });
  };

  // Professional Associations
  const updateAssociations = (associations: string) => {
    const assocArray = associations.split(',').map(assoc => assoc.trim()).filter(Boolean);
    updateAdditionalSections({
      ...resume.additionalSections,
      associations: assocArray
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Sections</h3>
        <p className="text-gray-600">
          Add optional sections to showcase your certifications, projects, and other achievements.
        </p>
      </div>

      <Tabs defaultValue="certifications" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="associations">Associations</TabsTrigger>
        </TabsList>

        <TabsContent value="certifications" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-900">Certifications & Licenses</h4>
            <Button onClick={addCertification} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Certification
            </Button>
          </div>

          {(resume.additionalSections.certifications || []).map((cert) => (
            <Card key={cert.id}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Certification Name</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div>
                    <Label>Issuing Organization</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div>
                    <Label>Issue Date</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Expiration Date (Optional)</Label>
                    <Input
                      type="month"
                      value={cert.expirationDate || ''}
                      onChange={(e) => updateCertification(cert.id, 'expirationDate', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCertification(cert.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-900">Projects</h4>
            <Button onClick={addProject} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Project
            </Button>
          </div>

          {(resume.additionalSections.projects || []).map((project) => (
            <Card key={project.id}>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Project Name</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      placeholder="E-commerce Platform"
                    />
                  </div>
                  <div>
                    <Label>Project URL (Optional)</Label>
                    <Input
                      value={project.url || ''}
                      onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date (Optional)</Label>
                    <Input
                      type="month"
                      value={project.endDate || ''}
                      onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="Describe the project and your role..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Technologies Used</Label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateProjectTechnologies(project.id, e.target.value)}
                    placeholder="React, Node.js, MongoDB (separate with commas)"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="volunteer" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-900">Volunteer Experience</h4>
            <Button onClick={addVolunteer} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Volunteer Experience
            </Button>
          </div>

          {(resume.additionalSections.volunteer || []).map((volunteer) => (
            <Card key={volunteer.id}>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Organization</Label>
                    <Input
                      value={volunteer.organization}
                      onChange={(e) => updateVolunteer(volunteer.id, 'organization', e.target.value)}
                      placeholder="Red Cross"
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Input
                      value={volunteer.role}
                      onChange={(e) => updateVolunteer(volunteer.id, 'role', e.target.value)}
                      placeholder="Volunteer Coordinator"
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={volunteer.startDate}
                      onChange={(e) => updateVolunteer(volunteer.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date (Optional)</Label>
                    <Input
                      type="month"
                      value={volunteer.endDate || ''}
                      onChange={(e) => updateVolunteer(volunteer.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={volunteer.description}
                    onChange={(e) => updateVolunteer(volunteer.id, 'description', e.target.value)}
                    placeholder="Describe your volunteer work and impact..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeVolunteer(volunteer.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="awards" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-900">Awards & Achievements</h4>
            <Button onClick={addAward} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Award
            </Button>
          </div>

          {(resume.additionalSections.awards || []).map((award) => (
            <Card key={award.id}>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Award Name</Label>
                    <Input
                      value={award.name}
                      onChange={(e) => updateAward(award.id, 'name', e.target.value)}
                      placeholder="Employee of the Year"
                    />
                  </div>
                  <div>
                    <Label>Issuing Organization</Label>
                    <Input
                      value={award.issuer}
                      onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                      placeholder="Tech Company Inc."
                    />
                  </div>
                  <div>
                    <Label>Date Received</Label>
                    <Input
                      type="month"
                      value={award.date}
                      onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description (Optional)</Label>
                  <Textarea
                    value={award.description || ''}
                    onChange={(e) => updateAward(award.id, 'description', e.target.value)}
                    placeholder="Describe the award and why you received it..."
                    rows={2}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAward(award.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="publications" className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-900">Publications</h4>
            <Button onClick={addPublication} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Publication
            </Button>
          </div>

          {(resume.additionalSections.publications || []).map((publication) => (
            <Card key={publication.id}>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={publication.title}
                      onChange={(e) => updatePublication(publication.id, 'title', e.target.value)}
                      placeholder="Research Paper Title"
                    />
                  </div>
                  <div>
                    <Label>Publisher</Label>
                    <Input
                      value={publication.publisher}
                      onChange={(e) => updatePublication(publication.id, 'publisher', e.target.value)}
                      placeholder="Journal Name"
                    />
                  </div>
                  <div>
                    <Label>Publication Date</Label>
                    <Input
                      type="month"
                      value={publication.date}
                      onChange={(e) => updatePublication(publication.id, 'date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>URL (Optional)</Label>
                    <Input
                      value={publication.url || ''}
                      onChange={(e) => updatePublication(publication.id, 'url', e.target.value)}
                      placeholder="https://doi.org/..."
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removePublication(publication.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="associations" className="space-y-4">
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Professional Associations</h4>
            <div>
              <Label>Professional Associations</Label>
              <Textarea
                value={(resume.additionalSections.associations || []).join(', ')}
                onChange={(e) => updateAssociations(e.target.value)}
                placeholder="IEEE, ACM, Project Management Institute (separate with commas)"
                rows={3}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={onNext}>
          Continue to Customization
        </Button>
      </div>
    </div>
  );
}
