"use client";

import Link from "next/link";
import { useRecipeStore } from "./store/recipe.store";
import { Button } from "@heroui/button";
import RecipeCard from "@/components/common/recipe-card";

export default function Home() {
  // Store recipes
  const { recipes, isLoading, error } = useRecipeStore();

  return (
    <>
      <div className="flex w-full justify-center items-center mb-4">
        <Link href="/recipes/new">
          <Button color="primary">Добавить рецепт</Button>
        </Link>
      </div>

      {/* Если есть ошибки */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {isLoading && <p>Загрузка...</p>}

      {/* Сетка рецептов на гридах */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map(recipe => (<RecipeCard key={recipe.id} recipe={recipe}/>))}
      </div>
    </>
  );
}
