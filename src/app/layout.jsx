import './globals.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { Roboto } from 'next/font/google';
import { NextAuthProvider } from '../components/next-auth-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  preload: true,
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
        <NextAuthProvider>
          <Header />
          {children}
          <ToastContainer autoClose={1000} position="top-center" />
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
