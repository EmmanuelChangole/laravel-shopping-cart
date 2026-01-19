export default function ProductFilters({
    isOpen,
    onClose,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    resetFilters,
    applyFilters
}) {
    return (
        <>
            {/* Filter Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] transition-all ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={onClose}
            />

            {/* Filter Panel */}
            <div className={`fixed right-0 top-0 w-full md:w-[400px] h-screen bg-white z-[1001] transition-all duration-300 flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.15)] overflow-y-auto ${
                isOpen ? 'right-0' : '-right-full md:-right-[400px]'
            }`}>
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                    <button 
                        className="w-9 h-9 rounded-lg border-none bg-gray-100 cursor-pointer flex items-center justify-center text-gray-600 transition-all hover:bg-gray-200 hover:text-gray-900" 
                        onClick={onClose}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 5L5 15M5 5L15 15"/>
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Price Range */}
                    <div className="mb-8">
                        <div className="text-[15px] font-semibold text-gray-900 mb-4 flex items-center justify-between">
                            Price Range
                            <span 
                                className="text-[13px] text-indigo-500 cursor-pointer font-medium hover:text-indigo-600" 
                                onClick={() => setPriceRange({ min: 0, max: 10000 })}
                            >
                                Clear
                            </span>
                        </div>
                        <div className="flex gap-3 mb-4">
                            <div className="flex-1">
                                <label className="text-xs text-gray-600 mb-1.5 block">Min Price</label>
                                <input
                                    type="number"
                                    className="w-full py-2.5 px-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-indigo-500"
                                    placeholder="0"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-600 mb-1.5 block">Max Price</label>
                                <input
                                    type="number"
                                    className="w-full py-2.5 px-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-indigo-500"
                                    placeholder="10000"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) || 10000 })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-8">
                        <div className="text-[15px] font-semibold text-gray-900 mb-4 flex items-center justify-between">
                            Availability
                            <span 
                                className="text-[13px] text-indigo-500 cursor-pointer font-medium hover:text-indigo-600" 
                                onClick={() => setInStockOnly(true)}
                            >
                                Clear
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors hover:bg-gray-50">
                                <input
                                    type="checkbox"
                                    checked={inStockOnly}
                                    onChange={(e) => setInStockOnly(e.target.checked)}
                                    className="hidden"
                                />
                                <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${
                                    inStockOnly 
                                        ? 'bg-indigo-500 border-indigo-500' 
                                        : 'border-gray-300'
                                }`}>
                                    {inStockOnly && (
                                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M10 3L4.5 8.5L2 6"/>
                                        </svg>
                                    )}
                                </div>
                                <span className="flex-1 text-sm text-gray-700">In Stock</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="p-5 pt-6 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
                    <button 
                        className="flex-1 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300" 
                        onClick={resetFilters}
                    >
                        Clear All
                    </button>
                    <button 
                        className="flex-1 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all bg-indigo-500 text-white hover:bg-indigo-600" 
                        onClick={applyFilters}
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </>
    );
}
