export function progressPercent(completed: number, total: number) {
  return total > 0
    ? Math.round((Math.min(Math.max(completed, 0), total) / total) * 100)
    : 0;
}
export function scoreAnswers(answers: number[], correct: number[]) {
  if (!correct.length || answers.length !== correct.length)
    throw new Error("Besvar alle spørgsmål.");
  return Math.round(
    (100 * correct.filter((value, i) => value === answers[i]).length) /
      correct.length,
  );
}
export function canComplete(score: number) {
  return score >= 70;
}
