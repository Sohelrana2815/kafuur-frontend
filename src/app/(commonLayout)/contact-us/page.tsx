"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Send, Sparkles, MapPin, Mail, Phone, ExternalLink } from "lucide-react"

// Clean, centered, production-ready TikTok SVG path (using 'currentColor' to match styling)
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.58-4.06-1.47-.28-.21-.53-.45-.77-.7V15.1c0 2.21-.91 4.44-2.61 5.74-1.95 1.5-4.66 1.89-6.96 1.05-2.45-.88-4.32-3.11-4.72-5.71-.54-3.47 1.48-7.1 4.9-8.1 1.07-.31 2.21-.31 3.28-.02v4.12c-.85-.24-1.78-.23-2.59.18-1.21.6-1.95 1.93-1.88 3.29.07 1.55 1.25 2.89 2.79 3.06 1.54.19 3.12-.73 3.55-2.23.1-.34.13-.71.13-1.07V.02h3.01z" />
    </svg>
)

const socialPlatforms = [
    { name: "Facebook", username: "@kafuurofficial", url: "https://facebook.com", icon: FacebookIcon },
    { name: "YouTube", username: "@kafuurfragrances", url: "https://youtube.com", icon: YoutubeIcon },
    { name: "Instagram", username: "@kafuur", url: "https://instagram.com", icon: InstagramIcon },
    { name: "TikTok", username: "@kafuurofficial", url: "https://tiktok.com", icon: TikTokIcon },
]

// Reusable custom SVGs for Facebook, YouTube, Instagram since we bypass libraries.
function FacebookIcon({ className }: { className?: string }) { return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>; }
function YoutubeIcon({ className }: { className?: string }) { return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.136z" /></svg>; }
function InstagramIcon({ className }: { className?: string }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>; }

export default function ContactUsPage() {
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mimicking form submission (you would replace this with actual logic later)
        setStatus("success");
    }

    return (
        <section className="relative w-full min-h-screen py-16 md:py-24 overflow-hidden bg-[#09090b] text-neutral-100 font-sans border-t border-white/[0.02]">

            {/* Luxury Amber Atmospheric Accent Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/[0.02] blur-[150px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center space-y-4 mb-16 lg:mb-24">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-amber-500 font-bold flex items-center justify-center gap-2">
                        <Sparkles className="h-3 w-3 text-amber-500/80" /> Authentic Dialogue
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-heading max-w-3xl mx-auto leading-tight">
                        Connect with Kafuur
                    </h1>
                    <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                        We don’t automate dialogue. Whether you have a specific query or need advice on a certified scent profile, every message is answered by our team in real-time.
                    </p>
                </div>

                {/* Two-Column Structured Communication Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* COLUMN 1: Functional Contact Details & Alternative Connect (Socials) */}
                    <div className="lg:col-span-5 flex flex-col space-y-12 pt-4">

                        {/* A. Traditional Contact Blocks */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-bold text-white tracking-wide font-heading border-b border-white/[0.04] pb-4">
                                Our Dialogue Channels
                            </h2>
                            <div className="space-y-6 text-neutral-300">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 p-3 rounded-2xl border border-white/[0.03] bg-neutral-900 shadow-xl">
                                        <Mail className="h-5 w-5 text-amber-500" strokeWidth={1} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-wider text-neutral-600 font-mono font-bold">Dialogue Email</p>
                                        <a href="mailto:hello@kafuur.com" className="text-sm font-normal text-white hover:text-amber-300 transition-colors">
                                            hello@kafuur.com
                                        </a>
                                    </div>
                                </div>

                                {/* Support Center - Optional */}
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 p-3 rounded-2xl border border-white/[0.03] bg-neutral-900 shadow-xl">
                                        <ExternalLink className="h-5 w-5 text-amber-500" strokeWidth={1} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-wider text-neutral-600 font-mono font-bold">Alternative Support Channel</p>
                                        <Link href="/help-center" className="text-sm font-normal text-white hover:text-amber-300 transition-colors">
                                            support.kafuur.com
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* B. Integrated "Alternative Connect" (Socials) */}
                        <div className="space-y-8">
                            <h2 className="text-xl font-bold text-white tracking-wide font-heading border-b border-white/[0.04] pb-4">
                                Alternative Sourcing Verified Dialogue
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {socialPlatforms.map((platform, idx) => {
                                    const IconComponent = platform.icon
                                    return (
                                        <a
                                            key={idx}
                                            href={platform.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group relative flex items-center gap-3.5 rounded-2xl border border-white/[0.03] bg-[#0c0c0e]/60 p-5 shadow-2xl transition-all duration-300 hover:border-amber-500/20"
                                        >
                                            <div className="flex-shrink-0 p-3 rounded-2xl border border-amber-500/10 bg-neutral-900 shadow-xl group-hover:scale-105 group-hover:border-amber-500/20 transition-all duration-300">
                                                <IconComponent className="h-5 w-5 text-amber-400" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <h3 className="text-sm md:text-base font-semibold text-white tracking-tight font-heading">
                                                    {platform.name}
                                                </h3>
                                                <p className="text-xs text-neutral-400 font-light truncate max-w-[150px]">
                                                    {platform.username}
                                                </p>
                                            </div>
                                            {/* Subltle external link hover hint */}
                                            <ExternalLink className="absolute top-4 right-4 h-3.5 w-3.5 text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2: Formal Contact & Query Dialogue Form */}
                    <div className="lg:col-span-7 flex flex-col pt-4">
                        <div className="space-y-8 rounded-2xl border border-white/[0.03] bg-[#0c0c0e]/60 p-8 shadow-2xl relative overflow-hidden">
                            {/* Technical Supply Chain Watermark Hint */}
                            <Send className="absolute -top-10 -right-10 h-48 w-48 text-neutral-800/10 stroke-[0.5] rotate-12 pointer-events-none" />

                            <h2 className="text-xl font-bold text-white tracking-wide font-heading pb-1">
                                Formal Dialogue Submission
                            </h2>

                            {/* Actual Form for Query Dialogue */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-[10px] uppercase tracking-wider text-neutral-600 font-mono font-bold">Full Name (Dialogue Identity)</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Scent Identifier"
                                            required
                                            className="w-full px-4 py-3 text-sm text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg placeholder-neutral-700 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/50"
                                        />
                                    </div>
                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-[10px] uppercase tracking-wider text-neutral-600 font-mono font-bold">Dialogue Scent (Verified Email)</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Dialogue Identity @ Origin verified"
                                            required
                                            className="w-full px-4 py-3 text-sm text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg placeholder-neutral-700 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/50"
                                        />
                                    </div>
                                </div>
                                {/* Subject Input */}
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-[10px] uppercase tracking-wider text-neutral-600 font-mono font-bold">Formal dialogue subject</label>
                                    <input
                                        id="subject"
                                        type="text"
                                        placeholder="Certified dialogue request subject identifier"
                                        required
                                        className="w-full px-4 py-3 text-sm text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg placeholder-neutral-700 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/50"
                                    />
                                </div>
                                {/* Message Textarea */}
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-[10px] uppercase tracking-wider text-neutral-600 font-mono font-bold">Formal dialogue message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        placeholder="Dialogue request details for certified Team validation"
                                        required
                                        className="w-full px-4 py-3 text-sm text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg placeholder-neutral-700 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/50"
                                    ></textarea>
                                </div>

                                {/* Form Feedback Status */}
                                {status === "success" && (
                                    <div className="mt-4 text-center text-xs text-emerald-400 font-bold tracking-widest uppercase">
                                        Dialogue Request Submitted for Supply Chain Validation v1.1
                                    </div>
                                )}

                                {/* Technical Submit Trigger */}
                                <div className="pt-2 text-right">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-3 rounded-full border border-amber-500/60 bg-amber-500/5 hover:bg-amber-500/10 px-8 py-3.5 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                                    >
                                        <span className="text-sm font-semibold text-white tracking-wide block uppercase">
                                            Request Formal Dialogue Validation
                                        </span>
                                        <Send className="h-4 w-4 text-amber-500 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}