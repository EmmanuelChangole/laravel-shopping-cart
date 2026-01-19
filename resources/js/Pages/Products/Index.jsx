import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { getProducts } from '@/utils/api';
import { handleApiError } from '@/utils/helpers';
import PageHeader from '@/Components/PageHeader';
import { useProductCart } from '@/hooks/useProductCart';
import ProductCard from '@/Components/ProductCard';
import ProductFilters from '@/Components/ProductFilters';

export default function ProductsIndex() {
    const { auth } = usePage().props;
    const user = auth?.user;
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const [wishlist, setWishlist] = useState(new Set());

    // Filter states
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
    const [inStockOnly, setInStockOnly] = useState(true);

    const { cartItems, addingToCart, handleAddToCart, handleUpdateQuantity, getCartItemQuantity } = useProductCart();

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products, searchQuery, priceRange, selectedCategories, selectedBrands, selectedColors, selectedRating, inStockOnly]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            const productsData = data.data || data;
            setProducts(productsData);
            setFilteredProducts(productsData);
            setError(null);
        } catch (err) {
            setError(handleApiError(err, 'Failed to load products. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = [...products];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Price filter
        filtered = filtered.filter(product =>
            product.price >= priceRange.min && product.price <= priceRange.max
        );

        // Stock filter
        if (inStockOnly) {
            filtered = filtered.filter(product => product.stock_quantity > 0);
        }

        setFilteredProducts(filtered);
    };

    const toggleWishlist = (productId) => {
        setWishlist(prev => {
            const newWishlist = new Set(prev);
            if (newWishlist.has(productId)) {
                newWishlist.delete(productId);
            } else {
                newWishlist.add(productId);
            }
            return newWishlist;
        });
    };

    const resetFilters = () => {
        setPriceRange({ min: 0, max: 10000 });
        setInStockOnly(true);
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedColors([]);
        setSelectedRating(null);
    };

    return (
        <div className="font-sans bg-gray-50 text-gray-900 min-h-screen">
            <Head title="Products - Laravel Shopping Cart" />
            <PageHeader user={user} cartItems={cartItems} productsLink={null} />

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-6 py-8">
                {/* Search and Filter */}
                <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 relative">
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="9" r="6"/>
                            <path d="M13.5 13.5L17 17"/>
                        </svg>
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-[15px] transition-all focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 bg-white rounded-xl text-sm font-medium text-gray-700 whitespace-nowrap transition-all hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50" 
                        onClick={() => setFilterPanelOpen(true)}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 4h14M4 9h10M7 14h4"/>
                        </svg>
                        Filters
                    </button>
                </div>

                {/* Products Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-600">
                        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </div>
                </div>

                {/* Product Grid */}
                {loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading products...</p>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                        {filteredProducts.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-gray-600">
                                No products found.
                            </div>
                        ) : (
                            filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    wishlist={wishlist}
                                    toggleWishlist={toggleWishlist}
                                    addingToCart={addingToCart}
                                    handleAddToCart={handleAddToCart}
                                    handleUpdateQuantity={handleUpdateQuantity}
                                    getCartItemQuantity={getCartItemQuantity}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>

            <ProductFilters
                isOpen={filterPanelOpen}
                onClose={() => setFilterPanelOpen(false)}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                resetFilters={resetFilters}
                applyFilters={() => setFilterPanelOpen(false)}
            />
        </div>
    );
}
