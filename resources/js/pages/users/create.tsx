import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: '/users' },
    { title: 'Create', href: '/users/create' },
];

export default function Create() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e: any) {
        e.preventDefault();
        form.post('/users');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />

            <h1 className="sr-only">Create User</h1>

            <div className="space-y-6 p-4">
                <div className="max-w-lg space-y-6">
                    <Heading
                        variant="small"
                        title="Create user"
                        description="Add a new user by providing their name, email, and password."
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
                                className="mt-1 block w-full"
                                autoComplete="name"
                                placeholder="Full name"
                                aria-invalid={Boolean(form.errors.name)}
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={form.errors.name}
                            />
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
                                className="mt-1 block w-full"
                                autoComplete="username"
                                placeholder="Email address"
                                aria-invalid={Boolean(form.errors.email)}
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={form.errors.email}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={form.data.password}
                                onChange={e =>
                                    form.setData('password', e.target.value)
                                }
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Password"
                                aria-invalid={Boolean(form.errors.password)}
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={form.errors.password}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={form.data.password_confirmation}
                                onChange={e =>
                                    form.setData(
                                        'password_confirmation',
                                        e.target.value
                                    )
                                }
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Button disabled={form.processing}>Create</Button>

                            <Button asChild variant="secondary">
                                <Link href="/users">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
