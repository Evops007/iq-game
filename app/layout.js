import { Roboto } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  display: "swap",
});

// For overskrifter
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "What's my IQ",
  description: "A game to figure out your IQ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body className=" h-full {roboto.className}">
        {children}
      </body>
    </html>
  );
}
