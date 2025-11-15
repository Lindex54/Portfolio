"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target as HTMLFormElement;

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )
            .then(
                () => {
                    setSent(true);
                    setLoading(false);
                    form.reset();
                },
                (error) => {
                    console.log("FAILED...", error);
                    setLoading(false);
                }
            );
    };

    return (
        <div className="mx-auto w-full max-w-lg rounded-2xl bg-[#0d0f1a] p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white text-center">
                Let’s Get In Touch
            </h2>
            <p className="mt-2 mb-6 text-center text-neutral-400">
                Fill in the form and I’ll get back to you shortly.
            </p>

            <form onSubmit={sendEmail} className="space-y-4">
                <LabelInputContainer>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                        id="name"
                        name="user_name"
                        type="text"
                        placeholder="John Doe"
                        required
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                        id="email"
                        name="user_email"
                        type="email"
                        placeholder="you@example.com"
                        required
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full rounded-md border border-neutral-700 bg-black p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Tell me about your project..."
                        required
                    />
                </LabelInputContainer>

                <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full h-11 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-lg disabled:opacity-60"
                >
                    {loading ? "Sending..." : "Send Message"}
                    <BottomGradient />
                </button>

                {sent && (
                    <p className="text-center text-green-400 mt-2">
                        Message sent successfully! ✔
                    </p>
                )}
            </form>
        </div>
    );
}

const BottomGradient = () => (
    <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
    </>
);

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2 text-white", className)}>
            {children}
        </div>
    );
};
