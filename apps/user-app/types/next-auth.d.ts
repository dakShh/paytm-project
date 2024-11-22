import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: number;
    }

    interface Session {
        user: {
            id?: number;
            number?: string;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: number;
        number?: string;
    }
}
