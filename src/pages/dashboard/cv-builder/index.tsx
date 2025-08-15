import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import {
  Search,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Users,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { useGetCompleteCVQuery } from "@/hooks/cv-builder";
import type { CompleteCV } from "@/types/cv-builder";
import { cardVariants, staggerContainer } from "@/constants/motion";
import { Switch } from "@/components/ui/switch";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function CVBuilderPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { data: completeCV, isLoading: isLoadingCV } = useGetCompleteCVQuery();

  const isLoading = isLoadingCV;

  // Calculate completion percentage for each section
  const calculateCompletion = (section: keyof CompleteCV): number => {
    if (!completeCV) return 0;

    const sectionData = completeCV[section];
    if (!sectionData) return 0;

    if (Array.isArray(sectionData)) {
      return sectionData.length > 0 ? 100 : 0;
    }

    return sectionData ? 100 : 0;
  };

  const overallCompletion = completeCV
    ? Math.round(
        Object.keys(completeCV)
          .filter((key) => key !== "sections")
          .reduce((acc, key) => {
            return acc + calculateCompletion(key as keyof CompleteCV);
          }, 0) / 8 // 8 main sections
      )
    : 0;

  const sections = [
    {
      key: "personal_info",
      title: "Personal Information",
      description: "Basic personal and contact information",
      icon: User,
      completion: calculateCompletion("personal_info"),
      href: "/dashboard/cv-builder/personal-info",
      color: "bg-blue-500",
      isActive: false,
    },
    {
      key: "skills",
      title: "Skills & Expertise",
      description: "Technical and soft skills with proficiency levels",
      icon: Star,
      completion: calculateCompletion("skills"),
      href: "/dashboard/cv-builder/skills",
      color: "bg-green-500",
      isActive: false,
    },
    {
      key: "experience",
      title: "Work Experience",
      description: "Professional experience and achievements",
      icon: Briefcase,
      completion: calculateCompletion("experience"),
      href: "/dashboard/cv-builder/experience",
      color: "bg-purple-500",
      isActive: false,
    },
    {
      key: "education",
      title: "Education",
      description: "Academic background and qualifications",
      icon: GraduationCap,
      completion: calculateCompletion("education"),
      href: "/dashboard/cv-builder/education",
      color: "bg-orange-500",
      isActive: false,
    },
    {
      key: "certifications",
      title: "Certifications",
      description: "Professional certifications and credentials",
      icon: BookOpen,
      completion: calculateCompletion("certifications"),
      href: "/dashboard/cv-builder/certifications",
      color: "bg-red-500",
      isActive: false,
    },
    {
      key: "awards",
      title: "Awards & Recognition",
      description: "Achievements and professional recognition",
      icon: Award,
      completion: calculateCompletion("awards"),
      href: "/dashboard/cv-builder/awards",
      color: "bg-yellow-500",
      isActive: false,
    },
    {
      key: "interests",
      title: "Interests",
      description: "Personal and professional interests",
      icon: Star,
      completion: calculateCompletion("interests"),
      href: "/dashboard/cv-builder/interests",
      color: "bg-pink-500",
      isActive: false,
    },
    {
      key: "references",
      title: "References",
      description: "Professional references and contacts",
      icon: Users,
      completion: calculateCompletion("references"),
      href: "/dashboard/cv-builder/references",
      color: "bg-indigo-500",
      isActive: false,
    },
  ];

  const filteredSections = sections.filter(
    (section) =>
      section.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) ||
      section.description
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <Heading
        title="CV Builder"
        description="Build and manage your professional CV with our comprehensive builder. Track your progress and ensure all sections are complete."
      >
        <Button onClick={() => navigate("/dashboard/cv-builder/preview")}>
          <FileText className="h-4 w-4 mr-2" />
          Preview CV
        </Button>
      </Heading>

      <Separator />

      {/* Overall Progress */}
      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Overall CV Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {overallCompletion}% Complete
                </span>
              </div>
              <Progress value={overallCompletion} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {overallCompletion === 100
                  ? "🎉 Your CV is complete! You can now preview and download it."
                  : `Complete the remaining sections to finish your CV. You're ${100 - overallCompletion}% away from completion.`}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search CV sections..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search CV sections"
        />
      </div>

      {/* CV Sections Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <Skeleton className="h-48 w-full rounded-lg" />
            </motion.div>
          ))
        ) : filteredSections.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <FileText
              className="mx-auto mb-4 h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium">No CV sections found</span>
            <span className="text-sm mt-1">
              Try adjusting your search query.
            </span>
          </div>
        ) : (
          filteredSections.map((section) => (
            <motion.div key={section.key} variants={cardVariants}>
              <Card
                className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => navigate(section.href)}
              >
                <CardHeader className="pb-3">
                  <Switch
                    checked={section.completion === 100}
                    onCheckedChange={() => {
                      navigate(section.href);
                    }}
                  />
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${section.color}`}>
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge
                      variant={
                        section.completion === 100 ? "default" : "secondary"
                      }
                      className="ml-auto"
                    >
                      {section.completion}%
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {section.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Completion</span>
                      <span className="text-muted-foreground">
                        {section.completion}%
                      </span>
                    </div>
                    <Progress value={section.completion} className="h-1" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(section.href);
                      }}
                    >
                      {section.completion === 100 ? "Edit" : "Complete"}
                    </Button>
                    {section.completion === 100 && (
                      <div className="flex items-center gap-1 text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium">Complete</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {overallCompletion > 0 && (
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard/cv-builder/preview")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Preview CV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard/cv-builder/export")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard/cv-builder/share")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Share CV
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

CVBuilderPage.displayName = "CVBuilderPage";
