import { genSalt, hash, compare } from 'bcrypt-ts';
import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export async function hashPassword(password: string) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
    try {
        const isValid = await compare(password, hashedPassword);
        return isValid;
    } catch (error) {
        return false;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
                expires: {
                    label: 'Expires',
                    type: 'boolean',
                },
            },
            authorize: async (credentials, req) => {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Empty email or password');
                }

                const user = await prisma.admin.findFirst({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user) {
                    throw new Error('No user found');
                }

                const comparePassword = await verifyPassword(
                    credentials.password,
                    user.password
                );
                if (!comparePassword) {
                    throw new Error('Password does not match');
                }

                if (!user.status) {
                    throw new Error('User is not active');
                }

                const expires = credentials.expires ? '45h' : '2h';
                console.log(credentials.expires);

                return {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                    expires: expires,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 12 * 60 * 60,
    },
    pages: {
        signIn: '/auth',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.expires = user.expires;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.expires = token.expires;
            }
            return session;
        },
    },
};

export const getAuthSession = async () => {
    return getServerSession(authOptions);
};

export async function getAPISession(req: NextApiRequest, res: NextApiResponse) {
    return getServerSession(req, res, authOptions);
}
