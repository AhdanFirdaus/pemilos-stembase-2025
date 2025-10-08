<?php

use App\Http\Controllers\VoterStudentController;
use Illuminate\Support\Facades\Route;
use App\Models\Voter;

Route::resource('siswa', VoterStudentController::class);
Route::delete('siswaall',[VoterStudentController::class,'destroy_all']);
Route::get('siswaexport', [VoterStudentController::class, 'export_student']);
Route::post('siswaimport',[VoterStudentController::class,'import_student']);