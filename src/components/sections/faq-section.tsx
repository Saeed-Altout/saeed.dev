import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { faqs } from "@/data/faqs";
import type { FAQ } from "@/types";

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Heading
            title="Frequently Asked Questions"
            description="Common questions about my services and expertise"
            className="text-center mb-12"
          />

          <div className="space-y-4">
            {faqs.map((faq: FAQ, index: number) => (
              <div
                key={index}
                className="border border-border rounded-lg bg-card overflow-hidden"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto text-left font-medium hover:bg-muted/50"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-foreground">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </Button>

                {openFAQ === index && (
                  <div className="px-4 pb-4">
                    <Separator className="mb-4" />
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? Feel free to reach out!
            </p>
            <Button size="lg">Contact Me</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
