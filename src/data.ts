export const careerKeys = [
  "dev",
  "dados",
  "qa",
  "ux",
  "cyber",
  "produto",
] as const;
export type CareerKey = (typeof careerKeys)[number];

export const careers: Record<
  CareerKey,
  {
    name: string;
    highlights: string[];
    skills: string[];
    activities: string[];
    course: string;
    project: string;
  }
> = {
  dev: {
    name: "Desenvolvimento de software",
    highlights: [
      "Construa páginas e aplicativos desde os primeiros estudos.",
      "Veja suas ideias funcionando na prática.",
    ],
    skills: ["Lógica", "HTML e CSS", "JavaScript"],
    activities: [
      "Escrever código",
      "Construir funcionalidades",
      "Resolver problemas",
    ],
    course: "Introdução à lógica e desenvolvimento web",
    project: "Crie uma página pessoal acessível.",
  },
  dados: {
    name: "Dados e inteligência de negócios",
    highlights: [
      "Transforme informações em respostas claras.",
      "Comece com planilhas e visualizações simples.",
    ],
    skills: ["Planilhas", "Estatística básica", "Visualização"],
    activities: [
      "Organizar dados",
      "Identificar padrões",
      "Apresentar descobertas",
    ],
    course: "Fundamentos de análise de dados",
    project: "Analise uma planilha de hábitos de estudo.",
  },
  qa: {
    name: "Qualidade e testes de software",
    highlights: [
      "Use sua atenção aos detalhes para encontrar falhas.",
      "Ajude a tornar produtos digitais mais confiáveis.",
    ],
    skills: ["Testes", "Pensamento crítico", "Documentação"],
    activities: ["Planejar testes", "Encontrar falhas", "Apoiar melhorias"],
    course: "Introdução à qualidade de software",
    project: "Crie um roteiro de testes para um aplicativo.",
  },
  ux: {
    name: "UX/UI e design de produtos",
    highlights: [
      "Combine criatividade, pesquisa e organização.",
      "Crie experiências mais claras e acessíveis.",
    ],
    skills: ["Pesquisa", "Prototipação", "Acessibilidade"],
    activities: ["Entrevistar pessoas", "Desenhar fluxos", "Testar interfaces"],
    course: "Primeiros passos em UX/UI",
    project: "Redesenhe o fluxo de cadastro de um serviço.",
  },
  cyber: {
    name: "Cibersegurança e infraestrutura",
    highlights: [
      "Aprenda a reconhecer riscos e proteger acessos.",
      "Explore investigação e aprendizado contínuo.",
    ],
    skills: ["Redes", "Segurança digital", "Investigação"],
    activities: [
      "Analisar riscos",
      "Proteger acessos",
      "Responder a incidentes",
    ],
    course: "Fundamentos de segurança digital",
    project: "Monte um checklist de segurança pessoal.",
  },
  produto: {
    name: "Análise, produtos e projetos",
    highlights: [
      "Conecte necessidades, pessoas e entregas.",
      "Use organização e comunicação para orientar decisões.",
    ],
    skills: ["Planejamento", "Comunicação", "Análise de requisitos"],
    activities: [
      "Organizar prioridades",
      "Mapear necessidades",
      "Acompanhar entregas",
    ],
    course: "Introdução à gestão de produtos",
    project: "Planeje uma solução digital em etapas.",
  },
};

const stems = [
  "Qual atividade mais desperta sua curiosidade?",
  "O que mais te satisfaz em uma tarefa?",
  "Como você prefere aprender?",
  "Quais assuntos mais chamam sua atenção?",
  "Em um projeto, qual papel você gostaria de experimentar?",
  "Qual tipo de problema gostaria de resolver?",
  "Com o que você prefere trabalhar?",
  "O que gostaria de experimentar primeiro?",
  "Como reage a um problema novo?",
  "Qual resultado deixaria você mais satisfeita?",
  "Qual ambiente gostaria de conhecer?",
  "O que mais quer desenvolver agora?",
];
const optionLabels = [
  [
    "Criar sites e aplicativos",
    "Organizar informações e identificar padrões",
    "Investigar problemas e encontrar soluções",
    "Criar interfaces e experiências visuais",
    "Proteger sistemas e investigar ameaças",
    "Entender pessoas e organizar projetos",
  ],
  [
    "Ver algo que criei funcionando",
    "Descobrir algo importante nos dados",
    "Identificar e corrigir falhas",
    "Melhorar a experiência de alguém",
    "Tornar um sistema mais seguro",
    "Fazer uma equipe alcançar um objetivo",
  ],
  [
    "Praticando e construindo projetos",
    "Analisando exemplos e dados",
    "Testando diferentes possibilidades",
    "Criando protótipos",
    "Investigando situações reais",
    "Organizando processos e colaborando",
  ],
  [
    "Programação",
    "Dados e estatística",
    "Qualidade de software",
    "Design e experiência do usuário",
    "Segurança e privacidade digital",
    "Negócios, produtos e gestão",
  ],
  [
    "Desenvolver funcionalidades",
    "Analisar informações",
    "Testar e encontrar erros",
    "Planejar uma interface",
    "Investigar riscos",
    "Coordenar atividades",
  ],
  [
    "Criar uma ferramenta digital",
    "Transformar dados em decisões",
    "Melhorar a qualidade de um software",
    "Deixar um produto mais fácil de usar",
    "Tornar um sistema mais seguro",
    "Melhorar um processo de trabalho",
  ],
  [
    "Código e construção",
    "Dados e investigação",
    "Testes e análise",
    "Interfaces e pessoas",
    "Segurança e infraestrutura",
    "Planejamento e comunicação",
  ],
  [
    "Criar uma página web",
    "Analisar uma planilha",
    "Encontrar falhas em um sistema",
    "Desenhar a tela de um aplicativo",
    "Investigar um problema de segurança",
    "Organizar as etapas de um projeto",
  ],
  [
    "Quero experimentar soluções",
    "Quero observar as informações",
    "Quero testar hipóteses",
    "Quero entender a experiência das pessoas",
    "Quero investigar riscos e causas",
    "Quero dividir o problema em etapas",
  ],
  [
    "Um aplicativo funcionando",
    "Uma análise bem fundamentada",
    "Um software com menos erros",
    "Uma experiência mais intuitiva",
    "Um sistema mais confiável",
    "Um projeto organizado e entregue",
  ],
  [
    "Desenvolvimento de produtos digitais",
    "Análise de negócios e dados",
    "Qualidade de software",
    "Design de produtos",
    "Segurança e infraestrutura",
    "Gestão de projetos de tecnologia",
  ],
  [
    "Conhecimentos de programação",
    "Pensamento analítico",
    "Atenção aos detalhes",
    "Criatividade e empatia",
    "Investigação e segurança",
    "Organização e comunicação",
  ],
] as const;
export const questions = stems.map((text, index) => ({
  id: index,
  text,
  options: careerKeys.map((career, i) => ({
    career,
    label: optionLabels[index][i],
  })),
}));

export type Opportunity = {
  id: number;
  title: string;
  institution: string;
  category: string;
  type: string;
  area: string;
  mode: string;
  level: string;
  cost: string;
  description: string;
};
export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Fundamentos de desenvolvimento web",
    institution: "Instituição demonstrativa Aurora",
    category: "Curso",
    type: "Curso gratuito",
    area: "Desenvolvimento",
    mode: "Remoto",
    level: "Iniciante",
    cost: "Gratuito",
    description: "Trilha introdutória com exercícios práticos.",
  },
  {
    id: 2,
    title: "Bolsa inicial em análise de dados",
    institution: "Programa demonstrativo Prisma",
    category: "Bolsa",
    type: "Bolsa de estudo",
    area: "Dados",
    mode: "Híbrido",
    level: "Iniciante",
    cost: "Gratuito",
    description: "Formação ilustrativa em dados e visualização.",
  },
  {
    id: 3,
    title: "Oficina de portfólio UX",
    institution: "Estúdio demonstrativo Horizonte",
    category: "Evento",
    type: "Evento e oficina",
    area: "Design",
    mode: "Remoto",
    level: "Iniciante",
    cost: "Gratuito",
    description: "Encontro ilustrativo para estruturar um primeiro caso.",
  },
  {
    id: 4,
    title: "Estágio em qualidade de software",
    institution: "Empresa demonstrativa Ipê",
    category: "Estágio",
    type: "Vaga de estágio",
    area: "Qualidade",
    mode: "Híbrido",
    level: "Iniciante",
    cost: "N/A",
    description: "Oportunidade fictícia para praticar testes manuais.",
  },
  {
    id: 5,
    title: "Programa retorno à tecnologia",
    institution: "Rede demonstrativa Recomeço",
    category: "Retorno",
    type: "Programa de formação",
    area: "Produto",
    mode: "Remoto",
    level: "Iniciante",
    cost: "Gratuito",
    description: "Programa ilustrativo de atualização profissional.",
  },
  {
    id: 6,
    title: "Vaga júnior em suporte e segurança",
    institution: "Empresa demonstrativa Farol",
    category: "Vaga júnior",
    type: "Vaga júnior",
    area: "Segurança",
    mode: "Presencial",
    level: "Iniciante",
    cost: "N/A",
    description: "Vaga fictícia para demonstrar os filtros.",
  },
  {
    id: 7,
    title: "Trilha intermediária de automação de testes",
    institution: "Escola demonstrativa Girassol",
    category: "Curso",
    type: "Curso pago",
    area: "Qualidade",
    mode: "Remoto",
    level: "Intermediário",
    cost: "Pago",
    description: "Curso fictício sobre automação e boas práticas de qualidade.",
  },
  {
    id: 8,
    title: "Encontro introdutório de cibersegurança",
    institution: "Coletivo demonstrativo Semente",
    category: "Evento",
    type: "Evento e oficina",
    area: "Segurança",
    mode: "Presencial",
    level: "Iniciante",
    cost: "Baixo custo",
    description:
      "Oficina fictícia para conhecer fundamentos de proteção digital.",
  },
];

export const mapPlaces = Array.from({ length: 12 }, (_, i) => {
  const categories = [
    "Curso presencial",
    "Capacitação",
    "Educação infantil",
    "Apoio à família",
    "Biblioteca",
    "Espaço de estudo",
  ];
  return {
    id: i + 1,
    name: `${categories[i % 6]} demonstrativo ${String.fromCharCode(65 + i)}`,
    category: categories[i % 6],
    address: `Endereço ilustrativo — Bairro ${i + 1}`,
    cost: i % 3 === 0 ? "Baixo custo" : "Gratuito",
    x: 12 + ((i * 29) % 76),
    y: 15 + ((i * 37) % 68),
    description:
      "Registro fictício criado apenas para demonstrar o funcionamento do mapa.",
  };
});

export const mentors = [
  "Carreira em tecnologia",
  "Portfólio",
  "Entrevistas",
  "Retorno ao mercado",
  "Currículo inicial",
  "Transição profissional",
].map((theme, i) => ({
  id: i + 1,
  name: `Mentora demonstrativa ${String.fromCharCode(65 + i)}`,
  area: ["Desenvolvimento", "Design", "Produto"][i % 3],
  theme,
  duration: `${30 + i * 5} min`,
  format: i % 2 ? "Encontro remoto" : "Roda de conversa",
  description: [
    "Conversa demonstrativa para mapear objetivos, experiências transferíveis e um próximo passo profissional possível.",
    "Sessão ilustrativa sobre seleção de projetos, narrativa e organização de um portfólio para iniciantes.",
    "Prática demonstrativa de apresentação, perguntas comportamentais e preparação antes de entrevistas.",
    "Encontro ilustrativo para reconhecer experiências anteriores e planejar uma retomada gradual e realista.",
    "Orientação demonstrativa para apresentar estudos, projetos e competências mesmo sem experiência formal na área.",
    "Conversa ilustrativa para comparar caminhos, identificar lacunas e criar um plano de transição profissional.",
  ][i],
}));

export const initialPosts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  author: `Participante demonstrativa ${String.fromCharCode(65 + i)}`,
  category: [
    "Início na tecnologia",
    "Estudos e cursos",
    "Maternidade e carreira",
    "Primeiro emprego",
    "Transição profissional",
    "Dúvidas técnicas",
  ][i % 6],
  text: [
    "Qual curso introdutório ajudou vocês a entender lógica?",
    "Consegui terminar meu primeiro exercício em HTML hoje.",
    "Estou testando sessões curtas de estudo e tem funcionado melhor.",
    "Como vocês organizaram o primeiro portfólio?",
  ][i % 4],
  liked: false,
  likes: 3 + i,
  comments: [] as string[],
  demo: true,
}));

export const interviewQuestions = [
  "Conte um pouco sobre você e seu objetivo profissional.",
  "Por que deseja trabalhar com tecnologia?",
  "Como você costuma aprender algo novo?",
  "Conte sobre um problema que resolveu.",
  "Como organiza suas prioridades?",
  "O que está fazendo para se preparar para uma oportunidade?",
];

export const interviewExamples = [
  "Estou em transição para tecnologia e venho estudando de forma consistente. Minha experiência anterior desenvolveu organização e comunicação, e agora busco aplicar essas competências em uma oportunidade inicial na área.",
  "Quero trabalhar com tecnologia porque gosto de aprender, resolver problemas e construir soluções úteis. Tenho explorado a área por meio de cursos e pequenos projetos para tomar uma decisão baseada em experiência prática.",
  "Começo dividindo o assunto em etapas pequenas, procuro uma fonte introdutória e pratico logo depois. Registro dúvidas e reviso o que errei para ajustar meu estudo.",
  "Em uma atividade recente, organizei informações que estavam dispersas, defini prioridades e testei uma solução simples. O resultado foi um processo mais claro e aprendi a validar antes de ampliar a mudança.",
  "Organizo as tarefas por impacto e prazo, divido entregas grandes e reservo margem para imprevistos. Quando algo muda, comunico cedo e reorganizo o plano.",
  "Estou estudando fundamentos, construindo um projeto pequeno e praticando como explicar meu raciocínio. Também reviso oportunidades para entender quais competências aparecem com frequência.",
];

export const technicalInterview: Record<
  CareerKey,
  { question: string; example: string }
> = {
  dev: {
    question: "Qual é a diferença entre HTML, CSS e JavaScript?",
    example:
      "HTML estrutura o conteúdo, CSS define a apresentação e JavaScript adiciona comportamento e interação.",
  },
  dados: {
    question:
      "Como você verificaria a qualidade de uma planilha antes de analisá-la?",
    example:
      "Eu observaria dados ausentes, duplicados, formatos inconsistentes e valores fora do esperado antes de calcular ou visualizar.",
  },
  qa: {
    question: "O que deve existir em um bom caso de teste?",
    example:
      "Um objetivo claro, pré-condições, passos, dados utilizados e o resultado esperado.",
  },
  ux: {
    question: "Por que testar um protótipo com pessoas usuárias?",
    example:
      "Para observar dificuldades reais e validar hipóteses antes de investir na implementação completa.",
  },
  cyber: {
    question:
      "Por que senhas únicas e autenticação em dois fatores são importantes?",
    example:
      "Senhas únicas limitam o impacto de vazamentos e o segundo fator dificulta o acesso mesmo quando uma senha é descoberta.",
  },
  produto: {
    question: "Como você priorizaria duas necessidades concorrentes?",
    example:
      "Eu compararia impacto para as pessoas, urgência, esforço, riscos e alinhamento com o objetivo do produto, registrando os critérios da decisão.",
  },
};
