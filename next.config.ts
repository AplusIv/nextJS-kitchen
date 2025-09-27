import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Изображения, загруженные не из проверенных источников не будут загружаться, nextJS заблокирует запрос, сборка не пройдет
  // Поэтому необходимо вручную разрешить загрузку определенных доменов в конфиге
  // Для загрузки и обработки используется Image Component nextJS
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eda.ru"
      }
    ]
  }
};

export default nextConfig;
