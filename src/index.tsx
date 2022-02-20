import { render } from "react-dom";
import { App } from "./App";

// for github pages disable the conditional use of msw
//if (import.meta.env.DEV) {
import("./mocks/browser").then(({ worker }) => worker.start());
//}

render(<App />, document.getElementById("root"));
