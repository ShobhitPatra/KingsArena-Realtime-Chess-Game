import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";
export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}
export const FeatureCard = ({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) => {
  return (
    <Card className="text-gray-700 bg-gray-100 w-80 p-8 text-center shadow-elegant hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-8 h-8 " />
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};
