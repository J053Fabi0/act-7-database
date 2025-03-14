#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "./data/initData.ts";
import "$std/dotenv/load.ts";
import exportData from "./data/exportData.ts";

exportData().catch(console.error);

await dev(import.meta.url, "./main.ts", config);
