import db from '@repo/db/';
import { signupSchema } from '@repo/schemas/signUpSchema';

// Third party imports
import bcrypt from 'bcrypt';

// TODO: create routes to save user in the database
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validationResult = signupSchema.safeParse(body);

        const { name, email, password } = body;

        const existingUser = await db.user.findUnique({ where: { email } });

        if (existingUser) {
            return Response.json(
                { success: false, message: 'User already exists! Please try logging in.' },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await db.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
            },
        });
        console.log('user::::::::::::::');
        console.log(user);
        return Response.json({
            status: true,
            message: 'Account has been created successfully',
            user,
        });
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
                error: error,
            },
            { status: 500 }
        );
    }
}
