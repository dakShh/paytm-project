'use server';

import { cn } from '@repo/ui/lib/utils';
import AppBarClient from '../../../components/AppbarClient';
import DashboardCard from '../../../components/DashboardCard';
import { getCurrentBalance, getNumberOfTransactions } from '../../../lib/actions/dashboard';

export default async function Dashboard() {
    const currentBalance = await getCurrentBalance();
    const noOfTranx = await getNumberOfTransactions();

    let balance: string = '0';
    let lockedAmount: string = '0';
    let totalBalance: string = '0';

    let totalTransactions: string = '0';
    let processingCount: string = '0';
    let successCount: string = '0';
    let failureCount: string = '0';

    if (currentBalance?.status) {
        balance = currentBalance?.data?.currentAmount.toString() ?? '0';
        lockedAmount = currentBalance?.data?.lockedAmount.toString() ?? '0';
        totalBalance = currentBalance?.data?.totalBalance.toString() ?? '0';
    }

    if (noOfTranx.status) {
        totalTransactions = noOfTranx?.data?.totalTransactions.toString() ?? '0';
        processingCount = noOfTranx?.data?.processingCount.toString() ?? '0';
        successCount = noOfTranx?.data?.successCount.toString() ?? '0';
        failureCount = noOfTranx?.data?.failureCount.toString() ?? '0';
    }

    return (
        <div className="w-full">
            <AppBarClient />
            <div className={cn('container mx-auto', 'mt-5')}>
                <div className={cn('flex space-x-10', 'mt-10')}>
                    <DashboardCard title="Curent Balance" content={`$ ${balance}`} />
                    <DashboardCard title="Locked Balance" content={`$ ${lockedAmount}`} />
                    <DashboardCard title="Total Balance" content={`$ ${totalBalance}`} />
                </div>

                <div className={cn('flex space-x-10', 'mt-10')}>
                    <DashboardCard title="Total Transactions" content={totalTransactions} />
                    <DashboardCard title="Processing Count" content={processingCount} />
                    <DashboardCard title="Success Count" content={successCount} />
                    <DashboardCard title="Failure Count" content={failureCount} />
                </div>
            </div>
        </div>
    );
}
