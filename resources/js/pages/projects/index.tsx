import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Projects', href: '/projects' },
];

export default function Index({ projects }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="p-4">
                <div className="mb-4 flex justify-end">
                    <Button asChild>
                        <Link href="/projects/create">Create Project</Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full divide-y">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Start Date</th>
                                <th className="px-4 py-2 text-left">End Date</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.data.map((project: any) => (
                                <tr key={project.id} className="border-t">
                                    <td className="px-4 py-2">{project.name}</td>
                                    <td className="px-4 py-2">
                                        {project.status ? (
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">{project.start_date_formatted || '—'}</td>
                                    <td className="px-4 py-2">{project.end_date_formatted || '—'}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-center gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/projects/${project.id}/edit`}>Edit</Link>
                                            </Button>

                                            <Button variant="destructive" size="sm" asChild>
                                                <Link
                                                    href={`/projects/${project.id}`}
                                                    method="delete"
                                                    as="button"
                                                    onClick={(e: any) => {
                                                        if (!confirm('Delete this project?')) {
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

                <Pagination links={projects.meta.links} />
            </div>
        </AppLayout>
    );
}
