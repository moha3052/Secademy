"use server";
import { z } from "zod";
import { questions } from "./questions";
import { answers } from "./answers";
import { scoreAnswers } from "@/lib/learning";
export type QuizResult = {
  error?: string;
  score?: number;
  feedback?: { correct: boolean; explanation: string }[];
  saved?: boolean;
};
export async function submitQuiz(
  lessonId: string,
  selections: unknown,
): Promise<QuizResult> {
  if (!Object.hasOwn(questions, lessonId) || !Object.hasOwn(answers, lessonId))
    return { error: "Quizzen findes ikke." };
  const quiz = questions[lessonId];
  const key = answers[lessonId];
  const parsed = z
    .array(z.number().int().min(0).max(3))
    .length(quiz.length)
    .safeParse(selections);
  if (
    !parsed.success ||
    parsed.data.some((a, i) => a >= quiz[i].options.length)
  )
    return { error: "Besvar alle spørgsmål." };
  return {
    score: scoreAnswers(parsed.data, key.correct),
    feedback: key.correct.map((answer, i) => ({
      correct: answer === parsed.data[i],
      explanation: key.explanations[i],
    })),
  };
}
