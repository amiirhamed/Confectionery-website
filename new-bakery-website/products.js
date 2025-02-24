document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.getElementById("productGrid");

    // Example product data (replace with fetch from server)
    const products = [
        { id: 1, name: "Birthday Cake", price: 200, image: "images/cake.jpg" },
        { id: 2, name: "Chocolate Pastry", price: 50, image: "images/pastry.jpg" },
        { id: 3, name: "Macarons", price: 150, image: "images/macarons.jpg" },
        { id: 4, name: "Birthday Cake", price: 200, image: "images/cake.jpg" },
        { id: 5, name: "Chocolate Pastry", price: 50, image: "images/pastry.jpg" },
        { id: 6, name: "Macarons", price: 150, image: "images/macarons.jpg" },
        { id: 7, name: "Birthday Cake", price: 200, image: "images/cake.jpg" },
        { id: 8, name: "Chocolate Pastry", price: 50, image: "images/pastry.jpg" },
        { id: 9, name: "Macarons", price: 150, image: "images/macarons.jpg" },
    ];

    // Load products
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);
    });
});

// Add to Cart functionality
function addToCart(productId) {
    alert(`Product with ID ${productId} added to cart!`);
}
