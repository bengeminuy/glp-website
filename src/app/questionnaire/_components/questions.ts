// TODO: populate from medvi screenshots. The flow below is a runnable seed
// so the scaffolding can be exercised end-to-end. Add, remove, or reorder
// entries — the renderer and submit pipeline are fully data-driven.

export type Question =
  | {
      id: string;
      kind: "single";
      prompt: string;
      options: { value: string; label: string }[];
      required?: boolean;
      help?: string;
    }
  | {
      id: string;
      kind: "multi";
      prompt: string;
      options: { value: string; label: string }[];
      required?: boolean;
      help?: string;
    }
  | {
      id: string;
      kind: "short-text";
      prompt: string;
      placeholder?: string;
      required?: boolean;
      help?: string;
    }
  | {
      id: string;
      kind: "long-text";
      prompt: string;
      placeholder?: string;
      required?: boolean;
      help?: string;
    }
  | {
      id: string;
      kind: "number";
      prompt: string;
      min?: number;
      max?: number;
      unit?: string;
      required?: boolean;
      help?: string;
    }
  | { id: string; kind: "height"; prompt: string; required?: boolean; help?: string }
  | { id: string; kind: "date"; prompt: string; required?: boolean; help?: string }
  | { id: string; kind: "info"; prompt: string; body: string };

export type HeightAnswer = { feet: number | null; inches: number | null };

export type AnswerValue = string | string[] | number | HeightAnswer | null;
export type AnswersMap = Record<string, AnswerValue>;

export const QUESTIONS: Question[] = [
  {
    id: "state",
    kind: "single",
    prompt: "Which state do you live in?",
    required: true,
    options: [
      { value: "FL", label: "Florida" },
      { value: "TX", label: "Texas" },
      { value: "CA", label: "California" },
      { value: "NY", label: "New York" },
      { value: "OTHER", label: "Other / not listed" },
    ],
  },
  {
    id: "sex_at_birth",
    kind: "single",
    prompt: "What was your sex assigned at birth?",
    required: true,
    options: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
    ],
  },
  {
    id: "date_of_birth",
    kind: "date",
    prompt: "What is your date of birth?",
    required: true,
  },
  {
    id: "height",
    kind: "height",
    prompt: "How tall are you?",
    required: true,
  },
  {
    id: "current_weight_lbs",
    kind: "number",
    prompt: "What is your current weight?",
    unit: "lbs",
    min: 50,
    max: 800,
    required: true,
  },
  {
    id: "goal_weight_lbs",
    kind: "number",
    prompt: "What is your goal weight?",
    unit: "lbs",
    min: 50,
    max: 800,
    required: true,
  },
  {
    id: "conditions",
    kind: "multi",
    prompt: "Do any of the following apply to you? Select all that apply.",
    help: "These help our clinician understand any safety considerations.",
    options: [
      { value: "type2_diabetes", label: "Type 2 diabetes" },
      { value: "hypertension", label: "High blood pressure" },
      { value: "thyroid_history", label: "Personal/family history of thyroid cancer (MTC) or MEN2" },
      { value: "pancreatitis", label: "History of pancreatitis" },
      { value: "gallbladder", label: "Gallbladder disease" },
      { value: "pregnant_or_nursing", label: "Currently pregnant or nursing" },
      { value: "none", label: "None of the above" },
    ],
  },
  {
    id: "current_medications",
    kind: "long-text",
    prompt: "List any medications you are currently taking.",
    placeholder: "Include name, dose, and how often. Type 'none' if not applicable.",
    required: true,
  },
  {
    id: "allergies",
    kind: "short-text",
    prompt: "Do you have any drug allergies?",
    placeholder: "List medications, or type 'none'.",
    required: true,
  },
];
