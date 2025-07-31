import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

const experiences: Experience[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "Flexify",
    location: "Dubai, UAE",
    period: "2022 - Present",
    description: "Leading development teams in creating innovative web applications and AI-powered solutions.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Python", "AI/ML"],
    achievements: [
      "Led development of 10+ client projects with 99.9% client satisfaction",
      "Implemented AI/ML features that improved user engagement by 40%",
      "Mentored 5 junior developers and established best practices"
    ]
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "TechCorp",
    location: "Dubai, UAE",
    period: "2020 - 2022",
    description: "Developed scalable web applications and microservices for enterprise clients.",
    technologies: ["React", "Node.js", "MongoDB", "Docker", "AWS"],
    achievements: [
      "Built 15+ production applications serving 100K+ users",
      "Reduced deployment time by 60% through CI/CD optimization",
      "Improved application performance by 50% through optimization"
    ]
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Dubai, UAE",
    period: "2019 - 2020",
    description: "Created responsive and interactive user interfaces for various web applications.",
    technologies: ["React", "Vue.js", "JavaScript", "CSS3", "HTML5"],
    achievements: [
      "Developed 20+ responsive websites and web applications",
      "Improved user experience scores by 35%",
      "Collaborated with design team to implement pixel-perfect designs"
    ]
  }
];

/**
 * ExperienceSection - Work experience section for the experience page.
 */
export function ExperienceSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            Work Experience
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My professional journey in <span className="font-semibold text-foreground">software development</span> and{" "}
            <span className="text-primary font-semibold">technology leadership</span>
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card key={experience.id} className="p-6 sm:p-8">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-bold mb-2">
                      {experience.title}
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{experience.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {experience.description}
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

ExperienceSection.displayName = "ExperienceSection"; 