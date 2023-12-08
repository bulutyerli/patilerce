import './globals.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { Roboto } from 'next/font/google';
import { NextAuthProvider } from '../components/next-auth-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUnreadMessages } from '@/lib/messages/get-unread-messages';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata = {
  title: 'Tailwish A Place Where You Can Adopt Cats And Dogs',
  description: 'Home for Paws',
  icons: '/favicon.png',
};

export default async function RootLayout({ children }) {
  const messageCount = await getUnreadMessages();

  return (
    <html className={roboto.className} lang="en">
      <body>
        <NextAuthProvider>
          <Header messageCount={messageCount} />
          {children}
          <ToastContainer autoClose={1000} position="top-center" />
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
