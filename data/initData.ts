import db from "./database.ts";
import { faker } from "@jackfiszr/faker";
import { sample } from "@es-toolkit/es-toolkit";

// Init roles
if ((await db.roles.count()) === 0)
  db.roles.addMany([{ name: "student" }, { name: "teacher" }, { name: "administrative" }]);

// Init groups
if ((await db.groups.count()) === 0)
  db.groups.addMany([{ name: "beginer" }, { name: "intermediate" }, { name: "advanced" }]);

// Init users
if ((await db.users.count()) === 0) {
  const roles = (await db.roles.getMany()).result;
  const groups = (await db.groups.getMany()).result;

  await db.users.add({
    name: "Admon",
    password: "Adm@2022",
    email: "admon@robotics.com",
    roleId: roles.find((r) => r.value.name === "administrative")?.id ?? null,
    groupId: null,
  });

  await db.users.add({
    name: "Tecmilenio",
    password: "Adm@2022",
    email: "tecmilenio@robotics.com",
    roleId: roles.find((r) => r.value.name === "teacher")?.id ?? null,
    groupId: null,
  });

  await db.users.add({
    name: "Student",
    password: "Adm@2022",
    email: "student@robotics.com",
    roleId: roles.find((r) => r.value.name === "student")?.id ?? null,
    groupId: sample(groups).id,
  });
}

// Init Didactic material
if ((await db.didacticMaterials.count()) === 0) {
  await db.didacticMaterials.add({ file: "StarterKit" });
  await db.didacticMaterials.add({ file: "Educational Robotics Kit" });
  await db.didacticMaterials.add({ file: "Kit5" });
}

// Init courses
if ((await db.courses.count()) === 0) {
  const groups = (await db.groups.getMany()).result;
  const didacticMaterials = (await db.didacticMaterials.getMany()).result;

  for (let i = 0; i < 100; i++)
    await db.courses.add({
      title: faker.fake("{{commerce.productName}}"),
      cover: faker.fake("{{company.catchPhrase}}"),
      content: faker.lorem.paragraph(),
      didacticMaterialsIds: [sample(didacticMaterials).id],
      groupsIds: [sample(groups).id],
    });
}
