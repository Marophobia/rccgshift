import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string | number;
            name: string;
            email: string;
            role: string;
        };
    }

    interface User {
        id: number;
        name: string;
        email: string;
        role: string;
        expires: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string | number;
        name: string;
        email: string;
        role: string;
        expires: string
    }
}
