import { Logo } from "./Logo";
import { useLanguage } from "../i18n/LanguageProvider";

type LegalKind = "privacy" | "terms" | "imprint";
type LegalSection = { title: string; paragraphs: string[]; bullets?: string[] };
type LegalCopy = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  back: string;
  other: string;
  authority?: string;
};

const entity = "NATASHA SILVESTRE - UNIPESSOAL LDA";
const address = "Rua Basílio Teles, 10, 1.º 2, 8500-567 Portimão, Portugal";

const copy: Record<"pt" | "en", Record<LegalKind, LegalCopy>> = {
  pt: {
    imprint: {
      title: "Informações legais",
      intro: "Identificação da entidade responsável pelo website MyCarbonAI.",
      updated: "Última atualização: 6 de novembro de 2026",
      sections: [
        { title: "1. Entidade responsável", paragraphs: [`Denominação social: ${entity}.`, "NIPC: 519020804.", `Sede: ${address}.`] },
        { title: "2. Contactos", paragraphs: ["Email: info@mycarbonai.com.", "Website: mycarbonai.com."] },
        { title: "3. Finalidade do website", paragraphs: ["Este website apresenta a MyCarbonAI, a sua missão, a abordagem em validação com equipas hoteleiras e a possibilidade de conversar sobre um piloto."] },
        { title: "4. Propriedade intelectual", paragraphs: ["A marca MyCarbonAI e os conteúdos deste website pertencem aos respetivos titulares. A sua reprodução ou utilização fora dos limites legais depende de autorização prévia do titular dos direitos."] },
      ],
      back: "Voltar à página inicial",
      other: "Aviso de privacidade",
    },
    privacy: {
      title: "Aviso de privacidade",
      intro: "Este aviso explica como a MyCarbonAI trata os dados pessoais enviados através do website.",
      updated: "Última atualização: 6 de novembro de 2026",
      sections: [
        { title: "1. Responsável pelo tratamento", paragraphs: [`A responsável pelo tratamento é ${entity}, NIPC 519020804, com sede em ${address}. Pode contactar-nos através de info@mycarbonai.com.`] },
        { title: "2. Dados e finalidades", paragraphs: ["Se preencher o formulário para conversar sobre um piloto, tratamos o seu nome, email profissional, hotel ou organização, resposta à pergunta sobre pedidos de informação ambiental e o contexto que decida acrescentar. Usamos estes dados para responder ao pedido, avaliar a adequação de uma conversa de piloto e dar seguimento à comunicação.", "O formulário inclui um campo técnico anti-spam. O idioma escolhido pode ser guardado no armazenamento local do navegador, sob a chave “mc-language”, para manter a sua preferência entre visitas."] },
        { title: "3. Fundamento e caráter facultativo", paragraphs: ["Tratamos os dados do formulário para tomar medidas pré-contratuais a seu pedido e responder à manifestação de interesse. O envio é voluntário; sem os dados assinalados como obrigatórios, poderemos não conseguir responder ao pedido. O contexto adicional é facultativo."] },
        { title: "4. Destinatários e serviços usados", paragraphs: ["Quando o formulário está ligado, os dados são enviados para uma função de backend Supabase e guardados na base de dados de contactos da MyCarbonAI. A função pode usar a Resend para enviar uma confirmação ao endereço indicado e uma notificação à equipa. Estes fornecedores tratam dados para prestar os serviços técnicos correspondentes e nos termos aplicáveis.", "A tipografia Plus Jakarta Sans é carregada através do Google Fonts. Se aceitar o selo Website Carbon, o navegador carrega um script da unpkg.com, que consulta a Website Carbon para obter uma estimativa da página atual. Esta consulta transmite o endereço da página e os dados técnicos normais da ligação. O selo guarda a estimativa em cache no dispositivo e limita as consultas a, no máximo, uma por dia e por página. Ao retirar a autorização, o selo deixa de ser carregado; a cache anterior pode permanecer no navegador até os dados do site serem eliminados.", "O website não utiliza Google Analytics nem outras ferramentas de análise de visitas no código atual. O armazenamento local é usado para guardar o idioma e a preferência do selo; o selo só é carregado depois de o aceitar. Pode alterar a preferência no controlo de privacidade do rodapé."] },
        { title: "5. Conservação e segurança", paragraphs: ["Conservamos os pedidos durante o tempo necessário para responder e acompanhar a conversa e, depois, apenas pelo período necessário para cumprir obrigações legais ou resolver questões relacionadas com o pedido. Aplicamos medidas técnicas e organizativas adequadas para proteger os dados. A transmissão pela Internet não pode ser considerada totalmente isenta de risco."] },
        { title: "6. Os seus direitos", paragraphs: ["Nos termos da legislação aplicável, pode solicitar acesso, retificação, apagamento, limitação ou oposição ao tratamento e, quando aplicável, portabilidade dos dados. Pode retirar o consentimento quando o tratamento se baseie nele, sem afetar o tratamento anterior à retirada. Para exercer os seus direitos, escreva para info@mycarbonai.com.", "Pode também apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD), autoridade de controlo em Portugal."], bullets: ["Comissão Nacional de Proteção de Dados (CNPD)"] },
        { title: "7. Alterações a este aviso", paragraphs: ["Podemos atualizar este aviso quando o website, o formulário ou os serviços utilizados mudarem. A versão publicada nesta página é a aplicável a partir da data indicada acima."] },
      ],
      back: "Voltar à página inicial",
      other: "Termos de utilização",
      authority: "https://www.cnpd.pt/cidadaos/direitos/",
    },
    terms: {
      title: "Termos de utilização",
      intro: "Estes termos regulam a utilização informativa do website MyCarbonAI.",
      updated: "Última atualização: 6 de novembro de 2026",
      sections: [
        { title: "1. Entidade e contacto", paragraphs: [`O website é operado por ${entity}, NIPC 519020804, com sede em ${address}. Contacto: info@mycarbonai.com.`] },
        { title: "2. Conteúdo e estado do produto", paragraphs: ["O website apresenta a missão da MyCarbonAI e um piloto em exploração com equipas hoteleiras. O âmbito previsto do piloto é de quatro semanas, uma unidade e um período, sujeito a avaliação inicial e acordo de âmbito com cada participante.", "O trabalho descrito no piloto centra-se em reunir documentos operacionais, estruturar informação, apoiar revisão humana e manter cada registo ligado à sua origem. A página não formaliza a participação num piloto nem substitui um acordo escrito entre as partes."] },
        { title: "3. Limites do piloto e exemplos", paragraphs: ["O piloto não constitui certificação, verificação independente nem garantia de conformidade regulamentar. CO₂e só é indicado quando possa ser calculado com os dados e fatores disponíveis; a metodologia e os limites têm de ser acordados no âmbito do piloto.", "Valores, nomes de documentos e interfaces apresentados como exemplos são ilustrativos. Não representam resultados de clientes, medições verificadas, poupanças ou desempenho garantido. O conteúdo do website é informativo e não constitui aconselhamento jurídico, técnico, financeiro ou ambiental para uma operação específica."] },
        { title: "4. Utilização aceitável", paragraphs: ["Pode consultar e partilhar ligações para este website para fins lícitos e informativos. Não pode interferir com o funcionamento do website, tentar aceder sem autorização aos seus sistemas ou apresentar exemplos ilustrativos como resultados reais."] },
        { title: "5. Conteúdos e disponibilidade", paragraphs: ["A marca, os textos, as imagens e os restantes elementos pertencem aos respetivos titulares e não podem ser reproduzidos fora dos limites legais sem autorização. Procuramos manter a informação clara e atualizada, mas o website pode ser alterado, suspenso ou ficar temporariamente indisponível."] },
        { title: "6. Lei aplicável", paragraphs: ["A utilização do website rege-se pela legislação portuguesa e europeia aplicável, sem prejuízo das normas imperativas de proteção do consumidor ou de competência que se apliquem ao caso concreto. Qualquer piloto ou serviço contratado será regulado por acordo próprio."] },
      ],
      back: "Voltar à página inicial",
      other: "Aviso de privacidade",
    },
  },
  en: {
    imprint: {
      title: "Legal notice",
      intro: "Identity of the organisation responsible for the MyCarbonAI website.",
      updated: "Last updated: 6 November 2026",
      sections: [
        { title: "1. Responsible organisation", paragraphs: [`Registered name: ${entity}.`, "Company number (NIPC): 519020804.", `Registered office: ${address}.`] },
        { title: "2. Contact", paragraphs: ["Email: info@mycarbonai.com.", "Website: mycarbonai.com."] },
        { title: "3. Website purpose", paragraphs: ["This website introduces MyCarbonAI, its mission, the approach being explored with hospitality teams and the opportunity to discuss a pilot."] },
        { title: "4. Intellectual property", paragraphs: ["The MyCarbonAI brand and this website’s content belong to their respective rights holders. Reproduction or use beyond legal exceptions requires prior permission from the rights holder."] },
      ],
      back: "Back to home",
      other: "Privacy notice",
    },
    privacy: {
      title: "Privacy notice",
      intro: "This notice explains how MyCarbonAI handles personal data submitted through this website.",
      updated: "Last updated: 6 November 2026",
      sections: [
        { title: "1. Data controller", paragraphs: [`The controller is ${entity}, company number (NIPC) 519020804, with registered office at ${address}. Contact: info@mycarbonai.com.`] },
        { title: "2. Data and purposes", paragraphs: ["If you use the form to discuss a pilot, we process your name, work email, hotel or organisation, your answer to the question about requests for environmental information, and any context you choose to provide. We use these details to respond, assess whether a pilot conversation may be suitable and follow up on your enquiry.", "The form includes a technical anti-spam field. Your language choice may be stored in your browser’s local storage under “mc-language” so the site can remember it between visits."] },
        { title: "3. Legal basis and optional information", paragraphs: ["We process form data to take steps at your request before entering into a possible agreement and to respond to your enquiry. Submission is voluntary; without the required fields, we may not be able to respond. The additional context field is optional."] },
        { title: "4. Recipients and services", paragraphs: ["When connected, form data is sent to a Supabase backend function and stored in MyCarbonAI’s contact database. The function may use Resend to send a confirmation to the address provided and a notification to the team. These providers process data to deliver the relevant technical services and under applicable terms.", "The Plus Jakarta Sans typeface is loaded through Google Fonts. If you accept the Website Carbon badge, your browser loads a script from unpkg.com, which contacts Website Carbon for an estimate of the current page. This request sends the page address and normal technical connection data. The badge caches the estimate on your device and makes no more than one API request per day for each page. If you withdraw permission, the badge stops loading; an existing cache may remain in your browser until site data is cleared.", "The website does not use Google Analytics or other visit analytics tools in its current code. Local storage is used for language and badge preferences; the badge loads only after you accept it. You can change this choice in the privacy control in the footer."] },
        { title: "5. Retention and security", paragraphs: ["We keep enquiries for as long as needed to respond and follow up, and afterwards only for as long as required by legal obligations or to resolve matters connected with the enquiry. We apply appropriate technical and organisational measures to protect data. Transmission over the Internet cannot be considered entirely risk-free."] },
        { title: "6. Your rights", paragraphs: ["Under applicable law, you may request access, correction, erasure, restriction or objection and, where applicable, data portability. You may withdraw consent where processing is based on consent, without affecting processing that took place before withdrawal. To exercise your rights, email info@mycarbonai.com.", "You may also lodge a complaint with Portugal’s supervisory authority, the National Data Protection Commission (CNPD)."] },
        { title: "7. Changes to this notice", paragraphs: ["We may update this notice when the website, form or services change. The version published here applies from the date shown above."] },
      ],
      back: "Back to home",
      other: "Terms of use",
      authority: "https://www.cnpd.pt/cidadaos/direitos/",
    },
    terms: {
      title: "Terms of use",
      intro: "These terms govern informational use of the MyCarbonAI website.",
      updated: "Last updated: 6 November 2026",
      sections: [
        { title: "1. Organisation and contact", paragraphs: [`The website is operated by ${entity}, company number (NIPC) 519020804, with registered office at ${address}. Contact: info@mycarbonai.com.`] },
        { title: "2. Content and product status", paragraphs: ["The website introduces MyCarbonAI’s mission and a pilot being explored with hospitality teams. The planned pilot format is four weeks, one property and one period, subject to an initial assessment and an agreed scope with each participant.", "The pilot work described focuses on bringing operational documents together, structuring information, supporting human review and keeping each record linked to its source. This page does not enrol anyone in a pilot or replace a written agreement between the parties."] },
        { title: "3. Pilot limits and examples", paragraphs: ["The pilot is not certification, independent verification or a guarantee of regulatory compliance. CO₂e is included only where it can be calculated from available data and factors; the methodology and boundaries must be agreed within the pilot scope.", "Figures, document names and interfaces shown as examples are illustrative. They do not represent customer results, verified measurements, savings or guaranteed performance. Website content is informational and is not legal, technical, financial or environmental advice for a specific operation."] },
        { title: "4. Acceptable use", paragraphs: ["You may view and share links to this website for lawful, informational purposes. You must not interfere with its operation, attempt unauthorised access to its systems or present illustrative examples as real results."] },
        { title: "5. Content and availability", paragraphs: ["The brand, text, images and other materials belong to their respective rights holders and may not be reproduced beyond legal exceptions without permission. We aim to keep information clear and up to date, but the website may change, be suspended or become temporarily unavailable."] },
        { title: "6. Applicable law", paragraphs: ["Use of this website is governed by applicable Portuguese and European law, without prejudice to mandatory consumer-protection or jurisdiction rules that apply in a particular case. Any pilot or contracted service will be governed by a separate agreement."] },
      ],
      back: "Back to home",
      other: "Privacy notice",
    },
  },
};

export function LegalPage({ kind, onPrivacySettings }: { kind: LegalKind; onPrivacySettings: () => void }) {
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
        <h1 className="font-display text-4xl leading-tight md:text-5xl">{page.title}</h1>
        <p className="mt-3 text-sm text-ink/55">{page.updated}</p>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/75">{page.intro}</p>
        <div className="mt-10 space-y-8">
          {page.sections.map((section) => (
            <section key={section.title} className="border-t border-ink/10 pt-6">
              <h2 className="font-display text-xl md:text-2xl">{section.title}</h2>
              <div className="mt-3 space-y-3 text-[0.98rem] leading-relaxed text-ink/75">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets?.map((item) => <p key={item}>{item}</p>)}
              </div>
            </section>
          ))}
        </div>
        {page.authority && <p className="mt-8 text-sm text-ink/60"><a href={page.authority} target="_blank" rel="noreferrer" className="underline underline-offset-4">Comissão Nacional de Proteção de Dados (CNPD)</a></p>}
        <div className="mt-10 flex flex-wrap gap-5 border-t border-ink/10 pt-6 text-sm font-semibold">
          <a href="/" className="underline underline-offset-4">{page.back}</a>
          <a href={otherHref} className="underline underline-offset-4">{page.other}</a>
          <a href="/?page=imprint" className="underline underline-offset-4">{t.footer.imprint}</a>
          <button type="button" onClick={onPrivacySettings} className="underline underline-offset-4">{t.privacyOptions.settings}</button>
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
