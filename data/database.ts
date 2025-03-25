import Photo from "./models/Photo.ts";
import { collection, kvdex } from "@olli/kvdex";
import { openKvToolbox } from "@kitsonk/kv-toolbox";

const kv = await Deno.openKv();
export const kvToolbox = await openKvToolbox();

export const schema = {
  photos: collection(Photo, {
    indices: {
      name: "primary",
    },
  }),
};

const db = kvdex({ kv, schema });

export default db;
