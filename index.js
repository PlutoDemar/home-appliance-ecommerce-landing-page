const addButton = document.querySelectorAll(".add-button");
const cartCount = document.querySelector("#cart-count");

let count = localStorage.getItem("cartCount") || 0;

cartCount.textContent = count;

addButton.forEach((button) => {
  button.addEventListener("click", function () {
    count++;

    cartCount.textContent = count;

    localStorage.setItem("cartCount", count);
  });
});

const filterButton = document.querySelectorAll(".filter-button");
const productCard = document.querySelectorAll(".product-card");

filterButton.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.dataset.filter;
    productCard.forEach((card) => {
      const cardValue = card.dataset.category;

      if (filterValue === cardValue || filterValue === "all") {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

filterButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButton.forEach((b) => {
      b.classList.remove("active");
    });

    btn.classList.add("active");
  });
});

const form = document.querySelector("#newsletter");
const emailInput = document.querySelector("#email");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = emailInput.value;

  if (!emailValue) {
    console.log("Enter an input email");
    return;
  }

  if (!emailValue.includes("@")) {
    console.log("Invalid email");
    return;
  }

  console.log("success");
});

let cart = [];

addButton.forEach((button) => {
  button.addEventListener("click", function () {
    const productName = button.dataset.product;
    cart.push(productName);
    console.log(cart);
  });
});

addButton.forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Added";

    setTimeout(() => {
      button.textContent = "Add to cart";
    }, 2000);
  });
});
