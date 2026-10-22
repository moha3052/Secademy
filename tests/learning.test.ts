import { describe, it, expect } from "vitest";
import {
  scoreAnswers,
  progressPercent,
  canComplete,
} from "../src/lib/learning";
import { courses, allLessons } from "../src/content/courses";
import { questions } from "../src/features/quizzes/questions";
describe("Quizbedømmelse", () => {
  it("beregner korrekt delscore", () => {
    expect(scoreAnswers([1, 0], [1, 1])).toBe(50);
    expect(scoreAnswers([1, 1], [1, 1])).toBe(100);
    expect(scoreAnswers([0, 0], [1, 1])).toBe(0);
  });
  it("afviser manglende besvarelser", () => {
    expect(() => scoreAnswers([1], [1, 0])).toThrow();
    expect(() => scoreAnswers([], [])).toThrow();
  });
  it("kræver 70 procent for gennemførelse", () => {
    expect(canComplete(69)).toBe(false);
    expect(canComplete(70)).toBe(true);
  });
});
describe("Fremgang", () => {
  it("håndterer ingen tilmeldinger", () =>
    expect(progressPercent(0, 0)).toBe(0));
  it("beregner og begrænser fremgang", () => {
    expect(progressPercent(1, 3)).toBe(33);
    expect(progressPercent(8, 5)).toBe(100);
    expect(progressPercent(-1, 5)).toBe(0);
  });
});
describe("Kursusintegritet", () => {
  it("har to forløb og ti moduler uden falske lektioner", () => {
    expect(courses).toHaveLength(2);
    expect(courses.flatMap((c) => c.modules)).toHaveLength(10);
    expect(allLessons).toHaveLength(19);
    expect(new Set(allLessons.map((l) => l.id)).size).toBe(19);
  });
  it("har en quiz til alle publicerede lektioner uden klientfacit", () => {
    for (const lesson of allLessons) {
      expect(questions[lesson.id].length).toBeGreaterThan(0);
      for (const question of questions[lesson.id]) {
        expect(question).not.toHaveProperty("correct");
        expect(question.options.length).toBeGreaterThanOrEqual(2);
      }
    }
  });
});
