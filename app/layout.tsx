import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { TelegramScrollBanner } from "@/components/telegram-scroll-banner";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { ScrollEffects } from "@/components/scroll-effects";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, TELEGRAM_CHANNEL_URL, VK_PROFILE_URL } from "@/lib/constants";
import { AUTHOR_ENTITY } from "@/lib/entity-profile";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/logo.svg", type: "image/svg+xml" }
    ],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/images/logo.svg", type: "image/svg+xml" }]
  },
  manifest: "/site.webmanifest",
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Денис Михин", url: SITE_URL }],
  creator: "Денис Михин",
  publisher: "Денис Михин",
  keywords: [
    "журнал дениса михина",
    "денис михин",
    "карьера",
    "управление",
    "системное мышление",
    "agile",
    "архитектура решений",
    "ии в управлении"
  ],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  },
  verification: {
    google: "74d544d0e72e0a3b",
    yandex: "361ba2e969e9f1d7"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ru-RU",
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Person",
    name: "Денис Михин"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  founder: {
    "@type": "Person",
    name: "Денис Михин"
  },
  sameAs: [TELEGRAM_CHANNEL_URL, VK_PROFILE_URL]
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#denis-mikhin`,
  name: AUTHOR_ENTITY.name,
  alternateName: AUTHOR_ENTITY.alternateNames,
  url: AUTHOR_ENTITY.url,
  sameAs: AUTHOR_ENTITY.sameAs,
  jobTitle: AUTHOR_ENTITY.jobTitle,
  description: AUTHOR_ENTITY.shortDescription,
  knowsAbout: AUTHOR_ENTITY.knowsAbout,
  mainEntityOfPage: `${SITE_URL}/about`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ru">
      <body>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/107246735" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <SiteHeader />
        <main className="container-shell py-8">{children}</main>
        <ScrollEffects />
        <SiteFooter />
        <CookieConsentBanner />
        <TelegramScrollBanner />
      </body>
    </html>
  );
}
