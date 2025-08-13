import { Mail, MapPin, MessageSquare, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading2 } from "@/components/ui/heading";
import { ContactForm } from "@/components/forms/contact-form";

export function ContactPage() {
  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2
          title="Get In Touch"
          description="Ready to start your next project? Let's discuss how I can help bring your ideas to life"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Availability
              </CardTitle>
              <CardDescription>
                I'm available for projects and collaborations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="paragraph">Current Status:</p>
                <Badge>Available for Projects</Badge>
              </div>
              <div className="flex justify-between items-center">
                <p className="paragraph">Response Time:</p>
                <p className="font-medium">24 hours</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="paragraph">Project Start:</p>
                <p className="font-medium">1-2 weeks</p>
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Quick Contact
              </CardTitle>
              <CardDescription>
                Prefer a different way to connect?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="size-4" />
                Schedule a Call
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="size-4" />
                WhatsApp Chat
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="size-4" />
                Meet in Person
              </Button>
            </CardContent>
          </Card>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

ContactPage.displayName = "ContactPage";
