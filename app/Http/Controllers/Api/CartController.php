<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseException;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;

class CartController extends Controller
{
    private function success($data = null, string $message = null, int $status = 200)
    {
        $payload = ['success' => true];
        if ($message !== null) $payload['message'] = $message;
        if ($data !== null) $payload['data'] = $data;

        return response()->json($payload, $status);
    }

    private function fail(string $message, int $status = 422, array $errors = [])
    {
        $payload = ['success' => false, 'message' => $message];
        if (!empty($errors)) $payload['errors'] = $errors;

        return response()->json($payload, $status);
    }

    // إذا بغيتي توقف flow داخل أي مكان (حتى داخل transaction)
    private function throwFail(string $message, int $status = 422, array $errors = []): void
    {
        throw new HttpResponseException($this->fail($message, $status, $errors));
    }

    private function userCart(): Cart
    {
        $userId = auth()->id();
        if (!$userId) {
            $this->throwFail('Unauthenticated', 401);
        }

        return Cart::firstOrCreate(['user_id' => $userId]);
    }

    private function cartResponse(Cart $cart)
    {
        $cart->load(['items.product.category']);

        $totalCents = 0;

        $items = $cart->items->map(function ($item) use (&$totalCents) {
            $priceCents = (int) round(((float) $item->product->price) * 100);
            $subCents   = $priceCents * (int) $item->quantity;
            $totalCents += $subCents;

            return [
                'id'         => $item->id,
                'product_id' => $item->product_id,
                'quantity'   => (int) $item->quantity,
                'product'    => $item->product,
                'unit_price' => number_format($priceCents / 100, 2, '.', ''),
                'subtotal'   => number_format($subCents / 100, 2, '.', ''),
            ];
        });

        return $this->success([
            'items' => $items,
            'total' => number_format($totalCents / 100, 2, '.', ''),
        ]);
    }

    // GET /api/cart
    public function index()
    {
        $cart = $this->userCart();
        return $this->cartResponse($cart);
    }

    // POST /api/cart/add  {product_id, quantity}
    public function add(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity'   => 'sometimes|integer|min:1|max:100',
        ]);

        $qty = (int) ($data['quantity'] ?? 1);

        // تأكد product موجود
        Product::findOrFail($data['product_id']);

        $cart = $this->userCart();

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $data['product_id'])
            ->first();

        if ($item) {
            $item->quantity = (int) $item->quantity + $qty;
            $item->save();
        } else {
            CartItem::create([
                'cart_id'    => $cart->id,
                'product_id' => $data['product_id'],
                'quantity'   => $qty,
            ]);
        }

        return $this->cartResponse($cart);
    }

    // PUT /api/cart/update  {product_id, quantity}
    public function updateQuantity(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity'   => 'required|integer|min:1|max:100',
        ]);

        $cart = $this->userCart();

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $data['product_id'])
            ->first();

        if (!$item) {
            return $this->fail('Item not found in cart', 404);
        }

        $item->quantity = (int) $data['quantity'];
        $item->save();

        return $this->cartResponse($cart);
    }

    // DELETE /api/cart/remove/{productId}
    public function remove($productId)
    {
        $cart = $this->userCart();

        CartItem::where('cart_id', $cart->id)
            ->where('product_id', $productId)
            ->delete();

        return $this->cartResponse($cart);
    }

    // DELETE /api/cart/clear
    public function clear()
    {
        $cart = $this->userCart();
        CartItem::where('cart_id', $cart->id)->delete();

        return $this->cartResponse($cart);
    }
}
