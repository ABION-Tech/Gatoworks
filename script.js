// ... (existing JavaScript code)

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Add interactive features for service cards (e.g., hover effects, animations)
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseover', () => {
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
      card.style.transform = 'scale(1.02)';
    });
    card.addEventListener('mouseout', () => {
      card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
      card.style.transform = 'scale(1)';
    });
  });