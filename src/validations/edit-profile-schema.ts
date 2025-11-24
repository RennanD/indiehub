import z from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  description: z
    .string({ message: "A descrição é obrigatória" })
    .min(1, { message: "A descrição é obrigatória" }),
  avatar: z.optional(z.instanceof(File)),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
