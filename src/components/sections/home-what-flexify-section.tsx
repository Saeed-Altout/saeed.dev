import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Heading2 } from "@/components/ui/heading";
import { content } from "@/content";

export function HomeWhatFlexifySection() {
  const { title, description, features } = content.home.whatFlexify;
  return (
    <section className="section">
      <div className="container flex flex-col gap-6">
        <Heading2 title={title} description={description} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="pb-0">
                {feature.icon && (
                  <div className="mb-3">
                    <feature.icon className="size-8 text-primary" />
                  </div>
                )}
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
