<?php

namespace App\Services;
use \App\Models\Voter;
use Illuminate\Support\Str;

class VoterService
{
    /**
     * Create a new class instance.
     */
    public function create_student(array $data): Voter
    {
        return Voter::create([
            'name' => $data['nama'],
            'identifier' => $data['nis'],
            'kelas' => $data['kelas'],
            'tipe' => 'siswa',
            'status' => 'belum',
            'password' => Str::password(16, true, true, false, false),
        ]);
    }

    public function create_teacher(array $data): Voter
    {
        return Voter::create([
            'name' => $data['nama'],
            'identifier' => $data['nip'],
            'kelas' => '',
            'tipe' => 'guru',
            'status' => 'belum',
            'password' => Str::password(16, true, true, false, false),
        ]);
    }

    
}
