import { useState, useEffect } from "react";
import { Plus, Star } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CvSkillCard,
  CvSkillCardSkeleton,
} from "@/components/cards/cv-skill-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { CVSkillModal } from "@/components/dialog/cv-skill-modal";
import { Search } from "@/components/ui/search";
import { Grid } from "@/components/ui/grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetSkillsQuery, useDeleteSkillMutation } from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import type { Skill } from "@/types/cv-builder";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function SkillsPage() {
  const { onOpen } = useModalStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { mutate: deleteSkill, isPending } = useDeleteSkillMutation();
  const { data: skills, isLoading } = useGetSkillsQuery({
    q: debouncedSearchQuery,
    category: selectedCategory === "all" ? "" : selectedCategory,
  });

  const categories = Array.from(
    new Set(skills?.data?.data.map((skill) => skill.category))
  ).sort();

  return (
    <section className="space-y-6">
      <Heading
        title="Skills & Expertise"
        description="Manage your technical and soft skills with proficiency levels. Showcase your expertise to potential employers."
      >
        <Button onClick={() => onOpen("cv-skill")} disabled={isPending}>
          <Plus className="size-4" />
          Add Skills
        </Button>
      </Heading>
      <Separator />
      <Search
        placeholder="Search skills..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      >
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48" disabled={isPending}>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Search>
      <Grid>
        {isLoading ? (
          Array.from({ length: 9 }).map((_, idx) => (
            <CvSkillCardSkeleton key={idx} />
          ))
        ) : !skills?.data?.data.length ? (
          <EmptyState
            title="No skills found"
            description="Start by adding your first skill to showcase your expertise."
            icon={Star}
          />
        ) : (
          skills?.data?.data.map((skill) => (
            <CvSkillCard
              key={skill.id}
              skill={skill}
              handleEditSkill={setEditingSkill}
              handleDeleteSkill={deleteSkill}
            />
          ))
        )}
      </Grid>

      <CVSkillModal initialData={editingSkill} />

      {!!skills?.data?.data.length && skills?.data?.data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {skills?.data?.data.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Skills
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {skills?.data?.data.filter((s) => s.level >= 80).length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Expert Level
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {
                    skills?.data?.data.filter(
                      (s) => s.level >= 60 && s.level < 80
                    ).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  Advanced Level
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {
                    skills?.data?.data.filter(
                      (s) => s.level >= 40 && s.level < 60
                    ).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  Intermediate Level
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
