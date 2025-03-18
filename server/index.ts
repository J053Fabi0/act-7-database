import { z } from "zod";
import db from "../data/database.ts";
import UserModel from "../data/models/User.ts";
import { publicProcedure, router } from "./trpc.ts";
import SubjectModel from "../data/models/Subject.ts";
import ActivityModel from "../data/models/Activity.ts";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const appRouter = router({
  subjects: {
    list: publicProcedure.query(() => db.subjects.getMany()),
    create: publicProcedure.input(SubjectModel).mutation((opts) => db.subjects.add(opts.input)),
    editName: publicProcedure.input(z.object({ name: z.string(), id: z.string() })).mutation(async ({ input }) => {
      await db.subjects.update(input.id, { name: input.name });
      return db.subjects.find(input.id);
    }),
  },
  users: {
    list: publicProcedure.query(() => db.users.getMany()),
    create: publicProcedure.input(UserModel).mutation((opts) => db.users.add(opts.input)),
    editName: publicProcedure.input(z.object({ name: z.string(), id: z.string() })).mutation(async ({ input }) => {
      await db.users.update(input.id, { name: input.name });
      return db.users.find(input.id);
    }),
  },
  activities: {
    listByUserId: publicProcedure
      .input(z.string())
      .query((o) => db.activities.findBySecondaryIndex("userId", o.input)),
    listBySubjectId: publicProcedure
      .input(z.string())
      .query((o) => db.activities.findBySecondaryIndex("subjectId", o.input)),
    create: publicProcedure.input(ActivityModel).mutation((o) => db.activities.add(o.input)),
    delete: publicProcedure.input(z.string()).mutation(async (o) => {
      await db.activities.delete(o.input);
      return true;
    }),
    edit: publicProcedure
      .input(
        z.object({
          id: z.string(),
          newValues: z.object({
            name: z.string().optional(),
            type: z.string().optional(),
            grade: z.number().optional(),
          }),
        })
      )
      .mutation(async ({ input: i }) => {
        await db.activities.update(i.id, i.newValues);
        return db.activities.find(i.id);
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
