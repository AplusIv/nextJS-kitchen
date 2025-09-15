"use client"

import { useAuthStore } from "@/app/store/auth.store";
import { useIngredientStore } from "@/app/store/ingredient.store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

const AppLoader = ({ children }: IProps) => {
  const { data: session, status } = useSession(); // получение доступа к текущей сессии авторизованного пользователя
  console.log('session:', session);
  console.log('status:', status);

  //  работа с состоянием авторизации
  const { isAuth, setAuthState } = useAuthStore();

  // работа с состоянием ингредиентов
  const { ingredients, loadIngredients } = useIngredientStore();
  // console.log("DB ingredients:", ingredients);


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


  return (
    <>{children}</>
  )
}

export default AppLoader