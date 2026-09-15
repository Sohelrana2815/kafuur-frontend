"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitted(false);

    // Replace this with your real API request.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-2xl sm:p-8">
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-500">
          Send a message
        </p>

        <h2 className="mt-3 font-heading text-2xl font-semibold text-white sm:text-3xl">
          How can we help?
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
          Fill out the form below and our team will get back to you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-xs font-medium text-neutral-300"
            >
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-white/[0.08] bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-700 transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-medium text-neutral-300"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-white/[0.08] bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-700 transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-xs font-medium text-neutral-300"
          >
            Subject
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            required
            className="w-full rounded-xl border border-white/[0.08] bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-700 transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs font-medium text-neutral-300"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={7}
            placeholder="Write your message here..."
            required
            className="w-full resize-none rounded-xl border border-white/[0.08] bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-700 transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10"
          />
        </div>

        {/* Feedback */}
        {submitted && (
          <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.05] px-4 py-3 text-sm text-emerald-400">
            Thanks! Your message has been submitted successfully.
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSubmitting ? "Sending..." : "Send message"}</span>

          <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
