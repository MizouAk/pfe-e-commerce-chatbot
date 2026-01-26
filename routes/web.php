<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AuthController;

Route::middleware('guest')->group(function () {
    Route::get('/register',[PageController::class ,'register'])->name('register');
    Route::post('/register',[PageController::class,'registerSend'])->name('register.send');

    Route::get('/login',[PageController::class,'login'])->name('login');
    Route::post('/login',[PageController::class,'loginSend'])->name('login.send');
});

Route::get('/home', function () {
    return view('home');
})->middleware('auth')->name('home');

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

