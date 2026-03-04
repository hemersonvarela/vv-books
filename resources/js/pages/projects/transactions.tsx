import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

export default function ProjectTransactions({ project, transactions, partners, totals, partnerTotals, unclaimedTotal, hasUnclaimed }: any) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: '/projects' },
        { title: project.name, href: `/projects/${project.id}/edit` },
        { title: 'Transactions', href: '#' },
    ];

    const partnerColCount = partners.length + (hasUnclaimed ? 1 : 0);
    const baseColCount = 3; // Code, Date, Description
    const actionColCount = 1;
    const totalColCount = baseColCount + partnerColCount + actionColCount;

    // Group transactions by step
    const groupedByStep: { stepLabel: string; rows: any[] }[] = [];
    for (const tx of transactions.data) {
        const stepLabel = tx.step || 'No Step';
        const last = groupedByStep[groupedByStep.length - 1];
        if (last && last.stepLabel === stepLabel) {
            last.rows.push(tx);
        } else {
            groupedByStep.push({ stepLabel, rows: [tx] });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${project.name} - Transactions`} />

            <div className="p-4">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold">{project.name}</h1>
                        <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    </div>
                    <Button asChild>
                        <Link href="/transactions/create">Create Transaction</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full divide-y">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Code</th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                                {partners.map((partner: any) => (
                                    <th key={`partner-${partner.id}`} className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">
                                        {partner.name}
                                    </th>
                                ))}
                                {hasUnclaimed && (
                                    <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">Unclaimed</th>
                                )}
                                <th className="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-background divide-y">
                            {transactions.data.length === 0 && (
                                <tr>
                                    <td colSpan={totalColCount} className="px-4 py-8 text-center text-muted-foreground">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                            {groupedByStep.map(({ stepLabel, rows }) => (
                                <>
                                    <tr key={`step-${stepLabel}`} className="bg-muted/30">
                                        <td colSpan={totalColCount} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            {stepLabel}
                                        </td>
                                    </tr>
                                    {rows.map((transaction: any) => (
                                        <tr key={transaction.id} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-4 py-2 whitespace-nowrap font-mono text-xs">{transaction.code}</td>
                                            <td className="px-4 py-2 whitespace-nowrap">{transaction.date_formatted}</td>
                                            <td className="px-4 py-2">
                                                <div className="text-sm line-clamp-1">{transaction.description}</div>
                                                {transaction.category && (
                                                    <div className="text-xs text-muted-foreground">{transaction.category}</div>
                                                )}
                                            </td>
                                            {partners.map((partner: any) => (
                                                <td key={`tx-${transaction.id}-partner-${partner.id}`} className="px-4 py-2 text-right whitespace-nowrap">
                                                    {transaction.partner_id === partner.id && (
                                                        <span
                                                            className={
                                                                transaction.type === 'income'
                                                                    ? 'text-green-600 dark:text-green-400'
                                                                    : 'text-red-600 dark:text-red-400'
                                                            }
                                                        >
                                                            {transaction.type === 'expense' ? '-' : ''}${transaction.amount_formatted}
                                                        </span>
                                                    )}
                                                </td>
                                            ))}
                                            {hasUnclaimed && (
                                                <td className="px-4 py-2 text-right whitespace-nowrap">
                                                    {transaction.partner_id === null && (
                                                        <span
                                                            className={
                                                                transaction.type === 'income'
                                                                    ? 'text-green-600 dark:text-green-400'
                                                                    : 'text-red-600 dark:text-red-400'
                                                            }
                                                        >
                                                            {transaction.type === 'expense' ? '-' : ''}${transaction.amount_formatted}
                                                        </span>
                                                    )}
                                                </td>
                                            )}
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/transactions/${transaction.id}/edit`}>Edit</Link>
                                                    </Button>

                                                    <Button variant="destructive" size="sm" asChild>
                                                        <Link
                                                            href={`/transactions/${transaction.id}`}
                                                            method="delete"
                                                            as="button"
                                                            onClick={(e: any) => {
                                                                if (!confirm('Delete this transaction?')) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                            {transactions.data.length > 0 && (
                                <>
                                    <tr className="bg-muted/25 font-semibold">
                                        <td colSpan={3} className="px-4 py-3 text-right">
                                            Totals:
                                        </td>
                                        {partners.map((partner: any) => (
                                            <td key={`total-partner-${partner.id}`} className="px-4 py-3 text-right">
                                                <div className={parseFloat(partnerTotals[partner.id]) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                                    ${partnerTotals[partner.id]}
                                                </div>
                                            </td>
                                        ))}
                                        {hasUnclaimed && (
                                            <td className="px-4 py-3 text-right">
                                                <div className={parseFloat(unclaimedTotal) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                                    ${unclaimedTotal}
                                                </div>
                                            </td>
                                        )}
                                        <td></td>
                                    </tr>
                                    <tr className="bg-muted font-semibold">
                                        <td colSpan={3} className="px-4 py-3 text-right">
                                            Total Project:
                                        </td>
                                        <td colSpan={partnerColCount} className="px-4 py-3 text-right">
                                            <div className={parseFloat(totals.net) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                                ${totals.net}
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
