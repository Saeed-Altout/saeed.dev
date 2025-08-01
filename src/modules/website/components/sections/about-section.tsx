import { Download, SquareCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Me } from "@/modules/website";

export function AboutSection({ me }: { me: Me }) {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            About Me
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate{" "}
            <span className="font-semibold text-foreground">{me.position}</span>{" "}
            with expertise in{" "}
            <span className="text-primary font-semibold">
              {me.expertise.join(", ")}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <Card className="p-6 sm:p-8 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-4">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {me.details.map((detail) => (
                <div className="flex items-center gap-3" key={detail.name}>
                  <detail.icon className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{detail.name}:</span>
                  <span className="font-medium">{detail.value}</span>
                </div>
              ))}

              <div className="pt-4">
                <h4 className="font-semibold mb-3">Specializations:</h4>
                <div className="flex flex-wrap gap-2">
                  {me.expertise.map((expertise) => (
                    <Badge variant="secondary" key={expertise}>
                      {expertise}
                    </Badge>
                  ))}
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

          <Card className="p-6 sm:p-8 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                My Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              {me.bio.split("///").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>

          <Card className="p-6 sm:p-8 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                What I Value
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {me.values.map((value) => (
                <div className="flex items-start gap-3" key={value.name}>
                  <SquareCheck className="h-4 w-4 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{value.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

AboutSection.displayName = "AboutSection";
