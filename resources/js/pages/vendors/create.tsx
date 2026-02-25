import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Vendors', href: '/vendors' },
    { title: 'Create', href: '/vendors/create' },
];

export default function Create() {
    const form = useForm({
        name: '',
        company_name: '',
        email: '',
        phone: '',
        tax_id: '',
        notes: '',
    });

    function submit(e: any) {
        e.preventDefault();
        form.post('/vendors');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Vendor" />

            <h1 className="sr-only">Create Vendor</h1>

            <div className="space-y-6 p-4">
                <div className="max-w-lg space-y-6">
                    <Heading
                        variant="small"
                        title="Create vendor"
                        description="Add a new vendor."
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
                            <Label htmlFor="company_name">Company name</Label>
                            <Input
                                id="company_name"
                                value={form.data.company_name}
                                onChange={e =>
                                    form.setData('company_name', e.target.value)
                                }
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
                            <Input
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
                                <Link href="/vendors">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
