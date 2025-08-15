import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Progress } from "@/components/ui/progress";

import { me } from "@/data/me";
import type { Skill } from "@/types";

export function SkillsSection() {
  const getSkillsByCategory = (category: string): Skill[] => {
    return me.skills.filter((skill: Skill) => skill.category === category);
  };

  const categories = ["Frontend", "Backend", "Database"];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Heading
            title="Skills & Expertise"
            description="Technologies and tools I work with"
            className="text-center mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const skills = getSkillsByCategory(category);
              return (
                <Card key={category} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill: Skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {skill.percentage}%
                          </span>
                        </div>
                        <Progress value={skill.percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Always learning and expanding my skill set
            </p>
            <Badge variant="outline" className="text-sm">
              Continuously Growing
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
