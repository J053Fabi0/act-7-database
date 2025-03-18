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
{
  const superheros = await trpc.superhero.list.query();
  console.log("Superheros:", superheros.result.length);
}

// Create

const createdSuperhero = await trpc.superhero.create.mutate({
  name: "Denosaur",
  email: "dino@dino.com",
  mainColor: "Green",
  photoURL: "https://photo.com",
  realName: "Felix Guzmán",
});
console.log("Created superhero:", createdSuperhero.ok);

if (createdSuperhero.ok === false) throw new Error("Cannot create superhero");

// Read
{
  const superhero = await trpc.superhero.byName.query("Denosaur");
  console.log("Superhero:", superhero.result.at(0)?.value.name);
}

// Edit
{
  const superhero = await trpc.superhero.editName.mutate({
    id: createdSuperhero.id,
    name: "New name",
  });

  console.log("Name changed:", superhero?.value.name);
}

// Delete
{
  const deleted = await trpc.superhero.delete.mutate(createdSuperhero.id);
  console.log(deleted);
}
