<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained();
            $table->foreignId('project_step_id')->constrained('project_steps');
            $table->foreignId('partner_id')->nullable()->constrained();
            $table->foreignId('contractor_id')->nullable()->constrained();
            $table->foreignId('vendor_id')->nullable()->constrained();
            $table->foreignId('category_id')->constrained('transaction_categories');
            $table->foreignId('payment_method_id')->constrained();
            $table->string('code',10)->unique();
            $table->date('date');
            $table->decimal('amount', 12, 2);
            $table->enum('type', ['income', 'expense']);
            $table->text('description')->nullable();
            $table->string('reference')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('date');
            $table->index('project_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
