import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "Frontend" },
  { name: "Next.js", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 88, category: "Frontend" },
  { name: "JavaScript", level: 92, category: "Frontend" },
  { name: "HTML/CSS", level: 95, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  
  // Backend
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Express.js", level: 85, category: "Backend" },
  { name: "Python", level: 80, category: "Backend" },
  { name: "FastAPI", level: 75, category: "Backend" },
  { name: "PostgreSQL", level: 82, category: "Backend" },
  { name: "MongoDB", level: 85, category: "Backend" },
  
  // DevOps & Tools
  { name: "Docker", level: 80, category: "DevOps" },
  { name: "AWS", level: 75, category: "DevOps" },
  { name: "Git", level: 90, category: "DevOps" },
  { name: "CI/CD", level: 78, category: "DevOps" },
  
  // AI/ML
  { name: "TensorFlow", level: 70, category: "AI/ML" },
  { name: "OpenAI API", level: 85, category: "AI/ML" },
  { name: "Machine Learning", level: 75, category: "AI/ML" },
];

const categories = ["Frontend", "Backend", "DevOps", "AI/ML"];

/**
 * SkillsSection - Technical skills section for the about page.
 */
export function SkillsSection() {
  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            Technical Skills
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My expertise across <span className="font-semibold text-foreground">frontend, backend, and AI technologies</span>{" "}
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
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12">
          <Card className="p-6 sm:p-8">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold mb-4">
                Additional Skills & Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Figma</Badge>
                <Badge variant="secondary">Adobe Creative Suite</Badge>
                <Badge variant="secondary">Jira</Badge>
                <Badge variant="secondary">Slack</Badge>
                <Badge variant="secondary">Notion</Badge>
                <Badge variant="secondary">Postman</Badge>
                <Badge variant="secondary">VSCode</Badge>
                <Badge variant="secondary">Webpack</Badge>
                <Badge variant="secondary">Vite</Badge>
                <Badge variant="secondary">Redux</Badge>
                <Badge variant="secondary">Zustand</Badge>
                <Badge variant="secondary">Prisma</Badge>
                <Badge variant="secondary">Jest</Badge>
                <Badge variant="secondary">Cypress</Badge>
                <Badge variant="secondary">Storybook</Badge>
                <Badge variant="secondary">Framer Motion</Badge>
                <Badge variant="secondary">Three.js</Badge>
                <Badge variant="secondary">D3.js</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

SkillsSection.displayName = "SkillsSection"; 