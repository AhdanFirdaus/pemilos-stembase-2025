<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::resource('login', LoginController::class);
Route::get('admin/login',[LoginController::class,'get_admin'])->name('loginadminindex');
Route::post('admin/login',[LoginController::class,'admin']);
Route::post('admin/logout',[LoginController::class,'logout_admin']);