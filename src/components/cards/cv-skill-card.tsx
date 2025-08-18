import { Star, Edit, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import type { Skill } from "@/types/cv-builder";
import { useModalStore } from "@/stores/modal";

const getSkillLevelLabel = (level: number): string => {
  if (level >= 80) return "Expert";
  if (level >= 60) return "Advanced";
  if (level >= 40) return "Intermediate";
  return "Beginner";
};

export function CvSkillCard({
  skill,
  handleEditSkill,
  handleDeleteSkill,
}: React.ComponentProps<"div"> & {
  skill: Skill;
  handleEditSkill: (skill: Skill) => void;
  handleDeleteSkill: (id: string) => void;
}) {
  const { onOpen } = useModalStore();
  return (
    <Card key={skill.id}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Button variant="outline" size="icon">
            <Star className="size-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{skill.category}</Badge>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  handleEditSkill(skill);
                  onOpen("cv-skill");
                }}
              >
                <Edit className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
        <CardTitle className="flex items-center justify-between gap-2">
          {skill.name}
          <Badge variant="secondary">{getSkillLevelLabel(skill.level)}</Badge>
        </CardTitle>
        <CardDescription>{skill.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Proficiency Level</Label>
          <Badge variant="secondary">{skill.level}%</Badge>
        </div>
        <Progress value={skill.level} className="h-1" />
      </CardContent>
    </Card>
  );
}

export const CvSkillCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-16 h-6 rounded" />
            <div className="flex items-center gap-1">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
        <CardTitle className="flex items-center justify-between gap-2">
          <Skeleton className="w-24 h-5 rounded" />
          <Skeleton className="w-16 h-5 rounded" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-full h-4 rounded mb-1" />
          <Skeleton className="w-2/3 h-4 rounded" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="w-20 h-4 rounded" />
          <Skeleton className="w-10 h-4 rounded" />
        </div>
        <Skeleton className="h-1 w-full rounded" />
      </CardContent>
    </Card>
  );
};
