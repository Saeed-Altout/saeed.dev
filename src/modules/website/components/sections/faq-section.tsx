import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What services do you offer?",
    answer: "I offer comprehensive full-stack development services including web application development, AI/ML integration, cloud architecture, and DevOps solutions. I specialize in React, Next.js, Node.js, and modern web technologies."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-6 months. I always provide detailed timelines during the initial consultation."
  },
  {
    question: "Do you work with clients internationally?",
    answer: "Yes, I work with clients globally. I'm based in Dubai but collaborate with teams and clients worldwide through video calls, project management tools, and regular communication channels."
  },
  {
    question: "What is your development process?",
    answer: "My process includes discovery and planning, design and prototyping, development and testing, deployment, and ongoing support. I maintain transparent communication throughout each phase."
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer: "Yes, I offer ongoing maintenance, updates, and technical support for all projects. This includes bug fixes, feature updates, security patches, and performance optimization."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in React, Next.js, TypeScript, Node.js, Python, and AI/ML technologies. I also work with various databases, cloud platforms, and DevOps tools to create complete solutions."
  },
  {
    question: "How do you handle project communication?",
    answer: "I use modern collaboration tools like Slack, Zoom, and project management platforms. I provide regular updates, schedule check-ins, and maintain open communication channels throughout the project."
  },
  {
    question: "Do you offer consultation services?",
    answer: "Yes, I provide technical consultation for existing projects, architecture reviews, performance optimization, and technology stack recommendations. I can help improve your current systems or plan new ones."
  }
];

/**
 * FAQSection - Frequently asked questions section.
 */
export function FAQSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Common questions about my <span className="font-semibold text-foreground">services, process, and expertise</span>{" "}
            to help you understand how we can work together
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? I'd love to hear from you!
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

FAQSection.displayName = "FAQSection"; 