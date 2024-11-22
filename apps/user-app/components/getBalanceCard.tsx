'use server';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';
import { cn } from '@repo/ui/lib/utils';

interface IBalanceProps {
    amount: number;
    locked: number;
}

export default async function GetBalanceCard({ amount, locked }: IBalanceProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Balances</CardTitle>
                <CardDescription>Money Money Money.</CardDescription>
            </CardHeader>

            <CardContent>
                <div className={cn('flex flex-col space-y-2')}>
                    <div className={cn('flex justify-between p-3  bg-neutral-50 border-b', 'rounded-sm')}>
                        <div>{`Current Balance`}</div>
                        <div>$ {amount}</div>
                    </div>
                    <div className={cn('flex justify-between p-3  bg-neutral-50 border-b', 'rounded-sm')}>
                        <div>{`Locked Balance`}</div>
                        <div>$ {locked}</div>
                    </div>
                    <div className={cn('flex justify-between p-3  bg-neutral-50 border-b', 'rounded-sm')}>
                        <div>{`Total Balance`}</div>
                        <div>$ {amount + locked}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
