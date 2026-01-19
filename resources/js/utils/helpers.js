export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
};

export const getInitials = (name) => {
    if (!name) return 'U';
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export const getCartCount = (cartItems) => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
};

export const handleApiError = (error, defaultMessage = 'An error occurred') => {
    if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0];
        return Array.isArray(firstError) ? firstError[0] : firstError;
    }
    return error.response?.data?.message || defaultMessage;
};
