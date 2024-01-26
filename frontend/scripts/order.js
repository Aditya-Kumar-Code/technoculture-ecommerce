// order.js

// Function to add an order to the order list
function addOrderToList(order) {
    const orderListElement = document.getElementById('orderList');

    // Create a new list item
    const listItem = document.createElement('li');

    // Set the text content of the list item
    listItem.textContent = `${order.item} - Quantity: ${order.quantity} - Total Price: $${order.total_price}`;

    // Append the list item to the order list
    orderListElement.appendChild(listItem);
}

// Function to retrieve and display orders
async function getOrders() {
    try {
        const response = await fetch('http://localhost:8001/get_orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve orders');
        }

        const orders = await response.json();
        displayOrders(orders);

    } catch (error) {
        console.error('Error retrieving orders:', error);
        alert('Failed to retrieve orders');
    }
}

// Function to place an order
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

        // Call the addOrderToList function to update the UI
        addOrderToList(order);

        // Call the placeOrder function to store the order
        await fetch('http://localhost:8001/place_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order');
    }
}

// Function to display orders
function displayOrders(orders) {
    const orderListElement = document.getElementById('orderList');

    // Clear existing order list
    orderListElement.innerHTML = '';

    // Iterate through the orders and add them to the list
    orders.forEach(order => {
        const listItem = document.createElement('li');
        listItem.textContent = `${order.item} - Quantity: ${order.quantity} - Total Price: $${order.total_price}`;
        orderListElement.appendChild(listItem);
    });
}

// ... (other functions)

