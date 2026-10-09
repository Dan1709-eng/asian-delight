// Data for the restaurant menu and trending lists
const trendingRamen = ['Tonkotsu Ramen', 'Miso Ramen', 'Shoyu Ramen', 'Spicy Ramen', 'Vegetable Ramen', 'Seafood Ramen'];
const trendingDrinks = ['Bubble Tea', 'Green Tea', 'Thai Tea', 'Matcha Latte', 'Iced Coffee', 'Jasmine Tea'];
const popularDishes = [
  { name: 'Tonkotsu Ramen', rating: '4.9', price: '$18.00', image: 'tonkotsu-ramen.png' },
  { name: 'Pan-Fried Gyoza', rating: '5.0', price: '$14.00', image: 'gyoza.png', featured: true },
  { name: 'Special Fried Rice', rating: '4.7', price: '$13.00', image: 'fried-rice.png' }
];

// Animate elements when the page is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ duration: 1000, once: true, offset: 120 });
});

// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Mobile navigation toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
menuToggle?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Filter menu cards by the selected category
const filterButtons = document.querySelectorAll('.popular-foods__filter-btn');
const dishCards = document.querySelectorAll('.popular-foods__card');
const noResults = document.getElementById('noResults');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    let visibleCount = 0;
    dishCards.forEach(card => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !matches);
      if (matches) visibleCount++;
    });
    if (noResults) noResults.hidden = visibleCount > 0;
  });
});

// Demo newsletter form interaction (no mailing service is connected)
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm?.addEventListener('submit', event => {
  event.preventDefault();
  const button = newsletterForm.querySelector('button');
  button.textContent = 'Subscribed!';
  newsletterForm.reset();
  setTimeout(() => { button.textContent = 'Get Started'; }, 2500);
});

// Replace failed online photos with emoji placeholders
const fallbackEmoji = {
  ramen: '🍜', 'tonkotsu ramen': '🍜', gyoza: '🥟', 'dim sum': '🥟',
  'pad thai': '🍝', 'fried rice': '🍚', 'boba tea': '🧋', user: '🙂'
};
const emojiPlaceholder = emoji => 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#d1fae5"/><text x="50" y="50" font-size="50" text-anchor="middle" dominant-baseline="central">' + emoji + '</text></svg>'
);
const useFallback = image => {
  if (image.dataset.fallbackUsed) return;
  const emoji = fallbackEmoji[image.alt.toLowerCase()];
  if (!emoji) return;
  image.dataset.fallbackUsed = 'true';
  image.src = emojiPlaceholder(emoji);
};
document.querySelectorAll('img').forEach(image => {
  image.addEventListener('error', () => useFallback(image));
  if (image.complete && image.naturalWidth === 0) useFallback(image);
});
