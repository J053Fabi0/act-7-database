interface Page {
  href: string;
  name: string;
}

const pages: Page[] = [
  { href: "/", name: "Home" },
  { href: "/about", name: "About" },
  { href: "/contact", name: "Contact" },
];

export default function Navbar({ route }: { route: string }) {
  return (
    <nav class="bg-gray-300">
      <div class="mx-auto block w-full max-w-screen-lg py-2 px-4 lg:py-3">
        <div class="container mx-auto flex items-center justify-between text-gray-900">
          <ul class="hidden items-center gap-6 lg:flex">
            {pages.map((page) => (
              <li class="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
                <a
                  class={`flex items-center${
                    route === page.href ? " font-bold" : ""
                  }`}
                  href={page.href}
                >
                  {page.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
