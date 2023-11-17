export const frameworks: Record<string, Record<string, string>> = {
  next: {
    "nextjs-shadcn-ui-tailwindcss-typescript-prettier-darkmode-react-icons":
      "github:canguden/nextjs-starter#main",
  },
  react: {
    "react-vite-typescript": "github:canguden/react-vite-typescript#main",
    "react-tailwindcss": "github:canguden/react-basic#main",
    "react-vite-tailwindcss": "github:canguden/react-vite-tailwindcss#main",
  },
  vue: {
    "vue-vite-typescript": "github:canguden/vue-vite-typescript#main",
    "vue3-vite-typescript-tailwindcss":
      "github:canguden/vue3-vite-ts-twcss#main",
    "nuxt-starter": "github:canguden/nuxt-starter#main",
  },
};

export function getTemplates(framework: string): string[] {
  return Object.keys(frameworks[framework]);
}
