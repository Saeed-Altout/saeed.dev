import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  useCreateReferenceMutation,
  useUpdateReferenceMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import { referenceSchema } from "@/schemas/cv-builder";
import type { Reference, ReferenceSchema } from "@/types/cv-builder";

type ReferenceFormData = ReferenceSchema;

export function ReferenceForm({
  initialData,
}: {
  initialData: Reference | null;
}) {
  const { onClose } = useModalStore();
  const createReferenceMutation = useCreateReferenceMutation();
  const updateReferenceMutation = useUpdateReferenceMutation();

  const form = useForm<ReferenceFormData>({
    resolver: zodResolver(referenceSchema),
    defaultValues: {
      name: initialData?.name || "",
      position: initialData?.position || "",
      company: initialData?.company || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
    },
  });

  const onSubmit = async (data: ReferenceFormData) => {
    try {
      if (initialData) {
        await updateReferenceMutation.mutateAsync({
          id: initialData.id,
          data,
        });
      } else {
        await createReferenceMutation.mutateAsync(data);
      }
      onClose();
      form.reset();
    } catch (error) {
      console.error("Failed to save reference:", error);
    }
  };

  const buttonText = useMemo(() => {
    return initialData ? "Update Reference" : "Add Reference";
  }, [initialData]);

  const isLoading =
    createReferenceMutation.isPending || updateReferenceMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Senior Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Tech Corp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="e.g., john.doe@company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="e.g., +1 (555) 123-4567"
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
