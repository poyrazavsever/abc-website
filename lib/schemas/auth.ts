import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "E-posta adresinizi girin.")
    .email("Geçerli bir e-posta adresi girin."),
  password: z.string().min(1, "Şifrenizi girin."),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Ad soyad en az 2 karakter olmalı.")
      .max(80, "Ad soyad 80 karakterden uzun olamaz."),
    email: z
      .string()
      .trim()
      .min(1, "E-posta adresinizi girin.")
      .email("Geçerli bir e-posta adresi girin."),
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalı.")
      .max(72, "Şifre 72 karakterden uzun olamaz."),
    confirmPassword: z.string().min(1, "Şifre tekrarını girin."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Şifreler birbiriyle eşleşmiyor.",
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
