import { Map, Database, Layers, Zap, Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Map,
    title: "Advanced Mapping",
    description: "Interactive maps with multiple base layers, drawing tools, and real-time data visualization.",
  },
  {
    icon: Database,
    title: "Custom Schemas",
    description: "Field-specific schema packages or create your own custom data structures.",
  },
  {
    icon: Layers,
    title: "Layer Management",
    description: "Organize and control multiple data layers with filtering and styling options.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Optimized for handling large datasets with smooth interactions and quick rendering.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Share projects, work together in real-time, and manage team access controls.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Industry-standard encryption, regular backups, and comprehensive access controls.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for professionals who demand precision and flexibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:border-accent/50 transition-colors">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}