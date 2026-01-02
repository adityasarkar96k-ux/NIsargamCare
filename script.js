// --- 1. PRODUCT DATABASE (येथे सर्व माहिती आहे) ---
const productsDB = {
    'lavender': {
        name: 'Lavender Bliss',
        price: 150,
        image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        desc: 'Lavender Bliss is crafted with pure lavender essential oil. It calms your skin and mind, providing a relaxing bath experience. Best for stress relief and promoting better sleep.',
        category: 'Relaxation & Calming',
        reviews: [
            { user: 'Snehal P.', text: 'खूप छान वास आहे, पूर्ण दिवस फ्रेश वाटतं.', rating: 5 },
            { user: 'Amit K.', text: 'Best handmade soap I have used so far.', rating: 4 }
        ]
    },
    'charcoal': {
        name: 'Charcoal Detox',
        price: 180,
        image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        desc: 'Activated Charcoal deep cleanses your pores, removing pollution, dirt, and excess oil. It is highly recommended for oily and acne-prone skin types.',
        category: 'Deep Cleansing',
        reviews: [
            { user: 'Rahul D.', text: 'Pimples साठी एक नंबर आहे.', rating: 5 },
            { user: 'Priya S.', text: 'Feels very clean after use. Good for oily skin.', rating: 5 }
        ]
    },
    'coffee': {
        name: 'Coffee Scrub',
        price: 160,
        image: 'https://images.unsplash.com/photo-1547793549-70fa8892b1a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        desc: 'Made with real coffee grounds, this soap acts as a natural exfoliator, removing dead skin cells and revealing smooth, soft, and glowing skin.',
        category: 'Exfoliation',
        reviews: [
            { user: 'Neha M.', text: 'Scrubbing साठी बेस्ट आहे!', rating: 4 },
            { user: 'Vikram', text: 'Good fragrance of coffee.', rating: 5 }
        ]
    },
    'rose': {
        name: 'Rose Petal',
        price: 200,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        desc: 'Infused with real rose petals and rose water. It hydrates the skin and leaves a lingering floral fragrance that makes you feel luxurious.',
        category: 'Luxury & Hydration',
        reviews: [
            { user: 'Aditi', text: 'Love the smell!', rating: 5 },
            { user: 'Pooja', text: 'Very gentle on skin.', rating: 4 }
        ]
    }
};

// --- 2. LOAD PRODUCT DETAILS (Dynamic Function) ---
function loadProductDetails() {
    // URL मधून 'id' शोधणे (उदा: product.html?id=lavender)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = productsDB[productId];

    if (product) {
        // HTML मध्ये माहिती भरणे
        document.getElementById('pImg').src = product.image;
        document.getElementById('pName').innerText = product.name;
        document.getElementById('pPrice').innerText = product.price;
        document.getElementById('pDesc').innerText = product.desc;
        document.getElementById('pCategory').innerText = product.category;

        // "Add to Cart" बटण चालू करणे
        document.getElementById('addBtn').onclick = function() {
            addToCart(product.name, product.price, product.image);
        };

        // Reviews लोड करणे
        let reviewHTML = '';
        if(product.reviews.length > 0) {
            product.reviews.forEach(r => {
                let stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
                reviewHTML += `
                    <div class="review-card">
                        <div class="stars">${stars}</div>
                        <p class="review-text">"${r.text}"</p>
                        <p class="reviewer-name">- ${r.user}</p>
                    </div>
                `;
            });
        } else {
            reviewHTML = '<p>No reviews yet.</p>';
        }
        document.getElementById('reviewContainer').innerHTML = reviewHTML;
    } else {
        document.querySelector('.detail-container').innerHTML = '<h2>Product Not Found. Please go back to Shop.</h2>';
    }
}

// --- 3. EXISTING CART & MENU LOGIC (जुनं लॉजिक) ---

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('show');
}

let cart = JSON.parse(localStorage.getItem('myCart')) || [];
updateCartUI();

function addToCart(name, price, image) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, image: image, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    toggleCart(); 
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    let cartBox = document.getElementById('cartItems');
    let totalElement = document.getElementById('cartTotal');
    let countElement = document.getElementById('cartCount');
    let navCount = document.getElementById('navCartCount');
    
    if(cartBox) {
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

        if(totalElement) totalElement.innerText = total;
        if(countElement) countElement.innerText = count;
        if(navCount) navCount.innerText = count;
    }
}

function saveCart() {
    localStorage.setItem('myCart', JSON.stringify(cart));
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    let myNumber = "917385585398"; 
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
