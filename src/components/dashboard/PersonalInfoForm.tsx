"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, LoaderCircle } from "lucide-react";
import { authClient } from "@/lib/auth-clients";
import { updatePersonalName } from "@/app/user/profile/personal-info/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

const personalInfoSchema = z.object({
  firstName: z.string().trim().min(1, "نام را وارد کنید.").max(50, "نام بیش از حد طولانی است."),
  lastName: z.string().trim().min(1, "نام خانوادگی را وارد کنید.").max(50, "نام خانوادگی بیش از حد طولانی است."),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoForm({
  user,
}: {
  user: { firstName: string | null; lastName: string | null; email: string };
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { refetch: refetchSession } = authClient.useSession();
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    },
  });

  const onSubmit = (values: PersonalInfoValues) => {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      const result = await updatePersonalName(values);

      if (!result.success) {
        setError(result.error);
        return;
      }

      form.reset(result.user);
      setMessage("نام و نام خانوادگی با موفقیت ذخیره شد.");
      await refetchSession();
      router.refresh();
    });
  };

  return (
    <Card className="profile-card">
      <CardHeader className="profile-card-header">
        <CardTitle className="text-base font-[iransansBold] text-[#23254e]">
          اطلاعات حساب کاربری
        </CardTitle>
        <p className="mt-2 text-xs text-[#81858b]">
          نام و نام خانوادگی خود را ویرایش کنید.
        </p>
      </CardHeader>
      <CardContent className="p-5 sm:p-7">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            <Field data-invalid={Boolean(form.formState.errors.firstName)}>
              <FieldLabel htmlFor="firstName">نام</FieldLabel>
              <Input
                id="firstName"
                autoComplete="given-name"
                {...form.register("firstName")}
                aria-invalid={Boolean(form.formState.errors.firstName)}
              />
              <FieldError errors={[form.formState.errors.firstName]} />
            </Field>
            <Field data-invalid={Boolean(form.formState.errors.lastName)}>
              <FieldLabel htmlFor="lastName">نام خانوادگی</FieldLabel>
              <Input
                id="lastName"
                autoComplete="family-name"
                {...form.register("lastName")}
                aria-invalid={Boolean(form.formState.errors.lastName)}
              />
              <FieldError errors={[form.formState.errors.lastName]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">ایمیل</FieldLabel>
              <Input id="email" value={user.email} dir="ltr" disabled />
              <p className="text-xs text-[#81858b]">
                ایمیل حساب از طریق Better Auth مدیریت می‌شود.
              </p>
            </Field>
          </FieldGroup>
          {message && (
            <p className="flex items-center gap-2 text-sm text-[#00a049]" role="status">
              <Check className="size-4" />
              {message}
            </p>
          )}
          {error && <p className="text-sm text-[#ef4056]" role="alert">{error}</p>}
          <div className="flex justify-end border-t border-[#f0f0f1] pt-5">
            <Button
              type="submit"
              disabled={isPending}
              className="min-w-32 bg-[#ef4056] text-white hover:bg-[#d9364d]"
            >
              {isPending && <LoaderCircle className="size-4 animate-spin" />}
              {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
