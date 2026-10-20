import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

describe("ÍRIS", () => {
  beforeEach(() => localStorage.clear());

  it("exibe a proposta de valor na landing page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", {
        name: "Íris: A comunidade que acompanha a sua jornada e te guia na tecnologia, no seu tempo.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Um guia prático para mulheres e mães que querem ingressar na tecnologia, mas não sabem por onde começar.",
      ),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Começar minha jornada" })
        .every((link) => link.getAttribute("href") === "/cadastro"),
    ).toBe(true);
    [
      "Conte sua realidade e interesses.",
      "Descubra caminhos compatíveis com você.",
      "Encontre cursos e apoios próximos.",
      "Organize seu plano de estudos.",
      "Prepare-se para o mercado.",
    ].forEach((step) => expect(screen.getByText(step)).toBeInTheDocument());
    expect(
      screen.getByRole("heading", { name: "Por que o Íris é para você?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Conciliar filhos, casa e carreira não é fácil. O Íris foi desenhado para caber no seu tempo e respeitar a sua realidade.",
      ),
    ).toBeInTheDocument();
  });

  it("carrega o perfil demonstrativo no painel", () => {
    render(
      <MemoryRouter initialEntries={["/inicio"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: /Olá, Ana/i }),
    ).toBeInTheDocument();
  });

  it("redireciona uma rota inexistente", () => {
    render(
      <MemoryRouter initialEntries={["/rota-inexistente"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", {
        name: "Íris: A comunidade que acompanha a sua jornada e te guia na tecnologia, no seu tempo.",
      }),
    ).toBeInTheDocument();
  });

  it("destaca que o teste cabe em uma pausa", () => {
    render(
      <MemoryRouter initialEntries={["/carreira"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("3–5 minutos · faça em uma pausa do seu dia"),
    ).toBeInTheDocument();
  });

  it.each([
    ["/curriculo", /CURRÍCULO/i],
    ["/entrevista", /Conte um pouco sobre você/i],
  ])("carrega a rota funcional %s", (route, content) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getAllByText(content).length).toBeGreaterThan(0);
  });

  it("abre um diálogo semântico de rotina e fecha com Escape", () => {
    render(
      <MemoryRouter initialEntries={["/rotina"]}>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Adicionar atividade" }),
    );
    expect(
      screen.getByRole("dialog", { name: "Nova atividade" }),
    ).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("registra denúncia da comunidade no estado local", () => {
    render(
      <MemoryRouter initialEntries={["/comunidade"]}>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getAllByRole("button", { name: "Denunciar" })[0]);
    expect(
      screen.getByRole("button", { name: "Denúncia registrada" }),
    ).toBeDisabled();
  });

  it("leva o resultado vocacional para os cursos", () => {
    render(
      <MemoryRouter initialEntries={["/carreira/resultado"]}>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(
      screen.getAllByRole("button", { name: "Explorar cursos" })[0],
    );
    expect(
      screen.getByRole("heading", {
        name: /Oportunidades para experimentar caminhos/i,
      }),
    ).toBeInTheDocument();
  });

  it("resume as áreas em listas e destaca a ação de planejamento", () => {
    render(
      <MemoryRouter initialEntries={["/carreira/resultado"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("list", {
        name: "Destaques de Desenvolvimento de software",
      }),
    ).toHaveTextContent(
      "Construa páginas e aplicativos desde os primeiros estudos.",
    );
    expect(
      screen
        .getAllByRole("button", { name: "Adicionar ao meu plano" })
        .every((button) => button.classList.contains("primary")),
    ).toBe(true);
  });

  it("oferece exemplo completo de currículo e treino técnico por área", () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={["/curriculo"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getAllByText(/Página de apresentação responsiva/i).length,
    ).toBeGreaterThan(0);
    unmount();
    render(
      <MemoryRouter initialEntries={["/entrevista"]}>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: /Treino técnico/i }));
    expect(
      screen.getByRole("heading", {
        name: /diferença entre HTML, CSS e JavaScript/i,
      }),
    ).toBeInTheDocument();
  });
});
