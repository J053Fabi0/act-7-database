import db, { kvToolbox } from "../data/database.ts";
import { Handlers, type PageProps } from "$fresh/server.ts";

interface Props {
  message: string | null;
  filenames: string[];
}

const getFilenames = async () =>
  (await db.photos.getMany()).result
    .toSorted((a, b) => b.value.date.valueOf() - a.value.date.valueOf())
    .map((f) => f.value.name);

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    return ctx.render({ message: null, filenames: await getFilenames() });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const file = form.get("file") as File;

    if ((await db.photos.findByPrimaryIndex("name", file.name)) !== null)
      return ctx.render({ message: "Filename already exists", filenames: await getFilenames() });

    const newPhoto = await db.photos.add({ date: new Date(), name: file.name });
    if (newPhoto.ok === false)
      return ctx.render({ message: "Error creando newPhoto", filenames: await getFilenames() });

    const newPhotoFile = await kvToolbox.setBlob([newPhoto.id], file);
    if ((newPhotoFile.ok as boolean) === false) {
      await db.photos.delete(newPhoto.id);
      return ctx.render({ message: "Error creando newPhotoFile", filenames: await getFilenames() });
    }

    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, { status: 303, headers });
  },
};

export default function Home(props: PageProps<Props>) {
  const { message, filenames } = props.data;
  const filenamesChunks: [string[], string[], string[], string[]] = [[], [], [], []];
  for (let i = 0; i < filenames.length; i++) filenamesChunks[i % 4].push(filenames[i]);

  return (
    <div class="px-4 py-8 mx-auto h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        {message ? <p className="bg-red-600 text-white py-1 px-2 rounded-md">{message}</p> : null}

        <h1 class="text-4xl font-bold mb-4">Subir fotos</h1>

        <form method="post" encType="multipart/form-data" className="flex flex-col justify-center">
          <fieldset className="border-2 border-gray-300 p-4 rounded-md">
            <label className="block">
              Foto
              <input
                required
                type="file"
                name="file"
                accept="image/png, image/jpeg"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </label>

            <div className="flex justify-center">
              <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Subir
              </button>
            </div>
          </fieldset>
        </form>

        {filenames.length === 0 ? null : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {filenamesChunks.map((filenames, i) => (
              <div key={filenames.join("") + i} className="grid gap-4">
                {filenames.map((filename, j) => (
                  <div key={filename + j}>
                    <img alt={filename} src={`./files/${filename}`} className="h-auto max-w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
