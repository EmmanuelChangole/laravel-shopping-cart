import { Head, router, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import { checkout } from '@/utils/api';
import { formatPrice, handleApiError } from '@/utils/helpers';
import PageHeader from '@/Components/PageHeader';
import { useCart } from '@/hooks/useCart';

export default function CartIndex() {
    const { auth } = usePage().props;
    const user = auth?.user;
    
    const { cartItems, loading, error, updating, removing, handleUpdateQuantity, handleRemoveItem } = useCart();
    const [checkingOut, setCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        try {
            setCheckingOut(true);
            const result = await checkout();
            
            // Handle new API response format (with data wrapper) or legacy format
            const order = result.data?.order || result.order;
            
            // Show success message
            alert(`Order placed successfully! Order ID: ${order.id}\nTotal: $${formatPrice(order.total_amount)}`);
            
            // Redirect to products page with fresh state
            router.visit('/products', {
                preserveState: false,
                preserveScroll: false,
            });
        } catch (err) {
            const errorMessage = handleApiError(err, 'Failed to complete checkout. Please try again.');
            alert(errorMessage);
        } finally {
            setCheckingOut(false);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.product?.price || 0;
            return total + price * item.quantity;
        }, 0);
    };

    return (
        <div className="font-sans bg-gray-50 text-gray-900 min-h-screen">
            <Head title="Shopping Cart - Laravel Shopping Cart" />
            <PageHeader user={user} cartItems={cartItems} cartLink={null} />

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                    <h1 className="text-[28px] font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-sm text-gray-600">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {loading && (
                    <div className="text-center py-12 text-gray-600">
                        <p>Loading cart...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {!loading && !error && cartItems.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                        <div className="text-[64px] mb-4">🛒</div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-sm text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/products" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(99,102,241,0.3)]">
                            Browse Products
                        </Link>
                    </div>
                )}

                {!loading && !error && cartItems.length > 0 && (
                    <>
                        <div className="flex flex-col gap-4">
                            {cartItems.map((item) => {
                                const product = item.product || {};
                                const subtotal = (product.price || 0) * item.quantity;
                                return (
                                    <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm transition-all duration-300 flex flex-col md:flex-row gap-5 hover:shadow-lg">
                                        <div className="w-full md:w-[120px] h-[200px] md:h-[120px] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl"></div>
                                            <span className="text-gray-400 text-xs font-medium z-[1]">No Image</span>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-3">
                                            <div className="text-lg font-semibold text-gray-900">{product.name || 'Unknown Product'}</div>
                                            <div className="text-xl font-bold text-gray-900 flex items-center gap-1">
                                                <span className="text-sm text-indigo-500 font-semibold">$</span>
                                                {formatPrice(product.price || 0)}
                                            </div>
                                            <div className="flex items-center gap-4 mt-auto">
                                                <div className="flex items-center gap-0.5 bg-gray-100 rounded-xl p-0.5">
                                                    <button
                                                        className="w-8 h-8 rounded-lg border-none bg-white flex items-center justify-center text-gray-700 font-semibold transition-all hover:bg-indigo-500 hover:text-white active:scale-95 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-700"
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                        disabled={updating[item.id] || item.quantity <= 1}
                                                    >
                                                        −
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="min-w-[50px] text-center border-none bg-transparent text-sm font-semibold text-gray-900"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="w-8 h-8 rounded-lg border-none bg-white flex items-center justify-center text-gray-700 font-semibold transition-all hover:bg-indigo-500 hover:text-white active:scale-95 disabled:opacity-50"
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        disabled={updating[item.id]}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    className="px-4 py-2 rounded-xl border-none bg-red-50 text-red-500 text-sm font-semibold cursor-pointer transition-all hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    disabled={removing[item.id]}
                                                >
                                                    {removing[item.id] ? 'Removing...' : 'Remove'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-lg font-bold text-gray-900 md:ml-auto min-w-[100px] text-left md:text-right mt-3 md:mt-0">
                                            <span className="text-sm text-indigo-500 font-semibold">$</span>
                                            {formatPrice(subtotal)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-sm text-gray-600 font-medium">Subtotal</span>
                                <span className="text-base font-semibold text-gray-900">
                                    ${formatPrice(calculateTotal())}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-sm text-gray-600 font-medium">Shipping</span>
                                <span className="text-base font-semibold text-gray-900">Free</span>
                            </div>
                            <div className="flex justify-between items-center mt-2 pt-4">
                                <span className="text-2xl font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-gray-900">
                                    ${formatPrice(calculateTotal())}
                                </span>
                            </div>
                            <button 
                                className="w-full py-4 rounded-xl border-none bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-base font-semibold cursor-pointer transition-all mt-6 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(99,102,241,0.3)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                                onClick={handleCheckout}
                                disabled={checkingOut || cartItems.length === 0}
                            >
                                {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
