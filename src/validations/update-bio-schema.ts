import z from "zod";

export const updateBioSchema = z.object({
  description: z.string().optional(),
});

export type UpdateBioSchema = z.infer<typeof updateBioSchema>;
