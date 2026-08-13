// TODO: replace with your real Google Form link for the waitlist.
const WAITLIST_FORM_URL = "https://forms.gle/CGsfLYrf31bKrvVH9";

const WAITLIST_GROUP_URL =
  "https://chat.whatsapp.com/JrF7ko9Prk76uIxvoEWKLt?s=cl&p=a&ilr=1";

const CHALLENGE_GROUP_URL =
  "https://chat.whatsapp.com/HNT8qIAmkxK8L7c0pRUpgo?s=cl&p=a&ilr=1";

document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
  btn.href = btn.dataset.group === "challenge" ? CHALLENGE_GROUP_URL : WAITLIST_GROUP_URL;
});

document.querySelectorAll(".waitlist-btn").forEach((btn) => {
  btn.href = WAITLIST_FORM_URL;
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
const joinCheck = document.getElementById("join-check");
const joinSubmit = document.getElementById("join-submit");

if (joinCheck && joinSubmit) {
  joinCheck.addEventListener("change", () => {
    joinSubmit.disabled = !joinCheck.checked;
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (joinCheck && !joinCheck.checked) return;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  if (!name || !phone) return;
  const group =
    form.dataset.group === "challenge" ? CHALLENGE_GROUP_URL : WAITLIST_GROUP_URL;
  window.open(group, "_blank");
  form.hidden = true;
  note.hidden = false;
});
