// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    let total = 0;
    let items = [];

    // Function to add item to the cart
    function addToCart(name, price, quantity) {
        // Check if item already exists in cart
        let existingItem = items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice += price * quantity;
        } else {
            items.push({ name, price, quantity, totalPrice: price * quantity });
        }

        // Update cart display
        updateCartDisplay();
    }

    // Function to update cart display
    function updateCartDisplay() {
        cartItems.innerHTML = '';
        total = 0;

        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `${item.name} x${item.quantity} - $${item.totalPrice.toFixed(2)}`;
            cartItems.appendChild(div);

            total += item.totalPrice;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const quantityInput = button.previousElementSibling.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value);

            addToCart(name, price, quantity);
        });
    });

    // Quantity controls functionality
    document.querySelectorAll('.quantity-controls').forEach(control => {
        const decreaseButton = control.querySelector('.quantity-decrease');
        const increaseButton = control.querySelector('.quantity-increase');
        const quantityInput = control.querySelector('.quantity');

        decreaseButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;
            }
        });

        increaseButton.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;
        });
    });

    // Checkout button functionality
    checkoutButton.addEventListener('click', () => {
        // Save cart data to localStorage or send to server if applicable
        localStorage.setItem('cartItems', JSON.stringify(items));
        localStorage.setItem('cartTotal', total.toFixed(2));

        // Redirect to order details page
        window.location.href = 'order.html';
    });
});
