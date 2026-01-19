import { Link } from '@inertiajs/react';
import ProfileDropdown from './ProfileDropdown';
import { getCartCount } from '@/utils/helpers';

export default function PageHeader({ user, cartItems, cartLink = '/cart', productsLink = '/products' }) {
    const cartItemCount = getCartCount(cartItems);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-indigo-600 transition-colors">
                        <div className="text-2xl">🛍️</div>
                        <span className="text-xl font-bold">Laravel Shopping Cart</span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        {productsLink && (
                            <Link 
                                href={productsLink} 
                                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" 
                                title="Products"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 4h14M3 10h14M3 16h14"/>
                                </svg>
                            </Link>
                        )}
                        {cartLink && (
                            <Link
                                href={cartLink}
                                className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Shopping Cart"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M2.5 2.5H3.75L5.83333 12.0833C5.94861 12.616 6.2442 13.0942 6.66768 13.4437C7.09117 13.7931 7.62012 13.9945 8.16667 14.0167H15.4167C15.9632 13.9945 16.4922 13.7931 16.9157 13.4437C17.3392 13.0942 17.6347 12.616 17.75 12.0833L19.1667 5H5"/>
                                    <circle cx="8.75" cy="17.5" r="1.25"/>
                                    <circle cx="15.8333" cy="17.5" r="1.25"/>
                                </svg>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        )}
                        <ProfileDropdown user={user} />
                    </div>
                </div>
            </div>
        </header>
    );
}
