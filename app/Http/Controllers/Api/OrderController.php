<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Exceptions\HttpResponseException;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;

class OrderController extends Controller
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

    // هادي هي اللي بدلات abort() — كتخلي response ديال error موحّد حتى داخل transaction
    private function throwFail(string $message, int $status = 422, array $errors = []): void
    {
        throw new HttpResponseException($this->fail($message, $status, $errors));
    }

    // GET /api/orders
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);

        $orders = Order::where('user_id', auth()->id())
            ->with(['items.product'])
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        return $this->success($orders);
    }

    // GET /api/orders/{id}
    public function show($id)
    {
        $order = Order::where('id', $id)
            ->where('user_id', auth()->id())
            ->with(['items.product'])
            ->first();

        if (!$order) {
            return $this->fail('Order not found', 404);
        }

        return $this->success($order);
    }

    // POST /api/checkout  {address, phone}
    public function checkout(Request $request)
    {
        $data = $request->validate([
            'address' => 'required|string|min:5|max:255',
            'phone'   => 'required|string|min:6|max:30',
        ]);

        $userId = auth()->id();

        $cart = Cart::where('user_id', $userId)->first();
        if (!$cart) {
            return $this->fail('Cart is empty', 422);
        }

        // كلشي كيدوز فـ transaction
        $order = DB::transaction(function () use ($cart, $data, $userId) {

            // ✅ نجيب items داخل transaction وندير lock عليهم باش ما يتبدلوش فالنص
            $items = CartItem::where('cart_id', $cart->id)
                ->with(['product'])
                ->lockForUpdate()
                ->get();

            if ($items->count() === 0) {
                $this->throwFail('Cart is empty', 422);
            }

            $productIds = $items->pluck('product_id')->unique()->values();

            // ✅ lock المنتجات باش ما يتباعوش ف نفس الوقت
            $products = Product::whereIn('id', $productIds)
                ->lockForUpdate()
                ->get()
                ->keyBy('id');

            $totalCents = 0;

            // check stock + حساب total
            foreach ($items as $item) {
                $p = $products->get($item->product_id);

                if (!$p) {
                    $this->throwFail('Product not found', 422);
                }

                $qty = (int) $item->quantity;

                if ((int) $p->stock < $qty) {
                    $this->throwFail(
                        "Not enough stock for: {$p->name}",
                        422,
                        ['product_id' => $p->id, 'available' => (int) $p->stock, 'requested' => $qty]
                    );
                }

                $priceCents = (int) round(((float) $p->price) * 100);
                $totalCents += $priceCents * $qty;
            }

            // create order
            $order = Order::create([
                'user_id'  => $userId,
                'total'    => number_format($totalCents / 100, 2, '.', ''),
                'status'   => 'pending',
                'address'  => $data['address'],
                'phone'    => $data['phone'],
            ]);

            // create order items + decrement stock
            foreach ($items as $item) {
                $p   = $products->get($item->product_id);
                $qty = (int) $item->quantity;

                $priceStr = number_format((float) $p->price, 2, '.', '');

                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $p->id,
                    'quantity'   => $qty,
                    'price'      => $priceStr, // snapshot
                ]);

                Product::where('id', $p->id)->decrement('stock', $qty);
            }

            // clear cart
            CartItem::where('cart_id', $cart->id)->delete();

            return $order->load(['items.product']);
        });

        return $this->success($order, 'Order created', 201);
    }

    // POST /api/orders/{id}/cancel
    public function cancel($id)
    {
        $userId = auth()->id();

        $order = DB::transaction(function () use ($id, $userId) {

            // ✅ نجيب order داخل transaction و lock عليه باش ما يتcancelash جوج مرات
            $order = Order::where('id', $id)
                ->where('user_id', $userId)
                ->lockForUpdate()
                ->with(['items'])
                ->first();

            if (!$order) {
                $this->throwFail('Order not found', 404);
            }

            if ($order->status !== 'pending') {
                $this->throwFail('Only pending orders can be cancelled', 422);
            }

            // رجّع stock
            foreach ($order->items as $item) {
                Product::where('id', $item->product_id)
                    ->increment('stock', (int) $item->quantity);
            }

            $order->status = 'cancelled';
            $order->save();

            return $order->load(['items.product']);
        });

        return $this->success($order, 'Order cancelled');
    }
}
