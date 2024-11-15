import AppBarClient from '../../components/AppbarClient';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <AppBarClient />
            {children}
        </div>
    );
}
