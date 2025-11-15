"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import MagicButton from "@/components/ui/MagicButton";
import {FaLocationArrow} from "react-icons/fa";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: name,
                    from_email: email,
                    to_name: "Godwin Malinde",
                    message: message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            setLoading(false);
            setSent(true);

            // Reset form fields
            setName("");
            setEmail("");
            setMessage("");

            // Hide success message after 4 seconds
            setTimeout(() => setSent(false), 4000);
        } catch (error: unknown) {
            setLoading(false);


            if (error instanceof Error) {
                console.error("EmailJS error:", error.message);
                alert("Failed to send message: " + error.message);
            } else {
                console.error("Unexpected error:", error);
                alert("Failed to send message. Please try again later.");
            }
        }
    };

    return (
        <div className="w-full max-w-xl p-6 rounded-2xl border
                    saturate-180 bg-opacity bg-black-200 border-purple/40 shadow-[0_8px_20px_rgba(0,0,0,0.15)] backdrop-blur">
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
                        name="name"
                        type="text"
                        placeholder="Godwin JeyR"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                        name="email"
                        type="email"
                        value={email}
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                        name="message"
                        value={message}
                        rows={5}
                        className="w-full rounded-md border border-neutral-700 bg-black-100 p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Tell me about your project..."
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </LabelInputContainer>

                {/*<button*/}
                {/*    type="submit"*/}
                {/*    disabled={loading}*/}
                {/*    className="group relative w-full h-11 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-lg disabled:opacity-60"*/}
                {/*>*/}
                {/*    {loading ? "Sending..." : "Send Message"}*/}
                {/*    <BottomGradient />*/}
                {/*</button>*/}

                {/* MagicButton as submit */}
                <div className="mt-2 flex justify-center w-full">
                    <MagicButton
                        title={loading ? "Sending..." : "Send Message"}
                        icon={<FaLocationArrow />}
                        position="right"
                        otherClasses="w-full"
                        type="submit"
                        disabled={loading}
                    />
                </div>



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
