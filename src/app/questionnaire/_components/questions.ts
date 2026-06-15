// Screen-based questionnaire registry. Each screen has 1..N sections, each with
// a title and 1..N fields. Add new screens by appending to SCREENS — the
// renderer + flow are data-driven.

export type Option = {
  value: string;
  label: string;
  sublabel?: string;
  icon?: string;
  iconClassName?: string;
  sublabelClassName?: string;
  // Only meaningful for `multi` fields. When checked, all other options are
  // cleared; checking any other option clears this one (e.g. "None of the above").
  exclusive?: boolean;
};

export type FieldWidth = "full" | "half" | "third" | "quarter";

export type SingleVariant = "list" | "tiles";

export type Field =
  | {
      id: string;
      kind: "select";
      label?: string;
      options: Option[];
      placeholder?: string;
      required?: boolean;
      width?: FieldWidth;
    }
  | {
      id: string;
      kind: "single";
      label?: string;
      options: Option[];
      required?: boolean;
      help?: string;
      width?: FieldWidth;
      variant?: SingleVariant;
    }
  | {
      id: string;
      kind: "multi";
      label?: string;
      options: Option[];
      required?: boolean;
      help?: string;
      width?: FieldWidth;
      // Grid columns for the option list (defaults to 1).
      columns?: 1 | 2 | 3;
    }
  | {
      id: string;
      kind: "short-text";
      label?: string;
      placeholder?: string;
      required?: boolean;
      width?: FieldWidth;
    }
  | {
      id: string;
      kind: "long-text";
      label?: string;
      placeholder?: string;
      required?: boolean;
      width?: FieldWidth;
    }
  | {
      id: string;
      kind: "number";
      label?: string;
      min?: number;
      max?: number;
      unit?: string;
      placeholder?: string;
      required?: boolean;
      width?: FieldWidth;
    }
  | {
      id: string;
      kind: "date";
      label?: string;
      required?: boolean;
      width?: FieldWidth;
    };

export type Section = {
  id?: string;
  title?: string;
  description?: string;
  fields: Field[];
};

export type Screen = {
  id: string;
  title?: string;
  description?: string;
  sections: Section[];
};

export type AnswerValue = string | string[] | number | null;
export type AnswersMap = Record<string, AnswerValue>;

const feetOptions: Option[] = Array.from({ length: 6 }, (_, i) => {
  const ft = i + 3;
  return { value: String(ft), label: `${ft} ft` };
});

const inchesOptions: Option[] = Array.from({ length: 12 }, (_, i) => ({
  value: String(i),
  label: `${i} in`,
}));

const yesNoTileOptions: Option[] = [
  { value: "no", label: "No", icon: "check", iconClassName: "bg-green-100 text-green-600" },
  { value: "yes", label: "Yes", icon: "x", iconClassName: "bg-red-100 text-red-600" },
];

const monthOptions: Option[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((label, i) => ({ value: String(i + 1).padStart(2, "0"), label }));

const dayOptions: Option[] = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1).padStart(2, "0"),
  label: String(i + 1),
}));

export const SCREENS: Screen[] = [
  {
    id: "height_weight",
    sections: [
      {
        title: "What is your height and weight?",
        fields: [
          {
            id: "height_ft",
            kind: "select",
            label: "Feet",
            options: feetOptions,
            required: true,
            width: "half",
          },
          {
            id: "height_in",
            kind: "select",
            label: "Inches",
            options: inchesOptions,
            required: true,
            width: "half",
          },
          {
            id: "current_weight_lbs",
            kind: "number",
            label: "Weight (in lbs)",
            min: 50,
            max: 800,
            required: true,
          },
          {
            id: "goal_weight_lbs",
            kind: "number",
            label: "What is your goal weight?",
            min: 50,
            max: 800,
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: "sex_and_dob",
    sections: [
      {
        title: "Are you male or female?",
        fields: [
          {
            id: "sex_at_birth",
            kind: "single",
            variant: "tiles",
            required: true,
            options: [
              {
                value: "male",
                label: "Male",
                icon: "♂",
                iconClassName: "bg-blue-100 text-blue-600",
              },
              {
                value: "female",
                label: "Female",
                icon: "♀",
                iconClassName: "bg-pink-100 text-pink-600",
              },
            ],
          },
        ],
      },
      {
        title: "What is your date of birth?",
        fields: [
          {
            id: "dob_month",
            kind: "select",
            label: "Month",
            options: monthOptions,
            required: true,
            width: "third",
          },
          {
            id: "dob_day",
            kind: "select",
            label: "Day",
            options: dayOptions,
            required: true,
            width: "third",
          },
          {
            id: "dob_year",
            kind: "number",
            label: "Year",
            min: 1900,
            max: new Date().getFullYear(),
            placeholder: "—",
            required: true,
            width: "third",
          },
        ],
      },
    ],
  },
  {
    id: "health_questions_1",
    title: "Health Questions 1",
    sections: [
      {
        title: "Do any of these apply to you?",
        fields: [
          {
            id: "health_conditions_1",
            kind: "multi",
            required: true,
            options: [
              {
                value: "esrd",
                label: "End-stage kidney disease (on or about to be on dialysis)",
              },
              {
                value: "esld",
                label: "End-stage liver disease (cirrhosis)",
              },
              {
                value: "suicidal",
                label: "Current suicidal thoughts and/or prior suicidal attempt",
              },
              {
                value: "cancer",
                label:
                  "Cancer (active diagnosis, active treatment, or in remission or cancer-free for less than 5 continuous years - does not apply to non-melanoma skin cancer that was considered cured via simple excision)",
              },
              {
                value: "severe_gi",
                label:
                  "Severe gastrointestinal condition (gastroparesis, blockage, inflammatory bowel disease)",
              },
              {
                value: "substance_use",
                label:
                  "Current diagnosis of or treatment for alcohol, opioid, or substance use disorder/dependence",
              },
              {
                value: "none",
                label: "None of the above",
                exclusive: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "health_questions_2",
    title: "Health Questions 2",
    sections: [
      {
        title: "Do any of these apply to you?",
        fields: [
          {
            id: "health_conditions_2",
            kind: "multi",
            required: true,
            columns: 2,
            options: [
              { value: "hypothyroidism_untreated", label: "Untreated hypothyroidism" },
              { value: "gallbladder_disease", label: "Gallbladder disease" },
              { value: "hypertension", label: "Hypertension (high blood pressure)" },
              { value: "seizures", label: "Seizures" },
              { value: "glaucoma", label: "Glaucoma" },
              { value: "sleep_apnea", label: "Sleep apnea" },
              { value: "t2d_no_insulin", label: "Type 2 diabetes (not on insulin)" },
              { value: "t2d_insulin", label: "Type 2 diabetes (on insulin)" },
              { value: "t1d", label: "Type 1 diabetes" },
              {
                value: "diabetic_retinopathy",
                label:
                  "Diabetic retinopathy (diabetic eye disease), damage to the optic nerve from trauma or reduced blood flow, or blindness",
              },
              {
                value: "warfarin",
                label: "Use of the blood thinner warfarin (Coumadin/Jantoven)",
              },
              { value: "pancreatitis_history", label: "History of or current pancreatitis" },
              {
                value: "thyroid_history",
                label:
                  "Personal or family history of thyroid cyst/nodule, thyroid cancer, medullary thyroid carcinoma, or multiple endocrine neoplasia syndrome type 2",
              },
              { value: "gout", label: "Gout" },
              { value: "high_cholesterol", label: "High cholesterol or triglycerides" },
              { value: "depression", label: "Depression" },
              { value: "head_injury", label: "Head injury" },
              { value: "brain_spinal_tumor", label: "Tumor/infection in brain/spinal cord" },
              { value: "low_sodium", label: "Low sodium" },
              { value: "liver_disease", label: "Liver disease, including fatty liver" },
              { value: "kidney_disease", label: "Kidney disease" },
              {
                value: "tachycardia",
                label: "Elevated resting heart rate (tachycardia)",
              },
              {
                value: "cad_recent",
                label: "Coronary artery disease or heart attack/stroke in last 2 years",
              },
              { value: "med_allergy", label: "Allergic to any medication" },
              { value: "chf", label: "Congestive heart failure" },
              {
                value: "qt_prolongation",
                label: "QT prolongation or other heart rhythm disorder",
              },
              {
                value: "recent_hospitalization",
                label: "Hospitalization within the last 1 year",
              },
              { value: "hiv", label: "Human immunodeficiency virus (HIV)" },
              { value: "acid_reflux", label: "Acid reflux" },
              { value: "asthma", label: "Asthma/reactive airway disease" },
              { value: "urinary_incontinence", label: "Urinary stress incontinence" },
              { value: "pcos", label: "Polycystic ovarian syndrome (PCOS)" },
              { value: "low_testosterone", label: "Clinically proven low testosterone" },
              { value: "osteoarthritis", label: "Osteoarthritis" },
              { value: "constipation", label: "Constipation" },
              {
                value: "none",
                label: "None of the above",
                exclusive: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "health_questions_3",
    sections: [
      {
        title:
          "Within the last 3 months, have you taken opiate pain medications and/or opiate-based street drugs?",
        fields: [
          {
            id: "opiate_use_3mo",
            kind: "single",
            variant: "tiles",
            required: true,
            options: yesNoTileOptions,
          },
        ],
      },
      {
        title: "Have you had prior weight loss surgeries?",
        fields: [
          {
            id: "prior_weight_loss_surgery",
            kind: "single",
            variant: "tiles",
            required: true,
            options: yesNoTileOptions,
          },
        ],
      },
      {
        title: "Do you currently take any prescription medications?",
        fields: [
          {
            id: "current_prescriptions",
            kind: "single",
            variant: "tiles",
            required: true,
            options: yesNoTileOptions,
          },
        ],
      },
    ],
  },
  {
    id: "vitals",
    sections: [
      {
        title: "What is your blood pressure range?",
        fields: [
          {
            id: "bp_range",
            kind: "single",
            required: true,
            options: [
              {
                value: "normal",
                label: "< 120/80",
                sublabel: "Normal",
                icon: "droplet",
                iconClassName: "bg-green-100 text-green-600",
                sublabelClassName: "text-green-600",
              },
              {
                value: "elevated",
                label: "120 - 129/<80",
                sublabel: "Elevated",
                icon: "droplet",
                iconClassName: "bg-yellow-100 text-yellow-600",
                sublabelClassName: "text-yellow-600",
              },
              {
                value: "htn_stage_1",
                label: "130 - 139/80-89",
                sublabel: "Hypertension Stage 1",
                icon: "droplet",
                iconClassName: "bg-orange-100 text-orange-600",
                sublabelClassName: "text-orange-600",
              },
              {
                value: "htn_stage_2",
                label: "≥ 140/90",
                sublabel: "Hypertension Stage 2",
                icon: "droplet",
                iconClassName: "bg-red-100 text-red-600",
                sublabelClassName: "text-red-600",
              },
            ],
          },
        ],
      },
      {
        title: "What is your average resting heart rate?",
        fields: [
          {
            id: "resting_hr",
            kind: "single",
            required: true,
            options: [
              {
                value: "slow",
                label: "<60 beats per minute",
                sublabel: "Slow",
                icon: "heart",
                iconClassName: "bg-cyan-100 text-cyan-600",
                sublabelClassName: "text-cyan-600",
              },
              {
                value: "normal",
                label: "60 - 100 beats per minute",
                sublabel: "Normal",
                icon: "heart",
                iconClassName: "bg-green-100 text-green-600",
                sublabelClassName: "text-green-600",
              },
              {
                value: "slightly_fast",
                label: "101 - 110 beats per minute",
                sublabel: "Slightly Fast",
                icon: "heart",
                iconClassName: "bg-orange-100 text-orange-600",
                sublabelClassName: "text-orange-600",
              },
              {
                value: "fast",
                label: ">110 beats per minute",
                sublabel: "Fast",
                icon: "heart",
                iconClassName: "bg-red-100 text-red-600",
                sublabelClassName: "text-red-600",
              },
            ],
          },
        ],
      },
    ],
  },
];
