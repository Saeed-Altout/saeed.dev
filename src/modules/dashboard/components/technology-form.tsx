import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Loader2,
  Code,
  Globe,
  Smartphone,
  Database,
  Server,
  Cloud,
  Shield,
  Users,
  Settings,
  Home,
  BookOpen,
  FileText,
  Zap,
  Target,
  Palette,
  Wrench,
  BarChart3,
  Rocket,
  Monitor,
  Folder,
  GitBranch,
  Package,
  Layers,
  Cpu,
  HardDrive,
  Network,
  Lock,
  Key,
  Eye,
  Heart,
  Star,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Link,
  ExternalLink,
  Download,
  Upload,
  Share2,
  Copy,
  Edit,
  Trash2,
  Plus,
  X,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Move,
  RotateCcw,
  RefreshCw,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Camera,
  Image,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileText as FileTextIcon,
  FileSpreadsheet,
  Presentation,
  FileX,
  FileCheck,
  FilePlus,
  FileMinus,
  FileEdit,
  FileSearch,
  FileHeart,
  FileWarning,
  FileQuestion,
  FileClock,
  FileKey,
  FileLock,
  FileUser,
  FileCog,
  FileBarChart,
  FilePieChart,
  FileLineChart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { technologySchema } from "../schemas";
import { useDashboardStore } from "../stores/dashboard-store";
import type { Technology } from "../types";
import type { z } from "zod";

interface TechnologyFormProps {
  technology?: Technology;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Define available icons with their display names
const technologyIcons = [
  { value: "code", label: "Code", icon: Code },
  { value: "globe", label: "Globe", icon: Globe },
  { value: "smartphone", label: "Smartphone", icon: Smartphone },
  { value: "database", label: "Database", icon: Database },
  { value: "server", label: "Server", icon: Server },
  { value: "cloud", label: "Cloud", icon: Cloud },
  { value: "shield", label: "Shield", icon: Shield },
  { value: "users", label: "Users", icon: Users },
  { value: "settings", label: "Settings", icon: Settings },
  { value: "home", label: "Home", icon: Home },
  { value: "book-open", label: "Book Open", icon: BookOpen },
  { value: "file-text", label: "File Text", icon: FileText },
  { value: "zap", label: "Zap", icon: Zap },
  { value: "target", label: "Target", icon: Target },
  { value: "palette", label: "Palette", icon: Palette },
  { value: "wrench", label: "Wrench", icon: Wrench },
  { value: "bar-chart-3", label: "Bar Chart", icon: BarChart3 },
  { value: "rocket", label: "Rocket", icon: Rocket },
  { value: "monitor", label: "Monitor", icon: Monitor },
  { value: "folder", label: "Folder", icon: Folder },
  { value: "git-branch", label: "Git Branch", icon: GitBranch },
  { value: "package", label: "Package", icon: Package },
  { value: "layers", label: "Layers", icon: Layers },
  { value: "cpu", label: "CPU", icon: Cpu },
  { value: "hard-drive", label: "Hard Drive", icon: HardDrive },
  { value: "network", label: "Network", icon: Network },
  { value: "lock", label: "Lock", icon: Lock },
  { value: "key", label: "Key", icon: Key },
  { value: "eye", label: "Eye", icon: Eye },
  { value: "heart", label: "Heart", icon: Heart },
  { value: "star", label: "Star", icon: Star },
  { value: "trending-up", label: "Trending Up", icon: TrendingUp },
  { value: "activity", label: "Activity", icon: Activity },
  { value: "alert-circle", label: "Alert Circle", icon: AlertCircle },
  { value: "check-circle", label: "Check Circle", icon: CheckCircle },
  { value: "clock", label: "Clock", icon: Clock },
  { value: "calendar", label: "Calendar", icon: Calendar },
  { value: "mail", label: "Mail", icon: Mail },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "map-pin", label: "Map Pin", icon: MapPin },
  { value: "link", label: "Link", icon: Link },
  { value: "external-link", label: "External Link", icon: ExternalLink },
  { value: "download", label: "Download", icon: Download },
  { value: "upload", label: "Upload", icon: Upload },
  { value: "share-2", label: "Share", icon: Share2 },
  { value: "copy", label: "Copy", icon: Copy },
  { value: "edit", label: "Edit", icon: Edit },
  { value: "trash-2", label: "Trash", icon: Trash2 },
  { value: "plus", label: "Plus", icon: Plus },
  { value: "minus", label: "Minus", icon: X },
  { value: "x", label: "X", icon: X },
  { value: "search", label: "Search", icon: Search },
  { value: "filter", label: "Filter", icon: Filter },
  { value: "sort-asc", label: "Sort Asc", icon: SortAsc },
  { value: "sort-desc", label: "Sort Desc", icon: SortDesc },
  { value: "chevron-down", label: "Chevron Down", icon: ChevronDown },
  { value: "chevron-up", label: "Chevron Up", icon: ChevronUp },
  { value: "chevron-left", label: "Chevron Left", icon: ChevronLeft },
  { value: "chevron-right", label: "Chevron Right", icon: ChevronRight },
  { value: "arrow-left", label: "Arrow Left", icon: ArrowLeft },
  { value: "arrow-right", label: "Arrow Right", icon: ArrowRight },
  { value: "arrow-up", label: "Arrow Up", icon: ArrowUp },
  { value: "arrow-down", label: "Arrow Down", icon: ArrowDown },
  { value: "move", label: "Move", icon: Move },
  { value: "rotate-ccw", label: "Rotate CCW", icon: RotateCcw },
  { value: "refresh-cw", label: "Refresh CW", icon: RefreshCw },
  { value: "play", label: "Play", icon: Play },
  { value: "pause", label: "Pause", icon: Pause },
  { value: "skip-back", label: "Skip Back", icon: SkipBack },
  { value: "skip-forward", label: "Skip Forward", icon: SkipForward },
  { value: "volume-2", label: "Volume 2", icon: Volume2 },
  { value: "volume-x", label: "Volume X", icon: VolumeX },
  { value: "mic", label: "Mic", icon: Mic },
  { value: "mic-off", label: "Mic Off", icon: MicOff },
  { value: "video", label: "Video", icon: Video },
  { value: "video-off", label: "Video Off", icon: VideoOff },
  { value: "camera", label: "Camera", icon: Camera },
  { value: "image", label: "Image", icon: Image },
  { value: "file", label: "File", icon: File },
  { value: "file-image", label: "File Image", icon: FileImage },
  { value: "file-video", label: "File Video", icon: FileVideo },
  { value: "file-audio", label: "File Audio", icon: FileAudio },
  { value: "file-archive", label: "File Archive", icon: FileArchive },
  { value: "file-code", label: "File Code", icon: FileCode },
  { value: "file-text-icon", label: "File Text", icon: FileTextIcon },
  {
    value: "file-spreadsheet",
    label: "File Spreadsheet",
    icon: FileSpreadsheet,
  },
  { value: "presentation", label: "Presentation", icon: Presentation },
  { value: "file-x", label: "File X", icon: FileX },
  { value: "file-check", label: "File Check", icon: FileCheck },
  { value: "file-plus", label: "File Plus", icon: FilePlus },
  { value: "file-minus", label: "File Minus", icon: FileMinus },
  { value: "file-edit", label: "File Edit", icon: FileEdit },
  { value: "file-search", label: "File Search", icon: FileSearch },
  { value: "file-heart", label: "File Heart", icon: FileHeart },
  { value: "file-warning", label: "File Warning", icon: FileWarning },
  { value: "file-question", label: "File Question", icon: FileQuestion },
  { value: "file-clock", label: "File Clock", icon: FileClock },
  { value: "file-key", label: "File Key", icon: FileKey },
  { value: "file-lock", label: "File Lock", icon: FileLock },
  { value: "file-user", label: "File User", icon: FileUser },
  { value: "file-cog", label: "File Cog", icon: FileCog },
  { value: "file-bar-chart", label: "File Bar Chart", icon: FileBarChart },
  { value: "file-pie-chart", label: "File Pie Chart", icon: FilePieChart },
  { value: "file-line-chart", label: "File Line Chart", icon: FileLineChart },
];

const technologyColors = [
  "#3B82F6", // blue
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // violet
  "#06B6D4", // cyan
  "#84CC16", // lime
  "#F97316", // orange
  "#EC4899", // pink
  "#6366F1", // indigo
];

export function TechnologyForm({
  technology,
  open,
  onOpenChange,
}: TechnologyFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addTechnology, updateTechnology, categories } = useDashboardStore();

  const form = useForm({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      name: technology?.name || "",
      description: technology?.description || "",
      category: technology?.category || "",
      icon: technology?.icon || "code",
      color: technology?.color || "#3B82F6",
      isActive: technology?.isActive ?? true,
    },
  });

  const onSubmit = async (data: z.infer<typeof technologySchema>) => {
    setIsLoading(true);
    try {
      if (technology) {
        updateTechnology(technology.id, data);
        toast.success("Technology updated successfully");
      } else {
        addTechnology(data);
        toast.success("Technology created successfully");
      }
      onOpenChange(false);
      form.reset();
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {technology ? "Edit Technology" : "Add New Technology"}
          </DialogTitle>
          <DialogDescription>
            {technology
              ? "Update the technology information below."
              : "Add a new technology to your portfolio."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., React, Node.js"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(value) => form.setValue("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length === 0 ? (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      No categories available. Please create a category first.
                    </div>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the technology"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select
                value={form.watch("icon")}
                onValueChange={(value) => form.setValue("icon", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {technologyIcons.map((iconOption) => {
                    const IconComponent = iconOption.icon;
                    return (
                      <SelectItem
                        key={iconOption.value}
                        value={iconOption.value}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{iconOption.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {form.formState.errors.icon && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.icon.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select
                value={form.watch("color")}
                onValueChange={(value) => form.setValue("color", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {technologyColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {color}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.color && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.color.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={form.watch("isActive")}
              onCheckedChange={(checked) =>
                form.setValue("isActive", checked as boolean)
              }
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {technology ? "Update" : "Create"} Technology
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
