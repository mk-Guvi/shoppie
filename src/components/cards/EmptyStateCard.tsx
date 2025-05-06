import React from "react";

import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface EmptyStateCardProps {
  emoji?: string;
  title: string;
  description: string;
  buttonText?: string;
  onAction?: () => void;
  showButton?: boolean;
  className?: string;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  emoji = "✨",
  title,
  description,
  buttonText = "Start Again",
  onAction,
  showButton = true,
  className = "",
}) => {
  return (
    <div className={cn("w-full h-full rounded-xl overflow-hidden bg-muted flex flex-col items-center justify-center p-8 text-center",className)}>
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>

      {showButton && onAction && (
        <Button className="mt-4 flex items-center gap-2 text-xs" size="sm" onClick={onAction}>
          <RefreshCw className="h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyStateCard;
