import { z } from 'zod';

export const emailValidation = z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid Email Address!' });
export const passwordValidation = z
    .string({ message: 'Password is missing' })
    .min(6, { message: 'Password must be atleast 6 characters' });

export const signinSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
});
