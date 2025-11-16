import { z } from "zod";

export const createLinkSchema = z.object({
  slug: z
    .string()
    .min(3, { message: "O slug deve ter pelo menos 3 caracteres" })
    .max(20, { message: "O slug deve ter no máximo 20 caracteres" }),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;
