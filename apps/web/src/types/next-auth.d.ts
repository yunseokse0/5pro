import 'next-auth';

declare module 'next-auth' {
  interface User {
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
    token: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: {
        id: string;
        name: string;
        permissions: Array<{
          permission: string;
          resource: string;
        }>;
      };
    };
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: any;
    accessToken: string;
  }
}

