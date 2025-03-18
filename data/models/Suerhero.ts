import { z } from "zod";

export type Superhero = z.infer<typeof SuperheroModel>;

const SuperheroModel = z.object({
  name: z.string(),
  realName: z.string(),
  mainColor: z.string(),
  email: z.string().email(),
  photoURL: z.string().url(),
});

export default SuperheroModel;
