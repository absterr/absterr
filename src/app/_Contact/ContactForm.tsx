"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import ServiceSelector from "./ServiceSelector";
import {
  contactFormSchema,
  createEmptySelection,
  type ContactFormValues,
} from "./contact-schema";
import { toast } from "sonner";
import { useTransition } from "react";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
import sendMail from "@/lib/send-mail";

export default function NewContactForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      selection: createEmptySelection(),
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    startTransition(async () => {
      toast.loading("Sending...");
      const { success, message } = await sendMail(values);

      if (success) {
        toast.dismiss();
        toast.success(message);
        reset();
      } else {
        toast.dismiss();
        toast.error("Failed to send message.", { description: message });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-10 py-3"
    >
      <div className="grid gap-10 sm:grid-cols-2">
        <div className="text-sm tracking-wide">
          <div className="flex items-center justify-between">
            <label htmlFor="name">
              Name <span className="text-accent"> *</span>
            </label>
            {errors.name && (
              <p className="text-xs text-accent">{errors.name.message}</p>
            )}
          </div>

          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="e.g. John Doe"
            className="w-full border-b border-foreground/20 py-3 text-xs xl:text-sm placeholder-foreground/20 focus:border-foreground focus:outline-none transition-colors duration-200"
          />
        </div>

        <div className="text-sm tracking-wide">
          <div className="flex items-center justify-between">
            <label htmlFor="email">
              Email <span className="text-accent"> *</span>
            </label>

            {errors.email && (
              <p className="text-xs text-accent">{errors.email.message}</p>
            )}
          </div>

          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Where can I reply?"
            className="w-full border-b border-foreground/20 py-3 text-xs xl:text-sm placeholder-foreground/20 focus:border-foreground focus:outline-none transition-colors duration-200"
          />
        </div>
      </div>

      <div className="text-sm tracking-wide">
        <label htmlFor="company">Company Name</label>

        <input
          {...register("company")}
          id="company"
          type="text"
          placeholder="Your company or website?"
          className="w-full border-b border-foreground/20 py-3 text-xs xl:text-sm placeholder-foreground/20 focus:border-foreground focus:outline-none transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-y-4">
        <Controller
          name="selection"
          control={control}
          render={({ field }) => (
            <ServiceSelector
              value={field.value}
              onChangeAction={field.onChange}
            />
          )}
        />

        {(errors.selection?.categoryIds || errors.selection?.services) && (
          <p className="text-xs text-accent">
            {errors.selection.categoryIds?.message ??
              errors.selection.services?.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-x-4 py-2 text-xs text-center font-bold uppercase tracking-widest cursor-pointer transition-colors hover:bg-accent bg-foreground text-background"
      >
        {isPending ? (
          <LoadingSpinner />
        ) : (
          <>
            <Send />
            Get In Touch
          </>
        )}
      </button>
    </form>
  );
}
