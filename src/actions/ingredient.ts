"use server";

import { ingredientSchema } from "@/schema/zod";
import prisma from "@/utils/prisma";
import { ZodError } from "zod";

export async function createIngredient(formData: FormData) {
  try {
    console.log("formData", formData);

    // подготовим типизированную дату
    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      unit: formData.get("unit") as string,
      pricePerUnit: formData.get("pricePerUnit")
        ? parseFloat(formData.get("pricePerUnit") as string)
        : null,
      description: formData.get("description") as string
    };

    // валидируем дату при помощи zod
    const validatedData = ingredientSchema.parse(data);

    // обновляем базу данных валидированными данными при помощи клиента Призма
    const ingredient = await prisma.ingredient.create({
      data: {
        name: validatedData.name,
        category: validatedData.category,
        unit: validatedData.unit,
        pricePerUnit: validatedData.pricePerUnit,
        description: validatedData.description
      }
    });
    
    return { success: true, ingredient };
  } catch (error) {
    // если ошибка валидации -> выводим мапу из ошибок в консоль
    if (error instanceof ZodError) {
      return { error: error.issues.map((e) => e.message).join(", ") };
      // return { error: error.errors.map((e) => e.message).join(", ") };
    }

    console.error("Ошибка создания ингредиента:", error)
    return { error: "Ошибка создания ингредиента:" }
  }
}

export async function getIngredients() {
  try {
    const ingredients = await prisma.ingredient.findMany();

    return { success: true, ingredients };
  } catch (error) {
    console.error("Ошибка получения ингредиентов:", error);
    return { error: "Ошибка при получении ингредиентов" };
  }
}

export async function deleteIngredient(id: string) {
  try {
    const ingredient = await prisma.ingredient.delete({
      where: { id }
    });

    // возвращаем удаленный объект ингредиента
    return { success: true, ingredient };
  } catch (error) {
    console.error("Ошибка удаления ингредиента:", error);
    return { error: "Ошибка при удалении ингредиента" };
  }
}