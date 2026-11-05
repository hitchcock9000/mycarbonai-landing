import { DocumentFlow } from "./DocumentFlow";
import { ProcessSteps } from "./ProcessSteps";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative bg-cream py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] items-start gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <p className="kicker flex items-center gap-3 text-ink/55">
            <span className="inline-block h-0.5 w-8 bg-cyan" />
            Como funciona
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-ink lg:text-[2.75rem]">
            De documentos à informação pronta a explorar.
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/75">
            Partimos dos documentos da sua operação, organizamos os dados e revemos a informação,
            mantendo sempre a ligação à sua origem.
          </p>
          <ol className="mt-10 space-y-5">
            <li className="flex gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan font-bold text-ink">1</span>
              <div>
                <h3 className="font-bold text-ink">Documentos da operação</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Faturas de energia e água, relatórios de resíduos e registos de fornecedores.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan font-bold text-ink">2</span>
              <div>
                <h3 className="font-bold text-ink">Dados organizados e revistos</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  A informação é estruturada e conferida, sem substituir o que está nos documentos.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan font-bold text-ink">3</span>
              <div>
                <h3 className="font-bold text-ink">Próximos passos a explorar</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Com a base organizada, o hotel pode ver onde está a informação e o que ainda falta.
                </p>
              </div>
            </li>
          </ol>
        </div>
        <div>
          <DocumentFlow />
        </div>
      </div>
      <div className="mx-auto mt-20 max-w-[1100px] px-6 lg:px-10">
        <ProcessSteps />
      </div>
    </section>
  );
}
