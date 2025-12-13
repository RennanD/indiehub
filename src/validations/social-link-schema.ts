import z from "zod";

export const socialLinkSchema = z.object({
  url: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() === "" || z.string().url().safeParse(val).success,
      {
        message: "URL inválida",
      },
    ),
  platform: z.enum(["x", "instagram", "linkedin", "tiktok", "threads", "github"]),
});

export type SocialLinkSchema = z.infer<typeof socialLinkSchema>;

