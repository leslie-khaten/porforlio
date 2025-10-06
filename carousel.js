document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const slide = document.querySelector('.carousel-item');

  if (!track || !slide) return;

  let position = 0;
  let slideWidth = 0;

  function updateSlideWidth() {
    slideWidth = slide.offsetWidth + parseInt(getComputedStyle(track).gap || '20');
  }

  // Initialize slide width
  updateSlideWidth();

  // Update slide width on window resize
  window.addEventListener('resize', updateSlideWidth);

  nextBtn?.addEventListener('click', () => {
    updateSlideWidth();
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (Math.abs(position) + slideWidth < maxScroll) {
      position -= slideWidth;
    } else {
      position = -maxScroll;
    }
    track.style.transform = `translateX(${position}px)`;
  });

  prevBtn?.addEventListener('click', () => {
    updateSlideWidth();
    if (position + slideWidth <= 0) {
      position += slideWidth;
    } else {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
  });
});




