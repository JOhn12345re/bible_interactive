/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BIBLE_API_KEY?: string;
  readonly VITE_BIBLE_DEFAULT_VERSION?: string;
  readonly VITE_BIBLE_LANGUAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
