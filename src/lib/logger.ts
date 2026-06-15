// Thin wrapper around console that strips known PHI keys before output.
// Use this instead of console.* anywhere PHI might leak.

const PHI_KEYS = new Set([
  "answers",
  "answersEncrypted",
  "dob",
  "dateOfBirth",
  "ssn",
  "address",
  "phone",
  "medicalHistory",
  "medications",
  "weight",
  "height",
  "bmi",
]);

function redact(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(redact);
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    out[k] = PHI_KEYS.has(k) ? "[REDACTED]" : redact(v);
  }
  return out;
}

function fmt(args: unknown[]): unknown[] {
  return args.map(redact);
}

export const logger = {
  info: (...args: unknown[]) => console.info(...fmt(args)),
  warn: (...args: unknown[]) => console.warn(...fmt(args)),
  error: (...args: unknown[]) => console.error(...fmt(args)),
  debug: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") console.debug(...fmt(args));
  },
};
