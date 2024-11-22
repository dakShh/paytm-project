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

export default function SignUp() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        console.log('values: ', values);

        try {
            const response = await axios.post<ApiResponse>('/api/user/', values);
            console.log('response: ', response);
            toast({
                title: 'Success',
                description: response.data.message,
            });
            // router.replace(`/verify/${values.username}`);
        } catch (error) {
            console.log('error: ', error);
            toast({
                title: 'Signup failed',
                // description: errorMessage,
                variant: 'destructive',
            });
        }
    }

    // useEffect(() => {
    //     const getAllUsers = async () => {
    //         const result = await axios.get('/api/user');
    //         console.log('result: ', result.data);
    //     };

    //     getAllUsers();
    // }, []);

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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="off" placeholder="Eg: daksh" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
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
                            signup
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
