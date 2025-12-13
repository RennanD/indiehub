"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  BioStep,
  OnboardingNavigation,
  ProjectStep,
  ShareStep,
  SuccessStep,
  WelcomeStep,
} from "./sections";
import type { BioStepRef } from "./sections/bio-step/bio-step";

type Step = "welcome" | "bio" | "project" | "share" | "success";

interface OnboardingPageTemplateProps {
  profileId: string;
  initialDescription: string;
  userName?: string;
}

export function OnboardingPageTemplate({
  profileId,
  initialDescription,
  userName,
}: OnboardingPageTemplateProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = (searchParams.get("step") || "welcome") as Step;
  const projectId = searchParams.get("projectId");
  const bioStepRef = useRef<BioStepRef>(null);

  useEffect(() => {
    // Se não tem step na URL, redireciona para welcome
    if (!searchParams.get("step")) {
      router.replace("/me/onboarding?step=welcome");
    }
  }, [router, searchParams]);

  const handleNext = async (nextStep: Step, nextProjectId?: string) => {
    // Se estiver no step de bio, salvar antes de avançar
    if (step === "bio" && bioStepRef.current) {
      await bioStepRef.current.save();
    }

    const params = new URLSearchParams();
    params.set("step", nextStep);
    if (nextProjectId) {
      params.set("projectId", nextProjectId);
    }
    router.push(`/me/onboarding?${params.toString()}`);
  };

  const handleSkip = (nextStep: Step) => {
    const params = new URLSearchParams();
    params.set("step", nextStep);
    router.push(`/me/onboarding?${params.toString()}`);
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeStep userName={userName} />;
      case "bio":
        return (
          <BioStep
            ref={bioStepRef}
            onNext={handleNext}
            onSkip={handleSkip}
            initialDescription={initialDescription}
            profileId={profileId}
          />
        );
      case "project":
        return (
          <ProjectStep
            onNext={handleNext}
            onSkip={handleSkip}
            profileId={profileId}
          />
        );
      case "share":
        if (!projectId) {
          // Se não tem projectId, volta para project ou vai para success
          router.replace("/me/onboarding?step=project");
          return null;
        }
        return (
          <ShareStep
            projectId={projectId}
            onNext={handleNext}
            onSkip={handleSkip}
            profileId={profileId}
          />
        );
      case "success":
        return <SuccessStep />;
      default:
        router.replace("/me/onboarding?step=welcome");
        return null;
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-background-low">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {renderStep()}
          {step !== "success" &&
            step !== "project" &&
            step !== "share" &&
            step !== "welcome" && (
              <OnboardingNavigation
                currentStep={step}
                onNext={handleNext}
                onSkip={handleSkip}
                projectId={projectId || undefined}
              />
            )}
          {step === "welcome" && (
            <div className="flex justify-end mt-6">
              <Button onClick={() => handleNext("bio")}>Começar</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
