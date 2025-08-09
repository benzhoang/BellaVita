// Utility functions để quản lý giỏ hàng

// Lưu giỏ hàng vào localStorage
export const saveCartToStorage = (cartItems) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
        console.error('Lỗi lưu giỏ hàng:', error);
    }
};

// Lấy giỏ hàng từ localStorage
export const getCartFromStorage = () => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Lỗi lấy giỏ hàng:', error);
        return [];
    }
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = (product) => {
    try {
        const cart = getCartFromStorage();
        const existingItem = cart.find(item => item.product_id === product.product_id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        saveCartToStorage(cart);
        return cart;
    } catch (error) {
        console.error('Lỗi thêm vào giỏ hàng:', error);
        return [];
    }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItemQuantity = (productId, newQuantity) => {
    try {
        const cart = getCartFromStorage();
        const item = cart.find(item => item.product_id === productId);
        
        if (item) {
            if (newQuantity <= 0) {
                // Xóa sản phẩm nếu số lượng <= 0
                return removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
            }
        }
        
        saveCartToStorage(cart);
        return cart;
    } catch (error) {
        console.error('Lỗi cập nhật số lượng:', error);
        return getCartFromStorage();
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (productId) => {
    try {
        const cart = getCartFromStorage();
        const updatedCart = cart.filter(item => item.product_id !== productId);
        saveCartToStorage(updatedCart);
        return updatedCart;
    } catch (error) {
        console.error('Lỗi xóa sản phẩm:', error);
        return getCartFromStorage();
    }
};

// Tính tổng tiền giỏ hàng
export const calculateCartTotal = (cartItems) => {
    try {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    } catch (error) {
        console.error('Lỗi tính tổng tiền:', error);
        return 0;
    }
};

// Lưu đơn hàng gần nhất
export const saveLastOrder = (orderData) => {
    try {
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
    } catch (error) {
        console.error('Lỗi lưu đơn hàng gần nhất:', error);
    }
};

// Lấy đơn hàng gần nhất
export const getLastOrder = () => {
    try {
        const lastOrder = localStorage.getItem('lastOrder');
        return lastOrder ? JSON.parse(lastOrder) : null;
    } catch (error) {
        console.error('Lỗi lấy đơn hàng gần nhất:', error);
        return null;
    }
};

// Xóa đơn hàng gần nhất
export const clearLastOrder = () => {
    try {
        localStorage.removeItem('lastOrder');
    } catch (error) {
        console.error('Lỗi xóa đơn hàng gần nhất:', error);
    }
};

// Lưu thông tin khách hàng
export const saveCustomerInfo = (customerInfo) => {
    try {
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    } catch (error) {
        console.error('Lỗi lưu thông tin khách hàng:', error);
    }
};

// Lấy thông tin khách hàng
export const getCustomerInfo = () => {
    try {
        const customerInfo = localStorage.getItem('customerInfo');
        return customerInfo ? JSON.parse(customerInfo) : {
            name: '',
            address: '',
            phone: ''
        };
    } catch (error) {
        console.error('Lỗi lấy thông tin khách hàng:', error);
        return {
            name: '',
            address: '',
            phone: ''
        };
    }
};

// Xóa thông tin khách hàng
export const clearCustomerInfo = () => {
    try {
        localStorage.removeItem('customerInfo');
    } catch (error) {
        console.error('Lỗi xóa thông tin khách hàng:', error);
    }
};

// Xóa toàn bộ dữ liệu giỏ hàng (khi logout)
export const clearCartData = () => {
    try {
        localStorage.removeItem('cart');
        localStorage.removeItem('lastOrder');
        localStorage.removeItem('customerInfo');
        localStorage.removeItem('orderId');
    } catch (error) {
        console.error('Lỗi xóa dữ liệu giỏ hàng:', error);
    }
};

// Lấy số lượng sản phẩm trong giỏ hàng
export const getCartItemCount = () => {
    try {
        const cart = getCartFromStorage();
        return cart.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
        console.error('Lỗi đếm sản phẩm:', error);
        return 0;
    }
};
