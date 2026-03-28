import { Card, CardContent } from "@/components/ui/card";
import { Globe, Target, Award } from "lucide-react";

const values = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Supporting GIS professionals worldwide with tools that adapt to any region and use case.",
  },
  {
    icon: Target,
    title: "Precision First",
    description: "Built with accuracy and reliability at the core, ensuring your spatial data is always trustworthy.",
  },
  {
    icon: Award,
    title: "Industry Leading",
    description: "Combining modern technology with proven GIS methodologies for professional-grade results.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl">
            About UtilityGIS
          </h2>
          <p className="text-lg text-muted-foreground">
            We're building the next generation of geographic information systems — powerful, flexible, and accessible to everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-border text-center">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-muted-foreground">
            UtilityGIS was created to bridge the gap between complex enterprise GIS solutions and simple mapping tools. We believe powerful spatial analysis shouldn't require extensive training or massive budgets.
          </p>
          <p className="text-muted-foreground">
            Our platform combines industry-standard mapping technologies with an intuitive interface, making it easy for professionals across utilities, urban planning, environmental science, and countless other fields to leverage the power of geographic data.
          </p>
        </div>
      </div>
    </section>
  );
}