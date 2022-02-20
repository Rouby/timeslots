import { rest } from "msw";
import time_slots from "./time_slots.json";

export const handlers = [
  rest.get("/time_slots", async (req, res, ctx) => {
    ///await new Promise((res) => setTimeout(res, Math.random() * 3000 + 1000));
    return res(ctx.status(200), ctx.json(time_slots));
  }),
];
