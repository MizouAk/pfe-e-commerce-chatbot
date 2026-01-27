<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\CategoryController;

// register api route
Route::post('/register', [ApiAuthController::class, 'register']);
//login api route
Route::post('/login', [ApiAuthController::class, 'login']);
// logout api route
Route::middleware('auth:sanctum')->post('/logout', [ApiAuthController::class, 'logout']);
//categorie api route
Route::get('/categories', [CategoryController::class, 'index']);
//routes for admin
Route::prefix('admin')->middleware(['auth:sanctum', 'is_admin'])->group(function () {
    //for test
    Route::get('/test', function () {
        return response()->json(['message' => 'OK ADMIN']);
    });
    //routes for crud admin ajouter update et delete
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
});

