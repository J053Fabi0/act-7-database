import { z } from "zod";

export type User = z.infer<typeof UserModel>;

const UserModel = z.object({
  name: z.string(),
});

export default UserModel;
