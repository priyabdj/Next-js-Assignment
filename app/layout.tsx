// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Outfit Builder',
  description: 'Create and shop virtual outfits',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
