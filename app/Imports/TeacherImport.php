<?php

namespace App\Imports;

use App\Models\Voter;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TeacherImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        $plainPassword = Str::password(6, true, false, false, false);
        $hashedPassword = Hash::driver('bcrypt')->setRounds(4)->make($plainPassword);
        $fake_id = Str::password(6, false, true, false, false);
        // dd($plainPassword);
        return new Voter([
            'name'     => $row['nama'],
            'identifier'  => $fake_id,
            'kelas'    => '',
            'tipe'    => 'guru',
            'status'    => 'belum',
            'password' => $hashedPassword,
            'plain_password' => $plainPassword
        ]);
    }
}
