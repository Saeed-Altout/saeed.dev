import { format } from "date-fns";
import {
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Building2,
  Star,
  Briefcase,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import { useModalStore } from "@/stores/modal";
import { SENIORITY_LEVELS } from "@/constants/cv-builder";
import type { Experience } from "@/types/cv-builder";

export function CvExperienceCard({
  experience,
  handleEditExperience,
  handleDeleteExperience,
}: React.ComponentProps<"div"> & {
  experience: Experience;
  handleEditExperience: (experience: Experience) => void;
  handleDeleteExperience: (id: string) => void;
}) {
  const { onOpen } = useModalStore();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon">
            <Briefcase className="size-4" />
          </Button>
          <Badge>
            {SENIORITY_LEVELS.find(
              (l) => l.value === experience.seniority_level
            )?.label || experience.seniority_level}
          </Badge>
        </div>
        <CardTitle>{experience.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Building2 className="size-4" />
          {experience.company}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full flex flex-col gap-4">
        {experience.project_name && (
          <Label className="flex items-center gap-2">
            <Star className="size-4" />
            <span>{experience.project_name}</span>
          </Label>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {experience.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{experience.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(experience.start_date), "MMM yyyy")} -{" "}
              {experience.is_current
                ? "Present"
                : format(new Date(experience.end_date!), "MMM yyyy")}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {experience.description}
        </p>

        {experience.technologies.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Technologies
            </p>
            <div className="flex flex-wrap gap-1">
              {experience.technologies.slice(0, 5).map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {experience.technologies.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{experience.technologies.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {experience.key_achievements.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Key Achievements
            </p>
            <ul className="space-y-1">
              {experience.key_achievements
                .slice(0, 2)
                .map((achievement, index) => (
                  <li
                    key={index}
                    className="text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span className="line-clamp-2">{achievement}</span>
                  </li>
                ))}
              {experience.key_achievements.length > 2 && (
                <li className="text-xs text-muted-foreground">
                  +{experience.key_achievements.length - 2} more achievements
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            handleEditExperience(experience);
            onOpen("cv-experience");
          }}
        >
          <Edit className="size-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => handleDeleteExperience(experience.id)}
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export const CvExperienceCardSkeleton = () => (
  <Card className="h-full">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-muted animate-pulse">
          <Briefcase className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="h-6 w-20 bg-muted rounded animate-pulse" />
      </div>
      <div className="h-6 w-32 bg-muted rounded animate-pulse mt-2" />
      <div className="flex items-center gap-2 mt-2">
        <Building2 className="size-4 text-muted-foreground" />
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-4 pt-0">
      <div className="flex items-center gap-2">
        <Star className="size-4 text-muted-foreground" />
        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="h-4 w-full bg-muted rounded animate-pulse" />
      <div>
        <div className="h-3 w-20 bg-muted rounded animate-pulse mb-2" />
        <div className="flex flex-wrap gap-1">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="h-5 w-14 bg-muted rounded animate-pulse"
            />
          ))}
          <div className="h-5 w-10 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div>
        <div className="h-3 w-24 bg-muted rounded animate-pulse mb-2" />
        <ul className="space-y-1">
          {[...Array(2)].map((_, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <div className="h-3 w-40 bg-muted rounded animate-pulse" />
            </li>
          ))}
          <li>
            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
          </li>
        </ul>
      </div>
    </CardContent>
    <CardFooter className="flex gap-2">
      <div className="h-8 flex-1 bg-muted rounded animate-pulse" />
      <div className="h-8 flex-1 bg-muted rounded animate-pulse" />
    </CardFooter>
  </Card>
);
