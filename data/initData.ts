import db from "./database.ts";
import { faker } from "@jackfiszr/faker";

await db.deleteAll();

// Init users
if ((await db.superhero.count()) === 0)
  for (let i = 0; i < 10; i++)
    await db.superhero.add({
      email: faker.internet.email(),
      photoURL: faker.image.avatar(),
      name: faker.internet.userName(),
      mainColor: faker.commerce.color(),
      realName: faker.fake("{{name.firstName}} {{name.lastName}}"),
    });
