import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Outfit Builder',
  description: 'Create and shop virtual outfits',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
