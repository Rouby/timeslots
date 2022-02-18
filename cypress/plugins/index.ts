import { startDevServer } from "@cypress/vite-dev-server";
import react from "@vitejs/plugin-react";

export default function (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) {
  on("dev-server:start", (options) => {
    const viteConfig = {
      plugins: [react({ fastRefresh: false })],
    };
    return startDevServer({ options, viteConfig });
  });
}
