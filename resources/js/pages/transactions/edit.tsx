import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transactions', href: '/transactions' },
    { title: 'Edit', href: '/transactions/edit' },
];

interface EditProps {
    transaction: any;
    projects: any[];
    steps: any[];
    partners: any[];
    contractors: any[];
    vendors: any[];
    categories: any[];
    paymentMethods: any[];
}

export default function Edit({
    transaction,
    projects,
    steps,
    partners,
    contractors,
    vendors,
    categories,
    paymentMethods
}: EditProps) {
    const form = useForm({
        project_id: transaction.project_id.toString(),
        project_step_id: transaction.project_step_id.toString(),
        partner_id: transaction.partner_id?.toString() || 'none',
        contractor_id: transaction.contractor_id?.toString() || 'none',
        vendor_id: transaction.vendor_id?.toString() || 'none',
        category_id: transaction.category_id.toString(),
        payment_method_id: transaction.payment_method_id.toString(),
        date: transaction.date,
        amount: transaction.amount.toString(),
        type: transaction.type,
        description: transaction.description,
        reference: transaction.reference || '',
        notes: transaction.notes || '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        form.put(`/transactions/${transaction.id}`);
    }

    // const filteredSteps = steps.filter(step => step.project_id === parseInt(form.data.project_id));
    const filteredCategories = categories.filter(category => category.type === form.data.type);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Transaction" />

            <div className="space-y-6 p-4">
                <div className="max-w-2xl space-y-6">
                    <div className="flex justify-between items-start">
                        <Heading
                            variant="small"
                            title="Edit Transaction"
                            description="Update transaction details. If project or step is changed, the code will be regenerated."
                        />
                        <div className="text-right">
                            <div className="text-xs font-mono bg-muted px-2 py-1 rounded">{transaction.code}</div>
                            <div className="text-[10px] text-muted-foreground mt-1 whitespace-nowrap">Verified: {transaction.verified_at_formatted}</div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={form.data.date}
                                    onChange={e => form.setData('date', e.target.value)}
                                    required
                                />
                                <InputError message={form.errors.date} />
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
                                        <SelectItem value="expense">Expense</SelectItem>
                                        <SelectItem value="income">Income</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.type} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="project_id">Project</Label>
                                <Select
                                    value={form.data.project_id}
                                    onValueChange={value => {
                                        form.setData(data => ({
                                            ...data,
                                            project_id: value,
                                            project_step_id: '',
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projects.map(project => (
                                            <SelectItem key={project.id} value={project.id.toString()}>
                                                {project.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.project_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="project_step_id">Project Step</Label>
                                <Select
                                    value={form.data.project_step_id}
                                    onValueChange={value => form.setData('project_step_id', value)}
                                    disabled={!form.data.project_id}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select step" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {steps.map(step => (
                                            <SelectItem key={step.id} value={step.id.toString()}>
                                                {step.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.project_step_id} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category_id">Category</Label>
                                <Select
                                    value={form.data.category_id}
                                    onValueChange={value => form.setData('category_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredCategories.map(category => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.category_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="payment_method_id">Payment Method</Label>
                                <Select
                                    value={form.data.payment_method_id}
                                    onValueChange={value => form.setData('payment_method_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentMethods.map(method => (
                                            <SelectItem key={method.id} value={method.id.toString()}>
                                                {method.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.payment_method_id} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    value={form.data.amount}
                                    onChange={e => form.setData('amount', e.target.value)}
                                    placeholder="0.00"
                                    required
                                />
                                <InputError message={form.errors.amount} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="reference">Reference</Label>
                                <Input
                                    id="reference"
                                    value={form.data.reference}
                                    onChange={e => form.setData('reference', e.target.value)}
                                    placeholder="Check #, Invoice #, etc."
                                />
                                <InputError message={form.errors.reference} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={form.data.description}
                                onChange={e => form.setData('description', e.target.value)}
                                placeholder="What is this transaction for?"
                                required
                            />
                            <InputError message={form.errors.description} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="partner_id">Partner (Optional)</Label>
                                <Select
                                    value={form.data.partner_id}
                                    onValueChange={value => form.setData('partner_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select partner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {partners.map(partner => (
                                            <SelectItem key={partner.id} value={partner.id.toString()}>
                                                {partner.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.partner_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="contractor_id">Contractor (Optional)</Label>
                                <Select
                                    value={form.data.contractor_id}
                                    onValueChange={value => form.setData('contractor_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select contractor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {contractors.map(contractor => (
                                            <SelectItem key={contractor.id} value={contractor.id.toString()}>
                                                {contractor.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.contractor_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="vendor_id">Vendor (Optional)</Label>
                                <Select
                                    value={form.data.vendor_id}
                                    onValueChange={value => form.setData('vendor_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select vendor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {vendors.map(vendor => (
                                            <SelectItem key={vendor.id} value={vendor.id.toString()}>
                                                {vendor.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={form.errors.vendor_id} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={form.data.notes}
                                onChange={e => form.setData('notes', e.target.value)}
                                placeholder="Additional details..."
                                rows={3}
                            />
                            <InputError message={form.errors.notes} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Button disabled={form.processing}>Update Transaction</Button>
                            <Button asChild variant="secondary">
                                <Link href="/transactions">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
