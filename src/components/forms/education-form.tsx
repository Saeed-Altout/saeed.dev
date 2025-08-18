import { useMemo } from "react";
import { useForm } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { educationSchema, type EducationSchema } from "@/schemas/cv-builder";
import {
  useCreateEducationMutation,
  useUpdateEducationMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import type { Education } from "@/types/cv-builder";
import { cn } from "@/lib/utils";

interface EducationFormProps {
  initialData: Education | null;
}

export function EducationForm({ initialData }: EducationFormProps) {
  const { onClose } = useModalStore();
  const { mutate: createEducation, isPending: isCreating } =
    useCreateEducationMutation();
  const { mutate: updateEducation, isPending: isUpdating } =
    useUpdateEducationMutation();

  const isLoading = isCreating || isUpdating;

  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: initialData ? initialData.degree : "",
      institution: initialData ? initialData.institution : "",
      location: initialData ? initialData.location || "" : "",
      start_date: initialData?.start_date
        ? new Date(initialData.start_date)
        : undefined,
      end_date: initialData?.end_date
        ? new Date(initialData.end_date)
        : undefined,
      is_current: initialData ? initialData.is_current : false,
      description: initialData ? initialData.description || "" : "",
    },
  });

  const handleSubmit = form.handleSubmit((data: EducationSchema) => {
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
      updateEducation(
        { id: initialData.id, data: payload },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
        }
      );
    } else {
      createEducation(payload, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      });
    }
  });

  const isCurrent = form.watch("is_current");

  const buttonText = useMemo(() => {
    return initialData ? "Update Education" : "Create Education";
  }, [initialData]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Bachelor of Science in Computer Science"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., University of Technology"
                    {...field}
                  />
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
                <Input placeholder="e.g., New York, NY" {...field} />
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
                I am currently studying here
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your studies, achievements, relevant coursework, or any other details..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">
                Optional: Include relevant coursework, achievements, GPA, or
                other notable details.
              </p>
            </FormItem>
          )}
        />

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
