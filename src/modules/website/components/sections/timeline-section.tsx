import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    year: "2024",
    title: "Senior Full Stack Developer",
    company: "Flexify",
    location: "Dubai, UAE",
    description: "Leading development teams and architecting complex solutions.",
    achievements: [
      "Led 10+ client projects with 99.9% satisfaction rate",
      "Implemented AI/ML features improving engagement by 40%",
      "Mentored 5 junior developers"
    ],
    technologies: ["React", "Next.js", "Node.js", "AI/ML", "TypeScript"]
  },
  {
    id: "2",
    year: "2023",
    title: "Full Stack Developer",
    company: "TechCorp",
    location: "Dubai, UAE",
    description: "Developed scalable web applications for enterprise clients.",
    achievements: [
      "Built 15+ production applications",
      "Reduced deployment time by 60%",
      "Improved performance by 50%"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Docker", "AWS"]
  },
  {
    id: "3",
    year: "2022",
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Dubai, UAE",
    description: "Created responsive and interactive user interfaces.",
    achievements: [
      "Developed 20+ responsive websites",
      "Improved UX scores by 35%",
      "Collaborated with design teams"
    ],
    technologies: ["React", "Vue.js", "JavaScript", "CSS3", "HTML5"]
  },
  {
    id: "4",
    year: "2021",
    title: "Junior Developer",
    company: "StartupHub",
    location: "Dubai, UAE",
    description: "Started my journey in web development.",
    achievements: [
      "Built first production application",
      "Learned modern web technologies",
      "Contributed to open source projects"
    ],
    technologies: ["JavaScript", "HTML", "CSS", "React"]
  }
];

/**
 * TimelineSection - Timeline section for the experience page.
 */
export function TimelineSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            Career Timeline
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My professional journey through the years, showcasing{" "}
            <span className="font-semibold text-foreground">growth, learning, and achievements</span>
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-2 sm:left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

                {/* Content */}
                <div className="ml-8 sm:ml-16">
                  <Card className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">
                          {event.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span className="font-medium">{event.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-0 space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {event.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

TimelineSection.displayName = "TimelineSection"; 