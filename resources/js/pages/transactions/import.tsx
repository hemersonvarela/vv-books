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
import { CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Download Template</CardTitle>
                            <CardDescription className="text-xs">
                                Use our Excel template to ensure your data is formatted correctly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" size="sm" asChild>
                                <a href="/downloads/Import-Template.xlsx" download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Import-Template.xlsx
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

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

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="text-base">Instructions</CardTitle>
                            <CardDescription>
                                Please follow these rules for each column in your import file.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 text-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="font-semibold text-primary">1. Date</p>
                                        <p className="text-muted-foreground">Required. Format: YYYY-MM-DD or MM/DD/YYYY.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-primary">2. Description</p>
                                        <p className="text-muted-foreground">Required. A brief description of the transaction.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-primary">3. Amount</p>
                                        <p className="text-muted-foreground">Required. Numeric value (e.g., 1234.56). Symbols like $ and commas are automatically removed.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-primary">4. Type</p>
                                        <p className="text-muted-foreground">Required. Must be "income" or "expense" (case-insensitive).</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-primary">5. Project</p>
                                        <p className="text-muted-foreground">Required. Must be a valid 3-character project code.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-primary">6. Project Step</p>
                                        <p className="text-muted-foreground">Required. Must be a valid 3-character project step code.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-primary">7. Transaction Category</p>
                                        <p className="text-muted-foreground">Required. Must be a valid 3-character category code.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-primary">8. Payment Method</p>
                                        <p className="text-muted-foreground">Required. Must match an active payment method name (e.g., Cash, Bank Transfer).</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-primary">9. Reference</p>
                                        <p className="text-muted-foreground">Optional. Any reference number or notes for the transaction.</p>
                                    </div>
                                </div>
                                <div className="mt-4 rounded-md bg-muted p-3 text-xs">
                                    <p className="font-semibold mb-1">Note:</p>
                                    <p>The import process uses the first 8-9 columns in the specified order. Any additional columns will be ignored. If validation fails for any row, the entire import will be rolled back.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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
