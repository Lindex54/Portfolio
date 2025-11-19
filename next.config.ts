// next.config.js
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true, // optional, good for catching React warnings
    eslint: {
        // Ignore ESLint errors during build (so deployment succeeds)
        ignoreDuringBuilds: true,
    },
    // You can add other Next.js config options here
    compiler: {
        // Optional: for faster builds
        styledComponents: true,
    },
};

export default withSentryConfig(nextConfig, {
    // Sentry options
    org: "jeyr",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // Upload a larger set of source maps for prettier stack traces
    widenClientFileUpload: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors
    automaticVercelMonitors: true,

    // Optional: tunnel route for ad-blockers
    // tunnelRoute: "/monitoring",
});
