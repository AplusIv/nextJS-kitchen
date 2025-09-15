import bcrypt from "bcryptjs";

export async function saltAndHashPassword(password: string): Promise<string> {
  const saltRounds = 10; // соль - случайная сгенерированная строка, которая добавится перед хэшированием

  return await bcrypt.hash(password, saltRounds);
}