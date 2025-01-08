import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  // Generate an array of steps
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {/* Step Circle */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= step ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            {currentStep > step ? "✓" : step}
          </div>

          {/* Connecting Line (except for the last step) */}
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-1 ${
                currentStep > step ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
