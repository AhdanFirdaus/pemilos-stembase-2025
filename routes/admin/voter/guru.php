<?php

use App\Http\Controllers\VoterTeacherController;
use Illuminate\Support\Facades\Route;
use App\Models\Voter;

Route::resource('guru', VoterTeacherController::class);
Route::delete('/guruall', [VoterTeacherController::class, 'destroy_all']);
Route::get('/guruexport', [VoterTeacherController::class, 'export_teacher'])->name('guruexport');
Route::post('/guruimport',[VoterTeacherController::class,'import_teacher']);