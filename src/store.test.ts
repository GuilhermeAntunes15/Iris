import { beforeEach, describe, expect, it } from "vitest";
import { careerKeys, questions } from "./data";
import {
  generateRoutine,
  loadState,
  mergeGeneratedRoutine,
  rankCareers,
  reorganizeRoutine,
} from "./store";

describe("rankCareers", () => {
  it("ordena as três maiores afinidades", () => {
    expect(
      rankCareers({
        0: "ux",
        1: "dev",
        2: "ux",
        3: "dados",
        4: "dev",
        5: "ux",
      }),
    ).toEqual(["ux", "dev", "dados"]);
  });

  it("inclui todas as áreas empatadas na nota de corte", () => {
    expect(rankCareers({ 0: "ux", 1: "dev", 2: "dados", 3: "qa" })).toEqual([
      "dev",
      "dados",
      "qa",
      "ux",
    ]);
  });
});

describe("questions", () => {
  it("usa alternativas próprias e mantém todas as chaves de carreira", () => {
    expect(
      new Set(
        questions.map((question) =>
          question.options.map((option) => option.label).join("|"),
        ),
      ).size,
    ).toBe(12);
    expect(
      questions.every(
        (question) =>
          question.options.map((option) => option.career).join("|") ===
          careerKeys.join("|"),
      ),
    ).toBe(true);
  });
});

describe("generateRoutine", () => {
  it("gera plano determinístico usando no máximo 80% do tempo disponível", () => {
    const prefs = {
      days: "Terça, Sábado",
      period: "Manhã",
      session: 30,
      fixed: "",
      objective: "Estudar dados",
    };
    const first = generateRoutine(4, prefs);
    expect(first).toEqual(generateRoutine(4, prefs));
    expect(
      first.reduce((total, item) => total + item.minutes, 0),
    ).toBeLessThanOrEqual(4 * 60 * 0.8);
    expect(first.every((item) => ["Terça", "Sábado"].includes(item.day))).toBe(
      true,
    );
    for (const day of ["Terça", "Sábado"]) {
      const starts = first
        .filter((item) => item.day === day)
        .map((item) => item.time);
      expect(new Set(starts).size).toBe(starts.length);
    }
  });

  it("evita horários fixos reconhecidos", () => {
    const result = generateRoutine(1, {
      days: "Terça",
      period: "Manhã",
      session: 30,
      fixed: "Terça 08:00",
      objective: "Estudar",
    });
    expect(result.every((item) => item.time !== "08:00")).toBe(true);
  });

  it("escalona sessões do mesmo dia conforme a duração sem sobrepor um horário fixo", () => {
    const result = generateRoutine(2, {
      days: "Terça",
      period: "Manhã",
      session: 30,
      fixed: "Terça 08:30",
      objective: "Estudar",
    });
    expect(result.map((item) => item.time)).toEqual([
      "08:00",
      "09:30",
      "10:00",
    ]);
  });

  it("reorganiza apenas pendências geradas e preserva concluídas e manuais", () => {
    const completed = {
      id: 1,
      title: "Concluída",
      day: "Segunda",
      time: "08:00",
      minutes: 25,
      category: "Estudo",
      done: true,
      generated: true,
    };
    const manual = {
      id: 2,
      title: "Manual",
      day: "Quarta",
      time: "10:00",
      minutes: 30,
      category: "Projeto",
      done: false,
      generated: false,
    };
    const pendingGenerated = {
      ...completed,
      id: 3,
      title: "Antiga",
      done: false,
    };
    const replacement = { ...pendingGenerated, id: 1_000_000, title: "Nova" };
    const extra = { ...replacement, id: 1_000_001, title: "Excedente" };
    expect(
      mergeGeneratedRoutine(
        [completed, manual, pendingGenerated],
        [replacement, extra],
        80,
      ),
    ).toEqual([completed, manual, replacement]);
    expect(
      [completed, manual, replacement].reduce(
        (total, item) => total + item.minutes,
        0,
      ),
    ).toBe(80);
  });

  it("desconta atividades preservadas do orçamento semanal ao reorganizar", () => {
    const preserved = [
      {
        id: 1,
        title: "Concluída",
        day: "Terça",
        time: "08:00",
        minutes: 45,
        category: "Estudo",
        done: true,
        generated: true,
      },
      {
        id: 2,
        title: "Manual",
        day: "Terça",
        time: "09:00",
        minutes: 30,
        category: "Projeto",
        done: false,
        generated: false,
      },
    ];
    const result = reorganizeRoutine(preserved, 3, {
      days: "Terça",
      period: "Manhã",
      session: 30,
      fixed: "",
      objective: "Estudar",
    });
    expect(result.slice(0, 2)).toEqual(preserved);
    expect(
      result.reduce((total, item) => total + item.minutes, 0),
    ).toBeLessThanOrEqual(144);
    expect(result[2]?.time).toBe("09:30");
  });
});

describe("loadState", () => {
  beforeEach(() => localStorage.clear());

  it("descarta entidades e campos locais inválidos profundamente", () => {
    localStorage.setItem(
      "iris:v1",
      JSON.stringify({
        profile: { name: 9, hours: 999 },
        activities: [{ id: "ruim", title: [] }],
        posts: [{ id: 1, text: {}, comments: "ruim" }],
        saved: [1, "2", -1],
        answers: { 0: "inexistente", 1: "ux" },
      }),
    );
    const state = loadState();
    expect(state.profile.name).toBe("Ana");
    expect(state.profile.hours).toBe(40);
    expect(state.activities).toEqual([]);
    expect(state.posts).toEqual([]);
    expect(state.saved).toEqual([1]);
    expect(state.answers).toEqual({ 1: "ux" });
  });
});
