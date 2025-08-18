import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Globe,
  User,
  UserRound,
  BrainCog,
  Plus,
  Folder,
  Heart,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

import type { CVSection } from "@/types";

const IconMap: Record<
  string,
  {
    Icon: React.ComponentType<{ className?: string }>;
    href: string;
    color?: string;
  }
> = {
  skills: {
    Icon: BrainCog,
    href: "/dashboard/cv-builder/skills",
    color: "bg-blue-500",
  },
  experience: {
    Icon: Briefcase,
    href: "/dashboard/cv-builder/experience",
    color: "bg-red-500",
  },
  education: {
    Icon: GraduationCap,
    href: "/dashboard/cv-builder/education",
    color: "bg-green-500",
  },
  personal_info: {
    Icon: User,
    href: "/dashboard/cv-builder/personal-info",
    color: "bg-yellow-500",
  },
  projects: {
    Icon: Folder,
    href: "/dashboard/cv-builder/projects",
  },
  certifications: {
    Icon: Award,
    href: "/dashboard/cv-builder/certifications",
    color: "bg-purple-500",
  },
  languages: {
    Icon: Globe,
    href: "/dashboard/cv-builder/languages",
    color: "bg-orange-500",
  },
  references: {
    Icon: UserRound,
    href: "/dashboard/cv-builder/references",
    color: "bg-pink-500",
  },
  awards: {
    Icon: Award,
    href: "/dashboard/cv-builder/awards",
    color: "bg-gray-500",
  },
  interests: {
    Icon: Heart,
    href: "/dashboard/cv-builder/interests",
    color: "bg-teal-500",
  },
  publications: {
    Icon: BookOpen,
    href: "/dashboard/cv-builder/publications",
    color: "bg-indigo-500",
  },
};

export function CvSectionCard({
  cvSection,
  onCheckedChange,
  isLoading,
}: React.ComponentProps<typeof Card> & {
  cvSection: CVSection;
  onCheckedChange: (checked: boolean) => void;
  isLoading: boolean;
}) {
  const navigate = useNavigate();
  const iconEntry = IconMap[cvSection.name as keyof typeof IconMap];
  const Icon = iconEntry?.Icon;
  const href = iconEntry?.href;

  const onAddNew = useCallback(() => {
    if (href) {
      navigate(href);
    }
  }, [href, navigate]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Button variant="secondary" size="icon" disabled={isLoading}>
            {Icon ? <Icon className="size-4" /> : null}
          </Button>
          <Switch
            checked={cvSection.is_active}
            onCheckedChange={onCheckedChange}
            disabled={isLoading}
          />
        </div>
        <CardTitle>{cvSection.display_name}</CardTitle>
        <CardDescription>{cvSection.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onAddNew}
          disabled={isLoading || !cvSection.is_active}
        >
          <Plus size="icon" className="size-4" />
          Add new
        </Button>
      </CardContent>
    </Card>
  );
}

export function CvSectionCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="w-10 h-6 rounded" />
        </div>
        <div className="space-y-2 mt-2">
          <Skeleton className="h-5 w-2/3 rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Skeleton className="h-10 w-full rounded" />
      </CardContent>
    </Card>
  );
}
