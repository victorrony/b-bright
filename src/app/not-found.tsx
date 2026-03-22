import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-proxima text-[80px] font-bold leading-none text-primary">
        404
      </p>
      <h1 className="font-proxima font-bold text-[32px] text-navy uppercase">
        Página não encontrada
      </h1>
      <p className="text-gray-500 max-w-md">
        A página que procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="rounded-full px-8 py-3 font-bold text-sm text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        Voltar ao início
      </Link>
    </div>
  );
}
