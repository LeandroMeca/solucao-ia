import { PiggyBank } from 'lucide-react';
import { FormStep } from './FormStep';
import { StepProgress } from './Progress';
import { simulationFormSteps } from '@/data/simulation';
import { useState } from 'react';

export const SimulationForm = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = simulationFormSteps.length;
  const currentStep = simulationFormSteps[currentStepIndex];

  const handleNextStpe = () => {
    if (currentStepIndex + 1 > totalSteps - 1) return;
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handlePreviusStep = () => {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex((prev) => prev - 1);
  };

  return (
    <>
      <StepProgress
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
      />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        onBack={handlePreviusStep}
        onNext={handleNextStpe}
        hideBackButton={currentStepIndex === 0}
      />
    </>
  );
};
