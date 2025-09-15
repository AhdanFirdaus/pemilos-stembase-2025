<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});
Route::get('/admin/dashboard', function () {
    return inertia('Admin/Dashboard');
});
Route::get('/admin/paslon', function () {
    return inertia('Admin/Paslon');
});
Route::get('/admin/user', function () {
    return inertia('Admin/User');
});
