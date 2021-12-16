"use strict";
// Selectors:
const tabs = document.querySelectorAll(".featured_categories_tab ");
const tabsContainer = document.querySelector(
  ".featured_categories_tab_container"
);
const tabsContent = document.querySelectorAll(".featured_categories_content");

////////////////////////
// Reveal sections:
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy loading images:
let options = {
  root: document.querySelector(".root"),
  rootMargin: "0px, 0px, 100px, 0px",
};

let images = [...document.querySelectorAll(".target_images")];
const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
    }
  });
};

let observer = new IntersectionObserver(callback);

images.forEach((image) => {
  observer.observe(image);
});

/////////////////////////////
// Tabbed component
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".featured_categories_tab");

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("featured_categories_tab--active"));
  tabsContent.forEach((c) =>
    c.classList.remove("featured_categories_content--active")
  );

  // Activate tab
  clicked.classList.add("featured_categories_tab--active");

  // Activate content area
  document
    .querySelector(`.featured_categories_content--${clicked.dataset.tab}`)
    .classList.add("featured_categories_content--active");
});
