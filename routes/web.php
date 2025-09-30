<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});
Route::get('/login', function () {
    return inertia('Auth/Login');
});

Route::prefix('/admin')
    ->name('admin')
    ->group(function () {
        require_once __DIR__ . '/admin/paslon.php';
        require_once __DIR__ . '/admin/dashboard.php';
        require_once __DIR__ . '/admin/voter/siswa.php';
        require_once __DIR__ . '/admin/voter/guru.php';
    });

Route::prefix('/voter')
    ->name('voter')
    ->group(function () {
        require_once __DIR__ . '/voter/vote.php';
    });
