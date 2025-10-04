document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const slide = document.querySelector('.carousel-item');

  if (!track || !slide) return;

  const slideWidth = slide.offsetWidth + 20; // ancho + gap
  let position = 0;

  nextBtn?.addEventListener('click', () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (Math.abs(position) + slideWidth < maxScroll) {
      position -= slideWidth;
    } else {
      position = -maxScroll;
    }
    track.style.transform = `translateX(${position}px)`;
  });

  prevBtn?.addEventListener('click', () => {
    if (position + slideWidth <= 0) {
      position += slideWidth;
    } else {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
  });
});




