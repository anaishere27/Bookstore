document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        email: form.email.value,
        password: form.password.value
    };

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
        alert("Login successful!");
        // Mund të ridrejtoni tek një faqe tjetër
        window.location.href = "/";
    } else {
        document.getElementById('error').innerText = result.message;
    }
});

document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        email: form.email.value,
        password: form.password.value
    };

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
        document.getElementById('registerSuccess').innerText = result.message;
        document.getElementById('registerError').innerText = '';
    } else {
        document.getElementById('registerError').innerText = result.message;
        document.getElementById('registerSuccess').innerText = '';
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
    };

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById('registerSuccess').innerText = result.message;
        document.getElementById('registerError').innerText = '';
        form.reset();
    } else {
        document.getElementById('registerError').innerText = result.message;
        document.getElementById('registerSuccess').innerText = '';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const filterSelect = document.getElementById("authorFilter");
    const bookCards = document.querySelectorAll(".book-card-horizontal");

    filterSelect.addEventListener("change", () => {
        const selectedAuthor = filterSelect.value;

        bookCards.forEach(card => {
            const author = card.querySelector(".book-author").textContent;

            if (selectedAuthor === "all" || author.includes(selectedAuthor)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});