import { Shield, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  score: number;
  className?: string;
}

const RiskBadge = ({ score, className }: RiskBadgeProps) => {
  const getRiskLevel = (score: number) => {
    if (score <= 3) return 'safe';
    if (score <= 6) return 'medium';
    return 'high';
  };

  const getRiskConfig = (level: string) => {
    switch (level) {
      case 'safe':
        return {
          label: 'Low Risk',
          icon: Shield,
          className: 'risk-safe',
          description: 'Privacy-friendly practices'
        };
      case 'medium':
        return {
          label: 'Medium Risk',
          icon: AlertTriangle,
          className: 'risk-medium',
          description: 'Some privacy concerns'
        };
      case 'high':
        return {
          label: 'High Risk',
          icon: AlertCircle,
          className: 'risk-high',
          description: 'Significant privacy risks'
        };
      default:
        return {
          label: 'Unknown',
          icon: Shield,
          className: 'risk-safe',
          description: 'Unable to assess'
        };
    }
  };

  const level = getRiskLevel(score);
  const config = getRiskConfig(level);
  const Icon = config.icon;

  return (
    <div className={cn("inline-flex flex-col items-center space-y-2", className)}>
      <div className={cn(
        "flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105",
        config.className
      )}>
        <Icon className="h-5 w-5" />
        <div className="text-center">
          <div className="text-lg font-bold">{score}/10</div>
          <div className="text-sm opacity-90">{config.label}</div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-[200px]">
        {config.description}
      </p>
    </div>
  );
};

export default RiskBadge;