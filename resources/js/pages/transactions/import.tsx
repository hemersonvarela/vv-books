import transactions from '@/routes/transactions';
import { Head, useForm, usePage } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transactions', href: '#' },
    { title: 'Import', href: transactions.import.index().url },
];

export default function Import() {
    const form = useForm({
        file: null as File | null,
    });

    const { flash } = usePage().props as any;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(transactions.import.store().url, {
            forceFormData: true,
            onSuccess: () => form.reset(),
        });
    };

    const importErrors = (flash?.import_errors || []) as any[];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Import Transactions" />

            <div className="space-y-6 p-4">
                <div className="max-w-xl space-y-6">
                    <Heading
                        variant="small"
                        title="Import Transactions"
                        description="Upload an Excel (.xlsx, .xls) or CSV file to import transactions."
                    />

                    {form.wasSuccessful && (
                        <Alert className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                Transactions have been imported successfully.
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="file">Transaction File</Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={(e) => form.setData('file', e.target.files ? e.target.files[0] : null)}
                                accept=".xlsx,.xls,.csv"
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Max file size: 10MB. Accepted formats: .xlsx, .xls, .csv.
                            </p>
                            <InputError message={form.errors.file} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Button disabled={form.processing}>
                                {form.processing ? 'Importing...' : 'Upload & Import'}
                            </Button>
                        </div>
                    </form>

                    {importErrors && importErrors.length > 0 && (
                        <div className="space-y-4 mt-8">
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Import Failures</AlertTitle>
                                <AlertDescription>
                                    Some rows could not be imported due to validation errors. The entire import has been rolled back.
                                </AlertDescription>
                            </Alert>

                            <div className="overflow-hidden rounded-md border border-red-200 bg-red-50">
                                <table className="min-w-full divide-y divide-red-200">
                                    <thead className="bg-red-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-semibold text-red-900">Row</th>
                                            <th className="px-4 py-2 text-left text-xs font-semibold text-red-900">Column</th>
                                            <th className="px-4 py-2 text-left text-xs font-semibold text-red-900">Error</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-red-200">
                                        {importErrors.map((error, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 text-xs text-red-800">{error.row}</td>
                                                <td className="px-4 py-2 text-xs font-medium text-red-800">{error.attribute}</td>
                                                <td className="px-4 py-2 text-xs text-red-800">
                                                    {Array.isArray(error.errors) ? error.errors.join(', ') : error.errors}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
