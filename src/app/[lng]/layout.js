import { Barlow_Semi_Condensed } from "next/font/google"
import { dir } from "i18next"
import { languages } from "../i18n/settings"

import HistoryProvider from "@/providers/HistoryProvider"

import "@/style/index.scss"

export async function generateStatisParams() {
  return languages.map(lng => ({ lng }))
}

export const metadata = {
  title: "A Colorful History",
  description: "A Paint Photography project from Bernard BOlter",
};

const barlow = Barlow_Semi_Condensed({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function RootLayout({ 
  children,
  params: {
    lng
  } 
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={barlow.className}>
        <HistoryProvider>
          {children}
        </HistoryProvider>
      </body>
    </html>
  );
}
