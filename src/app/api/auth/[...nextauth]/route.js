import NextAuth from 'next-auth';
import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

connectDB();

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60,
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email }).select(
          '+password'
        );

        if (!user) {
          throw new Error('Wrong email or password');
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Wrong email or password');
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.type === 'oauth') {
        return await signInWithOAuth(account, profile);
      }
      return true;
    },
    async jwt({ token }) {
      const user = await getUserByEmail({ email: token.email });
      token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function signInWithOAuth(account, profile) {
  if (profile && profile.email) {
    const user = await User.findOne({ email: profile.email });
    if (user) {
      return true; // If user exists, sign in
    } else {
      // If not Create a new user
      const newUser = new User({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        provider: account.provider,
        isVerified: true,
      });

      await newUser.save(); // Save the new user to the database
      return true;
    }
  } else {
    console.error('Profile or email is missing');
    return false;
  }
}

async function getUserByEmail({ email }) {
  const user = await User.findOne({ email }).select('-password');
  if (!user) throw new Error('Email does not exist');

  return { ...user._doc, _id: user._id.toString() };
}
