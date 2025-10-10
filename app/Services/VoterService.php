<?php

namespace App\Services;
use \App\Models\Voter;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class VoterService
{
    /**
     * Create a new class instance.
     */
    public function create_student(array $data): Voter
    {

        $plainPassword = Str::password(16, true, true, false, false);

        return Voter::create([
            'name' => $data['nama'],
            'identifier' => $data['nis'],
            'kelas' => $data['kelas'],
            'tipe' => 'siswa',
            'status' => 'belum',
            'password' => Hash::make($plainPassword),
            'plain_password' => $plainPassword
        ]);
    }

    public function create_teacher(array $data): Voter
    {

        $plainPassword = Str::password(16, true, true, false, false);

        return Voter::create([
            'name' => $data['nama'],
            'identifier' => $data['nip'],
            'kelas' => '',
            'tipe' => 'guru',
            'status' => 'belum',
            'password' => Hash::make($plainPassword),
            'plain_password' => $plainPassword
        ]);
    }

    
}
