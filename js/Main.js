const images = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg"];
let currentIndex = 0;
const imgElement = document.getElementById("slider-image");
function changeImage(direction) {
  // Add exit animation
  imgElement.classList.add(
    direction === "next" ? "slide-out-left" : "slide-out-right"
  );
  setTimeout(() => {
    // Update image source
    currentIndex =
      direction === "next"
        ? (currentIndex + 1) % images.length
        : (currentIndex - 1 + images.length) % images.length;
    imgElement.src = images[currentIndex];
    // Remove exit animation and add entrance animation
    imgElement.classList.remove("slide-out-left", "slide-out-right");
    imgElement.classList.add(
      direction === "next" ? "slide-in-right" : "slide-in-left"
    );
    // Remove entrance animation after it completes
    setTimeout(() => {
      imgElement.classList.remove("slide-in-right", "slide-in-left");
      imgElement.classList.add("img-animate");
      setTimeout(() => imgElement.classList.remove("img-animate"), 200);
    }, 1);
  }, 300);
}
document
  .getElementById("prevBtn")
  .addEventListener("click", () => changeImage("prev"));
document
  .getElementById("nextBtn")
  .addEventListener("click", () => changeImage("next"));
// Optional: Auto-rotate every 5 seconds
const projects = [
  {
    class: "kitcheno",
    title: "Kitchen",
    count: "75 projects",
    url: "../img/project1.jpg",
  },
  {
    class: "commercialo",
    title: "Commercial",
    count: "49 projects",
    url: "../img/project2.jpg",
  },
  {
    class: "bathroomo",
    title: "Bathroom",
    count: "30 projects",
    url: "../img/banner1.jpg",
  },
  {
    class: "officeo",
    title: "Office",
    count: "22 projects",
    url: "../img/banner2.jpg",
  },
];
let currentIndexCompanies = 0;
const photoContainers = document.querySelectorAll(".w-50o .left-hiso");
const overlayTitles = document.querySelectorAll(".overlayo h2");
const overlayCounts = document.querySelectorAll(".overlayo p");
function updatePhotos() {
  const leftIndex = currentIndexCompanies;
  const rightIndex = (currentIndexCompanies + 1) % projects.length;
  photoContainers[0].className = `left-hiso ${projects[leftIndex].class}`;
  photoContainers[0].style.backgroundImage = `url('${projects[leftIndex].url}')`;
  photoContainers[1].className = `left-hiso ${projects[rightIndex].class}`;
  photoContainers[1].style.backgroundImage = `url('${projects[rightIndex].url}')`;
  overlayTitles[0].textContent = projects[leftIndex].title;
  overlayTitles[1].textContent = projects[rightIndex].title;
  overlayCounts[0].textContent = projects[leftIndex].count;
  overlayCounts[1].textContent = projects[rightIndex].count;
}
function changeImageCompanies(direction) {
  const leftContainer = photoContainers[0];
  const rightContainer = photoContainers[1];
  if (direction === "next") {
    leftContainer.classList.add("slide-out-left");
    rightContainer.classList.add("slide-in-left");
    setTimeout(() => {
      currentIndexCompanies = (currentIndexCompanies + 1) % projects.length;
      updatePhotos();
      leftContainer.classList.remove("slide-out-left");
      rightContainer.classList.remove("slide-in-left");
    }, 50);
  } else {
    // 'prev'
    rightContainer.classList.add("slide-out-right");
    leftContainer.classList.add("slide-in-right");
    setTimeout(() => {
      currentIndexCompanies =
        (currentIndexCompanies - 1 + projects.length) % projects.length;
      updatePhotos();
      rightContainer.classList.remove("slide-out-right");
      leftContainer.classList.remove("slide-in-right");
    }, 50);
  }
}
document
  .getElementById("prevBtnCompanies")
  .addEventListener("click", () => changeImageCompanies("prev"));
document
  .getElementById("nextBtnCompanies")
  .addEventListener("click", () => changeImageCompanies("next"));
updatePhotos();
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 1000 ? "flex" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
const funFactsBtn = document.querySelector(".fun-facts-btn");
const funFactsPanel = document.getElementById("funFactsPanel");
const funFactText = document.getElementById("funFactText");
const facts = [
  "Did you know? The shortest war in history lasted 38 minutes!",
  "Fun fact: The Eiffel Tower was originally intended to be a temporary exhibit!",
  "Surprise: The first computer 'bug' was an actual insect!",
  "Wow: The Great Wall of China is over 2,300 years old!",
];
funFactsBtn.addEventListener("click", () => {
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  funFactText.textContent = randomFact;
  funFactsPanel.classList.add("active");
  setTimeout(() => {
    funFactsPanel.classList.remove("active");
  }, 5000);
});
// Filter Logic
const searchInput = document.getElementById("searchInput");
const categoryItems = document.querySelectorAll(".categories li");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const priceRange = document.getElementById("priceRange");
const onlyAvailable = document.getElementById("onlyAvailable");
const onSale = document.getElementById("onSale");
const productCards = document.querySelectorAll(".product-card");
function updateFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory =
    document.querySelector(".categories li.active")?.dataset.category || "";
  const minVal = parseFloat(minPrice.value);
  const maxVal = parseFloat(maxPrice.value);
  const availableFilter = onlyAvailable.checked;
  const saleFilter = onSale.checked;
  priceRange.textContent = `$${minVal} - $${maxVal}`;
  productCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const category = card.dataset.category;
    const price = parseFloat(card.dataset.price);
    const isAvailable = card.dataset.available === "true";
    const isOnSale = card.dataset.on_sale === "true";
    const matchesSearch = title.includes(searchText);
    const matchesCategory = !selectedCategory || category === selectedCategory;
    const matchesPrice = price >= minVal && price <= maxVal;
    const matchesAvailable = !availableFilter || isAvailable;
    const matchesSale = !saleFilter || isOnSale;
    if (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesAvailable &&
      matchesSale
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
searchInput.addEventListener("input", updateFilters);
minPrice.addEventListener("input", updateFilters);
maxPrice.addEventListener("input", updateFilters);
onlyAvailable.addEventListener("change", updateFilters);
onSale.addEventListener("change", updateFilters);
categoryItems.forEach((item) => {
  item.addEventListener("click", () => {
    categoryItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    updateFilters();
  });
});
// Heart Icon Toggle
document.querySelectorAll(".fa-heart").forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("far");
    heart.classList.toggle("fas");
    heart.classList.toggle("filled");
  });
});
// Add to Cart Button
document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", () => {});
});
