// ===================================== Menu Show Y Hidden ===================

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// ===================== Menu Show ============================
// Validate if constant exists
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// ====================== Menu Hidden ========================
// Validate if constant exists
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// ==================================== Remove Menu Mobile ========================

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  // When we click on any nav link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => {
  n.addEventListener("click", linkAction);
});

// ================================ SKILLS ===========================
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;
  // for (let i = 0; i < skillsContent.length; i++) {
  //   skillsContent[i].className = "skills__content skills__close";
  // }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  } else {
    this.parentNode.className = "skills__content skills__close";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

// ======================= QUALIFICATION ===================

const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

// ======================= PORTFOLIO ===================
// Swiper JS
// import Swiper from "swiper/swiper-bundle.esm.js";
// import "swiper/swiper-bundle.css";
let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  keyboard: true,
});

// ================= SCROLL SECTIONS ACTIVE LINK =============
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionID = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionID + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionID + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// ============================ CHANGE BACKGROUND HEADER =========================
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

// ============================ SHOW SCROLL UP ====================

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 560) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollUp);

// ======================== DARK LIGHT THEME ==========================
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that interface has by validating the dark-theme class
const getCurrentTheme = () => {
  document.body.classList.contains(darkTheme) ? "dark" : "light";
};
const getCurrentIcon = () => {
  document.body.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";
};

// We validate if the user previously choose a theme
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that user chose to the local storage
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// ============================= CONTACT FORM ===========================
// INPUT FIELD STATUS
const inputFields = document.querySelectorAll(".contact__input");

inputFields.forEach((input) => {
  input.onfocus = function () {
    if (input.value != "") {
      input.parentNode.style.border = "2px solid green";
    } else {
      input.parentNode.style.border = "2px solid red";
    }
    input.oninput = function () {
      if (input.value != "") {
        input.parentNode.style.border = "2px solid green";
      } else {
        input.parentNode.style.border = "2px solid red";
      }
    };
  };
  input.onblur = function () {
    input.parentNode.removeAttribute("style");
  };
});

// Sending Data to Mail

// Listenig to form
const contactForm = document.querySelector(".contact__form");

async function handleFormSubmit(event) {
  event.preventDefault();
  const subject = document.querySelector(".subject");
  const contactSubject = document.querySelector(".contact__subject");
  const msgStatus = document.querySelector(".msg__status");
  subject.value = contactSubject.value;

  const form = event.currentTarget;

  const url = form.action;

  try {
    const formData = new FormData(form);

    const fetchOptions = {
      method: contactForm.method,
      headers: {
        Accept: "application/json",
      },
      body: formData,
    };

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      msgStatus.innerHTML =
        "Oops! There was a problem delivering your message, please contact via other means.";
      msgStatus.style.display = "block";
      setTimeout(() => {
        msgStatus.style.display = "none";
      }, 4000);
      form.reset();
    } else {
      msgStatus.innerHTML = "Your message has been sent.";
      msgStatus.style.display = "block";
      setTimeout(() => {
        msgStatus.style.display = "none";
      }, 4000);
      form.reset();
    }
  } catch (err) {
    msgStatus.innerHTML =
      "Oops! There was a problem delivering your message, please contact via other means.";
    msgStatus.style.display = "block";
    setTimeout(() => {
      msgStatus.style.display = "none";
    }, 4000);
    form.reset();
  }
}

contactForm.addEventListener("submit", handleFormSubmit);

// ==================== Typing Animation ===================
// Typing Animation
const typed = new Typed(".typing", {
  strings: ["Programmer", "", "Gamer", "", "Web Developer", ""],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true,
});
