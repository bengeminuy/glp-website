"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/intake/progress-bar";
import { submitIntake } from "../_actions";
import { QUESTIONS, type AnswerValue, type AnswersMap } from "./questions";
import { QuestionRenderer, isAnswerValid } from "./question-renderer";
import { SignupStep } from "./signup-step";

export function QuestionnaireFlow({ alreadyAuthed }: { alreadyAuthed: boolean }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = QUESTIONS.length + (alreadyAuthed ? 0 : 1);
  const isSignupStep = !alreadyAuthed && index === QUESTIONS.length;
  const question = isSignupStep ? null : QUESTIONS[index];
  const isLastQuestion = index === QUESTIONS.length - 1;
  const currentValue = question ? answers[question.id] : undefined;
  const canAdvance = question ? isAnswerValid(question, currentValue) : true;

  function setAnswer(v: AnswerValue) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: v }));
  }

  async function onSubmitAuthed() {
    setSubmitting(true);
    setError(null);
    try {
      await submitIntake(answers);
      router.push("/account");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed");
      setSubmitting(false);
    }
  }

  function onSignupSubmitted() {
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 px-6 py-12">
      <ProgressBar current={index} total={totalSteps} />

      <Card>
        <CardContent className="pt-6">
          {isSignupStep || !question ? (
            <SignupStep answers={answers} onSubmitted={onSignupSubmitted} />
          ) : (
            <QuestionRenderer question={question} value={currentValue} onChange={setAnswer} />
          )}
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={index === 0 || submitting}
          onClick={() => setIndex((i) => i - 1)}
        >
          Back
        </Button>
        {isSignupStep ? (
          <span />
        ) : alreadyAuthed && isLastQuestion ? (
          <Button onClick={onSubmitAuthed} disabled={submitting || !canAdvance}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        ) : (
          <Button onClick={() => setIndex((i) => i + 1)} disabled={!canAdvance}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
