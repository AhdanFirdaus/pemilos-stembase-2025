<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});
Route::get('/login', function () {
    return inertia('Auth/Login');
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
Route::get('/votes', function () {
    return inertia('Votes/Votes');
});

