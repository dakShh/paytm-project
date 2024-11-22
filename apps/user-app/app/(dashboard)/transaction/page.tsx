'use server';

import { cn } from '@repo/ui/lib/utils';
import AppBarClient from '../../../components/AppbarClient';

// Server actions
import { getAllTransactions } from '../../../lib/actions/getAllTransactions';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';

import { PackageOpen } from 'lucide-react';

import { Paginator } from '../../../components/Paginator';

interface TransactionProps {
    searchParams: { [key: string]: string | undefined };
}

export default async function Transaction({ searchParams }: TransactionProps) {
    const currentPage = parseInt(searchParams?.page || '1');
    const pageSize = parseInt(searchParams?.pageSize || '5');

    const transactions = await getAllTransactions({ page: currentPage, limit: pageSize });
    const { data: tranx, meta } = transactions;

    return (
        <div>
            <AppBarClient />
            <div className={cn('container mx-auto', 'mt-5')}>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tranx?.length == 0 ? (
                            <div
                                className={cn(
                                    'text-sm text-muted-foreground',
                                    'flex flex-col gap-y-2 items-center',
                                    'py-10'
                                )}
                            >
                                <PackageOpen className="text-neutral-200 h-12 w-12 stroke-1" />
                                No Transactions to show
                            </div>
                        ) : (
                            tranx?.map((trnx, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={cn(
                                            'flex justify-between',
                                            'px-4 py-2',
                                            'rounded-sm',
                                            'bg-yellow-50 border-b border-yellow-300',
                                            'mb-2',
                                            'hover:cursor-pointer hover:bg-yellow-100'
                                        )}
                                    >
                                        <div className="flex gap-x-4">
                                            <div className="bg-white rounded-full w-6 flex items-center justify-center h-fit shadow-md">
                                                {index + 1}
                                            </div>
                                            <div className={cn('flex flex-col gap-y-2')}>
                                                <div className="flex gap-x-4 items-center">
                                                    {trnx.provider}
                                                    <div
                                                        className={cn(
                                                            'bg-yellow-300',
                                                            'text-xs',
                                                            'rounded-md px-2 py-1',
                                                            'shadow'
                                                        )}
                                                    >
                                                        {trnx?.status || ''}
                                                    </div>
                                                </div>
                                                <div className={cn('text-xs text-muted-foreground pr-10')}>
                                                    {trnx?.startTime?.toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true, // Use false for 24-hour format
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cn('text-xl font-bold text-neutral-500')}>
                                            ${trnx.amount / 100}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </CardContent>
                </Card>
                <div className="my-8">
                    <Paginator
                        page={currentPage}
                        pageSize={pageSize}
                        totalCount={meta?.totalRecords as number}
                        pageSizeSelectOptions={{
                            pageSizeOptions: [2, 5, 10],
                            pageSizeSearchParam: 'pageSize',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
