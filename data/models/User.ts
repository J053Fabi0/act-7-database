import { z } from "zod";

export type User = z.infer<typeof UserModel>;

const UserModel = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.union([z.string(), z.null()]),
  groupId: z.union([z.string(), z.null()]),
});

export default UserModel;
