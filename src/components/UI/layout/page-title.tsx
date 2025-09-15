"use client";

import { siteConfig } from "@/app/config/site.config";
import { usePathname } from "next/navigation";

const PageTitle = () => {
  const pathName = usePathname();

  // const currentNavBarItem = siteConfig.navBarItems.find(
  //   (item) => item.href === pathName
  // );

  // const pageTitle = currentNavBarItem ? currentNavBarItem.label : siteConfig.title; // если нет такого пункта навигации -> просто название сайта

  const pageTitle = siteConfig.pagesContent[pathName as keyof typeof siteConfig.pagesContent]?.title;
  
  if (pageTitle === undefined) return null;

  return (<div className="w-full flex justify-center my-6">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>)
  
}

export default PageTitle