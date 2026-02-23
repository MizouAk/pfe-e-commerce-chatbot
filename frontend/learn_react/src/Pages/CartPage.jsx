import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContex";
import { useState } from "react";
import "./CartPage.css";

function CartPage() {
    const { cart, removeFromCart, updateQty, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

    const [showCheckout, setShowCheckout] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const openCheckout = () => {
        setError("");
        setShowCheckout(true);
    };

    const closeCheckout = () => {
        setShowCheckout(false);
    };

    const handleConfirm = (e) => {
        e.preventDefault();

        if (!email.trim() || !phone.trim()) {
            setError("Email و Numero ضروريين.");
            return;
        }

        // ✅ دابا غير مثال (حتى تربطها بالباك)
        console.log("ORDER:", { email, phone, cart, total });
        alert("✅ تم تأكيد الطلب!");

        // تقدر تفرغ panier هنا إلا بغيتي (خاصك clearCart فـ context)
        setShowCheckout(false);
        setEmail("");
        setPhone("");
        clearCart();
    };

    if (!cart || cart.length === 0) {
        return (
            <div className="cart-page">
                <h1 className="cart-title">Mon Panier</h1>
                <p className="cart-empty">Votre panier est vide.</p>
                <Link to="/shop" className="cart-back"> Continuer les achats</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-empty-box">
                <h1 className="cart-title">Mon Panier</h1>
                <Link to="/shop" className="cart-back"> Continuer les achats</Link>
            </div>
            <div className="cart-table">
                <div className="cart-row cart-th">
                    <div>REMOVE</div>
                    <div>IMAGE</div>
                    <div>PRODUCT</div>
                    <div>PRICE</div>
                    <div>QUANTITY</div>
                    <div>SUBTOTAL</div>
                </div>

                {cart.map((item) => {
                    const price = Number(item.product.price || 0);
                    const subtotal = price * item.qty;

                    return (
                        <div className="cart-row cart-tr" key={item.id}>
                            <div>
                                <button
                                    className="cart-remove"
                                    onClick={() => removeFromCart(item.id)}
                                    title="Remove"
                                >
                                    🗑
                                </button>
                            </div>

                            <div>
                                <img className="cart-img" src={item.product.image_url} alt={item.product.name} />
                            </div>

                            <div className="cart-name">{item.product.name}</div>

                            <div className="cart-price">{price} DH</div>

                            <div>
                                <input
                                    className="cart-qty"
                                    type="number"
                                    min="1"
                                    max={item.product.stock}
                                    value={item.qty}
                                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                                />
                            </div>

                            <div className="cart-subtotal">{subtotal} DH</div>
                        </div>
                    );
                })}
            </div>

            <div className="cart-total">
                <span>Total</span>
                <span>{total} DH</span>
            </div>


            <div className="cart-actions">
                <button className="cart-checkout-btn" onClick={openCheckout}>
                    Confirmer la commande
                </button>
            </div>

            {showCheckout && (
                <div className="checkout-overlay" onClick={closeCheckout}>
                    <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="checkout-title">Confirmation de commande</h2>

                        <form onSubmit={handleConfirm} className="checkout-form">
                            <label className="checkout-label">
                                Email *
                                <input
                                    className="checkout-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ex: ayoub@email.com"
                                    required
                                />
                            </label>

                            <label className="checkout-label">
                                Numéro (Téléphone) *
                                <input
                                    className="checkout-input"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="ex: 06xxxxxxxx"
                                    required
                                />
                            </label>

                            {error && <p className="checkout-error">{error}</p>}

                            <div className="checkout-buttons">
                                <button type="button" className="checkout-cancel" onClick={closeCheckout}>
                                    Annuler
                                </button>
                                <button type="submit" className="checkout-confirm">
                                    Confirmer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;