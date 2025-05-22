
import React from "react";
import { Progress } from "@/components/ui/progress";

interface MultiStepProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const MultiStepProgress: React.FC<MultiStepProgressProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={className}>
      <Progress 
        value={percentage} 
        className="h-2 bg-orange-100"
        indicatorClassName="bg-orange-500"
      />
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
              ${index + 1 <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-600">
        <span>Establishment</span>
        <span>Address</span>
        <span>Contact</span>
        <span>Review</span>
      </div>
    </div>
  );
};
