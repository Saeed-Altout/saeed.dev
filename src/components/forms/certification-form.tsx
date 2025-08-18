import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  useCreateCertificationMutation,
  useUpdateCertificationMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import { certificationSchema } from "@/schemas/cv-builder";
import type { Certification } from "@/types/cv-builder";

type CertificationFormData = z.infer<typeof certificationSchema>;

export function CertificationForm({
  initialData,
}: {
  initialData: Certification | null;
}) {
  const { onClose } = useModalStore();
  const createCertificationMutation = useCreateCertificationMutation();
  const updateCertificationMutation = useUpdateCertificationMutation();

  const form = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: initialData?.name || "",
      issuer: initialData?.issuer || "",
      issue_date: initialData?.issue_date || "",
      expiration_date: initialData?.expiration_date || "",
      credential_id: initialData?.credential_id || "",
      credential_url: initialData?.credential_url || "",
    },
  });

  const onSubmit = async (data: CertificationFormData) => {
    try {
      if (initialData) {
        await updateCertificationMutation.mutateAsync({
          id: initialData.id,
          data,
        });
      } else {
        await createCertificationMutation.mutateAsync(data);
      }
      onClose();
      form.reset();
    } catch (error) {
      console.error("Failed to save certification:", error);
    }
  };

  const buttonText = useMemo(() => {
    return initialData ? "Update Certification" : "Add Certification";
  }, [initialData]);

  const isLoading = createCertificationMutation.isPending || updateCertificationMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certification Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., AWS Certified Solutions Architect"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issuer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuing Organization</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Amazon Web Services"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="issue_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiration_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiration Date (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="credential_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credential ID (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., AWS-12345"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="credential_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credential URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="e.g., https://verify.aws.com/..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
