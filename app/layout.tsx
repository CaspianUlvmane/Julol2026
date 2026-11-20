import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        spaceGroteskHeading.variable
      )}
    >
      <body className="min-h-svh bg-background bg-[url('https://i0.wp.com/picjumbo.com/wp-content/uploads/picjumbo-premium-christmas-backgrounds-49.jpeg?w=2210&quality=100')] bg-cover bg-top-left font-sans text-foreground antialiased backdrop-blur-sm sm:bg-center">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
