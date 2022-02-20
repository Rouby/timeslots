import { render } from "react-dom";
import { App } from "./App";

if (import.meta.env.DEV) {
  import("./mocks/browser").then(({ worker }) => worker.start());
}

render(<App />, document.getElementById("root"));
