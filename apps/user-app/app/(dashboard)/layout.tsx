import { SidebarProvider, SidebarTrigger } from '@repo/ui/components/sidebar';
import SidebarContentMain from '@repo/ui/components/sidebar-content';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarContentMain />
            <main className="w-full">
                {/* <SidebarTrigger /> */}
                {children}
            </main>
        </SidebarProvider>
    );
}
