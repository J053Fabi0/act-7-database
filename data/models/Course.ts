import { z } from "zod";

export type Course = z.infer<typeof CourseModel>;

const CourseModel = z.object({
  title: z.string(),
  cover: z.string(),
  content: z.string(),
  groupsIds: z.array(z.string()),
  didacticMaterialsIds: z.array(z.string()),
});

export default CourseModel;
