export default function SimpleView({ name }: { name: string }) {
  return (
    <div class="mx-auto h-full flex justify-center items-center">
      <h1 className="text-6xl font-bold">{name}</h1>
    </div>
  );
}
