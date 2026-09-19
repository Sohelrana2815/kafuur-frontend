import ContactForm from "@/components/modules/contact/contact-form";
import { ExternalLink, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import Link from "next/link";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.136z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37a4 4 0 1 1-3.37-3.37A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.58-4.06-1.47-.28-.21-.53-.45-.77-.7V15.1c0 2.21-.91 4.44-2.61 5.74-1.95 1.5-4.66 1.89-6.96 1.05-2.45-.88-4.32-3.11-4.72-5.71-.54-3.47 1.48-7.1 4.9-8.1 1.07-.31 2.21-.31 3.28-.02v4.12c-.85-.24-1.78-.23-2.59.18-1.21.6-1.95 1.93-1.88 3.29.07 1.55 1.25 2.89 2.79 3.06 1.54.19 3.12-.73 3.55-2.23.1-.34.13-.71.13-1.07V.02h3.01z" />
    </svg>
  );
}

const socialPlatforms = [
  {
    name: "Facebook",
    username: "@kafuurofficial",
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    username: "@kafuur",
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
  {
    name: "YouTube",
    username: "@kafuurfragrances",
    href: "https://youtube.com",
    icon: YoutubeIcon,
  },
  {
    name: "TikTok",
    username: "@kafuurofficial",
    href: "https://tiktok.com",
    icon: TikTokIcon,
  },
];

const cardClass =
  "group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/50";

export default function ContactUsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-foreground">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <section className="relative z-10 border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
            <div className="mb-5 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary sm:text-xs">
                Get in touch
              </span>
            </div>

            <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              We&apos;d love to hear from you.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Have a question about an order, a product, or our fragrances? Send
              us a message and our team will get back to you as soon as
              possible.
            </p>
          </div>

          {/* Main content */}
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* Left side */}
            <div className="space-y-10">
              {/* Contact Information */}
              <div>
                <div className="mb-6 border-b border-border pb-4">
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Contact information
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Choose the channel that works best for you.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Email */}
                  <a href="mailto:hello@kafuur.com" className={cardClass}>
                    <div className="rounded-xl border border-border bg-muted p-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Email
                      </p>
                      <p className="mt-1 text-sm text-foreground transition-colors group-hover:text-primary">
                        hello@kafuur.com
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a href="tel:+8801XXXXXXXXX" className={cardClass}>
                    <div className="rounded-xl border border-border bg-muted p-3">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Phone
                      </p>
                      <p className="mt-1 text-sm text-foreground transition-colors group-hover:text-primary">
                        +880 1XXXXXXXXX
                      </p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
                    <div className="rounded-xl border border-border bg-muted p-3">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Location
                      </p>
                      <p className="mt-1 text-sm text-foreground">
                        Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div>
                <div className="mb-5 border-b border-border pb-4">
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Need help?
                  </h2>
                </div>

                <Link
                  href="/help-center"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl border border-border bg-muted p-3">
                      <ExternalLink className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Visit our Help Center
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Find answers to common questions
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              </div>

              {/* Socials */}
              <div>
                <div className="mb-5 border-b border-border pb-4">
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Follow Kafuur
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <a
                        key={platform.name}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/50"
                      >
                        <div className="rounded-xl border border-border bg-muted p-2.5">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {platform.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {platform.username}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
