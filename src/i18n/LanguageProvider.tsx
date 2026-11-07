import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "pt" | "en";

const translations = {
  pt: {
    pageTitle: "MyCarbonAI — Inteligência ambiental para hotelaria",
    metaDescription: "A MyCarbonAI torna a descarbonização mais acessível às empresas. Começamos pela hotelaria, organizando informação sobre energia, água, resíduos e fornecedores para decisões mais informadas.",
    legalTitles: { privacy: "Aviso de Privacidade | MyCarbonAI", terms: "Termos de Utilização | MyCarbonAI", imprint: "Informações Legais | MyCarbonAI" },
    legalDescriptions: { privacy: "Aviso de privacidade da MyCarbonAI.", terms: "Termos de utilização do site MyCarbonAI.", imprint: "Identificação e contactos da entidade responsável pelo site MyCarbonAI." },
    language: "Idioma",
    privacyOptions: {
      title: "Privacidade e serviços externos",
      body: "Usamos armazenamento local para guardar o idioma e a sua escolha de privacidade. Se aceitar, carregamos o selo Website Carbon, que consulta uma estimativa para esta página e guarda o resultado em cache. Não usamos Google Analytics neste momento.",
      allow: "Aceitar o selo Website Carbon",
      reject: "Continuar sem o selo",
      settings: "Preferências de privacidade",
    },
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
      illustrativeNotice: "Exemplo ilustrativo — os valores e ficheiros não representam dados de um hotel real.",
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
      kicker: "Piloto de designe parceiro · Em validação",
      title: "O que o piloto valida",
      body: "Testamos com uma equipa hoteleira se organizar informação ambiental torna a revisão operacional mais útil e rastreável.",
      scope: ["4 semanas", "1 unidade hoteleira", "1 período de dados"],
      scopeNote: "O âmbito final depende dos dados disponíveis e é acordado com o hotel.",
      cards: [
        { title: "Informação organizada", body: "Dados de energia, água, resíduos e fornecedores reunidos num só registo." },
        { title: "Revisão pela equipa", body: "Uma pessoa da equipa revê os dados extraídos com base nos documentos de origem." },
        { title: "Rastreabilidade", body: "Cada registo mantém a referência ao documento de onde veio." },
      ],
      flowLabel: "Fluxo ilustrativo · Sem dados reais",
      sources: ["Fatura", "Folha de cálculo", "Fornecedor"],
      recordTitle: "Registo ambiental estruturado",
      recordSource: "Ligado à fonte",
      recordReview: "Sujeito a revisão humana",
      reviewTitle: "Revisão pela equipa",
      resultLabel: "Resultado pretendido",
      result: "Um registo ambiental com fontes associadas e CO₂e quando os dados permitem calculá-lo.",
      caveat: "A revisão da equipa não é uma verificação independente. O piloto é exploratório; não representa resultados de redução nem conformidade garantida.",
    },
    future: {
      badge: "Visão do produto",
      disclaimer: "Fora do piloto — ideias a explorar com hotéis parceiros.",
      title: "Para onde o produto pode crescer.",
      body: "Depois de a informação estar organizada e ligada à origem, estas são direções que queremos explorar com os hotéis parceiros. Não fazem parte do que o piloto valida hoje.",
      cards: [
        { title: "Identificar questões operacionais", body: "Cruzar a informação organizada para perceber onde a operação merece atenção." },
        { title: "Explorar oportunidades de redução", body: "Investigar áreas de energia, água e resíduos que possam ser melhoradas." },
        { title: "Planear ações", body: "Escolher próximos passos com base na informação revista e ligada à origem." },
        { title: "Explorar acompanhamento da evolução", body: "Explorar formas de acompanhar mudanças na operação à medida que novos documentos forem acrescentados." },
      ],
    },
    about: {
      kicker: "Sobre a MyCarbonAI",
      title: "A ideia começou com uma dúvida simples.",
      story: "Eu própria não compreendia bem termos como pegada de carbono. Perguntei-me como poderiam as empresas — sobretudo as mais pequenas — tomar decisões ambientais com informação difícil de encontrar e interpretar.",
      missionTitle: "Medir. Reduzir. Agir. Reportar.",
      mission: "A nossa missão é tornar a descarbonização mais acessível às empresas. Começamos pela hotelaria, ajudando as equipas a organizar informação ambiental e a perceber melhor o que já sabem e o que ainda falta.",
    },
    contact: {
      kicker: "Piloto de design parceiro",
      title: "Conversamos com hotéis que queiram explorar um piloto.",
      body: "O piloto serve para organizar informação operacional — energia, água, resíduos e fornecedores — e perceber, em conjunto, se esta base é útil. Sem compromisso de resultados ambientais.",
      bullets: ["Pensado para equipas de hotelaria, manutenção e sustentabilidade.", "Começa pelos documentos que o hotel já tem.", "Os valores de exemplo nesta página são ilustrativos."],
      received: "O seu pedido foi registado.",
      response: "A equipa MyCarbonAI irá analisar o pedido e responder para o email indicado. Se não receber resposta, escreva para info@mycarbonai.com.",
      formTitle: "Pedir uma conversa",
      formIntro: "Conte-nos um pouco sobre o seu hotel e sobre a informação ambiental que procura organizar.",
      name: "Nome",
      email: "Email de trabalho",
      hotel: "Hotel ou grupo",
      request: "Nos últimos 12 meses, alguém pediu estes dados ao seu hotel?",
      select: "Selecione uma opção",
      options: ["Sim, mas foi difícil responder", "Começam a pedir-nos esta informação", "Ainda não nos pediram"],
      context: "Contexto adicional",
      optional: "(opcional)",
      sending: "A enviar…",
      submit: "Pedir uma conversa",
      privacy: "Usaremos estes dados para responder ao seu pedido. Consulte o",
      thanks: "Obrigado pelo seu interesse",
      emailFallbackTitle: "O pedido não foi enviado",
      emailFallbackBody: "Pode enviar os dados através do seu programa de email.",
      emailFallbackAction: "Abrir email",
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
      backToTop: "Voltar ao topo",
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
    metaDescription: "MyCarbonAI makes decarbonisation more accessible to businesses. We are starting with hospitality, organising information about energy, water, waste and suppliers to support informed decisions.",
    legalTitles: { privacy: "Privacy Notice | MyCarbonAI", terms: "Terms of Use | MyCarbonAI", imprint: "Legal Notice | MyCarbonAI" },
    legalDescriptions: { privacy: "MyCarbonAI privacy notice.", terms: "Terms of use for the MyCarbonAI website.", imprint: "Identity and contact details for the organisation responsible for the MyCarbonAI website." },
    language: "Language",
    privacyOptions: {
      title: "Privacy and external services",
      body: "We use local storage to remember your language and privacy choice. If you agree, we load the Website Carbon badge, which requests an estimate for this page and caches the result. We do not currently use Google Analytics.",
      allow: "Allow the Website Carbon badge",
      reject: "Continue without the badge",
      settings: "Privacy preferences",
    },
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
      illustrativeNotice: "Illustrative example — these values and files do not represent data from a real hotel.",
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
      kicker: "Partner design pilot · In validation",
      title: "What the pilot is designed to validate",
      body: "We are testing with a hospitality team whether organising environmental information makes operational review more useful and traceable.",
      scope: ["4 weeks", "1 hotel property", "1 data period"],
      scopeNote: "The final scope depends on available data and is agreed with the hotel.",
      cards: [
        { title: "Organised information", body: "Energy, water, waste and supplier data brought together in one record." },
        { title: "Team review", body: "A team member reviews extracted data against the source documents." },
        { title: "Traceability", body: "Each record keeps a reference to the document it came from." },
      ],
      flowLabel: "Illustrative flow · No real data",
      sources: ["Bill", "Spreadsheet", "Supplier"],
      recordTitle: "Structured environmental record",
      recordSource: "Linked to source",
      recordReview: "Subject to human review",
      reviewTitle: "Team review",
      resultLabel: "Intended output",
      result: "An environmental record with linked sources and CO₂e where the data allows it to be calculated.",
      caveat: "Team review is not independent verification. The pilot is exploratory; it does not represent emissions reductions or guarantee compliance.",
    },
    future: {
      badge: "Product direction",
      disclaimer: "Outside the pilot — ideas to explore with partner hotels.",
      title: "Where the product could grow.",
      body: "Once information is organised and linked to its source, these are directions we would like to explore with partner hotels. They are not part of what the pilot validates today.",
      cards: [
        { title: "Identify operational questions", body: "Bring organised information together to see where the operation may need attention." },
        { title: "Explore reduction opportunities", body: "Investigate areas in energy, water and waste that may be improved." },
        { title: "Plan actions", body: "Choose next steps using information that has been reviewed and linked to its source." },
        { title: "Explore progress tracking", body: "Explore ways to follow operational changes as new documents are added." },
      ],
    },
    about: {
      kicker: "About MyCarbonAI",
      title: "It started with a simple question.",
      story: "I did not initially understand terms such as carbon footprint. I wondered how businesses — especially smaller ones — could make environmental decisions when the information was difficult to find and understand.",
      missionTitle: "Measure. Reduce. Act. Report.",
      mission: "Our mission is to make decarbonisation more accessible to businesses. We are starting with hospitality, helping teams organise environmental information and better understand what they know and what is still missing.",
    },
    contact: {
      kicker: "Partner design pilot",
      title: "We’re speaking with hotels interested in exploring a pilot.",
      body: "The pilot brings operational information — energy, water, waste and suppliers — together so we can assess whether this foundation is useful. No environmental results are promised.",
      bullets: ["Designed for hospitality, facilities and sustainability teams.", "Starts with the documents the hotel already has.", "Examples on this page are illustrative."],
      received: "Your request has been recorded.",
      response: "The MyCarbonAI team will review your request and reply to the email provided. If you do not hear back, write to info@mycarbonai.com.",
      formTitle: "Request a conversation",
      formIntro: "Tell us a little about your hotel and the environmental information you want to organise.",
      name: "Name",
      email: "Work email",
      hotel: "Hotel or group",
      request: "In the last 12 months, has anyone asked your hotel for this data?",
      select: "Choose an option",
      options: ["Yes, but it was difficult to answer", "We are starting to get these requests", "We have not been asked yet"],
      context: "Additional context",
      optional: "(optional)",
      sending: "Sending…",
      submit: "Request a conversation",
      privacy: "We will use these details to respond to your request. Read our",
      thanks: "Thank you for your interest",
      emailFallbackTitle: "Your request was not sent",
      emailFallbackBody: "You can send the details using your email application.",
      emailFallbackAction: "Open email",
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
      backToTop: "Back to top",
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
    const pageDescription = legalKind ? translations[language].legalDescriptions[legalKind] : translations[language].metaDescription;
    description?.setAttribute("content", pageDescription);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", pageDescription);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute("content", document.title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", pageDescription);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
