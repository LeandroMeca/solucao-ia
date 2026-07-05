import { PiggyBank } from 'lucide-react';
import { FormStep } from './FormStep';
import { StepProgress } from './Progress';

export function SimulationForm() {
  return (
    <>
      <StepProgress currentStep={6} totalSteps={100} />
      <FormStep
        icon={PiggyBank}
        title="Renda mensal bruta"
        question="Quanto é depositado na sua conta todo mês (somando todas as fontes)?"
        inputProps={{ type: 'text', placeholder: 'ex 8.000,00', prefix: 'R$' }}
      />
    </>
  );
}
