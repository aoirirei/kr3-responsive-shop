document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#kr3-order-form');
  if (!form) return;
  const product = document.querySelector('#checkout-product');
  const quantity = document.querySelector('#checkout-quantity');
  const delivery = document.querySelector('#checkout-delivery');
  const promo = document.querySelector('#promo-code');
  const promoStatus = document.querySelector('#promo-status');
  const status = document.querySelector('#order-status');
  const codes = { MEOW10: 0.10, KITTY15: 0.15 };
  let applied = '';
  const money = n => new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
  function update() {
    const qty = Math.max(1, Math.min(20, Number(quantity.value) || 1));
    const subtotal = Number(product.value || 0) * qty;
    const discount = Math.round(subtotal * (codes[applied] || 0));
    const shipping = subtotal && delivery.value === 'courier' ? 250 : 0;
    document.querySelector('#subtotal').textContent = money(subtotal);
    document.querySelector('#discount').textContent = '−' + money(discount);
    document.querySelector('#delivery-price').textContent = money(shipping);
    document.querySelector('#grand-total').textContent = money(subtotal - discount + shipping);
  }
  [product, quantity, delivery].forEach(el => el.addEventListener('input', update));
  document.querySelector('#apply-promo').addEventListener('click', () => {
    const code = promo.value.trim().toUpperCase();
    applied = Object.hasOwn(codes, code) ? code : '';
    promoStatus.textContent = applied ? 'промокод применён! скидка ' + Math.round(codes[applied] * 100) + '%' : 'промокод не найден. попробуйте MEOW10 или KITTY15.';
    update();
  });
  promo.addEventListener('input', () => { if (promo.value.trim().toUpperCase() !== applied) { applied = ''; promoStatus.textContent = ''; update(); } });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { status.textContent = 'проверьте обязательные поля и согласие на обработку данных.'; form.reportValidity(); return; }
    status.textContent = 'заявка проверена! итог: ' + document.querySelector('#grand-total').textContent + '. это учебный сайт — данные никуда не отправлены.';
  });
  const params = new URLSearchParams(location.search);
  if (params.has('product')) { const name = params.get('product').toLowerCase(); if (name.includes('корм') || name.includes('товар 1')) product.value = '400'; }
  update();
});
