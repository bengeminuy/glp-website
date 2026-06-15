"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@/components/ui/radio-group";
import { CheckboxGroup } from "@/components/ui/checkbox";
import type { AnswerValue, HeightAnswer, Question } from "./questions";

export function isAnswerValid(question: Question, value: AnswerValue | undefined): boolean {
  if (question.kind === "info") return true;
  const required = "required" in question ? question.required : false;
  if (!required) return true;

  switch (question.kind) {
    case "single":
      return typeof value === "string" && value.length > 0;
    case "multi":
      return Array.isArray(value) && value.length > 0;
    case "short-text":
    case "long-text":
      return typeof value === "string" && value.trim().length > 0;
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    case "date":
      return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
    case "height": {
      const h = value as HeightAnswer | null | undefined;
      return !!h && typeof h.feet === "number" && typeof h.inches === "number";
    }
  }
}

export function QuestionRenderer({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
}) {
  const help = "help" in question ? question.help : undefined;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-neutral-900">{question.prompt}</h2>
        {help && <p className="text-sm text-neutral-600">{help}</p>}
      </div>
      <QuestionInput question={question} value={value} onChange={onChange} />
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
}) {
  switch (question.kind) {
    case "info":
      return <p className="text-sm leading-relaxed text-neutral-700">{question.body}</p>;

    case "single":
      return (
        <RadioGroup
          name={question.id}
          options={question.options}
          value={typeof value === "string" ? value : undefined}
          onChange={(v) => onChange(v)}
        />
      );

    case "multi":
      return (
        <CheckboxGroup
          options={question.options}
          value={Array.isArray(value) ? value : []}
          onChange={(v) => onChange(v)}
        />
      );

    case "short-text":
      return (
        <Input
          type="text"
          placeholder={question.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "long-text":
      return (
        <Textarea
          placeholder={question.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "number":
      return (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            min={question.min}
            max={question.max}
            value={typeof value === "number" ? value : ""}
            onChange={(e) => {
              const raw = e.target.value;
              onChange(raw === "" ? null : Number(raw));
            }}
            className="max-w-32"
          />
          {question.unit && <span className="text-sm text-neutral-600">{question.unit}</span>}
        </div>
      );

    case "date":
      return (
        <Input
          type="date"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-56"
        />
      );

    case "height": {
      const h = (value as HeightAnswer | null | undefined) ?? { feet: null, inches: null };
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              min={3}
              max={8}
              placeholder="ft"
              value={h.feet ?? ""}
              onChange={(e) => {
                const raw = e.target.value;
                onChange({ ...h, feet: raw === "" ? null : Number(raw) });
              }}
              className="max-w-20"
            />
            <span className="text-sm text-neutral-600">ft</span>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              max={11}
              placeholder="in"
              value={h.inches ?? ""}
              onChange={(e) => {
                const raw = e.target.value;
                onChange({ ...h, inches: raw === "" ? null : Number(raw) });
              }}
              className="max-w-20"
            />
            <span className="text-sm text-neutral-600">in</span>
          </div>
        </div>
      );
    }
  }
}
