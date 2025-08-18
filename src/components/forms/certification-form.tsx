import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { certificationSchema } from "@/schemas/cv-builder";
import type { Certification } from "@/types/cv-builder";

type CertificationFormData = z.infer<typeof certificationSchema>;

interface CertificationFormProps {
  initialData?: Certification | null;
  onSubmit: (data: CertificationFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CertificationForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: CertificationFormProps) {
  const form = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: initialData?.name || "",
      issuing_organization: initialData?.issuing_organization || "",
      credential_id: initialData?.credential_id || "",
      location: initialData?.location || "",
      issue_date: initialData?.issue_date
        ? new Date(initialData.issue_date).toISOString().split("T")[0]
        : "",
      expiry_date: initialData?.expiry_date
        ? new Date(initialData.expiry_date).toISOString().split("T")[0]
        : "",
      is_current: initialData?.is_current || false,
      description: initialData?.description || "",
    },
  });

  const handleSubmit = form.handleSubmit(onSubmit);
  const isCurrent = form.watch("is_current");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Certification Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Certification Name *</Label>
          <Input
            id="name"
            placeholder="e.g., AWS Certified Solutions Architect"
            {...form.register("name")}
            className={form.formState.errors.name ? "border-destructive" : ""}
          />
          {form.formState.errors.name && (
            <p className="text-sm text-destructive">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Issuing Organization */}
        <div className="space-y-2">
          <Label htmlFor="issuing_organization">Issuing Organization *</Label>
          <Input
            id="issuing_organization"
            placeholder="e.g., Amazon Web Services"
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

      {/* Credential ID and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Credential ID */}
        <div className="space-y-2">
          <Label htmlFor="credential_id">Credential ID</Label>
          <Input
            id="credential_id"
            placeholder="e.g., AWS-12345"
            {...form.register("credential_id")}
            className={
              form.formState.errors.credential_id ? "border-destructive" : ""
            }
          />
          {form.formState.errors.credential_id && (
            <p className="text-sm text-destructive">
              {form.formState.errors.credential_id.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., Online, New York"
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

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Issue Date */}
        <div className="space-y-2">
          <Label htmlFor="issue_date">Issue Date *</Label>
          <Input
            id="issue_date"
            type="date"
            {...form.register("issue_date")}
            className={
              form.formState.errors.issue_date ? "border-destructive" : ""
            }
          />
          {form.formState.errors.issue_date && (
            <p className="text-sm text-destructive">
              {form.formState.errors.issue_date.message}
            </p>
          )}
        </div>

        {/* Expiry Date */}
        <div className="space-y-2">
          <Label htmlFor="expiry_date">Expiry Date</Label>
          <Input
            id="expiry_date"
            type="date"
            disabled={isCurrent}
            {...form.register("expiry_date")}
            className={
              form.formState.errors.expiry_date ? "border-destructive" : ""
            }
          />
          {form.formState.errors.expiry_date && (
            <p className="text-sm text-destructive">
              {form.formState.errors.expiry_date.message}
            </p>
          )}
        </div>
      </div>

      {/* Current Certification */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_current"
          checked={isCurrent}
          onCheckedChange={(checked) =>
            form.setValue("is_current", checked as boolean)
          }
        />
        <Label
          htmlFor="is_current"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          This certification is currently valid
        </Label>
      </div>

      <Separator />

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what this certification covers, skills demonstrated, or any other relevant details..."
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
          Optional: Include details about what the certification covers, skills
          demonstrated, or any other relevant information.
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
          {isLoading ? "Saving..." : initialData ? "Update" : "Save"}{" "}
          Certification
        </Button>
      </div>
    </form>
  );
}

CertificationForm.displayName = "CertificationForm";
