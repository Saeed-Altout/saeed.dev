import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createTechnologySchema } from "@/schemas/technology";
import type {
  Technology,
  CreateTechnologyRequest,
  UpdateTechnologyRequest,
} from "@/types/technology";

type TechnologyFormData = z.infer<typeof createTechnologySchema>;

interface TechnologyFormProps {
  technology?: Technology;
  onSubmit: (
    data: CreateTechnologyRequest | UpdateTechnologyRequest
  ) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

export function TechnologyForm({
  technology,
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
}: TechnologyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only set default values from technology if editing, otherwise empty for user input
  const form = useForm<TechnologyFormData>({
    resolver: zodResolver(createTechnologySchema),
    defaultValues: {
      label: mode === "edit" && technology ? technology.label : "",
      value: mode === "edit" && technology ? technology.value : "",
    },
  });

  // Reset form values if technology changes in edit mode
  useEffect(() => {
    if (mode === "edit" && technology) {
      form.reset({
        label: technology.label,
        value: technology.value,
      });
    }
    // In create mode, do not auto-set value or label
  }, [technology, form, mode]);

  const handleSubmit = async (data: TechnologyFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {mode === "create" ? "Create New Technology" : "Edit Technology"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., React.js, Node.js, PostgreSQL"
                      {...field}
                      disabled={isLoading || isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    The human-readable name for the technology
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technology Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., react, nodejs, postgresql"
                      {...field}
                      disabled={isLoading || isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    The unique identifier used in code (lowercase, hyphens only)
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
                    ? "Create Technology"
                    : "Update Technology"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

TechnologyForm.displayName = "TechnologyForm";
