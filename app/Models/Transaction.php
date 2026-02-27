<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'project_id',
        'project_step_id',
        'partner_id',
        'contractor_id',
        'vendor_id',
        'category_id',
        'payment_method_id',
        'code',
        'date',
        'amount',
        'type',
        'description',
        'reference',
        'verified_at',
    ];

    protected $casts = [
        'date' => 'date',
        'verified_at' => 'date',
        'amount' => 'decimal:2',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function step()
    {
        return $this->belongsTo(ProjectStep::class, 'project_step_id');
    }

    public function category()
    {
        return $this->belongsTo(TransactionCategory::class, 'category_id');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }

    public function contractor()
    {
        return $this->belongsTo(Contractor::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function attachments()
    {
        return $this->hasMany(TransactionAttachment::class);
    }
}
