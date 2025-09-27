<?php

use App\Http\Controllers\VoterTeacherController;
use Illuminate\Support\Facades\Route;
use App\Models\Voter;

Route::resource('guru', VoterTeacherController::class);
// Route::post('student_voter/import/',[VoterController::class,'import_student']);
// Route::get('student_voter/export/', [VoterController::class, 'export_student']);