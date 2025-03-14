import { z } from "zod";

export type Group = z.infer<typeof GroupModel>;

const GroupModel = z.object({
  name: z.string(),
});

export default GroupModel;
