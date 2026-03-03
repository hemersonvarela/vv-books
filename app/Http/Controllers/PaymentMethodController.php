<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentMethodRequest;
use App\Http\Requests\UpdatePaymentMethodRequest;
use App\Models\PaymentMethod;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class PaymentMethodController extends Controller
{
    public function index(): InertiaResponse
    {
        $paymentMethods = PaymentMethod::query()->paginate(10);

        return Inertia::render('payment-methods/index', [
            'paymentMethods' => $paymentMethods,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('payment-methods/create');
    }

    public function store(StorePaymentMethodRequest $request): RedirectResponse
    {
        PaymentMethod::create($request->validated());

        return redirect()->route('payment-methods.index');
    }

    public function edit(PaymentMethod $paymentMethod): InertiaResponse
    {
        return Inertia::render('payment-methods/edit', [
            'paymentMethod' => $paymentMethod,
        ]);
    }

    public function update(UpdatePaymentMethodRequest $request, PaymentMethod $paymentMethod): RedirectResponse
    {
        $paymentMethod->update($request->validated());

        return redirect()->route('payment-methods.index');
    }

    public function destroy(PaymentMethod $paymentMethod): RedirectResponse
    {
        $paymentMethod->delete();

        return redirect()->route('payment-methods.index');
    }
}
