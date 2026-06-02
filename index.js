const addButton = document.querySelectorAll(".add-button");
const cartCount = document.querySelector("#cart-count");

let count = Number(localStorage.getItem("cartCount")) || 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cartCount) {
  cartCount.textContent = count;
}

function saveCart() {
  localStorage.setItem("cartCount", count);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = count;
}

addButton.forEach((button) => {
  button.addEventListener("click", function () {
    const productName = button.dataset.product;

    count++;
    cart.push(productName);
    saveCart();

    button.textContent = "Added";
    setTimeout(() => {
      button.textContent = "Add to cart";
    }, 2000);
  });
});

const filterButton = document.querySelectorAll(".filter-button");
const productCard = document.querySelectorAll(".product-card");

filterButton.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.dataset.filter;

    productCard.forEach((card) => {
      const match =
        filterValue === "all" || card.dataset.category === filterValue;
      card.style.display = match ? "block" : "none";
    });

    filterButton.forEach((b) => {
      b.classList.remove("active");
    });

    button.classList.add("active");
  });
});

const form = document.querySelector("#newsletter");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form && emailInput) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailValue = emailInput.value.trim();

    if (!emailValue) {
      emailError.textContent = "Please enter your email.";
      return;
    }

    if (!isValidEmail(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";
      return;
    }

    emailError.textContent = "";
    console.log("success");
  });
}
