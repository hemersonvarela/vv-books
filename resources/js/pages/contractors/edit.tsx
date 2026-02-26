import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs = (contractor: any): BreadcrumbItem[] => [
    { title: 'Contractors', href: '/contractors' },
    { title: contractor.name, href: `/contractors/${contractor.id}/edit` },
];

export default function Edit({ contractor }: { contractor: any }) {
    const form = useForm({
        name: contractor.name || '',
        company_name: contractor.company_name || '',
        email: contractor.email || '',
        phone: contractor.phone || '',
        tax_id: contractor.tax_id || '',
        notes: contractor.notes || '',
    });

    function submit(e: any) {
        e.preventDefault();
        form.put(`/contractors/${contractor.id}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs(contractor)}>
            <Head title={`Edit ${contractor.name}`} />

            <h1 className="sr-only">{`Edit ${contractor.name}`}</h1>

            <div className="space-y-6 p-4">
                <div className="max-w-lg space-y-6">
                    <Heading
                        variant="small"
                        title="Edit contractor"
                        description="Update contractor details."
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={e => form.setData('name', e.target.value)}
                                aria-invalid={Boolean(form.errors.name)}
                                required
                            />
                            <InputError message={form.errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="company_name">Company name</Label>
                            <Input
                                id="company_name"
                                value={form.data.company_name}
                                onChange={e => form.setData('company_name', e.target.value)}
                                aria-invalid={Boolean(form.errors.company_name)}
                            />
                            <InputError message={form.errors.company_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={e => form.setData('email', e.target.value)}
                                aria-invalid={Boolean(form.errors.email)}
                            />
                            <InputError message={form.errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={form.data.phone}
                                onChange={e => form.setData('phone', e.target.value)}
                                aria-invalid={Boolean(form.errors.phone)}
                            />
                            <InputError message={form.errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tax_id">Tax ID</Label>
                            <Input
                                id="tax_id"
                                value={form.data.tax_id}
                                onChange={e => form.setData('tax_id', e.target.value)}
                                aria-invalid={Boolean(form.errors.tax_id)}
                            />
                            <InputError message={form.errors.tax_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={form.data.notes}
                                onChange={e => form.setData('notes', e.target.value)}
                                aria-invalid={Boolean(form.errors.notes)}
                            />
                            <InputError message={form.errors.notes} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Button disabled={form.processing}>Save</Button>

                            <Button asChild variant="secondary">
                                <Link href="/contractors">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
