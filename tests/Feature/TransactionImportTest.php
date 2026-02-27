<?php

namespace Tests\Feature;

use App\Models\PaymentMethod;
use App\Models\Project;
use App\Models\ProjectStep;
use App\Models\TransactionCategory;
use App\Models\User;
use Illuminate\Http\UploadedFile;

test('import page is accessible for authenticated users', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('transactions.import.index'));

    $response->assertStatus(200);
});

test('it rejects file with wrong column count', function () {
    $user = User::factory()->create();

    // Create a CSV with 7 columns instead of 8
    $content = "Date,Description,Amount,Project,Project Step,Transaction Category,Payment Method\n";
    $content .= "2026-02-26,Test,100,PRJ,STP,CAT,Cash\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertSessionHasErrors(['file' => 'The file must contain exactly 8 columns.']);
});

test('it rejects file with wrong extension', function () {
    $user = User::factory()->create();
    $file = UploadedFile::fake()->create('transactions.txt', 100);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertSessionHasErrors(['file']);
});

test('it validates row data during import', function () {
    $user = User::factory()->create();

    // Setup required data with specific codes
    Project::factory()->create(['code' => 'ABC']);
    ProjectStep::factory()->create(['code' => 'S01']);
    TransactionCategory::factory()->create(['code' => 'C01']);
    PaymentMethod::factory()->create(['name' => 'Cash']);

    // CSV with invalid project code (XYZ)
    $content = "date,description,amount,project,project_step,transaction_category,payment_method,reference\n";
    $content .= "2026-02-26,Test,100,XYZ,S01,C01,Cash,REF001\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertSessionHas('import_errors');
    $errors = session('import_errors');
    expect($errors[0]['errors'])->toContain("Project code 'XYZ' not found.");
});

test('it successfully imports valid transactions', function () {
    $user = User::factory()->create();

    // Setup required data
    Project::factory()->create(['code' => 'ABC']);
    ProjectStep::factory()->create(['code' => 'S01']);
    TransactionCategory::factory()->create(['code' => 'C01']);
    PaymentMethod::factory()->create(['name' => 'Cash']);

    $content = "date,description,amount,project,project_step,transaction_category,payment_method,reference\n";
    $content .= "2026-02-26,Test Transaction,123.45,ABC,S01,C01,Cash,REF123\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertRedirect(route('projects.index'));
    $this->assertDatabaseHas('transactions', [
        'description' => 'Test Transaction',
        'amount' => 123.45,
        'reference' => 'REF123',
    ]);
});
