/**
 * Hero Carousel
 * Handles automatic slideshow rotation for hero section background images
 */

(function() {
  let slides = [];
  let currentSlide = 0;
  const slideDuration = 5000; // 5 seconds per slide
  let carouselInterval = null;

  function showSlide(n) {
    // Ensure n is within bounds
    if (slides.length === 0) return;

    // Remove active class from all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
    });

    // Ensure index wraps correctly
    const index = ((n % slides.length) + slides.length) % slides.length;

    // Add active class to current slide
    if (slides[index]) {
      slides[index].classList.add('active');
      slides[index].style.opacity = '1';
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Initialize carousel
  function init() {
    slides = document.querySelectorAll('.carousel-slide');

    if (slides.length > 0) {
      // Set all slides to initially hidden
      slides.forEach(slide => {
        slide.style.opacity = '0';
      });

      // Show first slide
      showSlide(0);

      // Set interval for automatic rotation only if there are multiple slides
      if (slides.length > 1) {
        if (carouselInterval) {
          clearInterval(carouselInterval);
        }
        carouselInterval = setInterval(nextSlide, slideDuration);
      }
    }
  }

  // Start carousel when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Use setTimeout to ensure DOM is fully rendered
    setTimeout(init, 100);
  }

  // Reinitialize if page becomes visible (for better performance)
  if (typeof document.addEventListener !== 'undefined') {
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible' && slides.length > 1 && !carouselInterval) {
        carouselInterval = setInterval(nextSlide, slideDuration);
      } else if (document.visibilityState === 'hidden' && carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
      }
    });
  }
})();
