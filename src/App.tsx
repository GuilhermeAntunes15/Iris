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
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CircleUserRound,
  Compass,
  GraduationCap,
  HeartHandshake,
  Home,
  Map,
  Menu,
  MessageCircle,
  Moon,
  Rocket,
  RotateCcw,
  Search,
  Sparkles,
  Sun,
  UserRound,
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
    <div className={`logo ${large ? "logo-large" : ""}`} aria-label="ÍRIS">
      <span className="logo-mark" aria-hidden="true">
        <i />
      </span>
      <span className="logo-copy">
        <strong>ÍRIS</strong>
        {large && (
          <small>Tecnologia, oportunidades e futuro para mulheres.</small>
        )}
      </span>
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

function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === "dark",
  );
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("iris-theme", next);
    } catch {
      // armazenamento indisponível: a escolha vale só nesta sessão
    }
    setDark(!dark);
  };
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={dark ? "Modo claro" : "Modo escuro"}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
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
        <a href="/#desafio">O desafio</a>
        <a href="/#como">Como funciona</a>
        <a href="/#recursos">Recursos</a>
        <a href="/#sobre">Sobre</a>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
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

const difficulties = [
  ["Não sei por onde começar", 47, "c-teal"],
  ["Falta de informação sobre cursos", 38, "c-blue"],
  ["Falta de orientação profissional", 30, "c-green"],
  ["Falta de oportunidades", 26, "c-orange"],
  ["Falta de confiança em si mesma", 22, "c-pink"],
  ["Outros motivos", 10, "c-purple"],
] as const;

const journeyStages = [
  ["Interesse", "Conte sua realidade, seu tempo e o que desperta sua curiosidade.", Sparkles, "c-blue"],
  ["Informação", "Entenda as áreas da tecnologia sem jargão nem pressa.", Search, "c-teal"],
  ["Orientação", "Descubra caminhos compatíveis com você.", Compass, "c-green"],
  ["Formação", "Encontre cursos e apoios próximos e organize seus estudos.", GraduationCap, "c-orange"],
  ["Oportunidade", "Prepare currículo e entrevista com apoio de mentoras.", BriefcaseBusiness, "c-pink"],
  ["Entrada na área", "Dê o primeiro passo no mercado com uma comunidade por perto.", Rocket, "c-purple"],
] as const;

const resources = [
  ["Carreira", "Um teste rápido de orientação para descobrir sua área.", "/carreira", Compass, "c-teal"],
  ["Mapa de apoio", "Cursos e espaços demonstrativos perto de você.", "/mapa", Map, "c-blue"],
  ["Rotina", "Um plano de estudos flexível que respeita a sua agenda.", "/rotina", CalendarDays, "c-green"],
  ["Comunidade", "Troque dúvidas e conquistas com outras mulheres.", "/comunidade", MessageCircle, "c-orange"],
  ["Mentorias", "Currículo, entrevistas e conversas com quem já está na área.", "/mentorias", HeartHandshake, "c-pink"],
  ["Oportunidades", "Vagas e programas para quem está começando.", "/oportunidades", BriefcaseBusiness, "c-purple"],
] as const;

const v = (vars: Record<string, string | number>) => vars as React.CSSProperties;

function CountUp({ to, decimals = 1 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1600, 1);
          setValue(to * (1 - (1 - p) ** 3));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref}>
      {value.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}

function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    if (!root || !hero) return;
    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduce =
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    root.classList.add("motion-ready");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }),
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => io.observe(el));

    // Parallax leve das esferas — só com mouse; transform direto em cada camada.
    const orbs = [...hero.querySelectorAll<HTMLElement>("[data-depth]")];
    let raf = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - 0.5;
        const y = (event.clientY - r.top) / r.height - 0.5;
        orbs.forEach((orb) => {
          const d = Number(orb.dataset.depth);
          orb.style.transform = `translate3d(${x * d}px, ${y * d}px, 0)`;
        });
      });
    };
    hero.addEventListener("pointermove", move);
    return () => {
      io.disconnect();
      hero.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="landing" ref={rootRef}>
      <PublicHeader />
      <main>
        <section className="lp-hero" ref={heroRef}>
          <div className="lp-orbs" aria-hidden="true">
            {[
              ["o1", 30],
              ["o2", -40],
              ["o3", 24],
              ["o4", -20],
              ["o5", 70],
              ["o6", -60],
              ["o7", 90],
            ].map(([cls, depth]) => (
              <span key={cls} className={`lp-orb ${cls}`} data-depth={depth}>
                <i />
              </span>
            ))}
          </div>
          <div className="lp-hero-inner">
            <p className="lp-wordmark" aria-hidden="true">
              IRIS
            </p>
            <p className="lp-tagline">
              Tecnologia, oportunidades e futuro para mulheres
            </p>
            <div className="lp-hero-grid">
              <div>
                <h1>
                  Íris: A comunidade que acompanha a sua jornada e te guia na
                  tecnologia, no seu tempo.
                </h1>
                <p className="lp-lead">
                  Um guia prático para mulheres e mães que querem ingressar na
                  tecnologia, mas não sabem por onde começar.
                </p>
                <div className="lp-actions">
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
              <div className="lp-preview-wrap">
                <div
                  className="lp-preview glass"
                  aria-label="Prévia do painel ÍRIS"
                >
                  <div className="lp-preview-top">
                    Seu caminho, uma etapa por vez
                  </div>
                  <article>
                    <span className="tag coral">PRÓXIMO PASSO</span>
                    <h3>Descubra sua área na tecnologia</h3>
                    <div className="progress">
                      <i style={{ width: "38%" }} />
                    </div>
                  </article>
                  <div className="lp-preview-row">
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
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section" id="desafio" aria-labelledby="desafio-title">
          <header className="lp-head" data-reveal>
            <span className="eyebrow">O desafio</span>
            <h2 id="desafio-title">O interesse existe. O que falta é caminho.</h2>
            <p>
              Muitas meninas e mulheres querem entrar na tecnologia, mas
              esbarram na falta de informação, orientação e oportunidades.
            </p>
          </header>
          <div className="lp-problem-grid">
            <article className="lp-stat glass" data-reveal>
              <p className="lp-stat-number">
                <span aria-hidden="true">
                  <CountUp to={19.2} />
                  <small>%</small>
                </span>
                <span className="sr-only">19,2%</span>
              </p>
              <p className="lp-stat-text">
                dos profissionais de tecnologia no Brasil são mulheres.
              </p>
              <ul
                className="lp-people"
                aria-label="A cada 10 profissionais de tecnologia, 2 são mulheres"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <li
                    key={i}
                    className={i < 2 ? "is-woman" : undefined}
                    style={v({ "--i": i })}
                    aria-hidden="true"
                  >
                    <UserRound strokeWidth={2.25} />
                  </li>
                ))}
              </ul>
              <p className="lp-people-caption">
                A cada 10 profissionais, <strong>apenas 2</strong> são
                mulheres.
              </p>
              <small className="lp-source">
                Fonte: SOFTEX (2025) — Observatório Softex: Mulheres na
                Tecnologia
              </small>
            </article>
            <article className="lp-bars glass" data-reveal style={v({ "--i": 1 })}>
              <h3>Principais dificuldades</h3>
              <p>
                Meninas de 15 a 24 anos interessadas em seguir carreira em
                tecnologia.
              </p>
              <ul>
                {difficulties.map(([label, value, color], i) => (
                  <li key={label} className={color}>
                    <span>{label}</span>
                    <div className="lp-track" aria-hidden="true">
                      <i style={v({ "--v": value / 50, "--i": i })} />
                    </div>
                    <strong>{value}%</strong>
                  </li>
                ))}
              </ul>
              <small className="lp-source">
                Fonte: INEP (2023) — Censo da Educação Superior
              </small>
            </article>
          </div>
          <aside
            className="why-iris glass"
            aria-labelledby="why-iris-title"
            data-reveal
          >
            <span aria-hidden="true">
              <HeartHandshake />
            </span>
            <div>
              <h3 id="why-iris-title">Por que o Íris é para você?</h3>
              <p>
                Conciliar filhos, casa e carreira não é fácil. O Íris foi
                desenhado para caber no seu tempo e respeitar a sua realidade.
              </p>
            </div>
          </aside>
        </section>

        <section className="lp-section" id="como" aria-labelledby="como-title">
          <header className="lp-head" data-reveal>
            <span className="eyebrow">Como funciona</span>
            <h2 id="como-title">
              Do interesse à entrada na área, um passo de cada vez.
            </h2>
            <p>
              A jornada foi estruturada com Design Thinking a partir das
              dificuldades que as próprias meninas relataram.
            </p>
          </header>
          <ol className="lp-journey-track" data-reveal>
            {journeyStages.map(([title, text, Icon, color], i) => (
              <li key={title} className={color} style={v({ "--i": i })}>
                <span className="lp-node" aria-hidden="true">
                  <Icon size={28} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="lp-section"
          id="recursos"
          aria-labelledby="recursos-title"
        >
          <header className="lp-head" data-reveal>
            <span className="eyebrow">A plataforma</span>
            <h2 id="recursos-title">Tudo o que você precisa, num só lugar.</h2>
            <p>
              Cursos, orientação, rotina, comunidade e oportunidades conectados
              — escolha por onde entrar.
            </p>
          </header>
          <div className="lp-resources">
            {resources.map(([title, text, url, Icon, color], i) => (
              <NavLink
                key={url}
                to={url}
                className={`lp-card ${color}`}
                data-reveal
                style={v({ "--i": i % 3 })}
              >
                <span className="lp-card-shine" aria-hidden="true" />
                <span className="lp-card-icon" aria-hidden="true">
                  <Icon size={26} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="lp-card-go" aria-hidden="true">
                  Acessar <ArrowRight size={18} />
                </span>
              </NavLink>
            ))}
          </div>
        </section>

        <section className="lp-section" id="sobre" aria-labelledby="sobre-title">
          <div className="lp-about glass" data-reveal>
            <div className="lp-about-copy">
              <span className="eyebrow">Sobre o projeto</span>
              <h2 id="sobre-title">
                Tecnologia como instrumento de transformação social.
              </h2>
              <p>
                O ÍRIS busca transformar o interesse pela tecnologia em
                oportunidades reais, reunindo informação, orientação e caminhos
                de aprendizagem para meninas e mulheres — sem prometer caminhos
                únicos.
              </p>
              <div className="lp-actions">
                <NavLink className="button primary" to="/cadastro">
                  Começar minha jornada
                </NavLink>
                <NavLink className="button secondary" to="/entrar">
                  Já tenho acesso
                </NavLink>
              </div>
            </div>
            <dl className="lp-credits">
              <div>
                <dt>Autoras</dt>
                <dd>Ana Julia Borges, Erica Klemar e Larissa Lee</dd>
              </div>
              <div>
                <dt>Afiliação</dt>
                <dd>
                  Conselheiro Crispiniano · orientação de Guilherme Antunes de
                  Campos
                </dd>
              </div>
              <div>
                <dt>Referências</dt>
                <dd>
                  INEP (2023) — Censo da Educação Superior · SOFTEX (2025) —
                  Observatório Softex · UNESCO (2015) — Decifrar o código
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <footer>
        <Logo />
        <p>
          Protótipo demonstrativo. Perfis e oportunidades são fictícios.
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
        <div className="aside-foot">
          <small>Protótipo demonstrativo</small>
          <ThemeToggle />
        </div>
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
