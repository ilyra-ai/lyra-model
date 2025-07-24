import { MadeWithDyad } from "@/components/made-with-dyad";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">Bem-vindo à Plataforma de IA</h1>
        <p className="text-lg text-center text-muted-foreground">
          Clique no botão abaixo para acessar a interface da sua plataforma de IA.
        </p>
        <Link href="/ai-platform" passHref>
          <Button className="px-6 py-3 text-lg">
            Acessar Plataforma de IA
          </Button>
        </Link>
      </main>
      <MadeWithDyad />
    </div>
  );
}