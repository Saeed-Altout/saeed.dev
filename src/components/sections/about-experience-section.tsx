import { CalendarDays, MapPin, Building2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading2 } from "@/components/ui/heading";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetExperienceQuery } from "@/hooks/cv-builder";

export function AboutExperienceSection() {
  const { data: experiences, isLoading } = useGetExperienceQuery();

  if (isLoading) return <AboutExperienceSectionSkeleton />;

  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2
          title="Work Experience"
          description="My professional journey and achievements collected from my CV."
        />

        <div className="grid grid-cols-1 gap-6">
          {experiences?.data?.data?.map((experience) => (
            <Card key={experience.id}>
              <CardHeader>
                <CardTitle>{experience.title}</CardTitle>
                <CardDescription>{experience.description}</CardDescription>
                <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm">{experience.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-sm">
                      {experience.start_date} - {experience.end_date}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <Label>Technologies Used</Label>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies?.map((tech: string) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Key Achievements</Label>
                    <ul className="space-y-1">
                      {experience.key_achievements.map(
                        (achievement: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span className="text-sm text-muted-foreground">
                              {achievement}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutExperienceSectionSkeleton() {
  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        {/* Heading Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        {/* Experience Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card shadow-sm flex flex-col"
            >
              {/* Card Header Skeleton */}
              <div className="px-6 pt-6 pb-4 border-b flex flex-col gap-2">
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-4 w-24 mb-1" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
              {/* Card Content Skeleton */}
              <div className="px-6 py-4 flex flex-col gap-4">
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <ul className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-48" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
