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

const breadcrumbs = (category: any): BreadcrumbItem[] => [
    { title: 'Transaction Categories', href: '/transaction-categories' },
    { title: category.name, href: `/transaction-categories/${category.id}/edit` },
];

export default function Edit({ transactionCategory }: { transactionCategory: any }) {
    const form = useForm({
        code: transactionCategory.code || '',
        name: transactionCategory.name || '',
        type: transactionCategory.type || 'expense',
        notes: transactionCategory.notes || '',
    });

    function submit(e: any) {
        e.preventDefault();
        form.put(`/transaction-categories/${transactionCategory.id}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs(transactionCategory)}>
            <Head title={`Edit ${transactionCategory.name}`} />

            <h1 className="sr-only">{`Edit ${transactionCategory.name}`}</h1>

            <div className="space-y-6 p-4">
                <div className="max-w-lg space-y-6">
                    <Heading
                        variant="small"
                        title="Edit transaction category"
                        description="Update category details."
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
                            <Button disabled={form.processing}>Save</Button>

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
