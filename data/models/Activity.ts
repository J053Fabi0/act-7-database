import { z } from "zod";

export type Activity = z.infer<typeof ActivityModel>;

const ActivityModel = z.object({
  name: z.string(),
  grade: z.number(),
  userId: z.string(),
  subjectId: z.string(),
  type: z.string().toLowerCase(),
  date: z.number().default(() => Date.now()),
});

export default ActivityModel;
