import {
  CircleUser,
  Github,
  LucideBanknoteArrowUp,
  User,
  Users,
  Zap,
} from "lucide-react";
import type { FeatureCardProps } from "./FeatureCard";
import { FeatureCard } from "./FeatureCard";

const features: FeatureCardProps[] = [
  {
    title: "Global Multiplayer",
    description: "Play online with random players in real time.",
    icon: Users,
  },
  {
    title: "Guest Mode",
    description:
      "Jump straight into the action without registration. Perfect for quick games and learning.",
    icon: User,
  },
  {
    title: "Fast",
    description:
      "Jump straight into the action without registration. Perfect for quick games and learning.",
    icon: Zap,
  },
  {
    title: "Scalable",
    description:
      "Jump straight into the action without registration. Perfect for quick games and learning.",
    icon: LucideBanknoteArrowUp,
  },
  {
    title: "Open Source",
    description:
      "Jump straight into the action without registration. Perfect for quick games and learning.",
    icon: Github,
  },
  {
    title: "Contact",
    description:
      "Jump straight into the action without registration. Perfect for quick games and learning.",
    icon: CircleUser,
  },
];
export const FeatureSection = () => {
  return (
    <section className="flex flex-wrap justify-center gap-x-4 gap-y-4">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </section>
  );
};
