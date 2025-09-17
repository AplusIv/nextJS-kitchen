"use server";

import prisma from "@/utils/prisma";

// Recipe CRUD

export async function getRecipes() {
  try {
    // для загрузки рецептов используем дополнительно таблицы ингредиентов и сводную таблицу RecipeIngredient
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          }
        }
      }
    });

    return { success: true, recipes };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { success: false, error: "Ошибка при загрузке рецептов" };
  }
}

export async function createRecipe(formData: FormData) {
  try {
    // взять поля из формы
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string | null;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("ingredient_")) // все ключи, начнающиеся с "ingredient_"
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(
          formData.get(`quantity_${key.split("_")[1]}`) as string
        )
      }));

    /*  
    [
      {ingredientId: "214142krlkv34", quantity: 100},
      {ingredientId: "4388t48fdhfv283", quantity: 170},
    ]
    */

    // Проверка наличия рецепта и хотя бы одного ингредиента в нём
    if (!name || ingredients.length === 0) {
      return {
        success: false,
        error: "Имя и хотя бы один ингредиент обязательны"
      };
    }

    // Создание нового рецепта
    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity
          }))
        }
      },
      // работа со связанными таблицами
      include: {
        ingredients: {
          include: {
            ingredient: true,
          }
        }
      }
    })

    return { success: true, recipe };
  } catch (error) {
    console.error("Error creating recipe:", error);
    return { success: false, error: "Ошибка при создании рецепта" };
  }
}

export async function updateRecipe(id: string, formData: FormData) {
  try {
    // взять поля из формы
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string | null;

    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("ingredient_")) // все ключи, начнающиеся с "ingredient_"
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(
          formData.get(`quantity_${key.split("_")[1]}`) as string
        )
      }));

    // Проверка наличия рецепта и хотя бы одного ингредиента в нём
    if (!name || ingredients.length === 0) {
      return {
        success: false,
        error: "Имя и хотя бы один ингредиент обязательны"
      };
    }

    // обновление данных в рецепте
    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          deleteMany: {}, // удаление старых записей
          create: ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity
          }))
        }
      },
      // работа со связанными таблицами
      include: {
        ingredients: {
          include: {
            ingredient: true,
          }
        }
      }
    });

    return { success: true, recipe };
  } catch (error) {
    console.error("Error updating recipe:", error);
    return { success: false, error: "Ошибка при обновлении рецепта" };
  }
}

export async function deleteRecipe(id: string) {
  try {
    // удалить связи с таблицей recipeIngredient
    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: id }
    })

    // удаление рецепта в главной таблице
    await prisma.recipe.delete({
      where: { id }
    })

    return { success: true };

  } catch (error) {
    console.error("Error deleting recipe:", error);
    return { success: false, error: "Ошибка при удалении рецепта" };
  }
}