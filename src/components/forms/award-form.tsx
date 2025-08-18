import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { awardSchema } from "@/schemas/cv-builder";
import type { Award as AwardType } from "@/types/cv-builder";

type AwardFormData = z.infer<typeof awardSchema>;

interface AwardFormProps {
  initialData?: AwardType | null;
  onSubmit: (data: AwardFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function AwardForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: AwardFormProps) {
  const form = useForm<AwardFormData>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      title: initialData?.title || "",
      issuing_organization: initialData?.issuing_organization || "",
      category: initialData?.category || "",
      location: initialData?.location || "",
      date: initialData?.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : "",
      is_current: initialData?.is_current || false,
      description: initialData?.description || "",
    },
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Award Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Award Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Employee of the Year"
            {...form.register("title")}
            className={form.formState.errors.title ? "border-destructive" : ""}
          />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        {/* Issuing Organization */}
        <div className="space-y-2">
          <Label htmlFor="issuing_organization">Issuing Organization *</Label>
          <Input
            id="issuing_organization"
            placeholder="e.g., Tech Corp"
            {...form.register("issuing_organization")}
            className={
              form.formState.errors.issuing_organization ? "border-destructive" : ""
            }
          />
          {form.formState.errors.issuing_organization && (
            <p className="text-sm text-destructive">
              {form.formState.errors.issuing_organization.message}
            </p>
          )}
        </div>
      </div>

      {/* Category and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="e.g., Performance, Innovation, Leadership"
            {...form.register("category")}
            className={form.formState.errors.category ? "border-destructive" : ""}
          />
          {form.formState.errors.category && (
            <p className="text-sm text-destructive">
              {form.formState.errors.category.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., New York, Online"
            {...form.register("location")}
            className={form.formState.errors.location ? "border-destructive" : ""}
          />
          {form.formState.errors.location && (
            <p className="text-sm text-destructive">
              {form.formState.errors.location.message}
            </p>
          )}
        </div>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="date">Award Date *</Label>
        <Input
          id="date"
          type="date"
          {...form.register("date")}
          className={form.formState.errors.date ? "border-destructive" : ""}
        />
        {form.formState.errors.date && (
          <p className="text-sm text-destructive">
            {form.formState.errors.date.message}
          </p>
        )}
      </div>

      <Separator />

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the award, criteria, or what it represents..."
          rows={4}
          {...form.register("description")}
          className={
            form.formState.errors.description ? "border-destructive" : ""
          }
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">
            {form.formState.errors.description.message}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Optional: Include details about the award criteria, what it represents,
          or any other relevant information.
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Update" : "Save"} Award
        </Button>
      </div>
    </form>
  );
}

AwardForm.displayName = "AwardForm";
