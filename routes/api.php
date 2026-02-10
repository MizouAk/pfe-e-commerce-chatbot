<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;

//public routes

// register api route
Route::post('/register', [ApiAuthController::class, 'register']);

//login api route
Route::post('/login', [ApiAuthController::class, 'login']);

//categorie api route search
Route::get('/categories', [CategoryController::class, 'index']);

//categorie api route show
Route::get('/categories/{id}', [CategoryController::class, 'show']);

//product api route search
Route::get('/products', [ProductController::class, 'index']);

//product api route show
Route::get('/products/{id}', [ProductController::class, 'show']);




//route for user
Route::middleware('auth:sanctum')->group(function () {

    // Logout
    Route::post('/logout', [ApiAuthController::class, 'logout']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::put('/cart/update', [CartController::class, 'updateQuantity']);
    Route::delete('/cart/remove/{productId}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);

    // Checkout + Orders 
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);
});



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



    //les routes pour get products et search products
       Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);



    //routes for crud products admin ajouter update et delete
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
     
});

