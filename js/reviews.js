document.addEventListener('DOMContentLoaded', () => {
 const form = document.querySelector('#review-form'); if (!form) return;
 const list = document.querySelector('#reviews-list');
 const key = 'forcats-reviews-v1';
 let saved = [];
 try { saved = JSON.parse(localStorage.getItem(key) || '[]'); if (!Array.isArray(saved)) saved = []; } catch { saved = []; }
 function render(review) {
   const card = document.createElement('article'); card.className = 'review-card';
   const top = document.createElement('div'); top.className = 'review-card__top';
   const name = document.createElement('strong'); name.textContent = review.name;
   const stars = document.createElement('span'); stars.className = 'review-card__stars'; stars.textContent = '★'.repeat(review.rating) + '☆'.repeat(5-review.rating); stars.setAttribute('aria-label', review.rating + ' из 5');
   top.append(name,stars);
   const text = document.createElement('p'); text.textContent = review.text;
   const date = document.createElement('small'); date.textContent = review.date;
   card.append(top,text,date); list.prepend(card);
 }
 saved.forEach(render);
 form.addEventListener('submit', e => {
  e.preventDefault(); if (!form.checkValidity()) { form.reportValidity(); return; }
  const review = {name: document.querySelector('#review-name').value.trim(),rating: Number(document.querySelector('#review-rating').value),text: document.querySelector('#review-text').value.trim(),date: new Date().toLocaleDateString('ru-RU')};
  if (!review.name || review.text.length < 10) return;
  saved.push(review); try { localStorage.setItem(key, JSON.stringify(saved)); } catch {}
  render(review); form.reset(); document.querySelector('#review-status').textContent = 'спасибо! ваш отзыв добавлен.';
 });
});
