import axios from 'axios';

const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

export const getProducts = async (page = 1, perPage = 15) => {
    const { data } = await axios.get('/api/products', {
        params: { page, per_page: perPage },
    });
    return data;
};

export const getCart = async () => {
    const { data } = await axios.get('/api/cart');
    return data;
};

export const addToCart = async (productId, quantity = 1) => {
    const { data } = await axios.post('/api/cart', {
        product_id: productId,
        quantity,
    });
    return data;
};

export const updateCartItem = async (cartItemId, quantity) => {
    const { data } = await axios.put(`/api/cart/${cartItemId}`, { quantity });
    return data;
};

export const removeCartItem = async (cartItemId) => {
    const { data } = await axios.delete(`/api/cart/${cartItemId}`);
    return data;
};

export const checkout = async () => {
    const { data } = await axios.post('/api/orders');
    return data;
};
