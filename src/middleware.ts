// промежуточная обработка защищенной страницы "/ingredients", "/recipes". 
// При совпадении пути "/ingredients" и отсутствии авторизации у пользователя -> редирект на страницу ошибок ("/error")

import { NextRequest, NextResponse } from "next/server";
import { getToken, GetTokenParams } from "next-auth/jwt";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // текущий путь. Нпр, "/ingredients", "/about", "/" и т.д.

  // извелакем jwt токен (при наличии, если авторизованная сессия)
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET, // секректный JWT токен 
  }) // token | null

  // защищенные авторизацией пути
  const protectedRoutes = ["/ingredients", "/recipes/new", "/recipes/:path*"];

  if (protectedRoutes.some(route =>
    pathname.startsWith(route.replace(":path*", "")))) {
    if (!token) {
      // если токен не найден в куках (null)
      // Редирект на страницу ошибок, в параметрах передаем текст ошибки
      const url = new URL("/error", request.url);
      url.searchParams.set("message", "Недостаточно прав"); // "message=Недостаточно+прав"
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // если токен найден -> продолжить обработку запроса
}

// See "Matching Paths" below to learn more

// миддлвейр применить только к "/ingredients"
export const config = {
  matcher: ["/ingredients", "/recipes/new", "/recipes/:path*"],
}