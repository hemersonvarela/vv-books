import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: '/users' },
];

export default function Index({ users }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="p-4">
                <div className="mb-4 flex justify-end">
                    <Link href="/users/create" className="btn">Create User</Link>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full divide-y">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user: any) => (
                                <tr key={user.id} className="border-t">
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2 text-center">
                                        <Link href={`/users/${user.id}/edit`} className="mr-2 text-blue-600">Edit</Link>
                                        <Link
                                            href={`/users/${user.id}`}
                                            method="delete"
                                            as="button"
                                            onClick={(e: any) => {
                                                if (!confirm('Delete this user?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            className="text-red-600"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
