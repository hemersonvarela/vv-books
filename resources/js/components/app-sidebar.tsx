import { Link } from '@inertiajs/react';
import { BookOpen, CreditCard, Folder, LayoutGrid, List, Store, Users } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
import { dashboard } from '@/routes';
import { index as usersIndex } from '@/routes/users';
import { index as vendorsIndex } from '@/routes/vendors';
import { index as partnersIndex } from '@/routes/partners';
import { index as projectStepsIndex } from '@/routes/project-steps';
import { index as transactionCategoriesIndex } from '@/routes/transaction-categories';
import { index as paymentMethodsIndex } from '@/routes/payment-methods';
import { index as contractorsIndex } from '@/routes/contractors';
import { index as projectsIndex } from '@/routes/projects';
import transactions from '@/routes/transactions';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: usersIndex(),
        icon: Users,
    },
    {
        title: 'Vendors',
        href: vendorsIndex(),
        icon: Store,
    },
    {
        title: 'Partners',
        href: partnersIndex(),
        icon: Users,
    },
    {
        title: 'Project Steps',
        href: projectStepsIndex(),
        icon: BookOpen,
    },
    {
        title: 'Transaction Categories',
        href: transactionCategoriesIndex(),
        icon: List,
    },
    {
        title: 'Payment Methods',
        href: paymentMethodsIndex(),
        icon: CreditCard,
    },
    {
        title: 'Contractors',
        href: contractorsIndex(),
        icon: Users,
    },
    {
        title: 'Projects',
        href: projectsIndex(),
        icon: Folder,
    },
    {
        title: 'Transactions',
        href: transactions.index(),
        icon: List,
    },
    {
        title: 'Import Transactions',
        href: transactions.import.index(),
        icon: List,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/*<NavFooter items={footerNavItems} className="mt-auto" />*/}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
