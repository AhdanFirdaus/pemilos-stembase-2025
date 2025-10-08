<?php

namespace App\Exports;

use App\Models\Voter;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TeachertExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * Get the data to export.
     */
    public function collection()
    {
        return Voter::where('tipe', 'guru')->get();
    }

    /**
     * Map each row into the desired format.
     */
    public function map($voter): array
    {
        return [
            $voter->id,
            $voter->name,
            $voter->identifier, // this is your NIP column
            $voter->status,
            $voter->created_at->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Add custom headings.
     */
    public function headings(): array
    {
        return [
            'ID',
            'Nama',
            'NIP',
            'Status',
            'Dibuat Pada',
        ];
    }
}
