import User from "./models/User.ts";
import { collection, kvdex } from "kvdex";
import SubjectModel from "./models/Subject.ts";
import ActivityModel from "./models/Activity.ts";

const kv = await Deno.openKv();

export const schema = {
  users: collection(User),
  subjects: collection(SubjectModel),
  activities: collection(ActivityModel, {
    indices: {
      subjectId: "secondary",
      userId: "secondary",
    },
  }),
};

const db = kvdex({ kv, schema });

export default db;
