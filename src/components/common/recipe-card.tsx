"use client";

import { useRecipeStore } from "@/app/store/recipe.store";
import { UNIT_ABBREVIATIONS } from "@/constants/select-options";
import { IRecipe } from "@/types/recipe"
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { removeRecipe } = useRecipeStore();

  // лоадер на кнопке при отправке формы
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeRecipe(recipe.id);
      } catch (error) {
        console.log("Ошибка при удалении рецепта:", error);
      }
    })
  }

  // вывод адаптированного описания единиц измерения
  const getUnitLabel = (unit: string) => {
    const unitOption = UNIT_ABBREVIATIONS.find(option => option.value === unit);
    return unitOption ? unitOption.label : unit.toLowerCase();
  }

  return (
    <Card className="w-full min-w-[254px] max-w-[480px] flex flex-col">
      {/* картинка, либо заглушка */}
      <div className="h-48 overflow-hidden">
        {recipe.imageUrl ? (
          <div className="relative h-48 group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
            <Image
              src={recipe.imageUrl}
              alt="Recipe Image"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Нет изображения</span>
          </div>
        )}
      </div>

      {/* Заголовок карточки */}
      <CardHeader className="flex justify-between items-center text-black">
        <h2 className="text-xl font-bold">{recipe.name}</h2>
      </CardHeader>

      <CardBody className="flex-1 text-black">
        <p className="text-gray-600 line-clamp-6">
          {recipe.description || "Без описания"}
        </p>
        <h3 className="mt-4 font-semibold">Ингредиенты:</h3>
        <ul className="list-disc pl-5 overflow-y-auto max-h-24">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.ingredient.name}: {ing.quantity}{" "}
              {getUnitLabel(ing.ingredient.unit)}
            </li>
          ))}
        </ul>
      </CardBody>


      <div className="flex justify-end gap-2 p-4">
        {/* переход по ссылке при редактировании */}
        <Link href={`/recipes/${recipe.id}`}>
          <Button color="primary" variant="light">
            Редактировать
          </Button>
        </Link>
        <Button
          color="danger"
          variant="light"
          onPress={handleDelete}
          isLoading={isPending}
        >
          Удалить
        </Button>
      </div>

    </Card>
  )
}

export default RecipeCard