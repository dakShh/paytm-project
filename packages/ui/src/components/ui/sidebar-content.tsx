import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './sidebar';

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

import Link from 'next/link';
// Menu items
const items = [
    {
        title: 'Dashboard',
        url: '/',
        icon: Home,
    },
    {
        title: 'Transaction',
        url: '/transaction',
        icon: Inbox,
    },
    {
        title: 'Transfer',
        url: '/transfer',
        icon: Calendar,
    },
];

export default function SidebarContentMain() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <div className="text-3xl text-primary">ByteWallet</div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-5">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="">
                                    <SidebarMenuButton asChild className="">
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
