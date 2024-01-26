const orderListElement = document.getElementById('orderList');

async function placeOrder() {
    const itemElement = document.getElementById('item');
    const quantityElement = document.getElementById('quantity');

    const item = itemElement.value;
    const quantity = parseInt(quantityElement.value, 10);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Invalid quantity');
        return;
    }

    try {
        // Simulate placing an order by adding an item to the order list
        const order = { item, quantity, total_price: quantity * 10.0 };
        addOrderToList(order);

        // You can make API calls to the order service here if needed
        // Example: await fetch('http://localhost:8000/place_order', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ item, quantity }),
        // });

    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order');
    }
}

function addOrderToList(order) {
    const listItem = document.createElement('li');
    listItem.textContent = `${order.item} - Quantity: ${order.quantity} - Total Price: $${order.total_price}`;
    orderListElement.appendChild(listItem);
}
