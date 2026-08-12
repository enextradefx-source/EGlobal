// TODO: replace with your real WhatsApp number (country code, digits only).
const WHATSAPP_NUMBER = "2348106236496";

const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const WHATSAPP_LINK = waLink(
  "Hi EnexTraders, I'd love to join the crew!"
);

document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
  btn.href = WHATSAPP_LINK;
});

const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("enex-theme", next);
  } catch (e) {
    /* storage unavailable — theme still switches for the session */
  }
});

toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("reveal");
  revealObserver.observe(section);
});

const form = document.getElementById("join-form");
const note = document.getElementById("form-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  if (!name || !phone) return;
  const message = `Hi EnexTraders! I'm ${name} (${phone}). I'd love to join the crew.`;
  window.open(waLink(message), "_blank");
  form.hidden = true;
  note.hidden = false;
});
