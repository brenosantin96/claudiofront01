/// <reference types="vite/client" />

export {};

declare global {
    namespace NodeJS {
      interface ImportMeta {
        readonly VITE_APP_PORT: string;
      }
    }
  }