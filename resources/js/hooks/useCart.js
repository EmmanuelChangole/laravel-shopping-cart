import { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeCartItem, addToCart } from '@/utils/api';
import { handleApiError } from '@/utils/helpers';

export function useCart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState({});
    const [removing, setRemoving] = useState({});

    const loadCart = async () => {
        try {
            setLoading(true);
            const data = await getCart();
            setCartItems(data.data || data);
            setError(null);
        } catch (err) {
            setError(handleApiError(err, 'Failed to load cart. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            setUpdating(prev => ({ ...prev, [cartItemId]: true }));
            const updated = await updateCartItem(cartItemId, newQuantity);
            setCartItems(items => items.map(item => item.id === cartItemId ? updated.data : item));
        } catch (err) {
            const errorMessage = handleApiError(err, 'Failed to update quantity. Please try again.');
            alert(errorMessage);
            loadCart();
        } finally {
            setUpdating(prev => ({ ...prev, [cartItemId]: false }));
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        if (!confirm('Are you sure you want to remove this item from your cart?')) {
            return;
        }

        try {
            setRemoving(prev => ({ ...prev, [cartItemId]: true }));
            await removeCartItem(cartItemId);
            setCartItems(items => items.filter(item => item.id !== cartItemId));
        } catch (err) {
            alert(handleApiError(err, 'Failed to remove item. Please try again.'));
            loadCart();
        } finally {
            setRemoving(prev => ({ ...prev, [cartItemId]: false }));
        }
    };

    const handleAddToCart = async (productId, quantity = 1) => {
        try {
            await addToCart(productId, quantity);
            await loadCart();
        } catch (err) {
            const errorMessage = handleApiError(err, 'Failed to add to cart. Please try again.');
            alert(errorMessage);
        }
    };

    return {
        cartItems,
        loading,
        error,
        updating,
        removing,
        loadCart,
        handleUpdateQuantity,
        handleRemoveItem,
        handleAddToCart,
    };
}
