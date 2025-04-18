import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cruyffism",
  description: "A modern blog dedicated to Johan Cruyff's football philosophy and legacy.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}


import './globals.css'