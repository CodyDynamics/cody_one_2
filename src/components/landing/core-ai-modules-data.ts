import type { LucideIcon } from "lucide-react";
import {
  ChartColumn,
  Code2,
  FileSearch,
  FileText,
  ShieldCheck,
  TriangleAlert,
  UserRound,
  Wallet,
} from "lucide-react";

export type CoreFeatureItem = {
  title: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const coreFeatureItems: CoreFeatureItem[] = [
  {
    title: "Patient Access AI",
    description: "Streamline patient intake and scheduling.",
    badge: "40% faster intake",
    icon: UserRound,
  },
  {
    title: "Eligibility Discovery AI",
    description: "Automated verification of active coverage.",
    badge: "99% accuracy",
    icon: FileSearch,
  },
  {
    title: "Prior Authorization AI",
    description: "Streamline authorizations and reduce delays.",
    badge: "98.2% auth success",
    icon: ShieldCheck,
  },
  {
    title: "Coding AI",
    description: "Automated, accurate medical coding.",
    badge: "30% fewer errors",
    icon: Code2,
  },
  {
    title: "Claims AI",
    description: "Optimize claim submission and tracking.",
    badge: "95% clean claims",
    icon: FileText,
  },
  {
    title: "Denial AI",
    description: "Predict and prevent denials before submission.",
    badge: "25% drop in denials",
    icon: TriangleAlert,
  },
  {
    title: "Collections AI",
    description: "Intelligent patient payment follow-ups.",
    badge: "20% higher collection",
    icon: Wallet,
  },
  {
    title: "Analytics AI",
    description:
      "Deep insights and custom dashboards for complete revenue visibility.",
    badge: "Real-time visibility",
    icon: ChartColumn,
    featured: true,
  },
];
