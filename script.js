// Toggle Mobile Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Navbar Scroll Effect (Transparent to White)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
        navbar.style.boxShadow = "none";
    }
});

function sendToWhatsApp() {
    // 1. फॉर्म मधील माहिती घेणे
    var name = document.getElementById("custName").value;
    var email = document.getElementById("custEmail").value;
    var message = document.getElementById("custMsg").value;

    // 2. तुझा WhatsApp नंबर (91 कोडसह)
    var myNumber = "917385585398"; 

    // 3. मेसेज तयार करणे (New Line साठी %0a वापरले आहे)
    var whatsappMessage = 
        "Hello, I want to enquire about Nisargam Soaps." + "%0a" +
        "-------------------------" + "%0a" +
        "*Name:* " + name + "%0a" +
        "*Email:* " + email + "%0a" +
        "*Message:* " + message;

    // 4. WhatsApp उघडणे
    var url = "https://wa.me/" + myNumber + "?text=" + whatsappMessage;
    window.open(url, '_blank').focus();
}
