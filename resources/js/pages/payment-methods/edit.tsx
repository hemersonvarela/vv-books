import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Payment Methods', href: '/payment-methods' },
    { title: 'Edit', href: '/payment-methods/edit' },
];

interface EditProps {
    paymentMethod: any;
}

export default function Edit({ paymentMethod }: EditProps) {
    const form = useForm({
        name: paymentMethod.name,
        description: paymentMethod.description || '',
        is_active: paymentMethod.is_active,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.put(`/payment-methods/${paymentMethod.id}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Payment Method" />

            <div className="space-y-6 p-4">
                <div className="max-w-2xl space-y-6">
                    <Heading
                        variant="small"
                        title="Edit Payment Method"
                        description="Update payment method details."
                    />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="e.g., Credit Card, Bank Transfer"
                                required
                            />
                            <InputError message={form.errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.target.value)}
                                placeholder="Additional details..."
                                rows={3}
                            />
                            <InputError message={form.errors.description} />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="is_active"
                                checked={form.data.is_active}
                                onCheckedChange={(checked) => form.setData('is_active', Boolean(checked))}
                            />
                            <Label htmlFor="is_active" className="font-normal cursor-pointer">
                                Active
                            </Label>
                            <InputError message={form.errors.is_active} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Button disabled={form.processing}>Update Payment Method</Button>
                            <Button asChild variant="secondary">
                                <Link href="/payment-methods">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
