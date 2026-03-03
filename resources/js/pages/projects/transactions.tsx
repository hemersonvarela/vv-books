import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

export default function ProjectTransactions({ project, transactions, totals }: any) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: '/projects' },
        { title: project.name, href: `/projects/${project.id}/edit` },
        { title: 'Transactions', href: '#' },
    ];

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
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Step</th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                                <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-background divide-y">
                            {transactions.data.map((transaction: any) => (
                                <tr key={transaction.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-4 py-2 whitespace-nowrap font-mono text-xs">{transaction.code}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{transaction.date_formatted}</td>
                                    <td className="px-4 py-2 text-sm">{transaction.step || '-'}</td>
                                    <td className="px-4 py-2">
                                        <div className="text-sm line-clamp-1">{transaction.description}</div>
                                        {transaction.category && (
                                            <div className="text-xs text-muted-foreground">{transaction.category}</div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <span
                                            className={
                                                transaction.type === 'income'
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                            }
                                        >
                                            {transaction.type === 'expense' ? '-' : ''}${transaction.amount_formatted}
                                        </span>
                                    </td>
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
                            {transactions.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                            {transactions.data.length > 0 && (
                                <tr className="bg-muted font-semibold">
                                    <td colSpan={4} className="px-4 py-3 text-right">
                                        Total Project:
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className={parseFloat(totals.net) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                            ${totals.net}
                                        </div>
                                    </td>
                                    <td colSpan={1}></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
