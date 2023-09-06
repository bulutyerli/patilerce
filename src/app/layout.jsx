import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Roboto } from 'next/font/google';
import { NextAuthProvider } from './Providers';
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
