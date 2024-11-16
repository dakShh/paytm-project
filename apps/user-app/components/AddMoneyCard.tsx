'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { addMoneySchema } from '@repo/schemas/addMoneySchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';

export default function AddMoneyCard() {
    const form = useForm<z.infer<typeof addMoneySchema>>({
        resolver: zodResolver(addMoneySchema),
        defaultValues: {
            amount: undefined,
            bank_provider: '',
        },
    });

    async function onSubmit(values: z.infer<typeof addMoneySchema>) {
        console.log('values: ', values);
    }

    const SUPPORTED_BANKS = [
        {
            name: 'HDFC Bank',
            redirectUrl: 'https://netbanking.hdfcbank.com',
        },
        {
            name: 'Axis Bank',
            redirectUrl: 'https://www.axisbank.com/',
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add money</CardTitle>
                <CardDescription>Time to get credited.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            type="amount"
                                            placeholder="99999"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bank_provider"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select bank</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className={cn('flex', 'mt-10 mx-auto', 'w-full')}>
                            Add Money
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
