import NextAuth, {NextAuthOptions} from "next-auth";
import { prisma } from "@/lib/prisma";
import { compare, hashSync } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRole } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 дней
    updateAge: 24 * 60 * 60,   // раз в 24 часа будет обновлять
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // тоже 30 дней для токена
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E-Mail', type: 'text', placeholder: 'user@test.ru' },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password){
          throw new Error("Введите E-mail и пароль");
        };

        const user = await prisma.user.findFirst({
          where: {email: credentials.email},
        });

        if(!user){
          throw new Error("Пользователь с таким E-Mail не найден");
        };

        if(!user.verified){
          throw new Error("Аккаунт не подтвержден. Проверьте почту.");
        };

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid){
          throw new Error("Неверный пароль");
        };

        return {
          id: String(user.id),
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      },
    }),
  ],

  
  callbacks: {
    async signIn() {
      return true;
    },


    
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email!,
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
        
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
