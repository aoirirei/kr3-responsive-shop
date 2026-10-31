

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderDialog && orderButtons.length && closeDialogButton && selectedProductInput) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const productName = button.dataset.product || '';
      selectedProductInput.value = productName;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}


const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');

if (chatToggle && chatWindow && chatClose) {
  chatToggle.addEventListener('click', () => {
    chatWindow.hidden = !chatWindow.hidden;
  });
  chatClose.addEventListener('click', () => {
    chatWindow.hidden = true;
  });
}