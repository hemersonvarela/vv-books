import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Project Steps', href: '/project-steps' },
    { title: 'Create', href: '/project-steps/create' },
];

export default function Create() {
    const form = useForm({
        code: '',
        name: '',
        description: '',
        step_order: 0,
        status: true,
    });

    function submit(e: any) {
        e.preventDefault();
        form.post('/project-steps');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project Step" />

            <h1 className="sr-only">Create Project Step</h1>

            <div className="space-y-6 p-4">
                <div className="max-w-lg space-y-6">
                    <Heading
                        variant="small"
                        title="Create project step"
                        description="Add a new project step."
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
                                value={form.data.code}
                                onChange={e =>
                                    form.setData('code', e.target.value)
                                }
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
                            <Label htmlFor="step_order">Order</Label>
                            <Input
                                id="step_order"
                                type="number"
                                value={form.data.step_order}
                                onChange={e =>
                                    form.setData('step_order', parseInt(e.target.value) || 0)
                                }
                                aria-invalid={Boolean(form.errors.step_order)}
                                required
                            />
                            <InputError message={form.errors.step_order} />
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

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="status"
                                checked={form.data.status}
                                onCheckedChange={(checked) =>
                                    form.setData('status', !!checked)
                                }
                            />
                            <Label
                                htmlFor="status"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Active
                            </Label>
                        </div>
                        <InputError message={form.errors.status} />

                        <div className="flex items-center gap-3">
                            <Button disabled={form.processing}>Create</Button>

                            <Button asChild variant="secondary">
                                <Link href="/project-steps">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
