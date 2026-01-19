// Photo gallery helpers (robust and dynamic)

document.addEventListener('DOMContentLoaded', function () {
  const yearFilter = document.getElementById('yearFilter');

  // Year filter handling (guarded)
  if (yearFilter) {
    // Skip if year select is dynamically populated (e.g., event.html or video.html)
    const isPopulated = yearFilter.dataset.populated === 'true';
    const hasMultipleOptions = yearFilter.options.length > 1; // More than just "All"
    
    yearFilter.addEventListener('change', function () {
      const selectedYear = this.value;
      const heading = document.querySelector('.imageheading');
      if (heading) heading.textContent = selectedYear;

      const items = document.querySelectorAll('.photolist li');
      items.forEach(item => {
        const eventYear = item.getAttribute('data-year');
        if (selectedYear === 'all' || eventYear === selectedYear) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
    
    // On load, set the dropdown to current year if available (only for non-populated selects)
    if (!isPopulated && !hasMultipleOptions) {
      try {
        const currentYear = new Date().getFullYear().toString();
        // If an option with current year exists, select it. Otherwise add it and select.
        let opt = Array.from(yearFilter.options).find(o => o.value === currentYear);
        if (!opt) {
          opt = document.createElement('option');
          opt.value = currentYear;
          opt.text = currentYear;
          // insert after 'All'
          yearFilter.appendChild(opt);
        }
        yearFilter.value = currentYear;
        // Trigger change to apply filter (if any items present later this will filter)
        yearFilter.dispatchEvent(new Event('change'));
      } catch (err) {
        // ignore silently
        console.warn('Could not set default year filter', err);
      }
    }
  }

  // Ensure lightbox elements exist (create if missing)
  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="close" id="closeBtn">&times;</span>
      <button class="btn prev" id="prevBtn">&#10094;</button>
      <img id="lightboxImg" src="" alt="Preview">
      <button class="btn next" id="nextBtn">&#10095;</button>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('closeBtn');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  let currentIndex = 0;

  // Helper to get current image list (live)
  function getImages() {
    return Array.from(document.querySelectorAll('.photolist img'));
  }

  // Open lightbox when any .photolist img is clicked (event delegation)
  document.addEventListener('click', function (e) {
    const target = e.target;
    if (target && target.matches && target.matches('.photolist img')) {
      const imgs = getImages();
      currentIndex = imgs.indexOf(target);
      if (currentIndex === -1) currentIndex = 0;
      lightbox.style.display = 'flex';
      if (lightboxImg) lightboxImg.src = target.src;
    }
  });

  // Close
  if (closeBtn) closeBtn.addEventListener('click', () => { lightbox.style.display = 'none'; });

  // Next
  if (nextBtn) nextBtn.addEventListener('click', () => {
    const imgs = getImages();
    if (imgs.length === 0) return;
    currentIndex = (currentIndex + 1) % imgs.length;
    if (lightboxImg) lightboxImg.src = imgs[currentIndex].src;
  });

  // Prev
  if (prevBtn) prevBtn.addEventListener('click', () => {
    const imgs = getImages();
    if (imgs.length === 0) return;
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    if (lightboxImg) lightboxImg.src = imgs[currentIndex].src;
  });

  // Close when clicking outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

});





