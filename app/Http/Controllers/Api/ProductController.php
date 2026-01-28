<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // pour search 
        $q = Product::with('category');

        if ($request->filled('search')) {
            $search = $request->query('search');
            $q->where('name', 'like', "%{$search}%");
        }

        if ($request->filled('category_id')) {
            $q->where('category_id', $request->query('category_id'));
        }

        if ($request->filled('min_price')) {
            $q->where('price', '>=', $request->query('min_price'));
        }

        if ($request->filled('max_price')) {
            $q->where('price', '<=', $request->query('max_price'));
        }

        if ($request->query('in_stock') == 1) {
            $q->where('stock', '>', 0);
        }

        $perPage = (int) ($request->query('per_page', 10));
        $products = $q->orderBy('id', 'desc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
         $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|min:2|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string|max:255',
        ]);

        $product = Product::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Product created',
            'data' => $product->load('category')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
         $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $data = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'name' => 'sometimes|string|min:2|max:255',
            'description' => 'sometimes|nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'image' => 'sometimes|nullable|string|max:255',
        ]);

        $product->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Product updated',
            'data' => $product->load('category')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
         $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted'
        ]);
    }
}

