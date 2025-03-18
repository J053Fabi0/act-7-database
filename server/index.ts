// server/index.ts

import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { publicProcedure, router } from "./trpc.ts";
import db from "../data/database.ts";
import SuperheroModel from "../data/models/Suerhero.ts";

const appRouter = router({
  superhero: {
    list: publicProcedure.query(async () => {
      const superheros = await db.superhero.getMany();
      return superheros;
    }),
    byName: publicProcedure.input(z.string()).query(async (opts) => {
      const { input } = opts;
      const superheros = await db.superhero.findBySecondaryIndex("name", input);
      return superheros;
    }),
    create: publicProcedure.input(SuperheroModel).mutation(async (opts) => {
      const { input } = opts;
      const superhero = await db.superhero.add(input);
      return superhero;
    }),
    editName: publicProcedure.input(z.object({ name: z.string(), id: z.string() })).mutation(async (opts) => {
      const { input } = opts;
      await db.superhero.update(input.id, { name: input.name });
      return db.superhero.find(input.id);
    }),
    delete: publicProcedure.input(z.string()).mutation(async (opts) => {
      const { input } = opts;
      await db.superhero.delete(input);
      return true;
    }),
  },
});

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);

console.log(`Server running on port 3000`);
