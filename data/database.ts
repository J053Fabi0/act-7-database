import Superhero from "./models/Suerhero.ts";
import { collection, kvdex } from "kvdex";

const kv = await Deno.openKv();

export const schema = {
  superhero: collection(Superhero, {
    indices: {
      email: "primary",
      realName: "secondary",
      name: "secondary",
    },
  }),
};

const db = kvdex({ kv, schema });

export default db;
