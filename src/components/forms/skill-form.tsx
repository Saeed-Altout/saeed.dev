import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

import { skillSchema } from "@/schemas/cv-builder";
import type { Skill, CreateSkillRequest, UpdateSkillRequest } from "@/types/cv-builder";

type SkillFormData = typeof skillSchema._type;

interface SkillFormProps {
  skill?: Skill;
  onSubmit: (data: CreateSkillRequest | UpdateSkillRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

export function SkillForm({
  skill,
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
}: SkillFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: mode === "edit" && skill ? skill.name : "",
      description: mode === "edit" && skill ? skill.description || "" : "",
      level: mode === "edit" && skill ? skill.level : 50,
      category: mode === "edit" && skill ? skill.category : "",
    },
  });

  // Reset form values if skill changes in edit mode
  useEffect(() => {
    if (mode === "edit" && skill) {
      form.reset({
        name: skill.name,
        description: skill.description || "",
        level: skill.level,
        category: skill.category,
      });
    }
  }, [skill, form, mode]);

  const handleSubmit = async (data: SkillFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      if (mode === "create") {
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSkillLevelLabel = (level: number): string => {
    if (level >= 80) return "Expert";
    if (level >= 60) return "Advanced";
    if (level >= 40) return "Intermediate";
    return "Beginner";
  };

  const getSkillLevelColor = (level: number): string => {
    if (level >= 80) return "text-green-600";
    if (level >= 60) return "text-yellow-600";
    if (level >= 40) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., React.js, Project Management, Leadership"
                  {...field}
                  disabled={isLoading || isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Enter the name of the skill or expertise
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Frontend Development, Soft Skills, Management"
                  {...field}
                  disabled={isLoading || isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Group your skills into logical categories
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your experience with this skill, projects you've used it in, or any relevant context..."
                  className="min-h-[80px]"
                  {...field}
                  disabled={isLoading || isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Provide additional context about your expertise level
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proficiency Level</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Beginner</span>
                    <span className={`text-sm font-semibold ${getSkillLevelColor(field.value)}`}>
                      {field.value}% - {getSkillLevelLabel(field.value)}
                    </span>
                    <span className="text-sm text-muted-foreground">Expert</span>
                  </div>
                  <Slider
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                    disabled={isLoading || isSubmitting}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Rate your proficiency level from 0% (beginner) to 100% (expert)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading || isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="min-w-24"
          >
            {isSubmitting
              ? "Saving..."
              : mode === "create"
                ? "Create Skill"
                : "Update Skill"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

SkillForm.displayName = "SkillForm";
