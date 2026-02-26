import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Contractors', href: '/contractors' }];

export default function Index({ contractors }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contractors" />

            <div className="p-4">
                <div className="mb-4 flex justify-end">
                    <Button asChild>
                        <Link href="/contractors/create">Create Contractor</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full divide-y">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Company</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Phone</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contractors.data.map((contractor: any) => (
                                <tr key={contractor.id} className="border-t">
                                    <td className="px-4 py-2">{contractor.name}</td>
                                    <td className="px-4 py-2">{contractor.company_name || '—'}</td>
                                    <td className="px-4 py-2">{contractor.email || '—'}</td>
                                    <td className="px-4 py-2">{contractor.phone || '—'}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-center gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/contractors/${contractor.id}/edit`}>Edit</Link>
                                            </Button>

                                            <Button variant="destructive" size="sm" asChild>
                                                <Link
                                                    href={`/contractors/${contractor.id}`}
                                                    method="delete"
                                                    as="button"
                                                    onClick={(e: any) => {
                                                        if (!confirm('Delete this contractor?')) {
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

                <Pagination links={contractors.links} />
            </div>
        </AppLayout>
    );
}
