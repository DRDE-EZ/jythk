"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateMember } from "@/hooks/members";
import { requiredString } from "@/lib/valitation";
import { zodResolver } from "@hookform/resolvers/zod";
import { members } from "@wix/members";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  loginEmail: requiredString,
  firstName: z.string(),
  lastName: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface MemberInfoFormProps {
  loggedInMember: members.Member;
}

export default function MemberInfoForm({
  loggedInMember,
}: MemberInfoFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginEmail: loggedInMember.loginEmail || "",
      firstName: loggedInMember.contact?.firstName || "",
      lastName: loggedInMember.contact?.lastName || "",
    },
  });

  const mutation = useUpdateMember();

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-xl space-y-5 "
      >
        <FormField
          control={form.control}
          name="loginEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="loginEmail"
                  className="rounded-none"
                  type="email"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  className="rounded-none"
                  placeholder="firstName"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  className="rounded-none"
                  placeholder="lastName"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          className="rounded-none"
          loading={mutation.isPending}
        >
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
