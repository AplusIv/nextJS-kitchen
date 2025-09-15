"use client";

import { siteConfig } from "@/app/config/site.config";
import { usePathname } from "next/navigation";

import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

const PageContent = () => {
  const pathName = usePathname();

  // Типизациция keyof typeof: pathName может быть только одним из ключей объекта pagesContent
  const pageContent = siteConfig.pagesContent[pathName as keyof typeof siteConfig.pagesContent];

  if (!pageContent) {
    return <p>Страница временно отсутствует</p>
  }

  // Экранирование html при помощи dompurify
  const cleanHTML = DOMPurify.sanitize(pageContent.content);

  return (
    <div>{parse(cleanHTML)}</div>
  )
}

export default PageContent