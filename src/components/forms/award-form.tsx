import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  useCreateAwardMutation,
  useUpdateAwardMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import { awardSchema } from "@/schemas/cv-builder";
import type { Award } from "@/types/cv-builder";

type AwardFormData = z.infer<typeof awardSchema>;

export function AwardForm({
  initialData,
}: {
  initialData: Award | null;
}) {
  const { onClose } = useModalStore();
  const createAwardMutation = useCreateAwardMutation();
  const updateAwardMutation = useUpdateAwardMutation();

  const form = useForm<AwardFormData>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      name: initialData?.name || "",
      issuer: initialData?.issuer || "",
      date: initialData?.date || "",
      description: initialData?.description || "",
    },
  });

  const onSubmit = async (data: AwardFormData) => {
    try {
      if (initialData) {
        await updateAwardMutation.mutateAsync({
          id: initialData.id,
          data,
        });
      } else {
        await createAwardMutation.mutateAsync(data);
      }
      onClose();
      form.reset();
    } catch (error) {
      console.error("Failed to save award:", error);
    }
  };

  const buttonText = useMemo(() => {
    return initialData ? "Update Award" : "Add Award";
  }, [initialData]);

  const isLoading = createAwardMutation.isPending || updateAwardMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Award Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Employee of the Year"
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
                    placeholder="e.g., Tech Corp"
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
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Award Date</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the award, criteria, or what it represents..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">
                Optional: Include details about the award criteria, what it represents,
                or any other relevant information.
              </p>
            </FormItem>
          )}
        />

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
