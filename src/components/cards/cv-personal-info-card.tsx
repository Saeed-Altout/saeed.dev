import { Globe, Linkedin, Github, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Image } from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";

import type { PersonalInfo } from "@/types";

export function CvPersonalInfoCard({
  personalInfo,
}: React.ComponentProps<"div"> & {
  personalInfo: PersonalInfo;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border">
            <Image
              src={personalInfo.profile_picture}
              alt="Profile"
              className="w-full h-full object-cover"
              width={80}
              height={80}
            />
          </div>
          <h3 className="text-2xl">{personalInfo.job_title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Link to={personalInfo.website || ""} target="_blank">
            <Button variant="outline" size="icon">
              <Globe className="h-4 w-4" />
              <span className="sr-only">{personalInfo.website}</span>
            </Button>
          </Link>
          <Link to={personalInfo.linkedin || ""} target="_blank">
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">{personalInfo.linkedin}</span>
            </Button>
          </Link>
          <Link to={personalInfo.github || ""} target="_blank">
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">{personalInfo.github}</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <p className="text-sm text-muted-foreground">{personalInfo.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <p className="text-sm text-muted-foreground">
            {personalInfo.address}
          </p>
        </div>
      </div>
      <Separator />

      <div className="flex flex-col gap-2">
        <Label className="text-lg">Professional Summary</Label>
        <p className="text-sm text-muted-foreground">{personalInfo.summary}</p>
      </div>
    </div>
  );
}

export function CvPersonalInfoCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border">
            <Skeleton className="w-full h-full" />
          </div>
          <Skeleton className="h-8 w-40 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-32 rounded" />
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-40 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>
    </div>
  );
}
