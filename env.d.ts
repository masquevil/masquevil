/// <reference types="vite/client" />
/// <reference types="vue-router/auto" />

declare module '*.md' {
  const content: string;
  export default content;
}
