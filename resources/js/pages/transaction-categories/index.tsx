import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transaction Categories', href: '/transaction-categories' },
];

export default function Index({ transactionCategories }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaction Categories" />

            <div className="p-4">
                <div className="mb-4 flex justify-end">
                    <Button asChild>
                        <Link href="/transaction-categories/create">Create Category</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full divide-y">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Code</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Type</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionCategories.data.map((category: any) => (
                                <tr key={category.id} className="border-t">
                                    <td className="px-4 py-2">{category.code}</td>
                                    <td className="px-4 py-2">{category.name}</td>
                                    <td className="px-4 py-2">
                                        {category.type === 'income' ? (
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Income
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                Expense
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-center gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/transaction-categories/${category.id}/edit`}>Edit</Link>
                                            </Button>

                                            <Button variant="destructive" size="sm" asChild>
                                                <Link
                                                    href={`/transaction-categories/${category.id}`}
                                                    method="delete"
                                                    as="button"
                                                    onClick={(e: any) => {
                                                        if (!confirm('Delete this category?')) {
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
                        </tbody>
                    </table>
                </div>

                <Pagination links={transactionCategories.links} />
            </div>
        </AppLayout>
    );
}
