import { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { experienceSchema, type ExperienceSchema } from "@/schemas/cv-builder";
import { SENIORITY_LEVELS } from "@/constants/cv-builder";
import {
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import type { Experience } from "@/types/cv-builder";
import { cn } from "@/lib/utils";

interface ExperienceFormProps {
  initialData: Experience | null;
}

export function ExperienceForm({ initialData }: ExperienceFormProps) {
  const { onClose } = useModalStore();
  const { mutate: createExperience, isPending: isCreating } =
    useCreateExperienceMutation();
  const { mutate: updateExperience, isPending: isUpdating } =
    useUpdateExperienceMutation();

  const isLoading = isCreating || isUpdating;

  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: initialData ? initialData.title : "",
      company: initialData ? initialData.company : "",
      project_name: initialData ? initialData.project_name || "" : "",
      seniority_level: initialData ? initialData.seniority_level : "MID",
      location: initialData ? initialData.location || "" : "",
      start_date: initialData?.start_date
        ? new Date(initialData.start_date)
        : undefined,
      end_date: initialData?.end_date
        ? new Date(initialData.end_date)
        : undefined,
      is_current: initialData ? initialData.is_current : false,
      description: initialData ? initialData.description : "",
      key_achievements: initialData ? initialData.key_achievements : [""],
      technologies: initialData ? initialData.technologies : [""],
    },
  });

  const {
    fields: achievementFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control: form.control,
    name: "key_achievements" as never,
  });

  const {
    fields: technologyFields,
    append: appendTechnology,
    remove: removeTechnology,
  } = useFieldArray({
    control: form.control,
    name: "technologies" as never,
  });

  const handleSubmit = form.handleSubmit((data: ExperienceSchema) => {
    const payload = {
      ...data,
      start_date: data.start_date
        ? new Date(data.start_date).toISOString().split("T")[0]
        : "",
      end_date: data.end_date
        ? new Date(data.end_date).toISOString().split("T")[0]
        : "",
    };
    if (initialData) {
      updateExperience(
        { id: initialData.id, data: payload },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
        }
      );
    } else {
      createExperience(payload, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      });
    }
  });

  const isCurrent = form.watch("is_current");

  const addAchievement = () => {
    appendAchievement("" as string);
  };

  const addTechnology = () => {
    appendTechnology("" as string);
  };

  const buttonText = useMemo(() => {
    return initialData ? "Update Experience" : "Create Experience";
  }, [initialData]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Senior Full Stack Developer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Tech Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="project_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., E-commerce Platform" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seniority_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seniority Level *</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select seniority level" />
                    </SelectTrigger>
                    <SelectContent>
                      {SENIORITY_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Remote, New York" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        type="button"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          (!field.value || isCurrent) && "text-muted-foreground"
                        )}
                        type="button"
                        disabled={isCurrent}
                      >
                        {field.value && !isCurrent ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="is_current"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I currently work here
              </FormLabel>
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your role, responsibilities, and key contributions..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">
                Minimum 50 characters. Focus on your impact and achievements.
              </p>
            </FormItem>
          )}
        />

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Key Achievements *</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAchievement}
            >
              Add Achievement
            </Button>
          </div>
          <div className="space-y-3">
            {achievementFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder={`Achievement ${index + 1} (e.g., Increased performance by 25%)`}
                  {...form.register(`key_achievements.${index}`)}
                />
                {achievementFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeAchievement(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            At least one achievement is required. Use specific metrics when
            possible.
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Technologies Used *</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addTechnology}
            >
              Add Technology
            </Button>
          </div>
          <div className="space-y-3">
            {technologyFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder={`Technology ${index + 1} (e.g., React, Node.js)`}
                  {...form.register(`technologies.${index}`)}
                />
                {technologyFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeTechnology(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            At least one technology is required. List the main technologies you
            used.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} isLoading={isLoading}>
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
