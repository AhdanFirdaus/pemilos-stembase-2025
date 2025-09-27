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
Route::get('/admin/student', function () {
    return inertia('Admin/Student');
});
Route::get('/admin/teacher', function () {
    return inertia('Admin/Teacher');
});
Route::get('/votes', function () {
    return inertia('Votes/Votes');
});