import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import { Plus, Search, Star, Edit, Trash2, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useGetSkillsQuery, useCreateSkillMutation, useUpdateSkillMutation, useDeleteSkillMutation } from "@/hooks/cv-builder";
import type { Skill, CreateSkillRequest, UpdateSkillRequest } from "@/types/cv-builder";
import { skillSchema } from "@/schemas/cv-builder";
import { cardVariants, staggerContainer } from "@/constants/motion";
import { SkillForm } from "@/components/forms/skill-form";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function SkillsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [localSkills, setLocalSkills] = useState<Skill[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const { data: skills, isLoading: isLoadingSkills } = useGetSkillsQuery({
    q: debouncedSearchQuery,
    category: selectedCategory === "all" ? "" : selectedCategory,
  });

  const createSkillMutation = useCreateSkillMutation();
  const updateSkillMutation = useUpdateSkillMutation();
  const deleteSkillMutation = useDeleteSkillMutation();

  // Update local skills when API data changes
  useEffect(() => {
    if (skills?.data) {
      setLocalSkills(skills.data);
    }
  }, [skills?.data]);

  const isLoading = isLoadingSkills;

  const noSkills = !isLoading && (!localSkills || localSkills.length === 0);

  // Get unique categories for filter
  const categories = Array.from(new Set(localSkills.map(skill => skill.category))).sort();

  const handleCreateSkill = async (data: CreateSkillRequest) => {
    try {
      await createSkillMutation.mutateAsync(data);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Failed to create skill:", error);
    }
  };

  const handleUpdateSkill = async (data: UpdateSkillRequest) => {
    if (!editingSkill) return;
    
    try {
      await updateSkillMutation.mutateAsync({
        skillId: editingSkill.id,
        request: data,
      });
      setEditingSkill(null);
    } catch (error) {
      console.error("Failed to update skill:", error);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    try {
      await deleteSkillMutation.mutateAsync(skillId);
      setLocalSkills((prev) => prev.filter((skill) => skill.id !== skillId));
    } catch (error) {
      console.error("Failed to delete skill:", error);
    }
  };

  const getSkillLevelColor = (level: number): string => {
    if (level >= 80) return "text-green-600";
    if (level >= 60) return "text-yellow-600";
    if (level >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getSkillLevelLabel = (level: number): string => {
    if (level >= 80) return "Expert";
    if (level >= 60) return "Advanced";
    if (level >= 40) return "Intermediate";
    return "Beginner";
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <Heading 
        title="Skills & Expertise" 
        description="Manage your technical and soft skills with proficiency levels. Showcase your expertise to potential employers."
      >
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>
            <SkillForm
              onSubmit={handleCreateSkill}
              onCancel={() => setIsCreateDialogOpen(false)}
              isLoading={createSkillMutation.isPending}
              mode="create"
            />
          </DialogContent>
        </Dialog>
      </Heading>

      <Separator />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search skills"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
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
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <Skeleton className="h-48 w-full rounded-lg" />
            </motion.div>
          ))
        ) : noSkills ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Star
              className="mx-auto mb-4 h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium">No skills found</span>
            <span className="text-sm mt-1">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your search or filters."
                : "Start by adding your first skill to showcase your expertise."
              }
            </span>
            {!searchQuery && selectedCategory === "all" && (
              <Button 
                className="mt-4"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Skill
              </Button>
            )}
          </div>
        ) : (
          localSkills.map((skill) => (
            <motion.div key={skill.id} variants={cardVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-blue-500">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {skill.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Edit
                          className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                          onClick={() => setEditingSkill(skill)}
                        />
                        <Trash2
                          className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-red-600 transition-colors"
                          onClick={() => handleDeleteSkill(skill.id)}
                        />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {skill.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {skill.description}
                    </p>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Proficiency Level</span>
                      <span className={`text-sm font-semibold ${getSkillLevelColor(skill.level)}`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <Progress value={skill.level} className="h-2" />
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Beginner</span>
                      <span className="text-muted-foreground">Expert</span>
                    </div>
                    
                    <Badge variant="secondary" className="w-fit">
                      {getSkillLevelLabel(skill.level)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Edit Skill Dialog */}
      {editingSkill && (
        <Dialog open={!!editingSkill} onOpenChange={() => setEditingSkill(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Skill</DialogTitle>
            </DialogHeader>
            <SkillForm
              skill={editingSkill}
              onSubmit={handleUpdateSkill}
              onCancel={() => setEditingSkill(null)}
              isLoading={updateSkillMutation.isPending}
              mode="edit"
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Stats */}
      {localSkills.length > 0 && (
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Skills Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{localSkills.length}</div>
                  <div className="text-sm text-muted-foreground">Total Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {localSkills.filter(s => s.level >= 80).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Expert Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {localSkills.filter(s => s.level >= 60 && s.level < 80).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Advanced Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {categories.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

SkillsPage.displayName = "SkillsPage";
