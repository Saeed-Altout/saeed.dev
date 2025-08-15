import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { X, CalendarIcon, Search, Check } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import {
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/hooks/project";
import { useGetTechnologiesForProjectsQuery } from "@/hooks/technology";
import { projectSchema, type ProjectSchema } from "@/schemas/project";

export function ProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isTechnologyPopoverOpen, setIsTechnologyPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetProjectByIdQuery(id === "new" ? "" : id!);
  const { data: availableTechnologies } = useGetTechnologiesForProjectsQuery();
  const { mutate: createProject, isPending: isCreating } =
    useCreateProjectMutation();
  const { mutate: updateProject, isPending: isUpdating } =
    useUpdateProjectMutation();

  const isPending = isCreating || isUpdating;

  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: data?.data?.name ?? "",
      description: data?.data?.description ?? "",
      brief: data?.data?.brief ?? "",
      technologies: data?.data?.technologies ?? [],
      startDate: data?.data?.startDate
        ? new Date(data.data.startDate)
        : new Date(),
      endDate: data?.data?.endDate ? new Date(data.data.endDate) : new Date(),
      status: (data?.data?.status as ProjectSchema["status"]) ?? "planning",
      isFeatured: data?.data?.isFeatured ?? false,
      isPublic: data?.data?.isPublic ?? true,
    },
  });

  const watchedTechnologies = form.watch("technologies") || [];

  const onSubmit = (values: ProjectSchema) => {
    if (id === "new") {
      createProject(
        {
          ...values,
          startDate: values.startDate.toISOString(),
          endDate: values.endDate.toISOString(),
        },
        {
          onSuccess: () => {
            form.reset();
            navigate("/dashboard/projects", { replace: true });
          },
        }
      );
    } else {
      updateProject(
        {
          id: id!,
          request: {
            ...values,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
          },
        },
        {
          onSuccess: () => {
            form.reset();
            navigate("/dashboard/projects", { replace: true });
          },
        }
      );
    }
  };

  const addTechnology = (technology: string) => {
    if (!watchedTechnologies.includes(technology)) {
      const updatedTechnologies = [...watchedTechnologies, technology];
      form.setValue("technologies", updatedTechnologies);
      setIsTechnologyPopoverOpen(false);
      setSearchQuery("");
    }
  };

  const removeTechnology = (technologyToRemove: string) => {
    const updatedTechnologies = watchedTechnologies.filter(
      (technology) => technology !== technologyToRemove
    );
    form.setValue("technologies", updatedTechnologies);
  };

  const filteredTechnologies =
    availableTechnologies?.data?.filter(
      (tech) =>
        !watchedTechnologies.includes(tech) &&
        tech.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const title: string = id === "new" ? "New Project" : "Edit Project";
  const description: string =
    id === "new"
      ? "You can create a new project here"
      : "You can edit the details of your project here";

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Heading title={title} description={description} />
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g. My Portfolio Website"
                    className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brief"
            render={({ field }) => (
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel>Brief</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="E.g. A short summary of what this project does or its main goal"
                    className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    disabled={isPending}
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
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isPending}
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
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        disabled={(date) =>
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
              name="endDate"
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
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isPending}
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
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        disabled={(date) =>
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

          <div className="col-span-1 lg:col-span-2 space-y-2">
            <Label>Technologies</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {watchedTechnologies.map((technology) => (
                <Badge key={technology} variant="outline" className="gap-1">
                  {technology}
                  <button
                    type="button"
                    onClick={() => removeTechnology(technology)}
                    className="ml-1 hover:text-destructive"
                    tabIndex={0}
                    aria-label={`Remove ${technology}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <Popover
              open={isTechnologyPopoverOpen}
              onOpenChange={setIsTechnologyPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={isPending}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Select Technologies
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Available Technologies
                    </Label>
                    <Input
                      placeholder="Search technologies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    {filteredTechnologies.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        {searchQuery
                          ? "No technologies found matching your search."
                          : "No available technologies."}
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {filteredTechnologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="flex items-center gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => addTechnology(tech)}
                          >
                            <Check className="h-3 w-3" />
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {form.formState.errors.technologies && (
              <p className="text-sm text-red-500">
                {form.formState.errors.technologies.message}
              </p>
            )}
          </div>
          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-start gap-2 border border-input rounded-md p-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                      <div className="-mt-1">
                        <FormLabel className="text-base">Public</FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Select if you want to make this project public.
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-start gap-2 border border-input rounded-md p-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="-mt-1">
                        <FormLabel className="text-base">Featured</FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Select if you want to feature this project on the
                          homepage.
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-fit">
            {id === "new" ? "Create Project" : "Update Project"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
