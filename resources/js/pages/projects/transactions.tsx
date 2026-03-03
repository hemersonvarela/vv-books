import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

export default function ProjectTransactions({ project, transactions }: any) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: '/projects' },
        { title: project.name, href: `/projects/${project.id}/edit` },
        { title: 'Transactions', href: '#' },
    ];

    // Calculate totals
    const incomeTotal = transactions.data
        .filter((t: any) => t.type === 'income')
        .reduce((sum: number, t: any) => sum + parseFloat(t.amount_formatted.replace(/,/g, '')), 0);

    const expenseTotal = transactions.data
        .filter((t: any) => t.type === 'expense')
        .reduce((sum: number, t: any) => sum + parseFloat(t.amount_formatted.replace(/,/g, '')), 0);

    const netTotal = incomeTotal - expenseTotal;

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
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Code</th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Step</th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                                <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Type</th>
                                <th className="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-background divide-y">
                            {transactions.data.map((transaction: any) => (
                                <tr key={transaction.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-4 py-2 whitespace-nowrap">{transaction.date_formatted}</td>
                                    <td className="px-4 py-2 whitespace-nowrap font-mono text-xs">{transaction.code}</td>
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
                                    <td className="px-4 py-2 text-center whitespace-nowrap">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                                transaction.type === 'income'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                            }`}
                                        >
                                            {transaction.type}
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
                                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                            {transactions.data.length > 0 && (
                                <tr className="bg-muted font-semibold">
                                    <td colSpan={4} className="px-4 py-3 text-right">
                                        Totals:
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-right space-y-1">
                                            <div className="text-green-600 dark:text-green-400">
                                                Income: ${incomeTotal.toFixed(2)}
                                            </div>
                                            <div className="text-red-600 dark:text-red-400">
                                                Expense: ${expenseTotal.toFixed(2)}
                                            </div>
                                            <div className={netTotal >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                                Net: ${netTotal.toFixed(2)}
                                            </div>
                                        </div>
                                    </td>
                                    <td colSpan={2}></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
