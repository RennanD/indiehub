"use client";

import { Button } from "@/components/ui/button";

type Step = "welcome" | "bio" | "project" | "share" | "success";

interface OnboardingNavigationProps {
  currentStep: Step;
  onNext: (step: Step, projectId?: string) => void;
  onSkip: (step: Step) => void;
  projectId?: string;
}

export function OnboardingNavigation({
  currentStep,
  onNext,
  onSkip,
  projectId,
}: OnboardingNavigationProps) {
  const getNextStep = (): Step => {
    switch (currentStep) {
      case "welcome":
        return "bio";
      case "bio":
        return "project";
      case "project":
        // Se não tem projectId, vai direto para success
        return projectId ? "share" : "success";
      case "share":
        return "success";
      default:
        return "success";
    }
  };

  const handleNext = async () => {
    const nextStep = getNextStep();
    await onNext(nextStep);
  };

  const handleSkip = () => {
    const nextStep = getNextStep();
    onSkip(nextStep);
  };

  if (currentStep === "success") {
    return null;
  }

  return (
    <div className="flex justify-end items-center gap-4 mt-6">
      <Button variant="ghost" onClick={handleSkip}>
        Pular
      </Button>
      <Button onClick={handleNext}>Próximo</Button>
    </div>
  );
}
