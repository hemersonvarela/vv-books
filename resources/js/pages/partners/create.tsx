import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Partners', href: '/partners' },
    { title: 'Create', href: '/partners/create' },
];

export default function Create({ projects }: { projects: any[] }) {
    const form = useForm({
        name: '',
        email: '',
        phone: '',
        tax_id: '',
        notes: '',
        project_ids: [] as number[],
    });

    function submit(e: any) {
        e.preventDefault();
        form.post('/partners');
    }

    const toggleProject = (projectId: number) => {
        const currentIds = [...form.data.project_ids];
        const index = currentIds.indexOf(projectId);

        if (index > -1) {
            currentIds.splice(index, 1);
        } else {
            currentIds.push(projectId);
        }

        form.setData('project_ids', currentIds);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Partner" />

            <h1 className="sr-only">Create Partner</h1>

            <div className="space-y-6 p-4">
                <div className="max-w-lg space-y-6">
                    <Heading
                        variant="small"
                        title="Create partner"
                        description="Add a new partner."
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={e =>
                                    form.setData('name', e.target.value)
                                }
                                aria-invalid={Boolean(form.errors.name)}
                                required
                            />
                            <InputError message={form.errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={e =>
                                    form.setData('email', e.target.value)
                                }
                                aria-invalid={Boolean(form.errors.email)}
                            />
                            <InputError message={form.errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={form.data.phone}
                                onChange={e =>
                                    form.setData('phone', e.target.value)
                                }
                                aria-invalid={Boolean(form.errors.phone)}
                            />
                            <InputError message={form.errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tax_id">Tax ID</Label>
                            <Input
                                id="tax_id"
                                value={form.data.tax_id}
                                onChange={e =>
                                    form.setData('tax_id', e.target.value)
                                }
                                aria-invalid={Boolean(form.errors.tax_id)}
                            />
                            <InputError message={form.errors.tax_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={form.data.notes}
                                onChange={e =>
                                    form.setData('notes', e.target.value)
                                }
                                aria-invalid={Boolean(form.errors.notes)}
                            />
                            <InputError message={form.errors.notes} />
                        </div>

                        {projects.length > 0 && (
                            <div className="grid gap-3">
                                <Label>Associated Projects</Label>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {projects.map((project: any) => (
                                        <div
                                            key={project.id}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={`project-${project.id}`}
                                                checked={form.data.project_ids.includes(
                                                    project.id
                                                )}
                                                onCheckedChange={() =>
                                                    toggleProject(project.id)
                                                }
                                            />
                                            <Label
                                                htmlFor={`project-${project.id}`}
                                                className="text-sm font-normal"
                                            >
                                                {project.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                <InputError message={form.errors.project_ids} />
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            <Button disabled={form.processing}>Create</Button>

                            <Button asChild variant="secondary">
                                <Link href="/partners">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
