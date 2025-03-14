import db from "./database.ts";
import { shuffle, random } from "@es-toolkit/es-toolkit";

// Init roles
if ((await db.roles.count()) === 0)
  db.roles.addMany([{ name: "student" }, { name: "teacher" }, { name: "administrative" }]);

// Init groups
if ((await db.groups.count()) === 0)
  db.groups.addMany([{ name: "beginer" }, { name: "intermediate" }, { name: "advanced" }]);

// Init users
if ((await db.users.count()) === 0) {
  const groups = (await db.groups.getMany()).result;
  const roles = (await db.roles.getMany()).result;

  for (let i = 0; i < 50; i++)
    await db.users.add({
      name: `User ${(i + 1).toString().padStart(4, "0")}`,
      roleId: roles[i % roles.length].id.toString(),
      groupId: groups[i % groups.length].id.toString(),
    });
}

// Init Didactic material
if ((await db.didacticMaterials.count()) === 0)
  for (let i = 0; i < 50; i++)
    await db.didacticMaterials.add({ file: `File ${(i + 1).toString().padStart(4, "0")}` });

// Init courses
if ((await db.courses.count()) === 0) {
  const didacticMaterials = (await db.didacticMaterials.getMany()).result;
  const groups = (await db.groups.getMany()).result;

  for (let i = 0; i < 10; i++)
    await db.courses.add({
      title: `Course ${(i + 1).toString().padStart(4, "0")}`,
      cover: "Cover",
      content: "Content",
      didacticMaterialsIds: shuffle(didacticMaterials)
        .slice(0, random(Math.min(didacticMaterials.length, 10)))
        .map((d) => d.id.toString()),
      groupsIds: shuffle(groups)
        .slice(0, 2)
        .map((d) => d.id.toString()),
    });
}
