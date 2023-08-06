import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: 'Tailwish',
  description: 'Home for Paws',
  icons: '/favicon.png',
};

export default function RootLayout({ children }) {
  return (
    <html className={roboto.className} lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
