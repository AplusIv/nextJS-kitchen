"use client";

import { useRecipeStore } from '@/app/store/recipe.store';
import RecipeForm from '@/forms/recipe.form';
import { IRecipe } from '@/types/recipe';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditRecipePage = () => {
  // извлечение параметров после "recipes/"
  const { id } = useParams();
  const { recipes, isLoading, error } = useRecipeStore();

  // конкретный найденный рецепт для редактирования
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  // статус: поиск произведён или нет
  const [hasSearched, setHasSearched] = useState(false);

  // поиск нужного рецепта из стора
  useEffect(() => {
    if (recipes.length > 0 || error) {
      const foundRecipe = recipes.find(recipe => recipe.id === id);
      setRecipe(foundRecipe || null); // либо null если рецепт не найден
      setHasSearched(true);
    }
  }, [recipes, id, error]);

  if (isLoading) return <p className="text-center">Загрузка...</p>;

  if (error) return (<p className="text-red-500 mb-4">{error}</p>);

  if (hasSearched && !recipe) return (<p className="text-red-500 text-center">Рецепт не найден</p>);

  if (recipe) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          Редактировать рецепт: {recipe.name}
        </h1>
        <RecipeForm initialRecipe={recipe} />
      </div>
    );
  };

  // Данные загружаются, рецепт пока не найден, ошибки тоже нет
  return <p className="text-center">Загрузка...</p>;
}

export default EditRecipePage