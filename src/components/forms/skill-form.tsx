import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

import {
  useCreateSkillMutation,
  useUpdateSkillMutation,
} from "@/hooks/cv-builder";
import type { Skill } from "@/types/cv-builder";
import { skillSchema, type SkillFormData } from "@/schemas/cv-builder";
import { useModalStore } from "@/stores/modal";

interface SkillFormProps {
  initialData: Skill | null;
}

export function SkillForm({ initialData }: SkillFormProps) {
  const { onClose } = useModalStore();
  const { mutate: createSkill, isPending: isCreating } =
    useCreateSkillMutation();
  const { mutate: updateSkill, isPending: isUpdating } =
    useUpdateSkillMutation();

  const isLoading = isCreating || isUpdating;

  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: initialData ? initialData.name : "",
      description: initialData ? initialData.description || "" : "",
      level: initialData ? initialData.level : 50,
      category: initialData ? initialData.category : "",
    },
  });

  const onSubmit = async (data: SkillFormData) => {
    if (initialData) {
      updateSkill(
        { id: initialData.id, data },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
        }
      );
    } else {
      createSkill(data, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      });
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

  const buttonText = useMemo(() => {
    return initialData ? "Update Skill" : "Create Skill";
  }, [initialData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                />
              </FormControl>
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
                />
              </FormControl>
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
                />
              </FormControl>
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
                    <span className="text-sm text-muted-foreground">
                      Beginner
                    </span>
                    <span
                      className={`text-sm font-semibold ${getSkillLevelColor(field.value)}`}
                    >
                      {field.value}% - {getSkillLevelLabel(field.value)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Expert
                    </span>
                  </div>
                  <Slider
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={isLoading} isLoading={isLoading}>
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
