import { Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ stats, partnerYearlyTotals, partnerMonthlyTotals, currentYear }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Link href="/transactions?verified_status=unverified">
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col h-full justify-between">
                                <h3 className="text-sm font-medium text-muted-foreground">Unverified Transactions</h3>
                                <div>
                                    <p className="text-3xl font-bold">{stats.unverified_transactions}</p>
                                    <p className="text-xs text-muted-foreground mt-2">Click to view</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href="/transactions?partner_status=unclaimed">
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col h-full justify-between">
                                <h3 className="text-sm font-medium text-muted-foreground">Unclaimed Transactions</h3>
                                <div>
                                    <p className="text-3xl font-bold">{stats.no_partner_transactions}</p>
                                    <p className="text-xs text-muted-foreground mt-2">Click to view</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                {partnerYearlyTotals.length > 0 && (
                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card">
                        <div className="px-6 py-4 border-b">
                            <h2 className="text-sm font-semibold">Partner Yearly Totals — {currentYear}</h2>
                        </div>
                        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {partnerYearlyTotals.map((partner: any) => {
                                const net = parseFloat(partner.net);
                                return (
                                    <div key={partner.id} className="rounded-lg border bg-background p-4 space-y-2">
                                        <p className="text-sm font-medium truncate">{partner.name}</p>
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Income</span>
                                            <span className="text-green-600 dark:text-green-400 font-medium">
                                                {partner.income ? `$${partner.income}` : '—'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Expense</span>
                                            <span className="text-red-600 dark:text-red-400 font-medium">
                                                {partner.expense ? `$${partner.expense}` : '—'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-xs border-t pt-2">
                                            <span className="text-muted-foreground">Net</span>
                                            <span className={`font-semibold ${net >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                ${partner.net.replace('-', '')}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-sm font-semibold">Partner Transactions — {currentYear}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y text-sm">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider w-32">Partner</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider w-20"></th>
                                    {MONTHS.map((month) => (
                                        <th key={month} className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">
                                            {month}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-background divide-y">
                                {partnerMonthlyTotals.length === 0 && (
                                    <tr>
                                        <td colSpan={14} className="px-4 py-8 text-center text-muted-foreground">
                                            No active partners found.
                                        </td>
                                    </tr>
                                )}
                                {partnerMonthlyTotals.map((partner: any, index: number) => (
                                    <>
                                        <tr key={`${partner.id}-income`} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                                            <td rowSpan={2} className="px-4 py-2 font-medium align-middle">
                                                {partner.name}
                                            </td>
                                            <td className="px-4 py-2 text-xs text-muted-foreground">Income</td>
                                            {MONTHS.map((_, i) => (
                                                <td key={i} className="px-4 py-2 text-right whitespace-nowrap text-green-600 dark:text-green-400">
                                                    {partner.months[i + 1]?.income ? `$${partner.months[i + 1].income}` : ''}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr key={`${partner.id}-expense`} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                                            <td className="px-4 py-2 text-xs text-muted-foreground">Expense</td>
                                            {MONTHS.map((_, i) => (
                                                <td key={i} className="px-4 py-2 text-right whitespace-nowrap text-red-600 dark:text-red-400">
                                                    {partner.months[i + 1]?.expense ? `$${partner.months[i + 1].expense}` : ''}
                                                </td>
                                            ))}
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
