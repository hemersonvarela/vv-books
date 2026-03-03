import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transactions', href: '/transactions' },
];

export default function Index({ transactions, projects, filters }: any) {
    const handleFilterChange = (key: string, value: string) => {
        const newFilters = {
            ...filters,
            [key]: value === 'all' ? '' : value,
        };
        router.visit('/transactions', {
            data: newFilters,
            preserveScroll: true,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />

            <div className="p-4">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Transactions</h1>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/transactions/import">Import Transactions</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/transactions/create">Create Transaction</Link>
                        </Button>
                    </div>
                </div>

                <div className="mb-4 flex gap-4 items-end">
                    <div className="w-48">
                        <label className="text-xs font-medium text-muted-foreground uppercase">Filter by Project</label>
                        <Select
                            value={filters?.project_id ? filters.project_id.toString() : 'all'}
                            onValueChange={(value) => handleFilterChange('project_id', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Projects" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Projects</SelectItem>
                                {projects.map((project: any) => (
                                    <SelectItem key={project.id} value={project.id.toString()}>
                                        {project.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-48">
                        <label className="text-xs font-medium text-muted-foreground uppercase">Verification Status</label>
                        <Select
                            value={filters?.verified_status || 'all'}
                            onValueChange={(value) => handleFilterChange('verified_status', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="verified">Verified</SelectItem>
                                <SelectItem value="unverified">Unverified</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full divide-y">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Code</th>
                                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Project / Step</th>
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
                                    <td className="px-4 py-2">
                                        <div className="text-sm font-medium">{transaction.project}</div>
                                        <div className="text-xs text-muted-foreground">{transaction.step}</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="text-sm line-clamp-1">{transaction.description}</div>
                                        {transaction.category && (
                                            <div className="text-xs text-muted-foreground">{transaction.category}</div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <span className={transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                            {transaction.type === 'expense' ? '-' : ''}${transaction.amount_formatted}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                            transaction.type === 'income'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
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
                        </tbody>
                    </table>
                </div>

                <Pagination links={transactions.meta.links ?? []} />
            </div>
        </AppLayout>
    );
}
