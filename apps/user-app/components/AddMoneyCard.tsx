'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { addMoneySchema } from '@repo/schemas/addMoneySchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';

import { useRouter } from 'next/navigation';
import { useToast } from '@repo/ui/hooks/use-toast';
import { ApiResponse } from '@repo/common/types/ApiResponse';
import { createOnRampTransaction } from '../lib/actions/createOnRampTranx';

export default function AddMoneyCard() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof addMoneySchema>>({
        resolver: zodResolver(addMoneySchema),
        defaultValues: {
            amount: 0,
            provider: '',
        },
    });

    async function onSubmit(values: z.infer<typeof addMoneySchema>) {
        const provider = values?.provider;
        const amount = values?.amount;

        try {
            const response = await createOnRampTransaction(provider, amount);
            if (!response?.status) {
                toast({
                    title: 'Transaction failed',
                    description: response?.message || '',
                    variant: 'destructive',
                });
            }
            toast({ title: 'Transaction Complete! :)' });
            router.refresh();
            form.reset();
        } catch (error) {
            console.log('error hai bc', error);
            toast({
                title: 'Transaction failed',
                variant: 'destructive',
            });
        }
    }

    const SUPPORTED_BANKS = [{ name: 'HDFC Bank' }, { name: 'Axis Bank' }];

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
                                <FormItem className="">
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            autoComplete="off"
                                            type="number"
                                            placeholder="$ 99999"
                                            value={field?.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="provider"
                            render={({ field }) => (
                                <FormItem className="mt-6">
                                    <FormLabel>Select bank</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a bank" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {SUPPORTED_BANKS?.map((bank, index) => {
                                                    return (
                                                        <SelectItem key={index} value={bank.name}>
                                                            {bank.name}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className={cn('flex', 'mt-8 mx-auto', 'w-full')}>
                            Add Money
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
