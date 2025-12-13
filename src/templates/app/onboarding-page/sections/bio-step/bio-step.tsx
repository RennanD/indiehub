"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { updateBio } from "@/actions/update-bio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { UpdateBioSchema } from "@/validations/update-bio-schema";
import { updateBioSchema } from "@/validations/update-bio-schema";

const SEO_DESCRIPTION_SIZE = 70;

interface BioStepProps {
  onNext: (step: "project" | "share" | "success") => void;
  onSkip: (step: "project" | "share" | "success") => void;
  initialDescription?: string;
  profileId: string;
}

export interface BioStepRef {
  save: () => Promise<void>;
}

export const BioStep = forwardRef<BioStepRef, BioStepProps>(
  ({ initialDescription = "", profileId }, ref) => {
    const [characterCount, setCharacterCount] = useState(
      SEO_DESCRIPTION_SIZE - initialDescription.length,
    );

    const form = useForm<UpdateBioSchema>({
      resolver: zodResolver(updateBioSchema),
      defaultValues: {
        description: initialDescription || "",
      },
    });

    const { field: descriptionField } = useController({
      name: "description",
      control: form.control,
    });

    function handleChangeDescription(value: string) {
      descriptionField.onChange(value);
      setCharacterCount(SEO_DESCRIPTION_SIZE - value.length);
    }

    async function handleSave() {
      try {
        const data = form.getValues();
        if (data.description) {
          await updateBio(profileId, data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    useImperativeHandle(ref, () => ({
      save: handleSave,
    }));

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Conte sobre você</CardTitle>
          <CardDescription>
            Adicione uma descrição ao seu perfil para que visitantes possam
            conhecer você melhor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descrição</Label>
              <InputGroup
                className={cn({
                  "border-destructive":
                    characterCount < 0 || form.formState.errors.description,
                })}
              >
                <InputGroupTextarea
                  id="description"
                  onChange={(e) => handleChangeDescription(e.target.value)}
                  value={descriptionField.value}
                  placeholder="Conte sobre você"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-muted-foreground text-xs">
                    {characterCount} caracteres restantes
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {form.formState.errors.description && (
                <span className="text-destructive text-sm" role="alert">
                  {form.formState.errors.description.message}
                </span>
              )}
              {characterCount < 0 && (
                <span className="text-destructive text-xs">
                  Você atingiu o limite de caracteres
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  },
);

BioStep.displayName = "BioStep";
