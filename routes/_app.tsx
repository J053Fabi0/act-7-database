import Navbar from "../components/Navbar.tsx";
import { type PageProps } from "$fresh/server.ts";

export default function App({ Component, route }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>act11</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="min-h-screen flex flex-col">
        <Navbar route={route} />

        <div class="px-4 pt-4 mx-auto w-full max-w-screen-lg flex-1">
          <Component />
        </div>

        <div class="mt-6 py-5 bg-gray-300 text-black">
          <div class="px-4 mx-auto w-full max-w-screen-lg flex justify-center items-center gap-2">
            Footer
          </div>
        </div>
      </body>
    </html>
  );
}
