import { EB_Garamond } from "next/font/google";
import "./globals.scss";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const metadata = {
  title: "Save the Date",
  // Empty icon until a real favicon is added, avoids a /favicon.ico 404.
  icons: { icon: "data:," },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={ebGaramond.variable}>
      <body>{children}</body>
    </html>
  );
}
