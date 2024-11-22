import Link from 'next/link';
import { Button } from './button';
import { cn } from '@repo/ui/lib/utils';

// TODO: add it to @repo/common/types
interface IAppBar {
    onSignIn: () => void;
    onSignOut: () => void;
    user: string | undefined;
}

export default function AppBar({ onSignIn, onSignOut, user }: IAppBar) {
    return (
        <header className={cn('flex h-16 w-full items-center justify-end px-4 md:px-6', 'shadow')}>
            {/* <Link href="#" className="flex items-center gap-2" prefetch={false}>
                <span className="text-lg font-semibold">ByteWallet</span>
            </Link> */}
            {/* <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                <Link href="#" className="hover:underline hover:underline-offset-4" prefetch={false}>
                    Home
                </Link>
                <Link href="#" className="hover:underline hover:underline-offset-4" prefetch={false}>
                    Products
                </Link>
                <Link href="#" className="hover:underline hover:underline-offset-4" prefetch={false}>
                    About
                </Link>
                <Link href="#" className="hover:underline hover:underline-offset-4" prefetch={false}>
                    Contact
                </Link>
            </nav> */}
            <div className="flex items-center gap-4">
                <div>
                    {user ? (
                        <Button onClick={onSignOut}>Logout</Button>
                    ) : (
                        <Button onClick={onSignIn}>Login</Button>
                    )}
                </div>
                <span className="sr-only">Toggle user menu</span>
            </div>
        </header>
    );
}
