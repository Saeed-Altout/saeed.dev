import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, MapPin, Calendar } from "lucide-react";

/**
 * AboutSection - Detailed about section for the about page.
 */
export function AboutSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            About Me
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate <span className="font-semibold text-foreground">Full Stack Developer</span> with expertise in{" "}
            <span className="text-primary font-semibold">React, Next.js, and Node.js</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Personal Info Card */}
          <Card className="p-6 sm:p-8">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-4">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">saeed@flexify.dev</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-medium">5+ Years</span>
              </div>
              
              <div className="pt-4">
                <h4 className="font-semibold mb-3">Specializations:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Full Stack Development</Badge>
                  <Badge variant="secondary">AI/ML Integration</Badge>
                  <Badge variant="secondary">Cloud Architecture</Badge>
                  <Badge variant="secondary">DevOps</Badge>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <div className="space-y-6">
            <Card className="p-6 sm:p-8">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  My Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate Full Stack Developer with over 5 years of experience crafting 
                  innovative web applications and intelligent solutions. My journey in technology 
                  began with a curiosity for building things that make a difference.
                </p>
                <p>
                  At Flexify, I lead development teams in creating robust, scalable applications 
                  that combine cutting-edge technologies with exceptional user experiences. 
                  I specialize in React, Next.js, Node.js, and AI/ML integration.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing 
                  to open-source projects, or sharing knowledge with the developer community. 
                  I believe in continuous learning and pushing the boundaries of what's possible.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="p-6 sm:p-8">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  What I Value
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Clean Code</h4>
                    <p className="text-sm text-muted-foreground">
                      Writing maintainable, readable, and efficient code
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold mb-1">User Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      Creating intuitive and delightful user interfaces
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold mb-1">Innovation</h4>
                    <p className="text-sm text-muted-foreground">
                      Embracing new technologies and creative solutions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

AboutSection.displayName = "AboutSection"; 