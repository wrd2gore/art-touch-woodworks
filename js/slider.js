/**
 * ART TOUCH WOODWORKS & ARCHITECTURAL JOINERY
 * Interactive Before & After Comparison Slider (Touch & Mouse Draggable)
 */

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSliders();
});

function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.ba-slider-container');

  sliders.forEach(slider => {
    const afterWrap = slider.querySelector('.ba-slider-after-wrap');
    const handle = slider.querySelector('.ba-handle');
    const afterImg = afterWrap ? afterWrap.querySelector('img') : null;

    if (!afterWrap || !handle) return;

    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      afterWrap.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;

      if (afterImg) {
        afterImg.style.width = `${rect.width}px`;
      }
    };

    // Update inner image width on resize
    const updateSize = () => {
      const rect = slider.getBoundingClientRect();
      if (afterImg) {
        afterImg.style.width = `${rect.width}px`;
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    // Mouse Events
    const onMouseDown = (e) => {
      isDragging = true;
      setPosition(e.clientX);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Events
    const onTouchStart = (e) => {
      isDragging = true;
      if (e.touches && e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    slider.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    slider.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
  });
}

// Export helper for dynamic pages
window.initBeforeAfterSliders = initBeforeAfterSliders;
