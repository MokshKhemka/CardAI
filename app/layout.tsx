import type React from "react"
import type { Metadata } from "next"
import { Lora, Kalam } from "next/font/google"
// import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const lora = Lora({ subsets: ["latin"], variable: "--font-serif" })
const kalam = Kalam({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-handwritten" })

export const metadata: Metadata = {
  title: "CardAI - Transform PDFs into Flashcards",
  description: "Use AI to convert your PDFs and textbooks into interactive flashcards instantly",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${lora.variable} ${kalam.variable} font-serif antialiased bg-notebook-paper`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="relative z-0">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
