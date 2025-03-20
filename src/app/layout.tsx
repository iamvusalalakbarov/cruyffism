import React from "react";
import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

export const metadata: Metadata = {
  title: "Cruyffism",
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayoutProps> = (props) => {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`antialiased`}>
        <MantineProvider>{props.children}</MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
