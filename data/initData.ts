import db from "./database.ts";
import { faker } from "@jackfiszr/faker";
import { random, sample } from "@es-toolkit/es-toolkit";

await db.deleteAll();

// Init users
if ((await db.users.count()) === 0)
  for (let i = 0; i < 5; i++) await db.users.add({ name: faker.internet.userName() });

// Init subjects
if ((await db.subjects.count()) === 0)
  for (let i = 0; i < 5; i++) await db.subjects.add({ name: faker.commerce.productName() });

if ((await db.activities.count()) === 0) {
  const types = ["math", "history", "spanish", "computer", "science"];
  const subjects = await db.subjects.getMany();
  const users = await db.users.getMany();

  for (let i = 0; i < 50; i++)
    await db.activities.add({
      type: sample(types),
      grade: random(0, 100),
      userId: sample(users.result).id,
      name: faker.commerce.productName(),
      subjectId: sample(subjects.result).id,
    });
}
