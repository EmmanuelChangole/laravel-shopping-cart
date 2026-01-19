import { Link } from "@inertiajs/react";
import { formatPrice } from "@/utils/helpers";

export default function ProductCard({
    product,
    wishlist,
    toggleWishlist,
    addingToCart,
    handleAddToCart,
    handleUpdateQuantity,
    getCartItemQuantity,
}) {
    const quantity = getCartItemQuantity(product.id);
    const hasQuantity = quantity > 0;

    // Helper functions moved from Index.jsx
    const getCategory = (product) => {
        const name = product.name.toLowerCase();
        const electronics = [
            "laptop",
            "monitor",
            "keyboard",
            "mouse",
            "phone",
            "tablet",
        ];
        return electronics.some((keyword) => name.includes(keyword))
            ? "Electronics"
            : "General";
    };

    const getDescription = (product) => {
        return `High-quality ${product.name.toLowerCase()} with excellent features and reliable performance.`;
    };

    const category = getCategory(product);
    const description = getDescription(product);

    return (
        <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1">
            <div className="relative w-full h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-t-2xl"></div>
                <button
                    className={`absolute top-3 left-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md transition-all z-[2] ${
                        wishlist.has(product.id)
                            ? "text-red-500"
                            : "text-gray-600 hover:text-red-500 hover:bg-red-50 hover:scale-110"
                    }`}
                    onClick={() => toggleWishlist(product.id)}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill={
                            wishlist.has(product.id) ? "currentColor" : "none"
                        }
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M9 15.5s-6-4.5-6-8.25C3 5.25 4.125 3.5 6 3.5c1.125 0 2.25.75 3 2.25.75-1.5 1.875-2.25 3-2.25 1.875 0 3 1.75 3 3.75 0 3.75-6 8.25-6 8.25z" />
                    </svg>
                </button>
                <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-full text-[11px] font-semibold text-indigo-500 shadow-md z-[2]">
                    {category}
                </div>
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover z-[1]"
                    />
                ) : (
                    <span className="text-gray-400 text-sm font-medium z-[1]">
                        No Image
                    </span>
                )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <span className="inline-block px-2.5 py-1 bg-gray-100 text-indigo-500 text-[11px] font-semibold uppercase rounded-md mb-2 w-fit">
                    {category}
                </span>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
                    {product.name}
                </h3>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-3 line-clamp-2 flex-1">
                    {description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div className="flex flex-col gap-0.5">
                        <div className="text-xl font-bold text-gray-900 flex items-center gap-1">
                            <span className="text-sm text-indigo-500 font-semibold">
                                $
                            </span>
                            {formatPrice(product.price)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-green-100 text-green-700 w-fit">
                            <svg
                                className="w-3 h-3"
                                viewBox="0 0 12 12"
                                fill="currentColor"
                            >
                                <path d="M10 3L4.5 8.5L2 6" />
                            </svg>
                            {product.stock_quantity} units
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 mt-3">
                    {hasQuantity ? (
                        <div className="flex items-center gap-0.5 bg-gray-100 rounded-xl p-0.5 w-full">
                            <button
                                className={`w-8 h-8 rounded-lg border-none bg-white flex items-center justify-center text-gray-700 font-semibold transition-all hover:bg-indigo-500 hover:text-white active:scale-95 ${
                                    quantity === 1
                                        ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleUpdateQuantity(
                                        product.id,
                                        quantity - 1,
                                    )
                                }
                                disabled={addingToCart[product.id]}
                            >
                                {quantity === 1 ? "🗑️" : "−"}
                            </button>
                            <input
                                type="text"
                                className="flex-1 min-w-[40px] text-center border-none bg-transparent text-sm font-semibold text-gray-900"
                                value={quantity}
                                readOnly
                            />
                            <button
                                className="w-8 h-8 rounded-lg border-none bg-white flex items-center justify-center text-gray-700 font-semibold transition-all hover:bg-indigo-500 hover:text-white active:scale-95 disabled:opacity-50"
                                onClick={() =>
                                    handleUpdateQuantity(
                                        product.id,
                                        quantity + 1,
                                    )
                                }
                                disabled={
                                    addingToCart[product.id] ||
                                    product.stock_quantity <= quantity
                                }
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            className="w-full py-2.5 px-4 bg-indigo-500 text-white rounded-xl text-sm font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                            onClick={() => handleAddToCart(product.id, 1)}
                            disabled={
                                product.stock_quantity === 0 ||
                                addingToCart[product.id]
                            }
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M2 2H3L4.66 9.66C4.74 10.13 4.99 10.56 5.37 10.87C5.75 11.18 6.22 11.35 6.71 11.36H12.33C12.82 11.35 13.29 11.18 13.67 10.87C14.05 10.56 14.3 10.13 14.38 9.66L15.33 4H4" />
                            </svg>
                            {addingToCart[product.id]
                                ? "Adding..."
                                : product.stock_quantity === 0
                                  ? "Out of Stock"
                                  : "Add"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
