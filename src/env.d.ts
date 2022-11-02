/* export {};

declare global {
    namespace NodeJS {
      interface ImportMeta {
        readonly VITE_APP_PORT: string;
      }
    }
  } */


  interface ImportMetaEnv {
    VITE_PORT?: string;
    VITE_AUTH_TOKEN?: string;
  }