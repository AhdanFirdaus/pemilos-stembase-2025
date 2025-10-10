<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::resource('login', LoginController::class);