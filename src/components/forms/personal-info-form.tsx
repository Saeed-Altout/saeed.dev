import { useMemo, useState } from "react";

import {
  personalInfoSchema,
  type PersonalInfoFormData,
} from "@/schemas/cv-builder";
import type { PersonalInfo } from "@/types/cv-builder";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useCreatePersonalInfoMutation,
  useUpdatePersonalInfoMutation,
} from "@/hooks/cv-builder";
import { UploadImage } from "@/components/ui/upload-image";
import { useModalStore } from "@/stores/modal";

export function PersonalInfoForm({
  initialData,
}: React.ComponentProps<"div"> & {
  initialData: PersonalInfo | null;
}) {
  const { onClose } = useModalStore();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { mutate: createPersonalInfo, isPending: isCreating } =
    useCreatePersonalInfoMutation();
  const { mutate: updatePersonalInfo, isPending: isUpdating } =
    useUpdatePersonalInfoMutation();

  const isLoading = isCreating || isUpdating;

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      job_title: initialData?.job_title || "",
      summary: initialData?.summary || "",
      profile_picture: initialData?.profile_picture || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      website: initialData?.website || "",
      linkedin: initialData?.linkedin || "",
      github: initialData?.github || "",
      birthday: initialData?.birthday || new Date(),
      experience: initialData?.experience || "",
      location: initialData?.location || "",
      email: initialData?.email || "",
      name: initialData?.name || "",
    },
  });

  const buttonText = useMemo(() => {
    return initialData ? "Update" : "Create";
  }, [initialData]);

  const onSubmit = (data: PersonalInfoFormData) => {
    if (initialData) {
      updatePersonalInfo(data, {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      });
    } else {
      createPersonalInfo(data, {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Full Stack Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <UploadImage
          onChange={(data) => {
            form.setValue("profile_picture", data.url!);
            setIsUploading(data.isLoading);
          }}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Anytown, USA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="123 Main St, Anytown, USA"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="https://yourwebsite.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="https://github.com/your-username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            disabled={isLoading || isUploading}
            isLoading={isLoading}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
