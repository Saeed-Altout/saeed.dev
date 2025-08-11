import { Heading2 } from "@/components/ui/heading";
import { ContactForm } from "@/components/forms/contact-form";

export function HomeContactSection() {
  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2
          title="Contact Me"
          description="Get in touch with me to discuss your project or inquiry."
        />
        <ContactForm />
      </div>
    </section>
  );
}

HomeContactSection.displayName = "HomeContactSection";
