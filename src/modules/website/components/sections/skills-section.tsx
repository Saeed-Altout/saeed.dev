import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Me } from "@/modules/website";

export function SkillsSection({ me }: { me: Me }) {
  const getSkillsByCategory = (category: string) => {
    return me.skills.filter((skill) => skill.category === category);
  };

  const categories = Array.from(
    new Set(me.skills.map((skill) => skill.category))
  );

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            Technical Skills
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My expertise across{" "}
            <span className="font-semibold text-foreground">
              frontend, backend, and AI technologies
            </span>{" "}
            that power modern applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Card key={category} className="p-6 sm:p-8">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold mb-4">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getSkillsByCategory(category).map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {skill.percentage}%
                      </span>
                    </div>
                    <Progress value={skill.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card className="p-6 sm:p-8">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold mb-4">
                Additional Skills & Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {me.skills.map((skill) => (
                  <Badge variant="secondary" key={skill.name}>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

SkillsSection.displayName = "SkillsSection";
