import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { mockUser } from './mock-data';

// Demo mode check
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Demo mode: accept any credentials
        if (isDemoMode) {
          if (credentials.email === 'admin@5pro.local' || credentials.email === 'demo@5pro.local') {
            return {
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.name,
              role: mockUser.role,
              token: 'mock-jwt-token',
            };
          }
          return null;
        }

        // Production mode: call real API
        try {
          const { apiClient } = await import('./api');
          const response = await apiClient.post<{
            token: string;
            user: {
              id: string;
              email: string;
              name: string;
              role: {
                id: string;
                name: string;
                permissions: Array<{
                  permission: string;
                  resource: string;
                }>;
              };
            };
          }>('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          return {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            role: response.user.role,
            token: response.token,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'demo-secret-for-vercel-deployment',
};

