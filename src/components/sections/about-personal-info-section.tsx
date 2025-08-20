import { format } from "date-fns";
import { Briefcase, CalendarDays, Mail, MapPin, Phone } from "lucide-react";

import { Heading2 } from "@/components/ui/heading";
import { Label } from "@/components/ui/label";

import type { Detail } from "@/types";
import { useGetPersonalInfoQuery } from "@/hooks/cv-builder";
import { Skeleton } from "@/components/ui/skeleton";

export function AboutPersonalInfoSection() {
  const { data: personalInfo, isLoading } = useGetPersonalInfoQuery();

  const details: Detail[] = [
    {
      name: "Experience",
      value: personalInfo?.data?.experience || "Not Available",
      icon: Briefcase,
    },
    {
      name: "Location",
      value: personalInfo?.data?.location || "Not Available",
      icon: MapPin,
    },
    {
      name: "Email",
      value: personalInfo?.data?.email || "Not Available",
      icon: Mail,
    },
    {
      name: "Phone",
      value: personalInfo?.data?.phone || "Not Available",
      icon: Phone,
    },
    {
      name: "Birthday",
      value:
        (personalInfo?.data?.birthday &&
          format(personalInfo?.data?.birthday, "MMM d, yyyy")) ||
        "Not Available",
      icon: CalendarDays,
    },
  ];

  if (isLoading) return <AboutPersonalInfoSectionSkeleton />;

  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2
          title="About Me"
          description="Discover my background, values, and what drives my passion for technology."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label className="text-xl">Summary</Label>
            <p className="text-muted-foreground">
              {personalInfo?.data?.summary}
            </p>
          </div>
          <div className="space-y-4">
            <Label className="text-xl">Personal Information</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.map((detail: Detail) => (
                <div
                  key={detail.name}
                  className="flex items-center gap-3 p-3 rounded-md border border-border bg-card"
                >
                  <detail.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{detail.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutPersonalInfoSectionSkeleton() {
  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        {/* Heading Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-40 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Summary Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/6" />
            </div>
          </div>
          {/* Personal Information Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-40 mb-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-md border border-border bg-card"
                >
                  <Skeleton className="h-5 w-5 rounded" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
