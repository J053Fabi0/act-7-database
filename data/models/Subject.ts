import { z } from "zod";

export type Subject = z.infer<typeof SubjectModel>;

const SubjectModel = z.object({
  name: z.string(),
});

export default SubjectModel;
