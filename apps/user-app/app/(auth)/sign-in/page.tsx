'use client';
// Third party imports
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@repo/ui/lib/utils';
import axios, { AxiosError } from 'axios';

// Component imports
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@repo/ui/components/form';
import { useToast } from '@repo/ui/hooks/use-toast';

// Schemas
import { signupSchema } from '@repo/schemas/signUpSchema';

// Types
import { ApiResponse } from '@repo/common/types/ApiResponse';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// auth
import { signIn } from 'next-auth/react';
import { signinSchema } from '@repo/schemas/signInSchema';

export default function SignIn() {
    const router = useRouter();
    const { toast } = useToast();

    // form
    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // logic after submitting the form
    async function onSubmit(values: z.infer<typeof signinSchema>) {
        console.log('values: ', values);
        const { email, password } = values;
        try {
            const response = await signIn('credentials', {
                redirect: false,
                identifier: email,
                password: password,
            });

            if (response?.error) {
                toast({
                    title: 'Signup failed',
                    description: 'Email or Password is incorrect!',
                    variant: 'destructive',
                });
            }
            router.push('/dashboard');
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            console.log('axiosError: ', axiosError);
            const errorMessage = axiosError?.response?.data.message;
            toast({
                title: 'Signup failed',
                description: errorMessage,
                variant: 'destructive',
            });
        }
    }

    return (
        <div className=" container  mx-auto  grid  place-items-center  h-screen ">
            <div className=" w-96  p-5  bg-white   rounded-lg  shadow-lg">
                <div className="text-center mb-10">
                    <div className="font-bold text-3xl">PayTM Bank</div>
                    {/* <div className="text-bold text-sm">Login</div> */}
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            style={{ marginBottom: '15px' }}
                                            autoComplete="off"
                                            placeholder="Eg: daksh@space.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            placeholder="********"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className={cn('w-full', 'mt-10')}>
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
