import Photo from "./models/Photo.ts";
import { collection, kvdex } from "@olli/kvdex";
import { openKvToolbox } from "@kitsonk/kv-toolbox";

const kv = await Deno.openKv("./data/db.sqlite3");
export const kvToolbox = await openKvToolbox({ path: "./data/db.sqlite3" });

export const schema = {
  photos: collection(Photo, {
    indices: {
      name: "primary",
    },
  }),
};

const db = kvdex({ kv, schema });

export default db;
