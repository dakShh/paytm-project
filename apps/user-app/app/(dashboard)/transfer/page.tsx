import { cn } from '@repo/ui/lib/utils';
import AppBarClient from '../../../components/AppbarClient';
import AddMoneyCard from '../../../components/AddMoneyCard';

export default function Transfer() {
    return (
        <div>
            <AppBarClient />
            <div className={cn('container mx-auto my-5')}>
                <div className={cn('grid grid-cols-2 gap-5')}>
                    <div className={cn('w-full ')}>
                        <AddMoneyCard />
                    </div>
                    <div className={cn('w-full')}>two</div>
                </div>
            </div>
        </div>
    );
}
