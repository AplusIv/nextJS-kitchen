"use client" // директива для подключения клиентских компонентов

import { layoutConfig } from "@/app/config/layout.config";
import { siteConfig } from "@/app/config/site.config";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "../modals/login.modal";
import RegistrationModal from "../modals/registration.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/app/store/auth.store";

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt={siteConfig.title}
      width={26}
      height={26}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname(); // строка url после базового

  const { isAuth, session, status, setAuthState } = useAuthStore();

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.error("sign out error", error);
    }

    setAuthState("unauthenticated", null);
  }

  const getNavBarItems = () => {
    return siteConfig.navBarItems
    .filter(item => {
      if (item.href === '/ingredients') {
        return isAuth; // вернёт true/false  в зависимости от того авторизован ли пользователь
      }
      return true;
      // если пользователь не авторизован -> не покажет меню ингредиентов
    })
    .map(item => {
      const isActive = pathname === item.href;

      return (<NavbarItem key={item.href}>
        <Link
          color="foreground"
          href={item.href}
          className={`px-3 py-1 
            ${isActive ? "text-blue-500" : "text-foreground"} 
            hover:text-blue-300 hover:border
            hover:border-blue-300 hover:rounded-md
            transition-colors
            transition-border
            duration-200`}>
          {item.label}
        </Link>
      </NavbarItem>)
    })
  }

  return (
    <Navbar style={{
      height: layoutConfig.headerHeight
    }}>
      <NavbarBrand>
        <Link href="/" className="flex gap-1">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavBarItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex"> */}
        {isAuth && <p>Привет, {session?.user?.email}!</p>}
        {status === "loading" ? (<p>Загрузка...</p>) : !isAuth ? (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="secondary"
                href="#"
                variant="flat"
                onPress={() => setIsLoginOpen(true)}
              >
                Логин
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Регистрация
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="secondary"
              href="#"
              variant="flat"
              onPress={handleSignOut}
            >
              Выйти
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Модалки */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)} />
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)} />
    </Navbar>
  );
}
