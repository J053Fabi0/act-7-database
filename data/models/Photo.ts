import { z } from "zod";

export type Photo = z.infer<typeof PhotoModel>;

const PhotoModel = z.object({
  date: z.date(),
  name: z.string(),
});

export default PhotoModel;
