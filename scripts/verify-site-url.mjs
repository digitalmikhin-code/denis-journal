const value = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/$/, "");

if (!value) {
  console.error("NEXT_PUBLIC_SITE_URL is required for production builds.");
  console.error("Example: NEXT_PUBLIC_SITE_URL=https://blog.yourdomain.com");
  process.exit(1);
}

const blocked = new Set([
  "https://example.com",
  "http://example.com",
  "https://your-site.netlify.app",
  "http://your-site.netlify.app"
]);

if (blocked.has(value)) {
  console.error(`NEXT_PUBLIC_SITE_URL uses a placeholder: ${value}`);
  console.error("Set your real domain before deployment.");
  process.exit(1);
}

try {
  const parsed = new URL(value);
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http/https URLs are supported.");
  }
} catch (error) {
  console.error(`Invalid NEXT_PUBLIC_SITE_URL: ${value}`);
  console.error(error instanceof Error ? error.message : "Unknown URL parse error.");
  process.exit(1);
}

console.log(`NEXT_PUBLIC_SITE_URL is valid: ${value}`);
