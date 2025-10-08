<?php

use App\Http\Controllers\VoteController;
use App\Models\Vote;
use Illuminate\Support\Facades\Route;

Route::resource('dashboard', VoteController::class);