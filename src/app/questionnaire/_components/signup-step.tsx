"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { submitIntake } from "../_actions";
import type { AnswersMap } from "./questions";

const SignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "At least 8 characters"),
});
type SignupValues = z.infer<typeof SignupSchema>;

export function SignupStep({
  answers,
  onSubmitted,
}: {
  answers: AnswersMap;
  onSubmitted: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(SignupSchema) });

  async function onSubmit(values: SignupValues) {
    setServerError(null);

    const res = await signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
    });
    if (res.error) {
      setServerError(res.error.message ?? "Sign up failed");
      return;
    }

    try {
      await submitIntake(answers);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Saving your answers failed");
      return;
    }

    onSubmitted();
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-neutral-900">Create your account</h2>
        <p className="text-sm text-neutral-600">
          We&apos;ll save your answers and a clinician will review them shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
          />
          <FieldError message={errors.password?.message} />
        </div>

        <FieldError message={serverError ?? undefined} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create account & submit"}
        </Button>
      </form>
    </div>
  );
}
