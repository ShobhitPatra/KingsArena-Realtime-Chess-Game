import z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, { message: "required field" }),
    email: z.string().email({ message: "enter a valid email" }),
    password: z.string().min(6, { message: "password too short" }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  email: z.string().email({ message: "enter a valid email" }),
  password: z.string().min(6, { message: "password too short" }),
});
