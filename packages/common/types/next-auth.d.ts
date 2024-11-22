import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string;
        name?: boolean;
        email?: boolean;
        number?: string;
    }

    interface Session {
        user: {
            _id?: string;
            name?: boolean;
            email: boolean;
            number?: string;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        name?: boolean;
        email?: boolean;
        number?: string;
    }
}
