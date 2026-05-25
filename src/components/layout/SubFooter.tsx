export default function SubFooter() {
  const year = new Date().getFullYear();

  return (
    <div className="w-full bg-black/30 py-3 px-6" style={{ backgroundColor: "#000810" }}>
      <div className="max-w-272.5 mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
        <span>© {year} B-Bright — Geração B-Bright. Todos os direitos reservados.</span>
        <span>Designed &amp; Developed by <span className="text-white/60 font-semibold">Sintaxy</span></span>
      </div>
    </div>
  );
}
