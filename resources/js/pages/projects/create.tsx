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
    { title: 'Projects', href: '/projects' },
    { title: 'Create', href: '/projects/create' },
];

export default function Create() {
    const form = useForm({
        code: '',
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        status: true,
        notes: '',
    });

    function submit(e: any) {
        e.preventDefault();
        form.post('/projects');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />

            <h1 className="sr-only">Create Project</h1>

            <div className="space-y-6 p-4">
                <div className="max-w-lg space-y-6">
                    <Heading
                        variant="small"
                        title="Create project"
                        description="Add a new project."
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
                                value={form.data.code}
                                onChange={e =>
                                    form.setData('code', e.target.value.toUpperCase())
                                }
                                placeholder="e.g. ABC"
                                maxLength={3}
                                aria-invalid={Boolean(form.errors.code)}
                                required
                            />
                            <InputError message={form.errors.code} />
                        </div>

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
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={form.data.description}
                                onChange={e =>
                                    form.setData('description', e.target.value)
                                }
                                aria-invalid={Boolean(form.errors.description)}
                            />
                            <InputError message={form.errors.description} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start_date">Start Date</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={form.data.start_date}
                                    onChange={e =>
                                        form.setData('start_date', e.target.value)
                                    }
                                    aria-invalid={Boolean(form.errors.start_date)}
                                />
                                <InputError message={form.errors.start_date} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="end_date">End Date</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={form.data.end_date}
                                    onChange={e =>
                                        form.setData('end_date', e.target.value)
                                    }
                                    aria-invalid={Boolean(form.errors.end_date)}
                                />
                                <InputError message={form.errors.end_date} />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="status"
                                checked={form.data.status}
                                onCheckedChange={(checked) =>
                                    form.setData('status', checked === true)
                                }
                            />
                            <Label htmlFor="status">Active</Label>
                            <InputError message={form.errors.status} />
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

                        <div className="flex items-center gap-3">
                            <Button disabled={form.processing}>Create</Button>

                            <Button asChild variant="secondary">
                                <Link href="/projects">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
