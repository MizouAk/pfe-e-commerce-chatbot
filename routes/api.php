<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;



// register api route
Route::post('/register', [ApiAuthController::class, 'register']);
//login api route
Route::post('/login', [ApiAuthController::class, 'login']);
// logout api route
Route::middleware('auth:sanctum')->post('/logout', [ApiAuthController::class, 'logout']);
//categorie api route search
Route::get('/categories', [CategoryController::class, 'index']);
//categorie api route show
Route::get('/categories/{id}', [CategoryController::class, 'show']);
//product api route search
Route::get('/products', [ProductController::class, 'index']);
//product api route show
Route::get('/products/{id}', [ProductController::class, 'show']);


//routes for admin
Route::prefix('admin')->middleware(['auth:sanctum', 'is_admin'])->group(function () {
    //for test
    Route::get('/test', function () {
        return response()->json(['message' => 'OK ADMIN']);
    });
    //routes for crud categories admin ajouter update et delete
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    //routes for crud products admin ajouter update et delete
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
     
});

