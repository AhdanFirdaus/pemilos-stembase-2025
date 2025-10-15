<?php

use App\Http\Middleware\PreventMultipleVotes;
use Illuminate\Support\Facades\Route;


Route::prefix('/admin')
->name('admin')
->group(function () {
    require_once __DIR__ . '/admin/paslon.php';
        require_once __DIR__ . '/admin/dashboard.php';
        require_once __DIR__ . '/admin/voter/siswa.php';
        require_once __DIR__ . '/admin/voter/guru.php';
    });
Route::middleware([PreventMultipleVotes::class])->group(function () {
    Route::prefix('/')
        ->name('voter')
        ->group(function () {
            require_once __DIR__ . '/voter/vote.php';
        });
    Route::get('/', function () {
        return inertia('Home');
    });
});

Route::prefix('/auth')
    ->name('auth')
    ->group(function () {
        require_once __DIR__ . '/auth/auth.php';
    });
