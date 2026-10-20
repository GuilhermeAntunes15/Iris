import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  Compass,
  HeartHandshake,
  Home,
  Map,
  Menu,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import {
  careers,
  interviewExamples,
  interviewQuestions,
  mapPlaces,
  mentors,
  opportunities,
  questions,
  technicalInterview,
} from "./data";
import {
  defaultState,
  parseFixedSlots,
  reorganizeRoutine,
  rankCareers,
  useStore,
  type Activity,
  type Profile,
} from "./store";

type Store = ReturnType<typeof useStore>;

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !ref.current) return;
      const focusable = [
        ...ref.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
        ),
      ];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    ref.current
      ?.querySelector<HTMLElement>("input, select, textarea, button")
      ?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      previous?.focus();
    };
  }, []);
  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={ref}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <h2 id="dialog-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
const nav = [
  ["Início", "/inicio", Home],
  ["Carreira", "/carreira", Compass],
  ["Mapa", "/mapa", Map],
  ["Rotina", "/rotina", CalendarDays],
  ["Comunidade", "/comunidade", MessageCircle],
  ["Mentorias", "/mentorias", HeartHandshake],
  ["Oportunidades", "/oportunidades", BriefcaseBusiness],
  ["Perfil", "/perfil", CircleUserRound],
] as const;

function Logo({ large = false }: { large?: boolean }) {
  return (
    <div className={`logo ${large ? "logo-large" : ""}`}>
      <span>ÍRIS</span>
      {large && (
        <small>Tecnologia, oportunidades e futuro para mulheres.</small>
      )}
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet" | "danger";
}) {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
}

function PublicHeader() {
  return (
    <header className="public-header">
      <NavLink to="/" aria-label="Página inicial">
        <Logo />
      </NavLink>
      <nav aria-label="Navegação institucional">
        <a href="/#como">Como funciona</a>
        <a href="/#recursos">Recursos</a>
        <a href="/#sobre">Sobre</a>
      </nav>
      <div className="header-actions">
        <NavLink className="button secondary" to="/entrar">
          Entrar
        </NavLink>
        <NavLink className="button primary" to="/cadastro">
          Começar minha jornada
        </NavLink>
      </div>
    </header>
  );
}

function Landing() {
  return (
    <div className="landing">
      <PublicHeader />
      <main>
        <section className="hero">
          <div>
            <span className="eyebrow">
              <Sparkles size={16} /> Um caminho possível, no seu ritmo
            </span>
            <Logo large />
            <h1>
              Íris: A comunidade que acompanha a sua jornada e te guia na
              tecnologia, no seu tempo.
            </h1>
            <p>
              Um guia prático para mulheres e mães que querem ingressar na
              tecnologia, mas não sabem por onde começar.
            </p>
            <div className="hero-actions">
              <NavLink className="button primary" to="/cadastro">
                Começar minha jornada
              </NavLink>
              <Button
                variant="secondary"
                onClick={() =>
                  document
                    .getElementById("recursos")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Conhecer a plataforma
              </Button>
            </div>
          </div>
          <div className="product-preview" aria-label="Prévia do painel ÍRIS">
            <div className="preview-top">Seu caminho, uma etapa por vez</div>
            <article>
              <span className="tag coral">PRÓXIMO PASSO</span>
              <h3>Descubra sua área na tecnologia</h3>
              <div className="progress">
                <i style={{ width: "38%" }} />
              </div>
            </article>
            <div className="preview-row">
              <article>
                <CalendarDays />
                <strong>3 atividades</strong>
                <small>para esta semana</small>
              </article>
              <article>
                <BriefcaseBusiness />
                <strong>6 oportunidades</strong>
                <small>para explorar</small>
              </article>
            </div>
          </div>
        </section>
        <section className="section soft">
          <span className="eyebrow">Onde o ÍRIS ajuda</span>
          <h2>Transforme dúvidas em próximos passos</h2>
          <div className="challenge-grid">
            {[
              "Não saber por onde começar",
              "Encontrar cursos acessíveis",
              "Conciliar estudo e rotina",
              "Construir currículo e confiança",
              "Preparar-se para entrevistas",
            ].map((x, i) => (
              <article key={x}>
                <span>0{i + 1}</span>
                <p>{x}</p>
              </article>
            ))}
          </div>
          <aside className="why-iris" aria-labelledby="why-iris-title">
            <h3 id="why-iris-title">Por que o Íris é para você?</h3>
            <p>
              Conciliar filhos, casa e carreira não é fácil. O Íris foi
              desenhado para caber no seu tempo e respeitar a sua realidade.
            </p>
          </aside>
        </section>
        <section className="section" id="recursos">
          <span className="eyebrow">Recursos conectados</span>
          <h2>Da descoberta à oportunidade</h2>
          <div className="feature-grid">
            {[
              [
                "Descubra sua área",
                "Orientação prática para explorar caminhos em TI.",
                "/carreira",
              ],
              [
                "Encontre apoio perto de você",
                "Cursos e espaços demonstrativos em uma só visão.",
                "/mapa",
              ],
              [
                "Organize sua rotina",
                "Um plano flexível que respeita sua realidade.",
                "/rotina",
              ],
              [
                "Prepare-se para oportunidades",
                "Currículo, entrevistas, mentorias e vagas.",
                "/mentorias",
              ],
            ].map(([t, p, url], i) => (
              <article key={t} className="feature">
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{p}</p>
                <NavLink to={url}>
                  Explorar <ChevronRight size={16} />
                </NavLink>
              </article>
            ))}
          </div>
        </section>
        <section className="section journey" id="como">
          <span className="eyebrow">Como funciona</span>
          <h2>Uma jornada feita de passos concretos</h2>
          <ol>
            {[
              "Conte sua realidade e interesses.",
              "Descubra caminhos compatíveis com você.",
              "Encontre cursos e apoios próximos.",
              "Organize seu plano de estudos.",
              "Prepare-se para o mercado.",
            ].map((x, i) => (
              <li key={x}>
                <strong>{i + 1}</strong>
                <span>{x}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="section about" id="sobre">
          <div>
            <span className="eyebrow">Sobre o projeto</span>
            <h2>Tecnologia como instrumento de transformação social.</h2>
          </div>
          <p>
            O ÍRIS é um protótipo de inclusão, orientação e acesso à tecnologia
            para mulheres. Ele organiza informações e ferramentas para apoiar
            decisões com autonomia, sem prometer caminhos únicos.
          </p>
        </section>
      </main>
      <footer>
        <Logo />
        <p>
          Protótipo demonstrativo. Dados, perfis e oportunidades são fictícios.
        </p>
        <div>
          <NavLink to="/privacidade">Privacidade</NavLink>
          <NavLink to="/acessibilidade">Acessibilidade</NavLink>
        </div>
      </footer>
    </div>
  );
}

function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-shell">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <button
        className="mobile-menu"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu />
      </button>
      <aside className={open ? "open" : ""}>
        <div className="aside-head">
          <Logo />
          <button onClick={() => setOpen(false)} aria-label="Fechar menu">
            <X />
          </button>
        </div>
        <nav>
          {nav.map(([label, to, Icon]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <small>Protótipo demonstrativo</small>
      </aside>
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      {open && (
        <button
          className="overlay"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function Page({
  eyebrow,
  title,
  intro,
  children,
  actions,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <>
      <header className="page-head">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </div>
        {actions}
      </header>
      {children}
    </>
  );
}

function Login() {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <form
        className="auth-card"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/inicio");
        }}
      >
        <span className="eyebrow">Acesso demonstrativo</span>
        <h1>Que bom ter você aqui.</h1>
        <p>
          Use qualquer e-mail válido para conhecer a experiência. Nenhuma
          autenticação real será realizada.
        </p>
        <label>
          E-mail
          <input type="email" required defaultValue="ana@exemplo.demo" />
        </label>
        <label>
          Senha demonstrativa
          <input type="password" required minLength={4} defaultValue="demo" />
        </label>
        <Button type="submit">Entrar no protótipo</Button>
        <NavLink to="/cadastro">Prefiro começar meu cadastro</NavLink>
      </form>
    </div>
  );
}

function ProfileFields({
  profile,
  onChange,
}: {
  profile: Profile;
  onChange: (p: Profile) => void;
}) {
  const field =
    (key: keyof Profile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({
        ...profile,
        [key]: key === "hours" ? Number(e.target.value) : e.target.value,
      });
  return (
    <div className="form-grid">
      <label>
        Nome de exibição
        <input required value={profile.name} onChange={field("name")} />
      </label>
      <label>
        E-mail demonstrativo
        <input
          type="email"
          required
          value={profile.email}
          onChange={field("email")}
        />
      </label>
      <label>
        Situação profissional
        <select value={profile.situation} onChange={field("situation")}>
          {[
            "Quero entrar na área de tecnologia",
            "Quero voltar ao mercado de trabalho",
            "Quero mudar de carreira",
            "Já estudo ou trabalho com tecnologia e quero evoluir",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label>
        Objetivo principal
        <select value={profile.goal} onChange={field("goal")}>
          {[
            "Descobrir minha área profissional",
            "Aprender uma nova habilidade",
            "Conseguir minha primeira oportunidade",
            "Retornar ao mercado de trabalho",
            "Atualizar meus conhecimentos",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label>
        Horas de estudo por semana
        <input
          type="number"
          min="1"
          max="40"
          required
          value={profile.hours}
          onChange={field("hours")}
        />
      </label>
      <label>
        Modalidade preferida
        <select value={profile.mode} onChange={field("mode")}>
          {["Online", "Presencial", "Híbrida"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label>
        Cidade ou região (opcional)
        <input value={profile.city} onChange={field("city")} />
      </label>
      <label>
        Responsabilidades de cuidado (opcional)
        <select value={profile.care} onChange={field("care")}>
          <option>Prefiro não informar</option>
          <option>Sim</option>
          <option>Não</option>
        </select>
      </label>
      <label className="wide">
        Preferência de acessibilidade
        <input
          value={profile.accessibility}
          onChange={field("accessibility")}
          placeholder="Ex.: textos ampliados"
        />
      </label>
    </div>
  );
}

function Signup({ store }: { store: Store }) {
  const [profile, setProfile] = useState(store.state.profile);
  const navigate = useNavigate();
  return (
    <div className="auth-page signup">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <form
        className="auth-card wide-card"
        onSubmit={(e) => {
          e.preventDefault();
          store.setState((s) => ({ ...s, profile }));
          navigate("/inicio");
        }}
      >
        <span className="eyebrow">Seu ponto de partida</span>
        <h1>Vamos montar uma jornada que caiba na sua realidade.</h1>
        <p>
          Você poderá editar tudo depois. Pedimos apenas informações úteis à
          personalização.
        </p>
        <ProfileFields profile={profile} onChange={setProfile} />
        <Button type="submit">Criar experiência demonstrativa</Button>
      </form>
    </div>
  );
}

function Dashboard({ store }: { store: Store }) {
  const { state } = store;
  const navigate = useNavigate();
  const done = state.activities.filter((a) => a.done).length;
  const nextActivity = state.activities.find((activity) => !activity.done);
  const journeyProgress = [
    Object.keys(state.answers).length === questions.length,
    state.careerPlan.length > 0,
    done > 0,
    state.interests.length > 0,
    state.saved.length > 0,
  ];
  const nextSteps = [
    ["Conclua sua orientação profissional", "/carreira"],
    ["Escolha uma área para adicionar ao plano", "/carreira/resultado"],
    ["Conclua uma atividade da sua rotina", "/rotina"],
    ["Conheça uma mentoria demonstrativa", "/mentorias"],
    ["Salve uma oportunidade para acompanhar", "/oportunidades"],
  ];
  const nextStep = nextSteps[journeyProgress.findIndex((item) => !item)] || [
    "Revise suas preferências e próximos objetivos",
    "/perfil",
  ];
  return (
    <Page
      eyebrow="Seu espaço"
      title={`Olá, ${state.profile.name}! Vamos avançar no seu próximo passo profissional?`}
      intro="Seu caminho não precisa acontecer de uma vez. Vamos construir uma etapa por vez."
    >
      <div className="dashboard-grid">
        <article className="card next">
          <span className="tag coral">MEU PRÓXIMO PASSO</span>
          <h2>{nextStep[0]}</h2>
          <p>
            Uma orientação inicial ajuda a escolher o que experimentar primeiro.
          </p>
          <Button onClick={() => navigate(nextStep[1])}>
            Continuar jornada
          </Button>
        </article>
        <article className="card journey-card">
          <h2>Minha jornada</h2>
          {[
            "Descoberta profissional",
            "Exploração de cursos",
            "Plano de estudos",
            "Preparação profissional",
            "Busca por oportunidades",
          ].map((x, i) => (
            <div className="journey-step" key={x}>
              <span className={journeyProgress[i] ? "complete" : ""}>
                {i + 1}
              </span>
              <p>{x}</p>
            </div>
          ))}
        </article>
        <article className="card">
          <div className="card-title">
            <h2>Minha rotina</h2>
            <NavLink to="/rotina">Editar</NavLink>
          </div>
          <strong className="big-number">{state.profile.hours}h</strong>
          <p>previstas para esta semana</p>
          <p>
            <strong>Próxima atividade:</strong>
            <br />
            {nextActivity
              ? `${nextActivity.title} · ${nextActivity.day}, ${nextActivity.time}`
              : "Nenhuma atividade pendente"}
          </p>
          <div className="mini-stats">
            <span>{done} concluídas</span>
            <span>{state.activities.length - done} pendentes</span>
          </div>
        </article>
        <article className="card span-2">
          <div className="card-title">
            <div>
              <span className="tag yellow">PARA VOCÊ</span>
              <h2>Oportunidades para explorar</h2>
            </div>
            <NavLink to="/oportunidades">Ver todas</NavLink>
          </div>
          <div className="compact-list">
            {opportunities.slice(0, 3).map((x) => (
              <div key={x.id}>
                <span>{x.category}</span>
                <strong>{x.title}</strong>
                <small>
                  {x.mode} · {x.level}
                </small>
              </div>
            ))}
          </div>
        </article>
        <article className="card map-preview">
          <h2>Apoio por perto</h2>
          <div className="mini-map">
            <i />
            <i />
            <i />
          </div>
          <Button variant="secondary" onClick={() => navigate("/mapa")}>
            Explorar mapa
          </Button>
        </article>
        <article className="card span-2">
          <div className="card-title">
            <h2>Conversas recentes</h2>
            <NavLink to="/comunidade">Abrir comunidade</NavLink>
          </div>
          <div className="compact-list">
            {state.posts
              .filter((post) => !state.hiddenPosts.includes(post.id))
              .slice(0, 2)
              .map((post) => (
                <div key={post.id}>
                  <span>{post.category}</span>
                  <strong>{post.author}</strong>
                  <small>{post.text}</small>
                </div>
              ))}
          </div>
        </article>
        <article className="card span-2 encouragement">
          <Sparkles />
          <div>
            <h2>O ritmo possível também é progresso.</h2>
            <p>Se a semana mudou, seu plano pode mudar com ela.</p>
          </div>
        </article>
      </div>
    </Page>
  );
}

function Career({ store }: { store: Store }) {
  const [started, setStarted] = useState(
    Object.keys(store.state.answers).length > 0,
  );
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const answer = store.state.answers[step];
  if (!started)
    return (
      <Page
        eyebrow="Orientação profissional"
        title="Descubra caminhos na tecnologia que combinam com você."
        intro="Responda a algumas perguntas sobre seus interesses. Não existe resposta certa ou errada."
      >
        <div className="card intro-card">
          <div className="time-pill">
            3–5 minutos · faça em uma pausa do seu dia
          </div>
          <h2>Uma orientação, não um diagnóstico.</h2>
          <p>Ao final, você verá três áreas para conhecer e experimentar.</p>
          <Button onClick={() => setStarted(true)}>Começar teste</Button>
          <Button
            variant="quiet"
            onClick={() => store.setState((s) => ({ ...s, answers: {} }))}
          >
            Reiniciar respostas
          </Button>
        </div>
      </Page>
    );
  const q = questions[step];
  const finish = () => {
    const result = rankCareers(store.state.answers);
    store.setState((s) => ({ ...s, result }));
    navigate("/carreira/resultado");
  };
  return (
    <Page
      eyebrow={`Pergunta ${step + 1} de ${questions.length}`}
      title={q.text}
    >
      <div
        className="test-progress"
        aria-label={`${step + 1} de ${questions.length}`}
      >
        <i style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="answer-grid">
        {q.options.map((o) => (
          <button
            className={answer === o.career ? "selected" : ""}
            key={o.career}
            onClick={() =>
              store.setState((s) => ({
                ...s,
                answers: { ...s.answers, [step]: o.career },
              }))
            }
          >
            <span>{o.label}</span>
            {answer === o.career && <span aria-hidden>✓</span>}
          </button>
        ))}
      </div>
      <div className="test-actions">
        <Button
          variant="secondary"
          disabled={!step}
          onClick={() => setStep((s) => s - 1)}
        >
          Voltar
        </Button>
        {step === questions.length - 1 ? (
          <Button disabled={!answer} onClick={finish}>
            Ver meu resultado
          </Button>
        ) : (
          <Button disabled={!answer} onClick={() => setStep((s) => s + 1)}>
            Próxima
          </Button>
        )}
      </div>
    </Page>
  );
}

function CareerResult({ store }: { store: Store }) {
  const navigate = useNavigate();
  const result = store.state.result.length
    ? store.state.result
    : defaultState.result;
  const scores = Object.values(store.state.answers).reduce<
    Record<string, number>
  >((totals, key) => ({ ...totals, [key]: (totals[key] || 0) + 1 }), {});
  const highestScore = Math.max(...result.map((key) => scores[key] || 0));
  const leadingTies = result.filter(
    (key) => (scores[key] || 0) === highestScore,
  ).length;
  return (
    <Page
      eyebrow="Seu resultado"
      title={`${store.state.profile.name}, estes são caminhos que vale a pena explorar.`}
      intro="As afinidades empatadas são possibilidades igualmente válidas; experimente antes de decidir."
      actions={
        <NavLink className="button secondary" to="/carreira">
          Refazer teste
        </NavLink>
      }
    >
      <div className="result-grid">
        {result.map((key, i) => {
          const c = careers[key];
          return (
            <article className={`card result r${i}`} key={key}>
              <span className="result-rank">
                {(scores[key] || 0) === highestScore
                  ? leadingTies > 1
                    ? "Maior afinidade — empate"
                    : "Maior afinidade"
                  : `Possibilidade ${i + 1}`}{" "}
                · {scores[key] || 0} pontos
              </span>
              <h2>{c.name}</h2>
              <ul
                className="result-highlights"
                aria-label={`Destaques de ${c.name}`}
              >
                {c.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <h3>Atividades comuns</h3>
              <ul>
                {c.activities.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <h3>Competências para desenvolver</h3>
              <div className="chips">
                {c.skills.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <div className="result-tip">
                <strong>Primeiro projeto</strong>
                <span>{c.project}</span>
              </div>
              <p>
                <strong>Curso sugerido:</strong> {c.course}
              </p>
              <Button
                variant="primary"
                onClick={() =>
                  store.setState((s) => ({
                    ...s,
                    careerPlan: [...new Set([...s.careerPlan, key])],
                  }))
                }
              >
                Adicionar ao meu plano
              </Button>
              <Button
                variant="quiet"
                onClick={() => navigate("/oportunidades")}
              >
                Explorar cursos
              </Button>
            </article>
          );
        })}
      </div>
      <div className="notice">
        Este resultado é uma orientação inicial baseada nas suas respostas, não
        uma avaliação definitiva das suas capacidades ou do seu futuro
        profissional.
      </div>
    </Page>
  );
}

function MapPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [cost, setCost] = useState("Todos");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = mapPlaces.filter(
    (p) =>
      (!search ||
        `${p.name} ${p.address}`
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (category === "Todas" || p.category === category) &&
      (cost === "Todos" || p.cost === cost),
  );
  return (
    <Page
      eyebrow="Recursos ilustrativos"
      title="Mapa de apoio"
      intro="Explore como cursos, espaços de estudo e serviços de apoio poderão ser encontrados em um só lugar."
    >
      <div className="map-filters">
        <label>
          Buscar por nome, cidade ou bairro
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Digite para buscar"
          />
        </label>
        <label>
          Categoria
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Todas</option>
            {[...new Set(mapPlaces.map((x) => x.category))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Custo
          <select value={cost} onChange={(e) => setCost(e.target.value)}>
            <option>Todos</option>
            <option>Gratuito</option>
            <option>Baixo custo</option>
          </select>
        </label>
        <Button
          variant="quiet"
          onClick={() => {
            setSearch("");
            setCategory("Todas");
            setCost("Todos");
          }}
        >
          Limpar filtros
        </Button>
      </div>
      <div className="map-layout">
        <div className="map-results" aria-live="polite">
          <strong>{filtered.length} locais demonstrativos</strong>
          {filtered.map((p) => (
            <article
              className={selected === p.id ? "selected" : ""}
              key={p.id}
              onClick={() => setSelected(p.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelected(p.id);
                }
              }}
              tabIndex={0}
              aria-labelledby={`place-${p.id}`}
            >
              <span className="tag teal">{p.category}</span>
              <h3 id={`place-${p.id}`}>{p.name}</h3>
              <p>{p.address}</p>
              <small>{p.cost}</small>
              <Button variant="quiet" onClick={() => setSelected(p.id)}>
                Ver detalhes
              </Button>
              {selected === p.id && <p className="detail">{p.description}</p>}
            </article>
          ))}
          {!filtered.length && (
            <div className="empty">Nenhum local corresponde aos filtros.</div>
          )}
        </div>
        <div
          className="fake-map"
          role="region"
          aria-label="Mapa ilustrativo com marcadores dos resultados"
        >
          {filtered.map((p) => (
            <button
              aria-label={`Selecionar ${p.name}`}
              aria-pressed={selected === p.id}
              className={selected === p.id ? "active" : ""}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              key={p.id}
              onClick={() => setSelected(p.id)}
            >
              {p.id}
            </button>
          ))}
          <div className="map-label">MAPA DEMONSTRATIVO</div>
        </div>
      </div>
      <div className="notice">
        Os locais apresentados nesta demonstração são ilustrativos. Confirme
        endereço, funcionamento, custos, disponibilidade de vagas e requisitos
        diretamente com cada instituição.
      </div>
    </Page>
  );
}

function Routine({ store }: { store: Store }) {
  const [editing, setEditing] = useState<Activity | null>(null);
  const [gentle, setGentle] = useState(false);
  const state = store.state;
  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    store.setState((s) => ({
      ...s,
      activities: editing.id
        ? s.activities.map((a) =>
            a.id === editing.id ? { ...editing, generated: false } : a,
          )
        : [...s.activities, { ...editing, id: Date.now(), generated: false }],
    }));
    setEditing(null);
  };
  const planned = state.activities.reduce((n, a) => n + a.minutes, 0);
  const completed = state.activities
    .filter((a) => a.done)
    .reduce((n, a) => n + a.minutes, 0);
  return (
    <Page
      eyebrow="Minha rotina possível"
      title="Um plano flexível para a semana real."
      intro="Ajuste quantas vezes precisar. Pausas e imprevistos também fazem parte."
      actions={
        <Button
          onClick={() =>
            setEditing({
              id: 0,
              title: "",
              day: "Segunda",
              time: "19:00",
              minutes: 25,
              category: "Estudo",
              done: false,
              generated: false,
            })
          }
        >
          Adicionar atividade
        </Button>
      }
    >
      <div className="stats-row">
        <article>
          <strong>{planned} min</strong>
          <span>planejados</span>
        </article>
        <article>
          <strong>{completed} min</strong>
          <span>concluídos</span>
        </article>
        <article>
          <strong>{state.activities.filter((a) => a.done).length}</strong>
          <span>atividades finalizadas</span>
        </article>
      </div>
      <div className="routine-layout">
        <section className="card">
          <div className="card-title">
            <h2>Visão semanal</h2>
            <Button variant="quiet" onClick={() => setGentle(true)}>
              Hoje não foi como planejado
            </Button>
          </div>
          <div className="activity-list">
            {state.activities.map((a) => (
              <article key={a.id} className={a.done ? "done" : ""}>
                <button
                  className="check"
                  aria-label={
                    a.done ? `Reabrir ${a.title}` : `Concluir ${a.title}`
                  }
                  onClick={() =>
                    store.setState((s) => ({
                      ...s,
                      activities: s.activities.map((x) =>
                        x.id === a.id ? { ...x, done: !x.done } : x,
                      ),
                    }))
                  }
                >
                  {a.done ? "✓" : ""}
                </button>
                <div>
                  <strong>{a.title}</strong>
                  <span>
                    {a.day}, {a.time} · {a.minutes} min · {a.category}
                  </span>
                </div>
                <Button variant="quiet" onClick={() => setEditing(a)}>
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    store.setState((s) => ({
                      ...s,
                      activities: s.activities.filter((x) => x.id !== a.id),
                    }))
                  }
                >
                  Excluir
                </Button>
              </article>
            ))}
          </div>
          <Button
            variant="secondary"
            onClick={() =>
              store.setState((s) => ({
                ...s,
                activities: reorganizeRoutine(
                  s.activities,
                  s.profile.hours,
                  s.routinePrefs,
                ),
              }))
            }
          >
            Gerar ou reorganizar minha semana
          </Button>
          <p className="helper-text">
            Atividades concluídas e atividades adicionadas ou editadas por você
            serão preservadas; somente sugestões automáticas pendentes serão
            substituídas.
          </p>
        </section>
        <aside className="card routine-settings">
          <h2>Preferências</h2>
          <label>
            Horas disponíveis por semana
            <input
              type="number"
              min="1"
              max="40"
              value={state.profile.hours}
              onChange={(e) =>
                store.setState((s) => ({
                  ...s,
                  profile: { ...s.profile, hours: Number(e.target.value) },
                }))
              }
            />
          </label>
          <label>
            Dias com mais disponibilidade
            <input
              value={state.routinePrefs.days}
              placeholder="Ex.: Terça, Quinta, Sábado"
              onChange={(e) =>
                store.setState((s) => ({
                  ...s,
                  routinePrefs: { ...s.routinePrefs, days: e.target.value },
                }))
              }
            />
          </label>
          <label>
            Melhor período
            <select
              value={state.routinePrefs.period}
              onChange={(e) =>
                store.setState((s) => ({
                  ...s,
                  routinePrefs: { ...s.routinePrefs, period: e.target.value },
                }))
              }
            >
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
            </select>
          </label>
          <label>
            Duração preferida
            <select
              value={state.routinePrefs.session}
              onChange={(e) =>
                store.setState((s) => ({
                  ...s,
                  routinePrefs: {
                    ...s.routinePrefs,
                    session: Number(e.target.value),
                  },
                }))
              }
            >
              {[15, 25, 30, 45].map((minutes) => (
                <option key={minutes} value={minutes}>
                  {minutes} minutos
                </option>
              ))}
            </select>
          </label>
          <label>
            Horários fixos (opcional)
            <textarea
              value={state.routinePrefs.fixed}
              onChange={(e) =>
                store.setState((s) => ({
                  ...s,
                  routinePrefs: { ...s.routinePrefs, fixed: e.target.value },
                }))
              }
              placeholder="Trabalho, cuidado ou estudo"
            />
            <small>Formato reconhecido: Terça 19:30; Quinta 20:00.</small>
            {state.routinePrefs.fixed &&
              !parseFixedSlots(state.routinePrefs.fixed).length && (
                <span className="field-error" role="status">
                  Nenhum horário reconhecido; use o formato indicado.
                </span>
              )}
          </label>
          <label>
            Objetivo atual
            <input
              value={state.routinePrefs.objective}
              onChange={(e) =>
                store.setState((s) => ({
                  ...s,
                  routinePrefs: {
                    ...s.routinePrefs,
                    objective: e.target.value,
                  },
                }))
              }
            />
          </label>
          <p>As sugestões reservam margem para descanso e imprevistos.</p>
        </aside>
      </div>
      {editing && (
        <Modal
          title={editing.id ? "Editar atividade" : "Nova atividade"}
          onClose={() => setEditing(null)}
        >
          <form onSubmit={save}>
            <label>
              Atividade
              <input
                autoFocus
                required
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
              />
            </label>
            <label>
              Dia
              <select
                value={editing.day}
                onChange={(e) =>
                  setEditing({ ...editing, day: e.target.value })
                }
              >
                {[
                  "Segunda",
                  "Terça",
                  "Quarta",
                  "Quinta",
                  "Sexta",
                  "Sábado",
                  "Domingo",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Horário
              <input
                type="time"
                required
                value={editing.time}
                onChange={(e) =>
                  setEditing({ ...editing, time: e.target.value })
                }
              />
            </label>
            <label>
              Duração em minutos
              <input
                type="number"
                min="10"
                max="180"
                required
                value={editing.minutes}
                onChange={(e) =>
                  setEditing({ ...editing, minutes: Number(e.target.value) })
                }
              />
            </label>
            <div>
              <Button type="submit">Salvar</Button>
              <Button
                type="button"
                variant="quiet"
                onClick={() => setEditing(null)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {gentle && (
        <Modal
          title="Tudo bem ajustar o plano."
          onClose={() => setGentle(false)}
        >
          <p>Vamos encontrar um próximo passo que caiba na sua realidade.</p>
          <Button
            onClick={() => {
              store.setState((s) => ({
                ...s,
                activities: s.activities.map((a) =>
                  a.done ? a : { ...a, minutes: Math.max(15, a.minutes - 10) },
                ),
              }));
              setGentle(false);
            }}
          >
            Reduzir tarefas pendentes
          </Button>
          <Button variant="quiet" onClick={() => setGentle(false)}>
            Manter como está
          </Button>
        </Modal>
      )}
    </Page>
  );
}

function Opportunities({ store }: { store: Store }) {
  const [area, setArea] = useState("Todas");
  const [mode, setMode] = useState("Todas");
  const [category, setCategory] = useState("Todas");
  const [cost, setCost] = useState("Todos");
  const [level, setLevel] = useState("Todos");
  const [type, setType] = useState("Todos");
  const [savedOnly, setSavedOnly] = useState(false);
  const [detail, setDetail] = useState<number | null>(null);
  const filtered = opportunities.filter(
    (x) =>
      (area === "Todas" || x.area === area) &&
      (mode === "Todas" || x.mode === mode) &&
      (category === "Todas" || x.category === category) &&
      (cost === "Todos" || x.cost === cost) &&
      (level === "Todos" || x.level === level) &&
      (type === "Todos" || x.type === type) &&
      (!savedOnly || store.state.saved.includes(x.id)),
  );
  return (
    <Page
      eyebrow="Cursos, bolsas e vagas"
      title="Oportunidades para experimentar caminhos."
      intro="Todos os registros desta versão são fictícios e servem apenas para demonstrar a experiência."
    >
      <div className="filter-bar">
        <label>
          Área
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option>Todas</option>
            {[...new Set(opportunities.map((x) => x.area))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Modalidade
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Todas</option>
            {[...new Set(opportunities.map((x) => x.mode))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Categoria
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Todas</option>
            {[...new Set(opportunities.map((x) => x.category))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Custo
          <select value={cost} onChange={(e) => setCost(e.target.value)}>
            <option>Todos</option>
            {[...new Set(opportunities.map((x) => x.cost))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Nível
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option>Todos</option>
            {[...new Set(opportunities.map((x) => x.level))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Tipo
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Todos</option>
            {[...new Set(opportunities.map((x) => x.type))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(e) => setSavedOnly(e.target.checked)}
          />{" "}
          Somente salvas
        </label>
        <Button
          variant="quiet"
          onClick={() => {
            setArea("Todas");
            setMode("Todas");
            setCategory("Todas");
            setCost("Todos");
            setLevel("Todos");
            setType("Todos");
            setSavedOnly(false);
          }}
        >
          Limpar filtros
        </Button>
      </div>
      <div className="opportunity-grid">
        {filtered.map((x) => {
          const saved = store.state.saved.includes(x.id);
          return (
            <article className="card" key={x.id}>
              <div className="tags">
                <span className="tag yellow">DEMONSTRATIVA</span>
                <span className="tag teal">{x.category}</span>
              </div>
              <h2>{x.title}</h2>
              <p>{x.institution}</p>
              <div className="chips">
                <span>{x.area}</span>
                <span>{x.mode}</span>
                <span>{x.level}</span>
                <span>{x.cost}</span>
              </div>
              <Button
                variant="quiet"
                onClick={() => setDetail(detail === x.id ? null : x.id)}
                aria-expanded={detail === x.id}
              >
                {detail === x.id ? "Ocultar detalhes" : "Ver detalhes"}
              </Button>
              {detail === x.id && (
                <div className="result-tip">
                  <p>{x.description}</p>
                  <p>
                    <strong>Requisitos demonstrativos:</strong> interesse pela
                    área e disponibilidade para aprender.
                  </p>
                  <p>
                    Nenhum link ou prazo real está associado a este registro.
                  </p>
                </div>
              )}
              <Button
                variant={saved ? "secondary" : "primary"}
                onClick={() =>
                  store.setState((s) => ({
                    ...s,
                    saved: saved
                      ? s.saved.filter((id) => id !== x.id)
                      : [...s.saved, x.id],
                  }))
                }
              >
                {saved ? "Remover dos salvos" : "Salvar oportunidade"}
              </Button>
            </article>
          );
        })}
      </div>
      {!filtered.length && (
        <div className="empty">
          Nenhuma oportunidade corresponde aos filtros escolhidos.
        </div>
      )}
    </Page>
  );
}

function Community({ store }: { store: Store }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Todas");
  const [commenting, setCommenting] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const categories = [
    "Início na tecnologia",
    "Estudos e cursos",
    "Maternidade e carreira",
    "Primeiro emprego",
    "Transição profissional",
    "Dúvidas técnicas",
    "Conquistas e projetos",
  ];
  const posts = store.state.posts.filter(
    (p) =>
      !store.state.hiddenPosts.includes(p.id) &&
      (category === "Todas" || p.category === category),
  );
  const publish = (e: FormEvent) => {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    store.setState((s) => ({
      ...s,
      posts: [
        {
          id: Date.now(),
          author: s.profile.name,
          category: category === "Todas" ? categories[0] : category,
          text: clean.slice(0, 600),
          liked: false,
          likes: 0,
          comments: [],
          demo: false,
        },
        ...s.posts,
      ],
    }));
    setText("");
  };
  return (
    <Page
      eyebrow="Comunidade demonstrativa"
      title="Trocas que ajudam a seguir em frente."
      intro="As publicações ficam apenas neste navegador. Não há moderação ou proteção de dados em produção."
    >
      <form className="card composer" onSubmit={publish}>
        <label htmlFor="new-post">
          Compartilhe uma dúvida, conquista ou experiência
        </label>
        <textarea
          id="new-post"
          maxLength={600}
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escreva uma publicação respeitosa..."
        />
        <div>
          <select
            aria-label="Categoria da publicação"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Todas</option>
            {categories.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <Button type="submit">Publicar</Button>
        </div>
      </form>
      <div className="feed-layout">
        <div className="topic-filter">
          <strong>Filtrar por tema</strong>
          <button
            className={category === "Todas" ? "active" : ""}
            onClick={() => setCategory("Todas")}
          >
            Todos
          </button>
          {categories.map((x) => (
            <button
              className={category === x ? "active" : ""}
              key={x}
              onClick={() => setCategory(x)}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="feed" aria-live="polite">
          {posts.map((p) => (
            <article className="card post" key={p.id}>
              <div className="avatar">{p.author.charAt(0)}</div>
              <div>
                <div className="post-head">
                  <strong>{p.author}</strong>
                  {p.demo && <span className="tag yellow">EXEMPLO</span>}
                </div>
                <small>{p.category} · demonstração recente</small>
                <p>{p.text}</p>
                <div className="post-actions">
                  <button
                    onClick={() =>
                      store.setState((s) => ({
                        ...s,
                        posts: s.posts.map((x) =>
                          x.id === p.id
                            ? {
                                ...x,
                                liked: !x.liked,
                                likes: x.likes + (x.liked ? -1 : 1),
                              }
                            : x,
                        ),
                      }))
                    }
                  >
                    {p.liked ? "♥" : "♡"} {p.likes}
                  </button>
                  <button
                    onClick={() =>
                      setCommenting(commenting === p.id ? null : p.id)
                    }
                  >
                    Comentar ({p.comments.length})
                  </button>
                  <button
                    disabled={store.state.reportedPosts.includes(p.id)}
                    onClick={() => {
                      store.setState((s) => ({
                        ...s,
                        reportedPosts: [...new Set([...s.reportedPosts, p.id])],
                      }));
                    }}
                  >
                    {store.state.reportedPosts.includes(p.id)
                      ? "Denúncia registrada"
                      : "Denunciar"}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Ocultar esta publicação neste navegador?"))
                        store.setState((s) => ({
                          ...s,
                          hiddenPosts: [...new Set([...s.hiddenPosts, p.id])],
                        }));
                    }}
                  >
                    Bloquear conteúdo
                  </button>
                </div>
                {commenting === p.id && (
                  <form
                    className="comment-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const clean = comment.trim();
                      if (!clean) return;
                      store.setState((s) => ({
                        ...s,
                        posts: s.posts.map((x) =>
                          x.id === p.id
                            ? {
                                ...x,
                                comments: [...x.comments, clean.slice(0, 300)],
                              }
                            : x,
                        ),
                      }));
                      setComment("");
                      setCommenting(null);
                    }}
                  >
                    <input
                      aria-label="Novo comentário"
                      maxLength={300}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button type="submit">Enviar</Button>
                  </form>
                )}
                {p.comments.map((c, i) => (
                  <p className="comment" key={i}>
                    {c}
                  </p>
                ))}
              </div>
            </article>
          ))}
          {!posts.length && (
            <div className="empty">Ainda não há publicações neste tema.</div>
          )}
        </div>
      </div>
    </Page>
  );
}

function Mentoring({
  store,
  initialTab = "mentorias",
}: {
  store: Store;
  initialTab?: "mentorias" | "curriculo" | "entrevista";
}) {
  const [tab, setTab] = useState<"mentorias" | "curriculo" | "entrevista">(
    initialTab,
  );
  const cvExample = {
    name: store.state.profile.name,
    goal: store.state.profile.goal,
    summary:
      "Profissional em transição para tecnologia, com vontade de aprender e competências transferíveis.",
    education: "Ensino médio completo — Instituição demonstrativa, 2022",
    courses: "Lógica de programação — Curso demonstrativo, 20 horas",
    skills: "Organização, comunicação, aprendizado contínuo",
    projects:
      "Página de apresentação responsiva criada com HTML e CSS. Planejei a estrutura, implementei e revisei a acessibilidade básica.",
    experience:
      "Atendimento ao público: organização de demandas, comunicação clara e resolução de problemas. Competências transferíveis para equipes de tecnologia.",
  };
  const [cv, setCv] = useState(cvExample);
  const [q, setQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(false);
  const [mentorDetail, setMentorDetail] = useState<number | null>(null);
  const [technical, setTechnical] = useState(false);
  const technicalArea = store.state.result[0] || "dev";
  return (
    <Page
      eyebrow="Preparação profissional"
      title="Pratique antes da próxima oportunidade."
      intro="Escolha uma ferramenta e avance em uma etapa de cada vez."
    >
      <div className="tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "mentorias"}
          className={tab === "mentorias" ? "active" : ""}
          onClick={() => setTab("mentorias")}
        >
          Mentorias
        </button>
        <button
          role="tab"
          aria-selected={tab === "curriculo"}
          className={tab === "curriculo" ? "active" : ""}
          onClick={() => setTab("curriculo")}
        >
          Laboratório de currículo
        </button>
        <button
          role="tab"
          aria-selected={tab === "entrevista"}
          className={tab === "entrevista" ? "active" : ""}
          onClick={() => setTab("entrevista")}
        >
          Simulador de entrevista
        </button>
      </div>
      {tab === "mentorias" && (
        <div className="mentor-grid">
          {mentors.map((m) => {
            const interested = store.state.interests.includes(m.id);
            return (
              <article className="card" key={m.id}>
                <div className="avatar mentor-avatar">{m.name.slice(-1)}</div>
                <span className="tag teal">PERFIL DEMONSTRATIVO</span>
                <h2>{m.name}</h2>
                <p>
                  {m.area} · {m.format}
                </p>
                <h3>{m.theme}</h3>
                <small>Duração estimada: {m.duration}</small>
                <Button
                  variant="quiet"
                  aria-expanded={mentorDetail === m.id}
                  onClick={() =>
                    setMentorDetail(mentorDetail === m.id ? null : m.id)
                  }
                >
                  {mentorDetail === m.id ? "Ocultar detalhes" : "Ver detalhes"}
                </Button>
                {mentorDetail === m.id && (
                  <div className="result-tip">
                    <p>{m.description}</p>
                    <p>
                      <strong>Formato:</strong> {m.format}. Esta sessão e
                      disponibilidade são apenas demonstrativas.
                    </p>
                  </div>
                )}
                <Button
                  variant={interested ? "secondary" : "primary"}
                  onClick={() =>
                    store.setState((s) => ({
                      ...s,
                      interests: interested
                        ? s.interests.filter((id) => id !== m.id)
                        : [...s.interests, m.id],
                    }))
                  }
                >
                  {interested ? "Interesse registrado" : "Demonstrar interesse"}
                </Button>
              </article>
            );
          })}
        </div>
      )}
      {tab === "curriculo" && (
        <>
          <div className="notice cv-guidance">
            <strong>Como apresentar sua trajetória:</strong> projetos acadêmicos
            e estudos independentes podem demonstrar prática; descreva sua
            contribuição e o resultado. Em experiências anteriores, destaque
            competências transferíveis como organização, atendimento, análise e
            colaboração. Não invente experiências ou conhecimentos.
          </div>
          <div className="cv-layout">
            <form className="card cv-form">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setCv(cvExample)}
              >
                Carregar exemplo completo
              </Button>
              {Object.entries(cv).map(([key, value]) => (
                <label key={key}>
                  {
                    (
                      {
                        name: "Nome profissional",
                        goal: "Objetivo de carreira",
                        summary: "Resumo profissional",
                        education: "Formação",
                        courses: "Cursos",
                        skills: "Competências",
                        projects: "Projetos",
                        experience: "Experiências",
                      } as Record<string, string>
                    )[key]
                  }
                  <textarea
                    value={value}
                    onChange={(e) => setCv({ ...cv, [key]: e.target.value })}
                  />
                </label>
              ))}
            </form>
            <article className="cv-preview">
              <span>CURRÍCULO</span>
              <h1>{cv.name || "Seu nome"}</h1>
              <h2>{cv.goal}</h2>
              <p>{cv.summary}</p>
              {[
                ["Formação", cv.education],
                ["Cursos", cv.courses],
                ["Competências", cv.skills],
                ["Projetos e estudos independentes", cv.projects],
                ["Experiências e competências transferíveis", cv.experience],
              ].map(
                ([title, value]) =>
                  value && (
                    <section key={title}>
                      <h3>{title}</h3>
                      <p>{value}</p>
                    </section>
                  ),
              )}
              <Button onClick={() => window.print()}>
                Imprimir ou salvar em PDF
              </Button>
            </article>
          </div>
        </>
      )}
      {tab === "entrevista" && (
        <div className="card interview">
          <div className="interview-mode">
            <Button
              variant={!technical ? "primary" : "quiet"}
              onClick={() => {
                setTechnical(false);
                setAnswer("");
                setFeedback(false);
              }}
            >
              Perguntas comportamentais
            </Button>
            <Button
              variant={technical ? "primary" : "quiet"}
              onClick={() => {
                setTechnical(true);
                setAnswer("");
                setFeedback(false);
              }}
            >
              Treino técnico: {careers[technicalArea].name}
            </Button>
          </div>
          <span className="eyebrow">
            {technical
              ? "Treino técnico introdutório"
              : `Pergunta ${q + 1} de ${interviewQuestions.length}`}
          </span>
          <h2>
            {technical
              ? technicalInterview[technicalArea].question
              : interviewQuestions[q]}
          </h2>
          <label>
            Sua resposta
            <textarea
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setFeedback(false);
              }}
              placeholder="Estruture sua resposta com contexto, ação e aprendizado."
            />
          </label>
          <Button disabled={!answer.trim()} onClick={() => setFeedback(true)}>
            Ver orientação
          </Button>
          {feedback && (
            <div className="feedback">
              <h3>Orientação local</h3>
              <p>
                {answer.length < 80
                  ? "Tente incluir um exemplo concreto e o que você aprendeu com a experiência."
                  : "Sua resposta já traz contexto. Revise se a sua contribuição e o aprendizado ficaram claros."}
              </p>
              <p>
                <strong>Estrutura sugerida:</strong> contexto breve, ação que
                você tomou, resultado e aprendizado.
              </p>
              <div className="result-tip">
                <strong>Exemplo orientativo</strong>
                <p>
                  {technical
                    ? technicalInterview[technicalArea].example
                    : interviewExamples[q]}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  if (!technical) setQ((q + 1) % interviewQuestions.length);
                  setAnswer("");
                  setFeedback(false);
                }}
              >
                {technical ? "Treinar novamente" : "Próxima pergunta"}
              </Button>
            </div>
          )}
        </div>
      )}
    </Page>
  );
}

function ProfilePage({ store }: { store: Store }) {
  const [profile, setProfile] = useState(store.state.profile);
  const [saved, setSaved] = useState(false);
  const milestones = [
    Object.keys(store.state.answers).length === questions.length,
    store.state.careerPlan.length > 0,
    store.state.activities.some((activity) => activity.done),
    store.state.interests.length > 0,
    store.state.saved.length > 0,
  ];
  const completedMilestones = milestones.filter(Boolean).length;
  const nextActions = [
    "Concluir orientação profissional",
    "Adicionar uma área ao plano",
    "Concluir uma atividade da rotina",
    "Demonstrar interesse em uma mentoria",
    "Salvar uma oportunidade",
  ];
  return (
    <Page
      eyebrow="Perfil e preferências"
      title="Seu caminho, suas escolhas."
      intro="Atualize as informações que personalizam a experiência."
    >
      <div className="profile-layout">
        <form
          className="card"
          onSubmit={(e) => {
            e.preventDefault();
            store.setState((s) => ({ ...s, profile }));
            setSaved(true);
          }}
        >
          <ProfileFields
            profile={profile}
            onChange={(p) => {
              setProfile(p);
              setSaved(false);
            }}
          />
          <Button type="submit">Salvar alterações</Button>
          {saved && (
            <span className="success" role="status">
              Preferências salvas.
            </span>
          )}
        </form>
        <aside className="card">
          <h2>Minha jornada</h2>
          <p>
            <strong>Progresso:</strong> {completedMilestones} de{" "}
            {milestones.length} etapas
          </p>
          <div
            className="progress"
            aria-label={`${completedMilestones} de ${milestones.length} etapas concluídas`}
          >
            <i
              style={{
                width: `${(completedMilestones / milestones.length) * 100}%`,
              }}
            />
          </div>
          <p>
            <strong>Próxima ação:</strong>{" "}
            {nextActions[milestones.findIndex((item) => !item)] ||
              "Continuar explorando oportunidades"}
          </p>
          <p>
            <strong>Área principal:</strong>{" "}
            {careers[store.state.result[0] || "dev"].name}
          </p>
          <p>
            <strong>Atividades concluídas:</strong>{" "}
            {store.state.activities.filter((a) => a.done).length}
          </p>
          <p>
            <strong>Oportunidades salvas:</strong> {store.state.saved.length}
          </p>
          <p>
            <strong>Mentorias de interesse:</strong>{" "}
            {store.state.interests.length}
          </p>
          <NavLink className="button secondary" to="/carreira/resultado">
            Ver orientação profissional
          </NavLink>
          <NavLink className="button secondary" to="/rotina">
            Abrir planejador
          </NavLink>
          <Button
            variant="danger"
            onClick={() => {
              if (
                confirm("Limpar todos os dados locais e reiniciar o protótipo?")
              )
                store.reset();
            }}
          >
            <RotateCcw size={16} /> Reiniciar protótipo
          </Button>
        </aside>
      </div>
    </Page>
  );
}

function Info({ type }: { type: "privacidade" | "acessibilidade" }) {
  const privacy = type === "privacidade";
  return (
    <div className="info-page">
      <PublicHeader />
      <main>
        <span className="eyebrow">Informação do protótipo</span>
        <h1>{privacy ? "Privacidade" : "Acessibilidade"}</h1>
        <p>
          {privacy
            ? "Esta versão não possui servidor nem autenticação real. Dados preenchidos são armazenados apenas no localStorage deste navegador e podem ser apagados na tela Perfil."
            : "O ÍRIS usa estrutura semântica, rótulos, foco visível, contraste, navegação por teclado e adaptação a movimento reduzido. Se encontrar uma barreira, registre-a na apresentação do protótipo."}
        </p>
        <NavLink className="button primary" to="/">
          Voltar à página inicial
        </NavLink>
      </main>
    </div>
  );
}

export default function App() {
  const store = useStore();
  const appRoutes = useMemo(
    () => [
      <Route
        key="inicio"
        path="/inicio"
        element={<Dashboard store={store} />}
      />,
      <Route
        key="carreira"
        path="/carreira"
        element={<Career store={store} />}
      />,
      <Route
        key="resultado"
        path="/carreira/resultado"
        element={<CareerResult store={store} />}
      />,
      <Route key="mapa" path="/mapa" element={<MapPage />} />,
      <Route key="rotina" path="/rotina" element={<Routine store={store} />} />,
      <Route
        key="comunidade"
        path="/comunidade"
        element={<Community store={store} />}
      />,
      <Route
        key="mentorias"
        path="/mentorias"
        element={<Mentoring store={store} />}
      />,
      <Route
        key="curriculo"
        path="/curriculo"
        element={<Mentoring store={store} initialTab="curriculo" />}
      />,
      <Route
        key="entrevista"
        path="/entrevista"
        element={<Mentoring store={store} initialTab="entrevista" />}
      />,
      <Route
        key="oportunidades"
        path="/oportunidades"
        element={<Opportunities store={store} />}
      />,
      <Route
        key="perfil"
        path="/perfil"
        element={<ProfilePage store={store} />}
      />,
    ],
    [store.state],
  );
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/entrar" element={<Login />} />
      <Route path="/cadastro" element={<Signup store={store} />} />
      <Route path="/privacidade" element={<Info type="privacidade" />} />
      <Route path="/acessibilidade" element={<Info type="acessibilidade" />} />
      {appRoutes.map((r) => (
        <Route
          key={r.key}
          path={r.props.path}
          element={<AppShell>{r.props.element}</AppShell>}
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
