import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      subdomain: string;
      plan: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    subdomain: string;
    plan: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    subdomain: string;
    plan: string;
  }
}
