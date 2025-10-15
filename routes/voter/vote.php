<?php

use App\Http\Controllers\VotingController;
use App\Models\Vote;
use Illuminate\Support\Facades\Route;

Route::resource('voter', VotingController::class);