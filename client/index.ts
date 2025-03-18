import {
  splitLink,
  createTRPCClient,
  unstable_httpBatchStreamLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";
import "../data/initData.ts";
import type { AppRouter } from "../server/index.ts";

const trpc = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === "subscription",
      true: unstable_httpSubscriptionLink({
        url: "http://localhost:3000",
      }),
      false: unstable_httpBatchStreamLink({
        url: "http://localhost:3000",
      }),
    }),
  ],
});

// Read
const users = (await trpc.users.list.query()).result;
const subjects = (await trpc.subjects.list.query()).result;

console.log("Subjects:", subjects.length);
console.log("Users:", users.length);

{
  console.group("Activities");
  console.group("By subject");
  for (const subject of subjects) {
    const activities = (await trpc.activities.listBySubjectId.query(subject.id.toString())).result;
    console.log(`${subject.value.name} : ${activities.length}`);
  }
  console.groupEnd();
  console.group("By user");
  for (const user of users) {
    const activities = (await trpc.activities.listByUserId.query(user.id.toString())).result;
    console.log(`${user.value.name} : ${activities.length}`);
  }
  console.groupEnd();
  console.groupEnd();
}

// Create
const newUser = await trpc.users.create.mutate({ name: "New user" });
if (newUser.ok === false) throw new Error("Cannot create new user");
console.log("New user", newUser.id);

const newSubject = await trpc.subjects.create.mutate({ name: "New subject" });
if (newSubject.ok === false) throw new Error("Cannot create new subject");
console.log("New subject", newSubject.id);

const newActivity = await trpc.activities.create.mutate({
  grade: 100,
  type: "math",
  date: Date.now(),
  name: "New grade",
  userId: newUser.id,
  subjectId: newSubject.id,
});
if (newActivity.ok === false) throw new Error("Cannot create new user");
console.log("New activity", newActivity.id);

// Modify
const userModified = await trpc.users.editName.mutate({ id: newUser.id, name: "Hello" });
console.log("User modified:", userModified?.value.name);

const subjectModified = await trpc.subjects.editName.mutate({ id: newSubject.id, name: "Changed" });
console.log("Subject modified:", subjectModified?.value.name);

const activityModified = await trpc.activities.edit.mutate({
  id: newActivity.id,
  newValues: { grade: 50 },
});
console.log("Activity modified:", activityModified?.value.grade);

// Delete
const deletedActivity = await trpc.activities.delete.mutate(newActivity.id);
console.log("Deleted activity:", deletedActivity);
