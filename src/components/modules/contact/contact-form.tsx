"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground transition focus:border-primary focus:ring-2 focus:ring-ring/20";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitted(false);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8">
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
          Send a message
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          How can we help?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Fill out the form below and our team will get back to you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-xs font-medium text-foreground"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-medium text-foreground"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-xs font-medium text-foreground"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            required
            className={inputClass}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs font-medium text-foreground"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={7}
            placeholder="Write your message here..."
            required
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Feedback */}
        {submitted && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
            Thanks! Your message has been submitted successfully.
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSubmitting ? "Sending..." : "Send message"}</span>
          <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
