import { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeCartItem, addToCart } from '@/utils/api';
import { handleApiError } from '@/utils/helpers';

export function useProductCart() {
    const [cartItems, setCartItems] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [addingToCart, setAddingToCart] = useState({});

    const loadCart = async () => {
        try {
            const data = await getCart();
            const cartData = data.data || data;
            setCartItems(cartData);
            
            // Initialize product quantities from cart
            const quantities = {};
            cartData.forEach(item => {
                if (item.product) {
                    quantities[item.product.id] = item.quantity;
                }
            });
            setProductQuantities(quantities);
        } catch (err) {
            console.error('Failed to load cart:', err);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleAddToCart = async (productId, quantity = 1) => {
        try {
            setAddingToCart(prev => ({ ...prev, [productId]: true }));
            await addToCart(productId, quantity);
            await loadCart();
        } catch (err) {
            const errorMessage = handleApiError(err, 'Failed to add to cart. Please try again.');
            alert(errorMessage);
        } finally {
            setAddingToCart(prev => ({ ...prev, [productId]: false }));
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            // Remove from cart
            const cartItem = cartItems.find(item => item.product?.id === productId);
            if (cartItem) {
                try {
                    await removeCartItem(cartItem.id);
                    await loadCart();
                    setProductQuantities({ ...productQuantities, [productId]: 0 });
                } catch (err) {
                    alert('Failed to remove item from cart.');
                    console.error(err);
                }
            }
            return;
        }

        const cartItem = cartItems.find(item => item.product?.id === productId);
        if (cartItem) {
            try {
                await updateCartItem(cartItem.id, newQuantity);
                await loadCart();
                setProductQuantities({ ...productQuantities, [productId]: newQuantity });
            } catch (err) {
                alert('Failed to update quantity.');
                console.error(err);
            }
        } else {
            await handleAddToCart(productId, newQuantity);
        }
    };

    const getCartItemQuantity = (productId) => {
        return productQuantities[productId] || 0;
    };

    return {
        cartItems,
        productQuantities,
        addingToCart,
        handleAddToCart,
        handleUpdateQuantity,
        getCartItemQuantity,
        loadCart,
    };
}
