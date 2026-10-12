/*
=========================================================
PIXEL CRAFT — JAVASCRIPT
EDIT GUIDE:
01. Mobile menu
02. Footer year
03. Scroll reveal animation
04. Portfolio filters
05. Portfolio modal
06. Contact form / email
=========================================================
*/


document.addEventListener("DOMContentLoaded", () => {

  // 01. MOBILE MENU
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav");

  if (menu && nav) {
    menu.setAttribute("aria-label", "Open navigation");
    menu.setAttribute("aria-expanded", "false");
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.textContent = open ? "×" : "☰";
    });
  }

  document.querySelectorAll(".nav a").forEach(a => {
    a.addEventListener("click", () => {
      if (nav) nav.classList.remove("open");
      if (menu) { menu.setAttribute("aria-expanded","false"); menu.textContent="☰"; }
    });
  });

    // 02. FOOTER YEAR
  document.querySelectorAll("#year").forEach(x => x.textContent = new Date().getFullYear());

  // 03. SCROLL REVEAL ANIMATION
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    revealItems.forEach(x => x.classList.add("show"));
  } else if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    revealItems.forEach(x => obs.observe(x));
  } else {
    revealItems.forEach(x => x.classList.add("show"));
  }

  // 04. PORTFOLIO FILTERS
  const filters = document.querySelectorAll(".filter");
  const works = document.querySelectorAll(".work");
  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      filters.forEach(x => x.classList.remove("active"));
      filter.classList.add("active");
      const cat = filter.dataset.filter;
      works.forEach(work => {
        const visible = cat === "all" || work.dataset.category === cat;
        work.style.display = visible ? "" : "none";
      });
    });
  });

  // 05. PORTFOLIO MODAL
  const modal = document.querySelector(".modal");
  const close = document.querySelector(".close");
  // 05. PORTFOLIO MODAL
  const modalImg = document.querySelector(".modal-img");
  // 05. PORTFOLIO MODAL
  const modalTitle = document.querySelector("#modalTitle");
  // 05. PORTFOLIO MODAL
  const modalText = document.querySelector("#modalText");

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  works.forEach(work => {
    work.addEventListener("click", () => {
      if (!modal) return;
      if (modalTitle) modalTitle.textContent = work.dataset.title || "";
      if (modalText) modalText.textContent = work.dataset.desc || "";
      if (modalImg) modalImg.innerHTML = work.querySelector(".work-image").outerHTML;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  if (close) close.addEventListener("click", closeModal);
  const backdrop = document.querySelector(".backdrop");
  if (backdrop) backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // 06. CONTACT FORM
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const n = document.querySelector("#name")?.value.trim();
      const c = document.querySelector("#contact")?.value.trim();
      const s = document.querySelector("#service")?.value;
      const m = document.querySelector("#message")?.value.trim();

      if (!n || !c || !s || !m) return;

      const sub = encodeURIComponent("Pixel Craft Project Enquiry — " + s);
      const body = encodeURIComponent(
        `Name / Business: ${n}\nContact: ${c}\nService: ${s}\n\nProject details:\n${m}`
      );
      window.location.href = `mailto:pixelcrraft.studio@gmail.com?subject=${sub}&body=${body}`;
    });
  }
});

/* =========================================================
   07. PREMIUM PAGE LOADER
   ========================================================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("loader-hidden");

    setTimeout(() => {
      loader.remove();
    }, 800);
  }, 700);
});
