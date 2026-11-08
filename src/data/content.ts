export const COPY = {
  eyebrow: "Inteligência ambiental para hotelaria",
  titleLead: "Veja onde está o",
  titleAccent: "impacto ambiental",
  titleTail: "do seu hotel — e onde pode agir.",
  body:
    "Organize informação sobre energia, água, resíduos e fornecedores para compreender melhor a operação e criar uma base para decisões ambientais mais informadas.",
  ctaPilot: "Explorar um piloto",
  ctaHow: "Ver como funciona",
};

export const NAV = [
  { id: "hotelaria", label: "Hotelaria", href: "/hotelaria" },
  { id: "como-funciona", label: "Como funciona", href: "/como-funciona" },
  { id: "jornada", label: "Jornada", href: "/jornada" },
  { id: "produto", label: "Produto", href: "/produto" },
  { id: "sobre", label: "Sobre", href: "/sobre" },
] as const;

export const STEPS = [
  {
    id: "identificar",
    num: "01",
    title: "Identificar",
    text: "Perceber que informação existe e o que falta.",
  },
  {
    id: "medir",
    num: "02",
    title: "Medir",
    text: "Organizar dados ambientais disponíveis.",
  },
  {
    id: "reduzir",
    num: "03",
    title: "Reduzir",
    text: "Encontrar áreas que merecem ser investigadas.",
  },
  {
    id: "agir",
    num: "04",
    title: "Agir",
    text: "Escolher os próximos passos.",
  },
  {
    id: "reportar",
    num: "05",
    title: "Reportar",
    text: "Preparar informação clara e ligada às fontes.",
  },
] as const;

export const ILLUSTRATIVE_METRICS = [
  {
    id: "energia",
    label: "Energia",
    value: "12.460",
    unit: "kWh",
    source: "fatura_energia.pdf",
  },
  {
    id: "agua",
    label: "Água",
    value: "401",
    unit: "m³",
    source: "fatura_agua.pdf",
  },
  {
    id: "residuos",
    label: "Resíduos",
    value: "2.320",
    unit: "kg",
    source: "relatorio_residuos.pdf",
  },
] as const;

export const DOCUMENTS = [
  {
    id: "elec",
    title: "Fatura de eletricidade",
    tag: "PDF",
    linked: true,
    origin: "EDP",
    period: "Jan 2024",
    file: "fatura_edp.pdf",
  },
  {
    id: "water",
    title: "Fatura de água",
    tag: "PDF",
    linked: true,
    origin: "EPAL",
    period: "Jan 2024",
    file: "fatura_aguas.pdf",
  },
  {
    id: "waste",
    title: "Relatório de resíduos",
    tag: "PDF",
    linked: true,
    origin: "Resiestra",
    period: "Jan 2024",
    file: "relatorio_residuos.pdf",
  },
] as const;

export const PILOT_VALIDATES = [
  {
    title: "Organização de informação operacional",
    text: "Documentos de energia, água, resíduos e fornecedores passam a estar reunidos e estruturados num só sítio.",
  },
  {
    title: "Dados revistos, não inventados",
    text: "A informação é extraída e revista a partir dos documentos da operação — sem estimar o que não está na origem.",
  },
  {
    title: "Ligação permanente à origem",
    text: "Cada valor permanece ligado ao documento de onde veio, para poder ser consultado e verificado.",
  },
] as const;

export const FUTURE_VISION = [
  {
    title: "Identificar problemas operacionais",
    text: "Cruzar a informação organizada para perceber onde a operação merece atenção.",
  },
  {
    title: "Explorar oportunidades de redução",
    text: "Investigar áreas de energia, água e resíduos que possam ser melhoradas.",
  },
  {
    title: "Planear ações",
    text: "Escolher próximos passos com base na informação já revista e ligada à origem.",
  },
  {
    title: "Acompanhar progresso",
    text: "Seguir a evolução da operação à medida que novos documentos entram no sistema.",
  },
] as const;

export const CHAPTERS = [
  { id: "paisagem", label: "Paisagem" },
  { id: "hotelaria", label: "Hotelaria" },
  { id: "documentos", label: "Documentos" },
  { id: "jornada", label: "Jornada" },
  { id: "produto", label: "Produto" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];
