
const products = [];
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll("[data-add-to-cart]");
  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name || "Product";
      const price = Number(button.dataset.price || 0);
      cart.push({ name, price });
      alert(name + " added to cart!");
    });
  });

  const checkout = document.querySelector("#checkout");
  if (checkout) {
    checkout.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const total = cart.reduce((sum, item) => sum + item.price, 0);
      const message = "Royal Threadz Order\n" +
        cart.map(item => `${item.name} - ৳${item.price}`).join("\n") +
        "\nTotal: ৳" + total;

      const phone = "8801XXXXXXXXX";
      if (phone.includes("X")) {
        alert(message + "\nPlease configure your WhatsApp number in script.js.");
        return;
      }

      window.open(
        "https://wa.me/" + phone + "?text=" + encodeURIComponent(message),
        "_blank"
      );
    });
  }
});
