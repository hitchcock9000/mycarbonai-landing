import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "pt" | "en";

const translations = {
  pt: {
    pageTitle: "MyCarbonAI — Inteligência ambiental para hotelaria",
    metaDescription: "Organize informação sobre energia, água, resíduos e fornecedores para compreender melhor a operação do seu hotel.",
    legalTitles: { privacy: "Aviso de Privacidade | MyCarbonAI", terms: "Termos de Utilização | MyCarbonAI", imprint: "Informações Legais | MyCarbonAI" },
    legalDescriptions: { privacy: "Aviso de privacidade da MyCarbonAI.", terms: "Termos de utilização do site MyCarbonAI.", imprint: "Identificação e contactos da entidade responsável pelo site MyCarbonAI." },
    language: "Idioma",
    switchToPortuguese: "Mudar idioma para português",
    switchToEnglish: "Mudar idioma para inglês",
    brandAria: "MyCarbonAI — início",
    nav: ["Hotelaria", "Como funciona", "Jornada", "Produto", "Sobre"],
    ctaPilot: "Explorar um piloto",
    ctaHow: "Ver como funciona",
    hero: {
      eyebrow: "Inteligência ambiental para hotelaria",
      lead: "Veja onde está o",
      accent: "impacto ambiental",
      tail: "do seu hotel — e onde pode agir.",
      body: "Organize informação sobre energia, água, resíduos e fornecedores para compreender melhor a operação e criar uma base para decisões ambientais mais informadas.",
    },
    stepNames: ["Identificar", "Medir", "Reduzir", "Agir", "Reportar"],
    stepTexts: [
      "Perceber que informação existe e o que falta.",
      "Organizar dados ambientais disponíveis.",
      "Encontrar áreas que merecem ser investigadas.",
      "Escolher os próximos passos.",
      "Preparar informação clara e ligada às fontes.",
    ],
    journey: {
      progressLabel: "Progresso pelas fases ambientais",
      kicker: "Jornada ambiental",
      title: "Cinco passos, uma sequência.",
    },
    metrics: ["Energia", "Água", "Resíduos"],
    illustrative: "Exemplo ilustrativo",
    docs: ["Fatura de eletricidade", "Fatura de água", "Relatório de resíduos"],
    linked: "Ligado",
    chapters: ["Paisagem", "Hotelaria", "Documentos", "Jornada", "Produto"],
    hotel: {
      kicker: "Hotelaria",
      title: "Sustentabilidade com impacto na operação.",
      body: "Transforme dados operacionais em decisões ambientais que fazem sentido para o seu hotel.",
      illustrativeData: "Dados ilustrativos",
    },
    flow: {
      kicker: "Como funciona",
      title: "De documentos à informação pronta a explorar.",
      body: "Partimos dos documentos da sua operação, organizamos os dados e revemos a informação, mantendo sempre a ligação à sua origem.",
      wasteReport: "Relatório de resíduos",
      waterUse: "Consumo de água",
      electricityBill: "Fatura de eletricidade",
      organizedData: "Dados organizados",
    },
    product: {
      kicker: "Produto",
      title: "Uma base organizada para a operação.",
      body: "Pré-visualização ilustrativa. As capacidades em validação no piloto estão no painel; ideias futuras estão identificadas mais abaixo.",
    },
    dashboard: {
      aria: "Pré-visualização ilustrativa do produto MyCarbonAI. Painel com dados de exemplo.",
      nav: ["Visão geral", "Documentos", "Revisão", "Dados e evidências", "Relatórios"],
      overview: "Visão geral",
      overviewBody: "Informação ambiental da sua operação, organizada e ligada à sua origem.",
      suppliers: "Fornecedores",
      organizedRecords: "Registos organizados",
      documents: "Documentos",
      period: "Jan 2024",
    },
    how: {
      kicker: "Como funciona",
      title: "De documentos à informação pronta a explorar.",
      body: "Partimos dos documentos da sua operação, organizamos os dados e revemos a informação, mantendo sempre a ligação à sua origem.",
      steps: [
        { title: "Perceber que informação existe.", body: "Reúna documentos da operação e identifique o que já está disponível e o que ainda falta.", status: "Âmbito do piloto", statusType: "pilot", visualTitle: "Documentos da operação", visualItems: ["Fatura de eletricidade", "Fatura de água", "Relatório de resíduos"] },
        { title: "Organizar a informação disponível.", body: "Estruture os dados ambientais, reveja-os com uma pessoa e mantenha cada registo ligado ao documento de origem.", status: "Âmbito do piloto", statusType: "pilot", visualTitle: "Dados ligados às fontes", visualItems: ["Energia", "Água", "Resíduos"] },
        { title: "Explorar onde pode haver melhorias.", body: "Investigue áreas da operação que possam merecer atenção. A análise de oportunidades faz parte da visão futura do produto.", status: "Visão futura do produto", statusType: "future", visualTitle: "Áreas a investigar", visualItems: ["Energia", "Água", "Resíduos"] },
        { title: "Definir próximos passos.", body: "Explore como a informação organizada poderá apoiar o planeamento de ações. Esta capacidade ainda não está disponível no piloto.", status: "Visão futura do produto", statusType: "future", visualTitle: "Planeamento conceptual", visualItems: ["Ação a explorar", "Responsável", "Próximo passo"] },
        { title: "Preparar informação para reportar.", body: "Explore como os dados revistos e ligados às fontes poderão apoiar relatórios mais claros. O piloto não produz certificação nem garante conformidade.", status: "Visão futura do produto", statusType: "future", visualTitle: "Relatório conceptual", visualItems: ["Informação revista", "Fontes associadas", "Rascunho"] },
      ],
      pilotScope: "Âmbito do piloto",
      futureScope: "Visão futura do produto",
      illustrativeLabel: "Exemplo ilustrativo",
      imageLabel: "Imagem ilustrativa — visão futura",
      conceptNote: "Representação conceptual — não disponível no piloto.",
      illustrativeNote: "Dados e valores apresentados como exemplo ilustrativo.",
      exploreLabel: "A explorar",
      reviewLabel: "Por analisar",
      previousStep: "Fase anterior",
      nextStep: "Fase seguinte",
      phase: "Fase",
      of: "de",
      inputs: "Documentos da operação",
      inputsBody: "Faturas de energia e água, relatórios de resíduos e registos de fornecedores.",
      organized: "Dados organizados e revistos",
      organizedBody: "A informação é estruturada e conferida, sem substituir o que está nos documentos.",
      next: "Próximos passos a explorar",
      nextBody: "Com a base organizada, o hotel pode ver onde está a informação e o que ainda falta.",
    },
    pilot: {
      kicker: "O piloto",
      title: "O que o piloto valida.",
      body: "O piloto de design parceiro serve para testar, com hotéis reais, se esta forma de organizar informação ambiental é útil no dia a dia da operação. Não é um produto acabado.",
      cards: [
        { title: "Informação operacional organizada", body: "Documentos de energia, água, resíduos e fornecedores reunidos e estruturados num só sítio." },
        { title: "Dados revistos a partir das fontes", body: "A informação é extraída e revista a partir dos documentos da operação — sem estimar o que não consta da fonte." },
        { title: "Ligação à origem", body: "Cada registo mantém a ligação ao documento de onde veio." },
      ],
    },
    future: {
      badge: "Visão do produto",
      disclaimer: "Não disponível no piloto. Ideias em exploração.",
      title: "Para onde o produto pode crescer.",
      body: "Depois de a informação estar organizada e ligada à origem, estas são direções que queremos explorar com os hotéis parceiros. Não fazem parte do que o piloto valida hoje.",
      cardBadge: "Visão do produto",
      cards: [
        { title: "Identificar questões operacionais", body: "Cruzar a informação organizada para perceber onde a operação merece atenção." },
        { title: "Explorar oportunidades de redução", body: "Investigar áreas de energia, água e resíduos que possam ser melhoradas." },
        { title: "Planear ações", body: "Escolher próximos passos com base na informação revista e ligada à origem." },
        { title: "Acompanhar progresso", body: "Seguir a evolução da operação à medida que novos documentos são acrescentados." },
      ],
    },
    contact: {
      kicker: "Piloto de design parceiro",
      title: "Conversamos com hotéis que queiram explorar um piloto.",
      body: "O piloto serve para organizar informação operacional — energia, água, resíduos e fornecedores — e perceber, em conjunto, se esta base é útil. Sem compromisso de resultados ambientais.",
      bullets: ["Pensado para equipas de hotelaria, manutenção e sustentabilidade.", "Começa pelos documentos que o hotel já tem.", "Os valores de exemplo nesta página são ilustrativos."],
      thanks: "Obrigado",
      received: "Pré-visualização concluída.",
      response: "Este formulário ainda não está ligado a um serviço de envio. A mensagem não foi enviada e os dados introduzidos não foram guardados.",
      formTitle: "Pedir uma conversa",
      formIntro: "Pré-visualização do formulário. Ainda não envia pedidos de contacto.",
      name: "Nome",
      email: "Email de trabalho",
      hotel: "Hotel ou grupo",
      message: "Mensagem",
      optional: "(opcional)",
      sending: "A enviar…",
      previewSubmit: "Pré-visualizar formulário",
      privacy: "Os dados ficam apenas no formulário aberto no seu navegador. Não são enviados nem guardados. Consulte o aviso de privacidade.",
    },
    footer: {
      description: "A MyCarbonAI organiza informação ambiental da operação hoteleira — energia, água, resíduos e fornecedores — para que as equipas vejam o que existe, o que falta e onde podem agir. O produto está em validação através de um piloto de design parceiro.",
      navigate: "Navegar",
      note: "Nota",
      noteBody: "Os números apresentados nesta página são exemplos ilustrativos. Não representam resultados de hotéis reais nem poupanças garantidas.",
      tagline: "Inteligência ambiental para hotelaria",
      privacy: "Privacidade",
      terms: "Termos de utilização",
      imprint: "Informações legais",
    },
    common: {
      navLabel: "Secções",
      mobileNavLabel: "Menu móvel",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      skipContent: "Saltar para o conteúdo",
      hotelName: "Hotel Atlântico, Lisboa",
      scrollHint: "Desça para explorar",
      prevChapter: "Capítulo anterior",
      nextChapter: "Capítulo seguinte",
      jumpToChapter: "Ir para capítulo",
      sampleData: "Dados ilustrativos",
      narrativeLabel: "Narrativa MyCarbonAI",
      forestAlt: "Vista aérea de uma floresta atravessada por uma estrada sinuosa",
      hotelDuskAlt: "Hotel contemporâneo ao entardecer, com piscina e espreguiçadeiras",
      hotelPoolAlt: "Piscina de hotel junto a um edifício contemporâneo",
    },
  },
  en: {
    pageTitle: "MyCarbonAI — Environmental insight for hospitality",
    metaDescription: "Organise information about energy, water, waste and suppliers to better understand your hotel operation.",
    legalTitles: { privacy: "Privacy Notice | MyCarbonAI", terms: "Terms of Use | MyCarbonAI", imprint: "Legal Notice | MyCarbonAI" },
    legalDescriptions: { privacy: "MyCarbonAI privacy notice.", terms: "Terms of use for the MyCarbonAI website.", imprint: "Identity and contact details for the organisation responsible for the MyCarbonAI website." },
    language: "Language",
    switchToPortuguese: "Switch language to Portuguese",
    switchToEnglish: "Switch language to English",
    brandAria: "MyCarbonAI — home",
    nav: ["Hospitality", "How it works", "Journey", "Product", "About"],
    ctaPilot: "Explore a pilot",
    ctaHow: "See how it works",
    hero: {
      eyebrow: "Environmental insight for hospitality",
      lead: "See your hotel’s",
      accent: "environmental impact",
      tail: "— and where you can act.",
      body: "Bring information about energy, water, waste and suppliers together to better understand your operation and build a basis for more informed environmental decisions.",
    },
    stepNames: ["Identify", "Measure", "Reduce", "Act", "Report"],
    stepTexts: [
      "Understand what information exists and what is missing.",
      "Organise the environmental data available.",
      "Find areas that may need further attention.",
      "Choose the next steps.",
      "Prepare clear information linked to its sources.",
    ],
    journey: {
      progressLabel: "Progress through the environmental stages",
      kicker: "Environmental journey",
      title: "Five steps, one journey.",
    },
    metrics: ["Energy", "Water", "Waste"],
    illustrative: "Illustrative example",
    docs: ["Electricity bill", "Water bill", "Waste report"],
    linked: "Linked",
    chapters: ["Landscape", "Hospitality", "Documents", "Journey", "Product"],
    hotel: {
      kicker: "Hospitality",
      title: "Sustainability that works in your operation.",
      body: "Turn operational information into environmental decisions that make sense for your hotel.",
      illustrativeData: "Illustrative data",
    },
    flow: {
      kicker: "How it works",
      title: "From documents to information ready to explore.",
      body: "We start with your operational documents, organise the data and review the information, keeping each record linked to its source.",
      wasteReport: "Waste report",
      waterUse: "Water use",
      electricityBill: "Electricity bill",
      organizedData: "Organised data",
    },
    product: {
      kicker: "Product",
      title: "An organised foundation for your operation.",
      body: "Illustrative preview. Capabilities being explored in the pilot are shown in the panel; future ideas are labelled further down.",
    },
    dashboard: {
      aria: "Illustrative preview of the MyCarbonAI product. Dashboard with sample data.",
      nav: ["Overview", "Documents", "Review", "Data and evidence", "Reports"],
      overview: "Overview",
      overviewBody: "Environmental information from your operation, organised and linked to its source.",
      suppliers: "Suppliers",
      organizedRecords: "Organised records",
      documents: "Documents",
      period: "Jan 2024",
    },
    how: {
      kicker: "How it works",
      title: "From documents to information ready to explore.",
      body: "We start with your operational documents, organise the data and review the information, keeping each record linked to its source.",
      steps: [
        { title: "Understand what information you have.", body: "Bring together operational documents and identify what is available and what is still missing.", status: "Pilot scope", statusType: "pilot", visualTitle: "Operational documents", visualItems: ["Electricity bill", "Water bill", "Waste report"] },
        { title: "Organise the information available.", body: "Structure environmental data, review it with a person and keep each record linked to its source document.", status: "Pilot scope", statusType: "pilot", visualTitle: "Data linked to sources", visualItems: ["Energy", "Water", "Waste"] },
        { title: "Explore where improvements may be possible.", body: "Investigate areas of the operation that may deserve attention. Exploring opportunities is part of the product’s future direction.", status: "Future product vision", statusType: "future", visualTitle: "Areas to investigate", visualItems: ["Energy", "Water", "Waste"] },
        { title: "Plan potential next steps.", body: "Explore how organised information could support action planning. This capability is not available in the pilot.", status: "Future product vision", statusType: "future", visualTitle: "Conceptual planning", visualItems: ["Action to explore", "Owner", "Next step"] },
        { title: "Prepare information for reporting.", body: "Explore how reviewed, source-linked data could support clearer reporting. The pilot does not provide certification or guarantee compliance.", status: "Future product vision", statusType: "future", visualTitle: "Conceptual report", visualItems: ["Reviewed information", "Linked sources", "Draft"] },
      ],
      pilotScope: "Pilot scope",
      futureScope: "Future product vision",
      illustrativeLabel: "Illustrative example",
      imageLabel: "Illustrative image — future direction",
      conceptNote: "Conceptual representation — not available in the pilot.",
      illustrativeNote: "Data and figures are shown as illustrative examples.",
      exploreLabel: "To explore",
      reviewLabel: "To investigate",
      previousStep: "Previous step",
      nextStep: "Next step",
      phase: "Step",
      of: "of",
      inputs: "Operational documents",
      inputsBody: "Energy and water bills, waste reports and supplier records.",
      organized: "Organised and reviewed data",
      organizedBody: "Information is structured and checked against the documents, which remain the source.",
      next: "Next steps to explore",
      nextBody: "With an organised foundation, the hotel can see what information is available and what is still missing.",
    },
    pilot: {
      kicker: "The pilot",
      title: "What the pilot is designed to validate.",
      body: "The partner design pilot explores with hotels whether this way of organising environmental information is useful in day-to-day operations. It is not a finished product.",
      cards: [
        { title: "Organised operational information", body: "Energy, water, waste and supplier documents brought together and structured in one place." },
        { title: "Information reviewed against sources", body: "Information is extracted and reviewed from operational documents — without estimating what the source does not contain." },
        { title: "Linked to its source", body: "Each record stays connected to the document it came from." },
      ],
    },
    future: {
      badge: "Product direction",
      disclaimer: "Not available in the pilot. Ideas being explored.",
      title: "Where the product could grow.",
      body: "Once information is organised and linked to its source, these are directions we would like to explore with partner hotels. They are not part of what the pilot validates today.",
      cardBadge: "Product direction",
      cards: [
        { title: "Identify operational questions", body: "Bring organised information together to see where the operation may need attention." },
        { title: "Explore reduction opportunities", body: "Investigate areas in energy, water and waste that may be improved." },
        { title: "Plan actions", body: "Choose next steps using information that has been reviewed and linked to its source." },
        { title: "Track progress", body: "Follow how the operation changes as new documents are added." },
      ],
    },
    contact: {
      kicker: "Partner design pilot",
      title: "We’re speaking with hotels interested in exploring a pilot.",
      body: "The pilot brings operational information — energy, water, waste and suppliers — together so we can assess whether this foundation is useful. No environmental results are promised.",
      bullets: ["Designed for hospitality, facilities and sustainability teams.", "Starts with the documents the hotel already has.", "Examples on this page are illustrative."],
      thanks: "Thank you",
      received: "Form preview complete.",
      response: "This form is not connected to a submission service yet. Your message was not sent and the details entered were not saved.",
      formTitle: "Request a conversation",
      formIntro: "Form preview. Contact requests are not submitted yet.",
      name: "Name",
      email: "Work email",
      hotel: "Hotel or group",
      message: "Message",
      optional: "(optional)",
      sending: "Sending…",
      previewSubmit: "Preview form",
      privacy: "Details remain in this open browser form only. They are not sent or saved. Read the privacy notice.",
    },
    footer: {
      description: "MyCarbonAI organises environmental information from hotel operations — energy, water, waste and suppliers — so teams can see what they have, what is missing and where they may act. The product is being explored through a partner design pilot.",
      navigate: "Explore",
      note: "Note",
      noteBody: "Figures on this page are illustrative examples. They do not represent results from real hotels or guaranteed savings.",
      tagline: "Environmental insight for hospitality",
      privacy: "Privacy notice",
      terms: "Terms of use",
      imprint: "Legal notice",
    },
    common: {
      navLabel: "Sections",
      mobileNavLabel: "Mobile menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      skipContent: "Skip to content",
      hotelName: "Hotel Atlântico, Lisbon",
      scrollHint: "Scroll to explore",
      prevChapter: "Previous chapter",
      nextChapter: "Next chapter",
      jumpToChapter: "Go to chapter",
      sampleData: "Illustrative data",
      narrativeLabel: "MyCarbonAI story",
      forestAlt: "Aerial view of a forest crossed by a winding road",
      hotelDuskAlt: "Contemporary hotel at dusk, with a pool and loungers",
      hotelPoolAlt: "Hotel pool beside a contemporary building",
    },
  },
} as const;

type LocaleCopy = (typeof translations)[Language];
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: LocaleCopy };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return localStorage.getItem("mc-language") === "en" ? "en" : "pt";
    } catch {
      return "pt";
    }
  });

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    try {
      localStorage.setItem("mc-language", next);
    } catch {
      // Language still changes for this session when storage is unavailable.
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
    const legalPage = new URLSearchParams(window.location.search).get("page");
    const legalKind = legalPage === "privacy" || legalPage === "terms" || legalPage === "imprint" ? legalPage : null;
    document.title = legalKind ? translations[language].legalTitles[legalKind] : translations[language].pageTitle;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", legalKind ? translations[language].legalDescriptions[legalKind] : translations[language].metaDescription);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
