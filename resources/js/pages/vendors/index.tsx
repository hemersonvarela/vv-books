import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Vendors', href: '/vendors' }];

export default function Index({ vendors }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vendors" />

            <div className="p-4">
                <div className="mb-4 flex justify-end">
                    <Button asChild>
                        <Link href="/vendors/create">Create Vendor</Link>
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
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.data.map((vendor: any) => (
                                <tr key={vendor.id} className="border-t">
                                    <td className="px-4 py-2">{vendor.name}</td>
                                    <td className="px-4 py-2">
                                        {vendor.company_name || '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {vendor.email || '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {vendor.phone || '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/vendors/${vendor.id}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/vendors/${vendor.id}`}
                                                    method="delete"
                                                    as="button"
                                                    onClick={(e: any) => {
                                                        if (
                                                            !confirm(
                                                                'Delete this vendor?'
                                                            )
                                                        ) {
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

                <Pagination links={vendors.links} />
            </div>
        </AppLayout>
    );
}
