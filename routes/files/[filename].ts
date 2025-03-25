import { parse } from "@std/path";
import { Handlers } from "$fresh/server.ts";
import db, { kvToolbox } from "../../data/database.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { pathname } = new URL(req.url);
    const filename = parse(pathname).base;

    const photoRecordId = await db.photos.findByPrimaryIndex("name", filename);
    if (photoRecordId === null) return ctx.renderNotFound();

    const file = await kvToolbox.getAsBlob([photoRecordId.id]);
    if (file === null || file instanceof File === false) {
      await db.photos.delete(photoRecordId.id).catch(() => undefined);
      await kvToolbox.delete([photoRecordId.id]).catch(() => undefined);
      return ctx.renderNotFound();
    }

    const headers = new Headers();
    headers.set("Content-Type", file.type);
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    return new Response(file, { status: 200, headers });
  },
};
