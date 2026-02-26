import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transaction Categories', href: '/transaction-categories' },
    { title: 'Create', href: '/transaction-categories/create' },
];

export default function Create() {
    const form = useForm({
        code: '',
        name: '',
        type: 'expense',
        notes: '',
    });

    function submit(e: any) {
        e.preventDefault();
        form.post('/transaction-categories');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Transaction Category" />

            <h1 className="sr-only">Create Transaction Category</h1>

            <div className="space-y-6 p-4">
                <div className="max-w-lg space-y-6">
                    <Heading
                        variant="small"
                        title="Create transaction category"
                        description="Add a new transaction category."
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Code (3 chars)</Label>
                            <Input
                                id="code"
                                value={form.data.code}
                                onChange={e =>
                                    form.setData('code', e.target.value.toUpperCase())
                                }
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
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={form.data.type}
                                onValueChange={value => form.setData('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="expense">Expense</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={form.errors.type} />
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
                                <Link href="/transaction-categories">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
