export const frameworks: Record<string, Record<string, string>> = {
  next: {
    "nextjs-shadcn-ui-tailwindcss-typescript-prettier-darkmode-react-icons":
      "https://github.com/canguden/nextjs-starter.git",
  },
  react: {
    "react-vite-typescript":
      "https://github.com/canguden/react-vite-typescript.git",
    "react-tailwindcss": "https://github.com/canguden/react-basic.git",
    "react-vite-tailwindcss":
      "https://github.com/canguden/react-vite-tailwindcss.git",
  },
  vue: {
    "vue-vite-typescript":
      "https://github.com/canguden/vue-vite-typescript.git",
    "vue3-vite-typescript-tailwindcss":
      "https://github.com/canguden/vue3-vite-ts-twcss.git",
    "nuxt-starter": "https://github.com/canguden/nuxt-starter.git",
  },
};

export function getTemplates(framework: string): string[] {
  return Object.keys(frameworks[framework]);
}
