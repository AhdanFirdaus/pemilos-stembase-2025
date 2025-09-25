<?php

use App\Http\Controllers\VoterStudentController;
use Illuminate\Support\Facades\Route;
use App\Models\Voter;

Route::resource('siswa', VoterStudentController::class);
// Route::post('student_voter/import/',[VoterController::class,'import_student']);
// Route::get('student_voter/export/', [VoterController::class, 'export_student']);