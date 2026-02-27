<?php

namespace Tests\Feature;

use App\Models\PaymentMethod;
use App\Models\Project;
use App\Models\ProjectStep;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\User;
use Illuminate\Http\UploadedFile;

test('import page is accessible for authenticated users', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('transactions.import.index'));

    $response->assertStatus(200);
});

test('it accepts file with more than 8 columns', function () {
    $user = User::factory()->create();

    // Setup required data
    Project::factory()->create(['code' => 'ABC']);
    ProjectStep::factory()->create(['code' => 'S01']);
    TransactionCategory::factory()->create(['code' => 'C01']);
    PaymentMethod::factory()->create(['name' => 'Cash']);

    // Create a CSV with 10 columns (1 extra)
    $content = "date,description,amount,type,project,project_step,transaction_category,payment_method,reference,extra_column\n";
    $content .= "2026-02-26,Test Transaction,123.45,income,ABC,S01,C01,Cash,REF123,Extra Value\n";

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

    // CSV with invalid payment method (BitCoin)
    $content = "date,description,amount,type,project,project_step,transaction_category,payment_method,reference\n";
    $content .= "2026-02-26,Test,100,expense,ABC,S01,C01,BitCoin,REF001\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertSessionHas('import_errors');
    $errors = session('import_errors');
    expect($errors[0]['errors'])->toContain('The selected payment_method is invalid.');
});

test('it successfully imports valid transactions', function () {
    $user = User::factory()->create();

    // Setup required data
    Project::factory()->create(['code' => 'ABC']);
    ProjectStep::factory()->create(['code' => 'S01']);
    TransactionCategory::factory()->create(['code' => 'C01']);
    PaymentMethod::factory()->create(['name' => 'Cash']);

    $content = "date,description,amount,type,project,project_step,transaction_category,payment_method,reference\n";
    $content .= "2026-02-26,Test Transaction,123.45,INCOME,ABC,S01,C01,Cash,REF123\n";
    $content .= "2026-02-26,Test Transaction 2,50.00,expense,ABC,S01,C01,Cash,REF456\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertRedirect(route('projects.index'));
    $response->assertSessionHas('success');
    $this->assertDatabaseHas('transactions', [
        'description' => 'Test Transaction',
        'type' => 'income',
    ]);
    $this->assertDatabaseHas('transactions', [
        'description' => 'Test Transaction 2',
        'type' => 'expense',
    ]);
});

test('it successfully imports transactions with mixed case types', function () {
    $user = User::factory()->create();

    // Setup required data
    Project::factory()->create(['code' => 'ABC']);
    ProjectStep::factory()->create(['code' => 'S01']);
    TransactionCategory::factory()->create(['code' => 'C01']);
    PaymentMethod::factory()->create(['name' => 'Cash']);

    $content = "date,description,amount,type,project,project_step,transaction_category,payment_method,reference\n";
    $content .= "2026-02-26,Mixed Case,100,Income,ABC,S01,C01,Cash,REF1\n";
    $content .= "2026-02-26,Upper Case,200,EXPENSE,ABC,S01,C01,Cash,REF2\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertRedirect(route('projects.index'));
    $this->assertDatabaseHas('transactions', [
        'description' => 'Mixed Case',
        'type' => 'income',
    ]);
    $this->assertDatabaseHas('transactions', [
        'description' => 'Upper Case',
        'type' => 'expense',
    ]);
});

test('it rejects invalid type during import', function () {
    $user = User::factory()->create();

    Project::factory()->create(['code' => 'ABC']);
    ProjectStep::factory()->create(['code' => 'S01']);
    TransactionCategory::factory()->create(['code' => 'C01']);
    PaymentMethod::factory()->create(['name' => 'Cash']);

    $content = "date,description,amount,type,project,project_step,transaction_category,payment_method,reference\n";
    $content .= "2026-02-26,Test,100,invalid,ABC,S01,C01,Cash,\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertSessionHas('import_errors');
    $errors = session('import_errors');
    expect($errors[0]['errors'])->toContain('The selected type is invalid.');
});

test('it generates consecutive codes during import', function () {
    $user = User::factory()->create();

    Project::factory()->create(['code' => 'ABC']);
    ProjectStep::factory()->create(['code' => 'S01']);
    TransactionCategory::factory()->create(['code' => 'C01']);
    PaymentMethod::factory()->create(['name' => 'Cash']);

    $content = "date,description,amount,type,project,project_step,transaction_category,payment_method,reference\n";
    $content .= "2026-02-26,T1,100,income,ABC,S01,C01,Cash,\n";
    $content .= "2026-02-26,T2,200,expense,ABC,S01,C01,Cash,\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $this->actingAs($user)->post(route('transactions.import.store'), ['file' => $file]);

    $this->assertDatabaseHas('transactions', ['description' => 'T1', 'code' => 'ABC-S01-1']);
    $this->assertDatabaseHas('transactions', ['description' => 'T2', 'code' => 'ABC-S01-2']);
});

test('it rejects duplicate rows in the same file', function () {
    $user = User::factory()->create();

    Project::factory()->create(['code' => 'ABC']);
    ProjectStep::factory()->create(['code' => 'S01']);
    TransactionCategory::factory()->create(['code' => 'C01']);
    PaymentMethod::factory()->create(['name' => 'Cash']);

    $content = "date,description,amount,type,project,project_step,transaction_category,payment_method,reference\n";
    $content .= "2026-02-26,Duplicate,100,income,ABC,S01,C01,Cash,\n";
    $content .= "2026-02-26,Duplicate,100,income,ABC,S01,C01,Cash,\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertSessionHas('import_errors');
    $errors = session('import_errors');

    // Row 2 is index 0 (header is 1), Row 3 is index 1
    // Maatwebsite Excel row numbers: Header is 1, first data row is 2.
    // Row 3 should be the duplicate.
    $duplicateError = collect($errors)->firstWhere('row', 3);
    expect($duplicateError['errors'])->toContain('Duplicate row detected.');

    // Verify nothing was imported
    $this->assertDatabaseMissing('transactions', ['description' => 'Duplicate']);

    // Check that success message is NOT in flash
    $response->assertSessionMissing('success');
});

test('it rejects rows that already exist in the database', function () {
    $user = User::factory()->create();

    $project = Project::factory()->create(['code' => 'ABC']);
    $step = ProjectStep::factory()->create(['code' => 'S01']);
    $category = TransactionCategory::factory()->create(['code' => 'C01']);
    $paymentMethod = PaymentMethod::factory()->create(['name' => 'Cash']);

    // Create a transaction in the database
    Transaction::create([
        'date' => '2026-02-26',
        'description' => 'Existing',
        'amount' => 100.00,
        'type' => 'income',
        'project_id' => $project->id,
        'project_step_id' => $step->id,
        'category_id' => $category->id,
        'payment_method_id' => $paymentMethod->id,
        'reference' => 'REF-EXISTING',
        'code' => 'ABC-S01-1',
    ]);

    // Try to import the same transaction
    $content = "date,description,amount,type,project,project_step,transaction_category,payment_method,reference\n";
    $content .= "2026-02-26,Existing,100,income,ABC,S01,C01,Cash,REF-EXISTING\n";

    $file = UploadedFile::fake()->createWithContent('transactions.csv', $content);

    $response = $this->actingAs($user)->post(route('transactions.import.store'), [
        'file' => $file,
    ]);

    $response->assertSessionHas('import_errors');
    $errors = session('import_errors');

    $dbError = collect($errors)->firstWhere('row', 2);
    expect($dbError['errors'])->toContain('This transaction already exists in the database.');

    // Verify no new transactions were created
    expect(Transaction::count())->toBe(1);
});
