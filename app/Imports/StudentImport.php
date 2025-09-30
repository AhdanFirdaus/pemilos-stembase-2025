<?php

namespace App\Imports;

use App\Models\Voter;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Str;

class StudentImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Voter([
            'name'     => $row['nama'],
            'identifier'    => $row['identifier'],
            'kelas'    => $row['kelas'],
            'tipe'    => 'siswa',
            'status'    => 'belum',
            'password' => Str::password(16, true, true, false, false),
        ]);
    }
}
