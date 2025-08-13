import { Heading2 } from "@/components/ui/heading";
import { ContactForm } from "@/components/forms/contact-form";
import { content } from "@/content";

export function HomeContactSection() {
  const { title, description } = content.home.contact;

  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2 title={title} description={description} />
        <ContactForm />
      </div>
    </section>
  );
}
