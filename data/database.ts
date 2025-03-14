import Role from "./models/Role.ts";
import User from "./models/User.ts";
import Group from "./models/Group.ts";
import Course from "./models/Course.ts";
import { collection, kvdex } from "kvdex";
import DidacticMaterial from "./models/DidacticMaterial.ts";

const kv = await Deno.openKv();

export const schema = {
  users: collection(User),
  roles: collection(Role),
  groups: collection(Group),
  courses: collection(Course),
  didacticMaterials: collection(DidacticMaterial),
};

const db = kvdex({ kv, schema });

export default db;
