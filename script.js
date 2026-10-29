
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

/* Royal Threadz Supabase Storefront Connection */
(async function connectRoyalThreadzStorefront() {
  const grid = document.getElementById('productGrid');
  if (!grid || !window.supabase) return;

  const client = window.supabase.createClient(
    'https://ekdeswwhfulaaulifnlr.supabase.co',
    'sb_publishable_KUjmF8YAHkU4kiNyY0OS9g_fO3Jj-yq'
  );

  const { data, error } = await client
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Product loading error:', error);
    return;
  }

  if (!data || !data.length) return;

  grid.innerHTML = data.map(p => {
    const safe = v => String(v ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;',
      '"': '&quot;', "'": '&#39;'
    })[c]);

    return `
      <article class="product-card">
        ${p.image_url ? `<img src="${safe(p.image_url)}" alt="${safe(p.name)}" loading="lazy">` : ''}
        <div class="product-info">
          <h3>${safe(p.name)}</h3>
          <p class="price">৳${Number(p.price).toLocaleString('en-BD')}</p>
          <p>Sizes: ${safe(Array.isArray(p.sizes) ? p.sizes.join(', ') : '')}</p>
          <p>${safe(p.stock || 'In stock')}</p>
        </div>
      </article>
    `;
  }).join('');
})();
