const addButton = document.querySelectorAll(".add-button");
const cartCount = document.querySelector("#cart-count");

let count = Number(localStorage.getItem("cartCount")) || 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartUI() {
  if (cartCount) {
    cartCount.textContent = count;
  }
}

updateCartUI();

function saveCart() {
  localStorage.setItem("cartCount", count);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

addButton.forEach((button) => {
  button.addEventListener("click", function () {
    const productName = button.dataset.product;

    const existingProduct = cart.find(
      (product) => product.name === productName,
    );
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name: productName, quantity: 1 });
    }
    count++;
    saveCart();

    console.log(cart);

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
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

if (form && emailInput && emailError) {
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

const cartLink = document.querySelector(".cart-link");
const popupBtnLeft = document.querySelector("#popup-btn-left");
const popupBtnRight = document.querySelector("#popup-btn-right");

let hideTimeout;

if (cartLink && popupBtnLeft && popupBtnRight) {
  cartLink.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    popupBtnLeft.classList.remove("hidden");
    popupBtnRight.classList.remove("hidden");
  });

  cartLink.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      popupBtnLeft.classList.add("hidden");
      popupBtnRight.classList.add("hidden");
    }, 900);
  });

  popupBtnLeft.addEventListener("click", () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCount");
    count = 0;
    cart = [];
    updateCartUI();
  });
}
