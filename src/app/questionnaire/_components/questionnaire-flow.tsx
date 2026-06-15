"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/intake/progress-bar";
import { submitIntake } from "../_actions";
import { SCREENS, type AnswerValue, type AnswersMap } from "./questions";
import { ScreenRenderer, isScreenValid } from "./screen-renderer";
import { SignupStep } from "./signup-step";

export function QuestionnaireFlow({ alreadyAuthed }: { alreadyAuthed: boolean }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = SCREENS.length + (alreadyAuthed ? 0 : 1);
  const isSignupStep = !alreadyAuthed && index === SCREENS.length;
  const screen = isSignupStep ? null : SCREENS[index];
  const isLastScreen = index === SCREENS.length - 1;
  const canAdvance = screen ? isScreenValid(screen, answers) : true;

  function setAnswer(fieldId: string, v: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [fieldId]: v }));
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
    <div className="mx-auto max-w-2xl space-y-6 px-6 py-12">
      <ProgressBar current={index} total={totalSteps} />

      <Card>
        <CardContent className="pt-6">
          {isSignupStep || !screen ? (
            <SignupStep answers={answers} onSubmitted={onSignupSubmitted} />
          ) : (
            <ScreenRenderer screen={screen} answers={answers} onChange={setAnswer} />
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
        ) : alreadyAuthed && isLastScreen ? (
          <Button
            onClick={onSubmitAuthed}
            disabled={submitting || !canAdvance}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        ) : (
          <Button
            onClick={() => setIndex((i) => i + 1)}
            disabled={!canAdvance}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
