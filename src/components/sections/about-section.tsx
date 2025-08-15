import { Building2, CalendarDays, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

import { me } from "@/data/me";
import type { Detail, Value } from "@/types";

export function AboutSection() {
  const details: Detail[] = [
    {
      name: "Experience",
      value: "5+ Years",
      icon: Building2,
    },
    {
      name: "Location",
      value: "Jordan",
      icon: MapPin,
    },
    {
      name: "Email",
      value: "saeed.altout@gmail.com",
      icon: Mail,
    },
    {
      name: "Phone",
      value: "+962 79 123 4567",
      icon: Phone,
    },
    {
      name: "Birthday",
      value: "January 15, 1995",
      icon: CalendarDays,
    },
  ];

  const values: Value[] = [
    {
      name: "Clean Code",
      description: "Writing maintainable, readable, and efficient code",
    },
    {
      name: "User Experience",
      description: "Creating intuitive and delightful user interfaces",
    },
    {
      name: "Innovation",
      description: "Embracing new technologies and creative solutions",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Heading
            title="About Me"
            description="Get to know me better"
            className="text-center mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Personal Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.map((detail: Detail) => (
                    <div
                      key={detail.name}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
                    >
                      <detail.icon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {detail.name}
                        </p>
                        <p className="font-medium text-foreground">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {me.expertise.map((expertise: string) => (
                    <Badge key={expertise} variant="secondary">
                      {expertise}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Bio */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Biography
                </h3>
                <div className="space-y-4">
                  {me.bio
                    .split("///")
                    .map((paragraph: string, index: number) => (
                      <p
                        key={index}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {paragraph.trim()}
                      </p>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Core Values
                </h3>
                <div className="space-y-3">
                  {values.map((value: Value) => (
                    <div
                      key={value.name}
                      className="p-3 rounded-lg border border-border bg-card"
                    >
                      <h4 className="font-medium text-foreground mb-1">
                        {value.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Ready to work together on your next project?
            </p>
            <Button size="lg">Get In Touch</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
