import z from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, { message: "O nome do projeto é obrigatório" }),
  link: z.string().min(1, { message: "O link do projeto é obrigatório" }),
  description: z
    .string()
    .min(1, { message: "A descrição do projeto é obrigatória" }),
  thumbnail: z
    .instanceof(File, { message: "A imagem do projeto é obrigatória" })
    .refine((file) => file.size <= 1024 * 1024 * 5, {
      message: "A imagem do projeto deve ter no máximo 5MB",
    }),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
