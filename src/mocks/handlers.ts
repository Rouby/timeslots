import { rest } from "msw";
import time_slots from "./time_slots.json";

export const handlers = [
  rest.get("/time_slots", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(time_slots));
  }),
];
