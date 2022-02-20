/// <reference types="vite/client" />

// This landed in ESNext-lib already, see https://github.com/microsoft/TypeScript/pull/47740
// Can be removed once released
declare namespace Intl {
  interface DateTimeFormat {
    formatRange(startName: Date, endNumber: Date): string;
  }
}
