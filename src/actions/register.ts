"use server";

import { IFormData } from "@/types/form-data";
import { saltAndHashPassword } from "@/utils/password";
import prisma from "@/utils/prisma";

export async function registerUser(formData: IFormData) {
  const { email, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    return { error: "Пароли не совпадают" };
  }

  if (password.length < 6) {
    return { error: "Пароль должен быть не менее 6 символов" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { error: "Пользователь с таким email уже существует" };
    }

    const passwordHash = await saltAndHashPassword(password); // генерация хэшированного пароля

    const user = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
      }
    })
    console.log('create user', user);
    return user;
  } catch (error) {
    console.error('Ошибка при регистрации: ', error);
    return { error: 'Ошибка при регистрации: ' };
  }
}