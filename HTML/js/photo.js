

// Year filter for image


  const yearFilter = document.getElementById("yearFilter");
  const events = document.querySelectorAll(".photolist li");
  

  yearFilter.addEventListener("change", function () {
    const selectedYear = this.value;
    document.querySelector(".imageheading").textContent = selectedYear;

    events.forEach(event => {
      const eventYear = event.getAttribute("data-year");

      if (selectedYear === "all" || eventYear === selectedYear) {
        event.style.display = "block"; // show
      } else {
        event.style.display = "none";  // hide
      }
    });
  });



  // Image moving Carousal 

  const images = document.querySelectorAll(".photolist img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeBtn");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");



    let currentIndex = 0;

    console.log(images);

    // Open lightbox
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        currentIndex = index;
      });
    });

    // Close lightbox
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });

    // Next image
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex].src;
    });

    // Previous image
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
    });

    // Close when clicking outside image
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });


