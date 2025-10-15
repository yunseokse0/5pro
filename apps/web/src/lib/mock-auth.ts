// Mock NextAuth for demo mode

import { mockUser } from './mock-data';

export const mockAuthOptions = {
  providers: [],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user = mockUser;
        session.accessToken = 'mock-jwt-token';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: 'demo-secret-key-for-vercel',
};

