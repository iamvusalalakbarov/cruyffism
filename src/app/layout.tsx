import React from 'react';
import type { Metadata } from 'next';
import { Raleway, Roboto } from 'next/font/google';
import '../styles/globals.css';
import Header from '@/components/Header';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Cruyffism',
  description: 'Cruyffism - Football Blog Website',
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayoutProps> = (props) => {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${roboto.variable} bg-[#FAFAFA] antialiased`}
      >
        <Header />
        <main>{props.children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
