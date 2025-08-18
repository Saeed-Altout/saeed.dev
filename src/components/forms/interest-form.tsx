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
  useCreateInterestMutation,
  useUpdateInterestMutation,
} from "@/hooks/cv-builder";
import { useModalStore } from "@/stores/modal";
import { interestSchema } from "@/schemas/cv-builder";
import type { Interest } from "@/types/cv-builder";

type InterestFormData = z.infer<typeof interestSchema>;

export function InterestForm({
  initialData,
}: {
  initialData: Interest | null;
}) {
  const { onClose } = useModalStore();
  const createInterestMutation = useCreateInterestMutation();
  const updateInterestMutation = useUpdateInterestMutation();

  const form = useForm<InterestFormData>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const onSubmit = async (data: InterestFormData) => {
    try {
      if (initialData) {
        await updateInterestMutation.mutateAsync({
          id: initialData.id,
          data,
        });
      } else {
        await createInterestMutation.mutateAsync(data);
      }
      onClose();
      form.reset();
    } catch (error) {
      console.error("Failed to save interest:", error);
    }
  };

  const buttonText = useMemo(() => {
    return initialData ? "Update Interest" : "Add Interest";
  }, [initialData]);

  const isLoading =
    createInterestMutation.isPending || updateInterestMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interest Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Photography, Reading, Travel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">
                Enter the name of your interest or hobby.
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
