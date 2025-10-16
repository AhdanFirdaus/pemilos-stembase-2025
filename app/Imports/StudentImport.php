<?php

namespace App\Imports;

use App\Models\Voter;
use Illuminate\Support\Facades\Hash;
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
        $plainPassword = Str::password(16, true, true, false, false);
        $hashedPassword = Hash::driver('bcrypt')->setRounds(4)->make($plainPassword);
        return new Voter([
            'name'     => $row['nama'],
            'identifier'    => $row['identifier'],
            'kelas'    => $row['kelas'],
            'tipe'    => 'siswa',
            'status'    => 'belum',
            'password' => $hashedPassword,
            'plain_password' => $plainPassword,
        ]);
    }
}
