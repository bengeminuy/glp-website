"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { CheckboxGroup } from "@/components/ui/checkbox";
import type {
  AnswerValue,
  AnswersMap,
  Field,
  FieldWidth,
  Screen,
  Section,
} from "./questions";

const widthClass: Record<FieldWidth, string> = {
  full: "col-span-12",
  half: "col-span-6",
  third: "col-span-4",
  quarter: "col-span-3",
};

export function isFieldValid(field: Field, value: AnswerValue | undefined): boolean {
  if (!field.required) return true;
  switch (field.kind) {
    case "select":
    case "single":
    case "short-text":
    case "long-text":
      return typeof value === "string" && value.trim().length > 0;
    case "multi":
      return Array.isArray(value) && value.length > 0;
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    case "date":
      return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
  }
}

export function isScreenValid(screen: Screen, answers: AnswersMap): boolean {
  return screen.sections.every((section) =>
    section.fields.every((f) => isFieldValid(f, answers[f.id])),
  );
}

export function ScreenRenderer({
  screen,
  answers,
  onChange,
}: {
  screen: Screen;
  answers: AnswersMap;
  onChange: (fieldId: string, value: AnswerValue) => void;
}) {
  return (
    <div className="space-y-6">
      {(screen.title || screen.description) && (
        <div className="space-y-1">
          {screen.title && (
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{screen.title}</h1>
          )}
          {screen.description && (
            <p className="text-sm text-neutral-600">{screen.description}</p>
          )}
        </div>
      )}

      <div className="space-y-8">
        {screen.sections.map((section, i) => (
          <SectionRenderer
            key={section.id ?? i}
            section={section}
            answers={answers}
            onChange={onChange}
            showDivider={i > 0}
          />
        ))}
      </div>
    </div>
  );
}

function SectionRenderer({
  section,
  answers,
  onChange,
  showDivider,
}: {
  section: Section;
  answers: AnswersMap;
  onChange: (fieldId: string, value: AnswerValue) => void;
  showDivider: boolean;
}) {
  return (
    <div className={showDivider ? "border-t border-neutral-200 pt-8" : ""}>
      <div className="space-y-5">
        {section.title && (
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-neutral-900">{section.title}</h2>
            {section.description && (
              <p className="text-sm text-neutral-600">{section.description}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-12 gap-4">
          {section.fields.map((field) => (
            <div key={field.id} className={widthClass[field.width ?? "full"]}>
              <FieldRenderer
                field={field}
                value={answers[field.id]}
                onChange={(v) => onChange(field.id, v)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
}) {
  const help = "help" in field ? field.help : undefined;
  const hasLabel = field.label && field.label.length > 0;

  return (
    <div className="space-y-2">
      {hasLabel && <Label htmlFor={field.id}>{field.label}</Label>}
      <FieldInput field={field} value={value} onChange={onChange} />
      {help && <p className="text-xs text-neutral-500">{help}</p>}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
}) {
  switch (field.kind) {
    case "select":
      return (
        <Select
          id={field.id}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
        >
          <option value="">{field.placeholder ?? "—"}</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      );

    case "single":
      return (
        <RadioGroup
          name={field.id}
          options={field.options}
          variant={field.variant ?? "list"}
          value={typeof value === "string" ? value : undefined}
          onChange={(v) => onChange(v)}
        />
      );

    case "multi":
      return (
        <CheckboxGroup
          options={field.options}
          columns={field.columns}
          value={Array.isArray(value) ? value : []}
          onChange={(v) => onChange(v)}
        />
      );

    case "short-text":
      return (
        <Input
          id={field.id}
          type="text"
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "long-text":
      return (
        <Textarea
          id={field.id}
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "number":
      return (
        <div className="flex items-center gap-2">
          <Input
            id={field.id}
            type="number"
            inputMode="numeric"
            min={field.min}
            max={field.max}
            placeholder={field.placeholder ?? "—"}
            value={typeof value === "number" ? value : ""}
            onChange={(e) => {
              const raw = e.target.value;
              onChange(raw === "" ? null : Number(raw));
            }}
          />
          {field.unit && <span className="text-sm text-neutral-600">{field.unit}</span>}
        </div>
      );

    case "date":
      return (
        <Input
          id={field.id}
          type="date"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
