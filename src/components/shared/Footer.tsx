"use client"

import React from "react"
import Link from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#050507] text-neutral-400 font-sans text-xs pt-16 pb-8 border-t border-white/[0.02]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Main Columns Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-16">

                    {/* Brand Presentation Column */}
                    <div className="md:col-span-4 space-y-5">
                        <h2 className="text-xl font-bold text-white tracking-wide font-heading">
                            Kafuur
                        </h2>
                        <p className="max-w-xs text-neutral-500 font-light leading-relaxed">
                            Fresh, trusted, genuine — body sprays you&apos;ll actually love.
                        </p>

                        {/* Social Connections Link Strip */}
                        <div className="flex items-center gap-3 pt-2">
                            {/* Facebook */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                aria-label="Facebook Profile"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                aria-label="YouTube Channel"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.136z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                aria-label="Instagram Profile"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                                aria-label="TikTok Profile"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.58-4.06-1.47-.28-.21-.53-.45-.77-.7V15.1c0 2.21-.91 4.44-2.61 5.74-1.95 1.5-4.66 1.89-6.96 1.05-2.45-.88-4.32-3.11-4.72-5.71-.54-3.47 1.48-7.1 4.9-8.1 1.07-.31 2.21-.31 3.28-.02v4.12c-.85-.24-1.78-.23-2.59.18-1.21.6-1.95 1.93-1.88 3.29.07 1.55 1.25 2.89 2.79 3.06 1.54.19 3.12-.73 3.55-2.23.1-.34.13-.71.13-1.07V.02h3.01z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Spacer Column for Wide Screen Proportions */}
                    <div className="hidden lg:block lg:col-span-1" />

                    {/* Column 1: Customer Service */}
                    <div className="md:col-span-3 lg:col-span-2 space-y-4">
                        <h3 className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
                            Customer Service
                        </h3>
                        <ul className="space-y-2.5 font-light text-neutral-400">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/orders" className="hover:text-white transition-colors">Order Status</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Shipping Info */}
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
                            Shipping Info
                        </h3>
                        <ul className="space-y-2.5 font-light text-neutral-400">
                            <li><Link href="/shipping-rates" className="hover:text-white transition-colors">Shipping Rates</Link></li>
                            <li><Link href="/delivery" className="hover:text-white transition-colors">Delivery Times</Link></li>
                            <li><Link href="/international" className="hover:text-white transition-colors">International</Link></li>
                            <li><Link href="/tracking" className="hover:text-white transition-colors">Tracking</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: About Us */}
                    <div className="md:col-span-3 lg:col-span-3 space-y-4">
                        <h3 className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase">
                            About Us
                        </h3>
                        <ul className="space-y-2.5 font-light text-neutral-400">
                            <li><Link href="/mission" className="hover:text-white transition-colors">Our Mission</Link></li>
                            <li><Link href="/brands" className="hover:text-white transition-colors">Our Brands</Link></li>
                            <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Metadata & Legal Terms Border Row */}
                <div className="pt-8 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-600 uppercase tracking-wider">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
                        <span>&copy; {currentYear} KAFUUR.</span>
                        <span className="hidden sm:inline text-neutral-800">•</span>
                        <span>FRESH. TRUSTED. GENUINE.</span>
                    </div>

                    <div className="flex items-center gap-6 text-neutral-500">
                        <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms</Link>
                        <Link href="/cookies" className="hover:text-neutral-300 transition-colors">Cookies</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}