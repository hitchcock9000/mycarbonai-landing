import { Logo } from "./Logo";
import { NAV } from "../data/content";

export function Footer() {
  return (
    <footer id="sobre" className="bg-forest-2 py-16 text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div>
          <Logo showTagline taglineClassName="text-white/50" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65">
            MyCarbonAI organiza informação ambiental da operação hoteleira — energia, água,
            resíduos e fornecedores — para que as equipas vejam o que existe, o que falta e onde
            podem agir. O produto está em validação através de um piloto de design parceiro.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Navegar</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.href}
                    className="text-sm text-white/80 hover:text-cyan"
                    onClick={(e) => {
                      if (n.href === "#hotelaria") {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent("mc-nav", { detail: "#hotelaria" }));
                      }
                    }}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#piloto" className="text-sm text-white/80 hover:text-cyan">
                  Explorar um piloto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Nota</p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Os números apresentados nesta página são exemplos ilustrativos. Não representam
              resultados de hotéis reais nem poupanças garantidas.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 text-xs text-white/40 lg:px-10">
        <p>© {new Date().getFullYear()} MyCarbonAI</p>
        <p>Inteligência ambiental para hotelaria</p>
      </div>
    </footer>
  );
}
