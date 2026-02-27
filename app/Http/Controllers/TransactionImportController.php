<?php

namespace App\Http\Controllers;

use App\Imports\TransactionsImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Validators\ValidationException;

class TransactionImportController extends Controller
{
    public function index()
    {
        return Inertia::render('transactions/import');
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:xlsx,xls,csv', 'max:10240'], // 10MB limit
        ]);

        $file = $request->file('file');

        // Column Count Validation (Exactly 8 columns)
        try {
            $data = Excel::toArray([], $file);
            if (empty($data) || count($data[0][0]) !== 8) {
                return back()->withErrors(['file' => 'The file must contain exactly 8 columns.']);
            }
        } catch (\Exception $e) {
            return back()->withErrors(['file' => 'Unable to read the file. Please ensure it is a valid Excel or CSV file.']);
        }

        DB::beginTransaction();
        try {
            Excel::import(new TransactionsImport, $file);
            DB::commit();

            return redirect()->route('projects.index')->with('success', 'Transactions imported successfully.');
        } catch (ValidationException $e) {
            DB::rollBack();
            $failures = $e->failures();
            $errors = [];

            foreach ($failures as $failure) {
                $errors[] = [
                    'row' => $failure->row(),
                    'attribute' => $failure->attribute(),
                    'errors' => implode(', ', $failure->errors()),
                ];
            }

            return back()->with(['import_errors' => $errors]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Import error: '.$e->getMessage());

            return back()->withErrors(['file' => 'An error occurred during import: '.$e->getMessage()]);
        }
    }
}
