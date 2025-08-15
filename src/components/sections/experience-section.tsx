import { CalendarDays, MapPin, Building2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

import { me } from "@/data/me";
import type { Experience } from "@/types";

export function ExperienceSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Heading
            title="Work Experience"
            description="My professional journey and achievements"
            className="text-center mb-12"
          />

          <div className="space-y-6">
            {me.experiences.map((experience: Experience) => (
              <Card key={experience.id} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        {experience.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span className="text-sm">{experience.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{experience.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          <span className="text-sm">{experience.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {experience.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech: string) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {experience.achievements.map(
                          (achievement: string, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
