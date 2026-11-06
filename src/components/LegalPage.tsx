import { Logo } from "./Logo";
import { useLanguage } from "../i18n/LanguageProvider";

type LegalKind = "privacy" | "terms" | "imprint";

type LegalSection = { title: string; paragraphs: string[]; bullets?: string[] };

const copy: Record<"pt" | "en", Record<LegalKind, {
  title: string;
  intro: string;
  draft: string;
  updated: string;
  sections: LegalSection[];
  back: string;
  other: string;
  missingTitle: string;
  missing: string[];
  authority: string;
}>> = {
  pt: {
    imprint: {
      title: "Informações Legais",
      intro: "Identificação e contactos da entidade apresentados numa versão anterior do site. Os dados estão sujeitos a confirmação antes da publicação definitiva.",
      draft: "Rascunho — dados da entidade por confirmar",
      updated: "Informação consultada na versão mycarbonai-1.0 em 5 de novembro de 2026",
      sections: [
        { title: "1. Identificação", paragraphs: ["Denominação social indicada na versão anterior: NATASHA SILVESTRE UNIPESSOAL LDA.", "NIPC, morada completa da sede e registo comercial: a confirmar com a documentação atual da empresa."] },
        { title: "2. Contactos", paragraphs: ["Email geral indicado: info@mycarbonai.com.", "Localização indicada: Portimão, Portugal. Esta localização não substitui a morada legal da sede."] },
        { title: "3. Website e finalidade", paragraphs: ["Endereço indicado: mycarbonai.com. Finalidade descrita: informação institucional sobre o projeto."] },
        { title: "4. Propriedade intelectual", paragraphs: ["Os titulares dos conteúdos, imagens e elementos de marca e as respetivas condições de utilização ainda devem ser confirmados."] },
      ],
      back: "Voltar à página inicial",
      other: "Aviso de Privacidade",
      missingTitle: "Informação necessária para finalizar",
      missing: ["Confirmar a denominação social e a entidade que opera este site", "NIPC e morada completa da sede", "Dados do registo comercial e representante legal, caso aplicável", "Confirmar os contactos e os direitos sobre os conteúdos publicados"],
      authority: "",
    },
    privacy: {
      title: "Aviso de Privacidade",
      intro: "Este aviso descreve, em rascunho, o que esta versão da landing page faz com informação no navegador. Tem de ser completado e confirmado pela entidade responsável antes de publicação como política definitiva.",
      draft: "Rascunho — requer revisão e dados da entidade responsável",
      updated: "Rascunho criado em 5 de novembro de 2026",
      sections: [
        { title: "1. Quem é responsável", paragraphs: ["A versão mycarbonai-1.0 identifica NATASHA SILVESTRE UNIPESSOAL LDA como denominação social da MyCarbonAI. Esse aviso também está marcado como rascunho; a entidade que opera esta landing page tem de confirmar a identidade antes da publicação definitiva. O mesmo aviso indica Portimão, Portugal, mas não fornece a morada completa da sede nem o NIPC."] },
        { title: "2. Informação tratada por esta página", paragraphs: ["A preferência de idioma pode ser guardada no armazenamento local do navegador com a chave “mc-language”, para manter português ou inglês entre visitas.", "O site carrega a tipografia Plus Jakarta Sans através do Google Fonts. Ao pedir essa fonte, o navegador comunica com serviços da Google; a utilização deste fornecedor e a informação técnica associada devem ser confirmadas na configuração final de alojamento.", "O formulário de contacto é apenas uma pré-visualização. Não está ligado a um serviço de envio: os dados introduzidos não são transmitidos nem guardados pelo formulário. Não introduza informação pessoal nesta demonstração."] },
        { title: "3. Cookies e tecnologias semelhantes", paragraphs: ["O código desta landing page guarda a preferência de idioma no armazenamento local do navegador. Não foi identificada uma ferramenta de análise de visitas no código revisto. O alojamento e quaisquer ferramentas acrescentadas à publicação final devem ser confirmados antes de fechar este aviso."] },
        { title: "4. Destinatários, transferências e conservação", paragraphs: ["O fornecedor de alojamento, os registos técnicos do servidor, os prazos de conservação e eventuais transferências internacionais ainda não foram confirmados para este site. A entidade responsável deve preencher estes pontos com base nos serviços efetivamente usados."] },
        { title: "5. Direitos e contacto", paragraphs: ["Quando exista tratamento de dados pessoais, os titulares podem ter direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade, nos termos aplicáveis. O contacto geral encontrado na versão anterior é info@mycarbonai.com; a entidade deve confirmar se este endereço recebe pedidos de privacidade.", "Também pode apresentar reclamação à autoridade de controlo competente. Em Portugal, consulte a Comissão Nacional de Proteção de Dados (CNPD)."], bullets: ["Morada e NIPC da entidade responsável: por confirmar", "Confirmação do contacto info@mycarbonai.com para pedidos de privacidade", "Fundamentos e prazos de conservação: por confirmar"] },
      ],
      back: "Voltar à página inicial",
      other: "Termos de utilização",
      missingTitle: "Informação necessária para finalizar",
      missing: ["Confirmar NATASHA SILVESTRE UNIPESSOAL LDA como entidade responsável por esta landing page", "NIPC e morada completa da sede", "Confirmar info@mycarbonai.com como canal para pedidos de privacidade", "Fornecedor de alojamento, registos técnicos, fundamentos e prazos de conservação", "Finalidade, fundamento e prazo de conservação de cada dado recolhido, se o formulário vier a ser ligado"],
      authority: "Comissão Nacional de Proteção de Dados",
    },
    terms: {
      title: "Termos de Utilização",
      intro: "Estes termos são um rascunho para a utilização informativa desta landing page. Não substituem os termos comerciais de um piloto ou de qualquer serviço contratado.",
      draft: "Rascunho — requer confirmação da entidade responsável",
      updated: "Rascunho criado em 5 de novembro de 2026",
      sections: [
        { title: "1. Sobre este site", paragraphs: ["Este site apresenta a MyCarbonAI, a sua abordagem e a exploração de um piloto de design parceiro para hotelaria. A versão mycarbonai-1.0 identifica NATASHA SILVESTRE UNIPESSOAL LDA como denominação social e info@mycarbonai.com como contacto geral; ambos os dados carecem de confirmação para esta landing page."] },
        { title: "2. Estado do produto e do piloto", paragraphs: ["A informação do site descreve um produto em validação. O âmbito apresentado para o piloto é reunir documentos operacionais, estruturar informação, apoiar revisão humana e manter os registos ligados às fontes.", "O piloto não é certificação, verificação independente ou garantia de conformidade regulamentar. A página não formaliza uma adesão a piloto nem um contrato de prestação de serviços."] },
        { title: "3. Dados e imagens ilustrativos", paragraphs: ["Os valores, nomes de documentos, painéis e exemplos apresentados são ilustrativos. Não representam resultados de clientes, medições verificadas, poupanças ou desempenho garantido.", "A informação do site é geral e não constitui aconselhamento jurídico, técnico, financeiro ou ambiental para uma operação específica."] },
        { title: "4. Utilização do site", paragraphs: ["Pode consultar este site para fins informativos. Não deve utilizá-lo de forma ilícita, interferir com o seu funcionamento ou apresentar conteúdo do site como resultado real de um hotel sem autorização e contexto adequados.", "Os direitos sobre marcas, textos, imagens e outros elementos pertencem aos respetivos titulares. A utilização de um elemento não concede direitos de propriedade sobre ele."] },
        { title: "5. Disponibilidade e responsabilidade", paragraphs: ["O site é disponibilizado como apresentação informativa e pode ser alterado. A identidade da entidade responsável, os limites de responsabilidade e as condições aplicáveis têm de ser revistos e completados antes da publicação definitiva destes termos."] },
        { title: "6. Lei aplicável e contacto", paragraphs: ["A lei aplicável, o foro competente e os dados de contacto da entidade responsável não estão definidos neste rascunho. Devem ser confirmados pela entidade que opera o site antes da sua publicação."] },
      ],
      back: "Voltar à página inicial",
      other: "Aviso de Privacidade",
      missingTitle: "Informação necessária para finalizar",
      missing: ["Confirmar a entidade responsável e o email geral info@mycarbonai.com", "NIPC e morada completa da sede", "Lei aplicável e foro a confirmar com aconselhamento jurídico", "Confirmação dos direitos sobre os conteúdos publicados"],
      authority: "",
    },
  },
  en: {
    imprint: {
      title: "Legal Notice",
      intro: "Company identity and contact details shown in an earlier version of the website. These details need confirmation before final publication.",
      draft: "Draft — company details to be confirmed",
      updated: "Details checked in mycarbonai-1.0 on 5 November 2026",
      sections: [
        { title: "1. Identity", paragraphs: ["Registered name listed in the earlier version: NATASHA SILVESTRE UNIPESSOAL LDA.", "Company number (NIPC), full registered office address and commercial registry: to be confirmed against the company’s current records."] },
        { title: "2. Contact", paragraphs: ["General email listed: info@mycarbonai.com.", "Location listed: Portimão, Portugal. This location is not a substitute for the registered office address."] },
        { title: "3. Website and purpose", paragraphs: ["Website listed: mycarbonai.com. Stated purpose: institutional information about the project."] },
        { title: "4. Intellectual property", paragraphs: ["The owners of the website content, images and brand elements, and the terms for their use, still need to be confirmed."] },
      ],
      back: "Back to home",
      other: "Privacy notice",
      missingTitle: "Details needed to finalise this notice",
      missing: ["Confirm the registered name and the organisation operating this site", "Company number and full registered office address", "Commercial registry details and legal representative, if applicable", "Confirm contact details and rights to the published content"],
      authority: "",
    },
    privacy: {
      title: "Privacy Notice",
      intro: "This draft describes what this version of the landing page does with information in the browser. The responsible organisation must complete and confirm it before it is published as a final policy.",
      draft: "Draft — review and controller details required",
      updated: "Draft created on 5 November 2026",
      sections: [
        { title: "1. Who is responsible", paragraphs: ["The mycarbonai-1.0 version lists NATASHA SILVESTRE UNIPESSOAL LDA as the registered name for MyCarbonAI. That legal notice is also marked as a draft; the organisation operating this landing page must confirm its identity before final publication. The same notice lists Portimão, Portugal, but does not provide the full registered office address or company number."] },
        { title: "2. Information handled by this page", paragraphs: ["Your language preference may be saved in your browser’s local storage under “mc-language” so the site can remember Portuguese or English between visits.", "The site loads the Plus Jakarta Sans typeface through Google Fonts. When the font is requested, your browser communicates with Google services; this provider and the related technical information must be confirmed against the final hosting setup.", "The contact form is a preview only. It is not connected to a submission service: details entered are not transmitted or saved by the form. Please do not enter personal information in this demonstration."] },
        { title: "3. Cookies and similar technologies", paragraphs: ["This landing page stores the language preference in browser local storage. No visit analytics tool was identified in the reviewed code. The hosting provider and any tools added to the published site must be confirmed before this notice is finalised."] },
        { title: "4. Recipients, transfers and retention", paragraphs: ["The hosting provider, technical server logs, retention periods and any international transfers have not been confirmed for this site. The responsible organisation must complete these details based on the services actually used."] },
        { title: "5. Your rights and contact", paragraphs: ["Where personal data is processed, people may have rights of access, rectification, erasure, restriction, objection and portability under applicable law. The general contact found in the earlier version is info@mycarbonai.com; the organisation must confirm whether it accepts privacy requests.", "You may also complain to the competent supervisory authority. In Portugal, see the National Data Protection Commission (CNPD)."], bullets: ["Controller address and company number: to be confirmed", "Confirm info@mycarbonai.com for privacy requests", "Legal bases and retention periods: to be confirmed"] },
      ],
      back: "Back to home",
      other: "Terms of use",
      missingTitle: "Details needed to finalise this notice",
      missing: ["Confirm NATASHA SILVESTRE UNIPESSOAL LDA as controller for this landing page", "Company number and full registered office address", "Confirm info@mycarbonai.com as the privacy contact", "Hosting provider, technical logs, legal bases and retention periods", "Purpose, legal basis and retention period for each data item if the form is connected"],
      authority: "National Data Protection Commission (CNPD)",
    },
    terms: {
      title: "Terms of Use",
      intro: "These draft terms cover informational use of this landing page. They do not replace commercial terms for a pilot or any contracted service.",
      draft: "Draft — responsible organisation details must be confirmed",
      updated: "Draft created on 5 November 2026",
      sections: [
        { title: "1. About this website", paragraphs: ["This website introduces MyCarbonAI, its approach and exploration of a partner design pilot for hospitality. The mycarbonai-1.0 version lists NATASHA SILVESTRE UNIPESSOAL LDA as the registered name and info@mycarbonai.com as the general contact; both details need confirmation for this landing page."] },
        { title: "2. Product and pilot status", paragraphs: ["The website describes a product under validation. The stated pilot scope is to bring operational documents together, structure information, support human review and keep records linked to their sources.", "The pilot is not certification, independent verification or a guarantee of regulatory compliance. This page does not confirm enrolment in a pilot or form a services contract."] },
        { title: "3. Illustrative data and images", paragraphs: ["Figures, document names, dashboards and examples on this site are illustrative. They do not represent customer results, verified measurements, savings or guaranteed performance.", "Website content is general information and is not legal, technical, financial or environmental advice for a specific operation."] },
        { title: "4. Use of the website", paragraphs: ["You may use this website for informational purposes. You must not use it unlawfully, interfere with its operation or present website content as a real hotel result without appropriate permission and context.", "Rights in the trademarks, text, images and other materials belong to their respective owners. Access to an item does not grant ownership rights."] },
        { title: "5. Availability and liability", paragraphs: ["The website is provided as an informational presentation and may change. The responsible organisation, liability limits and applicable conditions must be reviewed and completed before these terms are published as final."] },
        { title: "6. Governing law and contact", paragraphs: ["The governing law, competent courts and contact details of the responsible organisation are not set in this draft. The organisation operating the site must confirm them before publication."] },
      ],
      back: "Back to home",
      other: "Privacy notice",
      missingTitle: "Details needed to finalise these terms",
      missing: ["Confirm the responsible organisation and info@mycarbonai.com as its general contact", "Company number and full registered office address", "Governing law and venue to be confirmed with legal counsel", "Confirmation of rights to the published content"],
      authority: "",
    },
  },
};

export function LegalPage({ kind }: { kind: LegalKind }) {
  const { language, setLanguage, t } = useLanguage();
  const page = copy[language][kind];
  const otherKind: LegalKind = kind === "privacy" ? "terms" : "privacy";
  const otherHref = `/?page=${otherKind}`;

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-ink/10 bg-ivory">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-5 px-5 py-5 md:px-8">
          <Logo href="/" wordmarkClassName="text-ink" />
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border border-ink/15 p-0.5 text-xs font-bold" role="group" aria-label={t.language}>
              <button type="button" aria-pressed={language === "pt"} aria-label={t.switchToPortuguese} onClick={() => setLanguage("pt")} className={`rounded-full px-2.5 py-1.5 ${language === "pt" ? "bg-cyan text-ink" : "text-ink/70"}`}>PT</button>
              <button type="button" aria-pressed={language === "en"} aria-label={t.switchToEnglish} onClick={() => setLanguage("en")} className={`rounded-full px-2.5 py-1.5 ${language === "en" ? "bg-cyan text-ink" : "text-ink/70"}`}>EN</button>
            </div>
            <a href="/" className="hidden text-sm font-semibold text-ink underline underline-offset-4 sm:inline">{page.back}</a>
          </div>
        </div>
      </header>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cyan focus:px-3 focus:py-2 focus:text-ink">{t.common.skipContent}</a>
      <main id="conteudo" className="mx-auto max-w-[900px] px-5 py-12 md:px-8 md:py-20">
        <p className="inline-flex rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-950">{page.draft}</p>
        <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">{page.title}</h1>
        <p className="mt-3 text-sm text-ink/55">{page.updated}</p>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/75">{page.intro}</p>
        <div className="mt-10 space-y-8">
          {page.sections.map((section) => (
            <section key={section.title} className="border-t border-ink/10 pt-6">
              <h2 className="font-display text-xl md:text-2xl">{section.title}</h2>
              <div className="mt-3 space-y-3 text-[0.98rem] leading-relaxed text-ink/75">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul className="list-disc space-y-2 pl-5">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              </div>
            </section>
          ))}
        </div>
        <aside className="mt-10 rounded-2xl border border-cyan/40 bg-white/60 p-6">
          <h2 className="font-display text-xl">{page.missingTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/75">
            {page.missing.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </aside>
        {page.authority && <p className="mt-6 text-sm text-ink/60"><a href="https://www.cnpd.pt/cidadaos/direitos/" target="_blank" rel="noreferrer" className="underline underline-offset-4">{page.authority}</a></p>}
        <div className="mt-10 flex flex-wrap gap-5 border-t border-ink/10 pt-6 text-sm font-semibold">
          <a href="/" className="underline underline-offset-4">{page.back}</a>
          <a href={otherHref} className="underline underline-offset-4">{page.other}</a>
          <a href="/?page=imprint" className="underline underline-offset-4">{t.footer.imprint}</a>
        </div>
      </main>
      <footer className="border-t border-ink/10 py-6">
        <div className="mx-auto flex max-w-[900px] flex-wrap justify-between gap-3 px-5 text-xs text-ink/50 md:px-8">
          <span>© {new Date().getFullYear()} MyCarbonAI</span>
          <span>{t.footer.tagline}</span>
        </div>
      </footer>
    </div>
  );
}
