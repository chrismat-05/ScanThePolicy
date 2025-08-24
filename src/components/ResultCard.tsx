import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ResultCardProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  className?: string;
}

const ResultCard = ({ title, icon: Icon, items, className }: ResultCardProps) => {
  return (
    <Card className={`category-card p-6 rounded-2xl ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground italic">No significant concerns identified</p>
        )}
      </div>
    </Card>
  );
};

export default ResultCard;