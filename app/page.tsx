import Link from "next/link";

export default function HomePage() {
  const title = "Taboo.AI";

  return (
    <main className="h-full w-full overflow-auto">
      <section className="flex flex-col justify-center items-center h-full w-screen gap-16">
        <h1 className="text-center text-5xl lg:text-8xl drop-shadow-lg">
          {title}
        </h1>
        <Link
          href="/levels"
          className="border-4 border-white text-lg bg-black text-white hover:text-black hover:bg-white hover:border-gray transition-all rounded px-5 lg:text-5xl lg:px-10 lg:py-5 lg:rounded-lg drop-shadow-lg shadow-lg"
        >
          START
        </Link>
      </section>
    </main>
  );
}
