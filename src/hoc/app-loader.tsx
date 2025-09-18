"use client"

import { useAuthStore } from "@/app/store/auth.store";
import { useIngredientStore } from "@/app/store/ingredient.store";
import { useRecipeStore } from "@/app/store/recipe.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

// AppLoader загружает данные при загрузке/обновлении приложения

const AppLoader = ({ children }: IProps) => {
  const { data: session, status } = useSession(); // получение доступа к текущей сессии авторизованного пользователя
  console.log('session:', session);
  console.log('status:', status);

  //  работа с состоянием авторизации
  const { isAuth, setAuthState } = useAuthStore();

  // работа с состоянием ингредиентов
  const { ingredients, loadIngredients } = useIngredientStore();
  // console.log("DB ingredients:", ingredients);

  // работа с состоянием рецептов
  const { loadRecipes } = useRecipeStore();


  // обновление состояния приложения при авторизации/выходе/сессии
  useEffect(() => {
    setAuthState(status, session);
  }, [session, status, setAuthState])

  // получение ингредиентов у авторизованного пользователя
  useEffect(() => {
    if (isAuth) {
      loadIngredients();
    }
  }, [isAuth, loadIngredients])

  // получение рецептов пользователя
  useEffect(() => {
    loadRecipes();
  }, [loadRecipes])
  

  return (
    <>{children}</>
  )
}

export default AppLoader