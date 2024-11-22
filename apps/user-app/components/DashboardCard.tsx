import { Card } from '@repo/ui/components/card';
import { cn } from '@repo/ui/lib/utils';

export default function DashboardCard({ title, content }: { title: string; content: string }) {
    return (
        <Card className={cn('w-full', 'px-7 py-4', '    ', 'border')}>
            <div className={cn('text-card-foreground/50', 'text-xs', 'mb-2')}>{title}</div>
            <div className={cn('text-3xl text-primary', 'font-semibold')}>{content}</div>
        </Card>
    );
}
