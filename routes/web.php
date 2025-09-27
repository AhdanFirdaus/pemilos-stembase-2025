<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});
Route::get('/login', function () {
    return inertia('Auth/Login');
});

Route::get('/votes', function () {
    return inertia('Votes/Votes');
});

Route::prefix('/admin')
    ->name('admin')
    ->group(function () {
        require_once __DIR__ . '/admin/paslon.php';
        require_once __DIR__ . '/admin/dashboard.php';
        require_once __DIR__ . '/admin/voter/siswa.php';
        require_once __DIR__ . '/admin/voter/guru.php';
    });
