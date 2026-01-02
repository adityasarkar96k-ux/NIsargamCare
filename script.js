// --- 1. Mobile Menu Toggle ---
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// --- 2. Cart Logic ---

// Open/Close Cart
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('show');
}

// Load Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('myCart')) || [];
updateCartUI();

// Add Item to Cart
function addToCart(name, price, image) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, image: image, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    toggleCart(); // Auto open cart on add
}

// Remove Item from Cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    let cartBox = document.getElementById('cartItems');
    let totalElement = document.getElementById('cartTotal');
    let countElement = document.getElementById('cartCount');
    let navCount = document.getElementById('navCartCount');
    
    cartBox.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartBox.innerHTML = '<p style="text-align:center; margin-top:20px; color:#777;">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            count += item.quantity;
            cartBox.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price} x ${item.quantity}</p>
                    </div>
                    <i class="fas fa-trash item-remove" onclick="removeItem(${index})"></i>
                </div>
            `;
        });
    }

    totalElement.innerText = total;
    countElement.innerText = count;
    if(navCount) navCount.innerText = count;
}

// Save to LocalStorage
function saveCart() {
    localStorage.setItem('myCart', JSON.stringify(cart));
}

// Checkout via WhatsApp
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let myNumber = "917385585398"; // तुझा नंबर
    let msg = "Hello, I want to place an order:%0a-----------------%0a";
    let total = 0;

    cart.forEach(item => {
        msg += `*${item.name}* (x${item.quantity}) - ₹${item.price * item.quantity}%0a`;
        total += item.price * item.quantity;
    });

    msg += `-----------------%0a*Total Bill: ₹${total}*`;

    let url = "https://wa.me/" + myNumber + "?text=" + msg;
    window.open(url, '_blank');
}

// --- 3. Contact Form WhatsApp Logic ---
function sendToWhatsApp() {
    var name = document.getElementById("custName").value;
    var email = document.getElementById("custEmail").value;
    var message = document.getElementById("custMsg").value;

    var myNumber = "917385585398"; 

    var whatsappMessage = 
        "Hello, Enquiry from Website:" + "%0a" +
        "-------------------------" + "%0a" +
        "*Name:* " + name + "%0a" +
        "*Email:* " + email + "%0a" +
        "*Message:* " + message;

    var url = "https://wa.me/" + myNumber + "?text=" + whatsappMessage;
    window.open(url, '_blank').focus();
}
