import { z } from "zod";

export type Role = z.infer<typeof RoleModel>;

const RoleModel = z.object({
  name: z.string(),
});

export default RoleModel;
