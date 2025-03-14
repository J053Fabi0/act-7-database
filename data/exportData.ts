import db, { schema } from "./database.ts";

const keys = Object.keys(schema) as (keyof typeof schema)[];

export default async function exportData() {
  const allData: Record<string, unknown> = {};
  for (const key of keys) {
    const data = (await db[key].getMany()).result;
    allData[key] = data.map((d) => ({ id: d.id, value: d.value }));
  }

  await Deno.writeTextFile("./allData.json", JSON.stringify(allData, null, 2));
}
