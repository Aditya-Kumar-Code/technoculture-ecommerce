// JavaScript for the Check Inventory page
const inventoryStatusElement = document.getElementById('inventoryStatus');

async function checkInventory() {
    const productNameElement = document.getElementById('productName');
    const productName = productNameElement.value;

    try {
        // Simulate checking inventory status
        const inventoryStatus = await fetchInventoryStatus(productName);
        displayInventoryStatus(inventoryStatus);

        // You can make API calls to the inventory service here if needed
        // Example: const inventoryStatus = await fetch('http://localhost:8000/check_inventory/ProductA');
    } catch (error) {
        console.error('Error checking inventory:', error);
        alert('Failed to check inventory');
    }
}

function fetchInventoryStatus(productName) {
    // Simulate fetching inventory status
    return new Promise(resolve => {
        setTimeout(() => {
            const randomQuantity = Math.floor(Math.random() * 20);
            resolve({ productName, quantityAvailable: randomQuantity });
        }, 1000);
    });
}

function displayInventoryStatus(status) {
    inventoryStatusElement.textContent = `Product: ${status.productName}, Quantity Available: ${status.quantityAvailable}`;
}
