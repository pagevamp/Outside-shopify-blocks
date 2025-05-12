document.addEventListener('DOMContentLoaded', function () {
  const subtotalElement = document.getElementById('js-cart-subtotal');
  // const subtotalElementObserver = document.querySelector('.drawer__inner');
  const shippingAwayElement = document.getElementById('shipping-away');
  const progressElement = document.getElementById('shipping-progress');

  // const freeShippingThreshold = 3000;

  const freeShippingValue = shippingAwayElement.closest(
    '.cart-drawer__shipping',
  ).dataset.price; // Adjust as needed
  const freeShippingThreshold = parseFloat(
    freeShippingValue.replace(/[^\d.-]/g, ''),
  );
  // console.clear();
  // console.log(freeShippingThreshold);

  function updateShippingProgress() {
    // console.log('updateShippingProgress function called');
    const rawSubtotal = subtotalElement.textContent;

    const subtotal = parseFloat(rawSubtotal.replace(/[^\d.-]/g, ''));

    if (subtotal < freeShippingThreshold) {
      const amountAway = (freeShippingThreshold - subtotal).toFixed(2);
      const progress = (subtotal / freeShippingThreshold) * 100;

      shippingAwayElement.textContent = `$${amountAway} away`;
      progressElement.style.setProperty('--progress', `${progress}%`);
    } else {
      shippingAwayElement.textContent = `Free shipping achieved!`;
      progressElement.style.setProperty('--progress', '100%');
    }
  }

  updateShippingProgress();

  // const observer = new MutationObserver(updateShippingProgress);

  // observer.observe(subtotalElementObserver, {
  //   childList: true,
  //   characterData: true,
  //   subtree: true,
  // });
});
