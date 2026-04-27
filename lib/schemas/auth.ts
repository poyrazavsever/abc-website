import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "E-posta adresinizi girin.")
    .email("Gecerli bir e-posta adresi girin."),
  password: z.string().min(1, "Sifrenizi girin."),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Ad soyad en az 2 karakter olmali.")
      .max(80, "Ad soyad 80 karakterden uzun olamaz."),
    email: z
      .string()
      .trim()
      .min(1, "E-posta adresinizi girin.")
      .email("Gecerli bir e-posta adresi girin."),
    password: z
      .string()
      .min(8, "Sifre en az 8 karakter olmali.")
      .max(72, "Sifre 72 karakterden uzun olamaz."),
    confirmPassword: z.string().min(1, "Sifre tekrarini girin."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Sifreler birbiriyle eslesmiyor.",
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
