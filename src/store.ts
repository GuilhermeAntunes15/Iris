import { useEffect, useState } from "react";
import { careerKeys, initialPosts, type CareerKey } from "./data";

export type Profile = {
  name: string;
  email: string;
  situation: string;
  goal: string;
  hours: number;
  mode: string;
  city: string;
  care: string;
  accessibility: string;
};
export type Activity = {
  id: number;
  title: string;
  day: string;
  time: string;
  minutes: number;
  category: string;
  done: boolean;
  generated?: boolean;
};
export type Post = (typeof initialPosts)[number];
export type RoutinePrefs = {
  days: string;
  period: string;
  session: number;
  fixed: string;
  objective: string;
};
export type State = {
  profile: Profile;
  answers: Record<number, CareerKey>;
  result: CareerKey[];
  activities: Activity[];
  posts: Post[];
  saved: number[];
  interests: number[];
  careerPlan: CareerKey[];
  routinePrefs: RoutinePrefs;
  hiddenPosts: number[];
  reportedPosts: number[];
};

export const defaultState: State = {
  profile: {
    name: "Ana",
    email: "ana@exemplo.demo",
    situation: "Quero entrar na área de tecnologia",
    goal: "Descobrir minha área profissional",
    hours: 4,
    mode: "Online",
    city: "",
    care: "Prefiro não informar",
    accessibility: "Nenhuma preferência informada",
  },
  answers: {},
  result: ["dev", "ux", "produto"],
  activities: [
    {
      id: 1,
      title: "Fundamentos de lógica",
      day: "Terça",
      time: "19:30",
      minutes: 25,
      category: "Estudo",
      done: false,
      generated: true,
    },
    {
      id: 2,
      title: "Exercício prático",
      day: "Quinta",
      time: "20:00",
      minutes: 30,
      category: "Prática",
      done: false,
      generated: true,
    },
    {
      id: 3,
      title: "Revisão leve",
      day: "Sábado",
      time: "10:00",
      minutes: 20,
      category: "Revisão",
      done: false,
      generated: true,
    },
  ],
  posts: initialPosts,
  saved: [],
  interests: [],
  careerPlan: [],
  hiddenPosts: [],
  reportedPosts: [],
  routinePrefs: {
    days: "Terça, Quinta, Sábado",
    period: "Noite",
    session: 25,
    fixed: "",
    objective: "Aprender fundamentos de tecnologia",
  },
};

const KEY = "iris:v1";
const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);
const cleanText = (value: unknown, fallback = "", max = 600) =>
  typeof value === "string" ? value.trim().slice(0, max) : fallback;
const cleanNumber = (
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) =>
  typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
const cleanIds = (value: unknown) =>
  Array.isArray(value)
    ? [
        ...new Set(
          value.filter(
            (id): id is number =>
              typeof id === "number" && Number.isSafeInteger(id) && id >= 0,
          ),
        ),
      ]
    : [];
const isCareerKey = (value: unknown): value is CareerKey =>
  typeof value === "string" && careerKeys.includes(value as CareerKey);

function sanitizeProfile(value: unknown): Profile {
  const source = isRecord(value) ? value : {};
  return {
    name: cleanText(source.name, defaultState.profile.name, 80),
    email: cleanText(source.email, defaultState.profile.email, 160),
    situation: cleanText(source.situation, defaultState.profile.situation, 160),
    goal: cleanText(source.goal, defaultState.profile.goal, 160),
    hours: cleanNumber(source.hours, defaultState.profile.hours, 1, 40),
    mode: cleanText(source.mode, defaultState.profile.mode, 40),
    city: cleanText(source.city, "", 120),
    care: cleanText(source.care, defaultState.profile.care, 80),
    accessibility: cleanText(
      source.accessibility,
      defaultState.profile.accessibility,
      240,
    ),
  };
}

function sanitizeActivities(value: unknown): Activity[] {
  if (!Array.isArray(value)) return defaultState.activities;
  return value.flatMap((item) => {
    if (!isRecord(item) || typeof item.id !== "number") return [];
    const title = cleanText(item.title, "", 120);
    if (!title) return [];
    const candidateTime = cleanText(item.time);
    return [
      {
        id: cleanNumber(item.id, Date.now(), 0, Number.MAX_SAFE_INTEGER),
        title,
        day: cleanText(item.day, "Segunda", 20),
        time: /^\d{2}:\d{2}$/.test(candidateTime) ? candidateTime : "19:00",
        minutes: cleanNumber(item.minutes, 25, 10, 180),
        category: cleanText(item.category, "Estudo", 50),
        done: item.done === true,
        generated: item.generated === true,
      },
    ];
  });
}

function sanitizePosts(value: unknown): Post[] {
  if (!Array.isArray(value)) return defaultState.posts;
  return value.flatMap((item) => {
    if (!isRecord(item) || typeof item.id !== "number") return [];
    const text = cleanText(item.text);
    if (!text) return [];
    return [
      {
        id: cleanNumber(item.id, Date.now(), 0, Number.MAX_SAFE_INTEGER),
        author: cleanText(item.author, "Participante", 80),
        category: cleanText(item.category, "Início na tecnologia", 80),
        text,
        liked: item.liked === true,
        likes: cleanNumber(item.likes, 0, 0, 1_000_000),
        comments: Array.isArray(item.comments)
          ? item.comments
              .map((comment) => cleanText(comment, "", 300))
              .filter(Boolean)
          : [],
        demo: item.demo === true,
      },
    ];
  });
}

function sanitizeState(value: unknown): State {
  if (!isRecord(value)) return defaultState;
  const prefs = isRecord(value.routinePrefs) ? value.routinePrefs : {};
  const answers = isRecord(value.answers)
    ? Object.entries(value.answers).reduce<Record<number, CareerKey>>(
        (valid, [key, answer]) => {
          if (/^\d+$/.test(key) && isCareerKey(answer))
            valid[Number(key)] = answer;
          return valid;
        },
        {},
      )
    : {};
  return {
    profile: sanitizeProfile(value.profile),
    answers,
    result: Array.isArray(value.result)
      ? value.result.filter(isCareerKey)
      : defaultState.result,
    activities: sanitizeActivities(value.activities),
    posts: sanitizePosts(value.posts),
    saved: cleanIds(value.saved),
    interests: cleanIds(value.interests),
    careerPlan: Array.isArray(value.careerPlan)
      ? [...new Set(value.careerPlan.filter(isCareerKey))]
      : [],
    hiddenPosts: cleanIds(value.hiddenPosts),
    reportedPosts: cleanIds(value.reportedPosts),
    routinePrefs: {
      days: cleanText(prefs.days, defaultState.routinePrefs.days, 120),
      period: ["Manhã", "Tarde", "Noite"].includes(cleanText(prefs.period))
        ? cleanText(prefs.period)
        : defaultState.routinePrefs.period,
      session: [15, 25, 30, 45].includes(prefs.session as number)
        ? (prefs.session as number)
        : defaultState.routinePrefs.session,
      fixed: cleanText(prefs.fixed, "", 240),
      objective: cleanText(
        prefs.objective,
        defaultState.routinePrefs.objective,
        160,
      ),
    },
  };
}

export function loadState(): State {
  try {
    const value = localStorage.getItem(KEY);
    return value ? sanitizeState(JSON.parse(value)) : defaultState;
  } catch {
    return defaultState;
  }
}

export function useStore() {
  const [state, setState] = useState<State>(loadState);
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state]);
  const reset = () => {
    localStorage.removeItem(KEY);
    setState(defaultState);
  };
  return { state, setState, reset };
}

export function rankCareers(answers: Record<number, CareerKey>) {
  const scores = Object.values(answers).reduce<Record<CareerKey, number>>(
    (acc, key) => ({ ...acc, [key]: acc[key] + 1 }),
    { dev: 0, dados: 0, qa: 0, ux: 0, cyber: 0, produto: 0 },
  );
  const ordered = [...careerKeys].sort((a, b) => scores[b] - scores[a]);
  const cutoff = scores[ordered[Math.min(2, ordered.length - 1)]];
  return ordered.filter((key) => scores[key] >= cutoff);
}

export function parseFixedSlots(value: string) {
  const validDays = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  return value
    .split(/[;,\n]/)
    .map((entry) => entry.trim())
    .flatMap((entry) => {
      const match = entry.match(
        /^(Segunda|Terça|Quarta|Quinta|Sexta|Sábado|Domingo)\s+((?:[01]\d|2[0-3]):[0-5]\d)$/i,
      );
      if (!match) return [];
      const day = validDays.find(
        (candidate) =>
          candidate.toLocaleLowerCase("pt-BR") ===
          match[1].toLocaleLowerCase("pt-BR"),
      );
      return day ? [{ day, time: match[2] }] : [];
    });
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function fromMinutes(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function generateRoutine(
  hours: number,
  prefs: RoutinePrefs,
  occupied: Activity[] = [],
): Activity[] {
  const validDays = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  const selectedDays = validDays.filter((day) =>
    prefs.days
      .toLocaleLowerCase("pt-BR")
      .includes(day.toLocaleLowerCase("pt-BR")),
  );
  const days = selectedDays.length
    ? selectedDays
    : ["Terça", "Quinta", "Sábado"];
  const time =
    prefs.period === "Manhã"
      ? "08:00"
      : prefs.period === "Tarde"
        ? "14:00"
        : "19:30";
  const session = [15, 25, 30, 45].includes(prefs.session) ? prefs.session : 25;
  const slots = Math.max(
    1,
    Math.floor((Math.max(1, hours) * 60 * 0.8) / session),
  );
  const templates = [
    [prefs.objective || "Estudo de uma habilidade", "Estudo"],
    ["Exercício prático", "Prática"],
    ["Revisão do aprendizado", "Revisão"],
    ["Desenvolvimento de projeto", "Projeto"],
    ["Preparação profissional", "Carreira"],
  ];
  const fixedByDay = parseFixedSlots(prefs.fixed).reduce<
    Record<string, { start: number; end: number }[]>
  >((grouped, slot) => {
    const start = toMinutes(slot.time);
    grouped[slot.day] = [
      ...(grouped[slot.day] || []),
      { start, end: start + 60 },
    ];
    return grouped;
  }, {});
  for (const activity of occupied) {
    const start = toMinutes(activity.time);
    fixedByDay[activity.day] = [
      ...(fixedByDay[activity.day] || []),
      { start, end: start + activity.minutes },
    ];
  }
  const nextByDay = Object.fromEntries(
    days.map((day) => [day, toMinutes(time)]),
  );
  const activities: Activity[] = [];
  for (
    let attempt = 0;
    activities.length < slots && attempt < slots * days.length * 2;
    attempt += 1
  ) {
    const day = days[attempt % days.length];
    let start = nextByDay[day];
    const fixedSlots = fixedByDay[day] || [];
    for (let check = 0; check <= fixedSlots.length; check += 1) {
      const conflict = fixedSlots.find(
        (slot) => start < slot.end && start + session > slot.start,
      );
      if (conflict === undefined) break;
      start = conflict.end;
    }
    if (start + session > 24 * 60) continue;
    const index = activities.length;
    activities.push({
      id: 1_000_000 + index,
      title: templates[index % templates.length][0],
      category: templates[index % templates.length][1],
      day,
      time: fromMinutes(start),
      minutes: session,
      done: false,
      generated: true,
    });
    nextByDay[day] = start + session;
  }
  return activities;
}

export function mergeGeneratedRoutine(
  existing: Activity[],
  generated: Activity[],
  weeklyBudgetMinutes = Number.POSITIVE_INFINITY,
) {
  const preserved = existing.filter(
    (activity) => activity.done || !activity.generated,
  );
  const used = new Set(preserved.map((activity) => activity.id));
  let nextId = Math.max(1_000_000, ...used) + 1;
  const preservedMinutes = preserved.reduce(
    (total, activity) => total + activity.minutes,
    0,
  );
  let availableMinutes = Math.max(0, weeklyBudgetMinutes - preservedMinutes);
  const uniqueGenerated = generated.flatMap((activity) => {
    if (activity.minutes > availableMinutes) return [];
    availableMinutes -= activity.minutes;
    if (!used.has(activity.id)) {
      used.add(activity.id);
      return [activity];
    }
    while (used.has(nextId)) nextId += 1;
    used.add(nextId);
    return [{ ...activity, id: nextId++ }];
  });
  return [...preserved, ...uniqueGenerated];
}

export function reorganizeRoutine(
  existing: Activity[],
  hours: number,
  prefs: RoutinePrefs,
) {
  const preserved = existing.filter(
    (activity) => activity.done || !activity.generated,
  );
  const generated = generateRoutine(hours, prefs, preserved);
  return mergeGeneratedRoutine(
    existing,
    generated,
    Math.floor(hours * 60 * 0.8),
  );
}
