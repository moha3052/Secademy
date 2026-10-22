import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Secademy — Lær IT-sikkerhed gennem praksis",
    template: "%s · Secademy",
  },
  description:
    "Lær cybersikkerhed på dansk med originale lektioner, quizzer og praktiske labs.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.theme=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}",
          }}
        />
        <a href="#main" className="skip-link">
          Spring til indhold
        </a>
        {children}
      </body>
    </html>
  );
}
