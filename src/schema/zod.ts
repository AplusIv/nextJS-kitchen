import z, { number, object, string } from "zod"

export const signInSchema = object({
  // email: string({ required_error: "Email is required" })
  email: string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  // password: string({ required_error: "Password is required" })
  password: string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const ingredientSchema = object({
  name: string().min(1, "Название обязательно"),
  category: z.enum([
    "VEGETABLES",
    "FRUITS",
    "MEAT",
    "DAIRY",
    "SPICES",
    "OTHER"
  ]),
  unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
  // pricePerUnit: number({ invalid_type_error: "Цена должна быть числом" })
  pricePerUnit: number({ error: "Цена должна быть числом" })
    .min(0, "Цена должна быть положительной")
    .nullable(),
  description: z.string().optional()
});