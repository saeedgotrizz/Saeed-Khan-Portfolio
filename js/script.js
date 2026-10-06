/* ============================================
   Muhammad Saeed — Portfolio scripts
   Mobile nav · scroll states · reveal · form
   ============================================ */

(function () {
    "use strict";

    /* ---- UPDATE THIS with your real email address ---- */
    var CONTACT_EMAIL = "your.email@example.com";

    var header = document.getElementById("header");
    var burger = document.getElementById("burger");
    var nav = document.getElementById("nav");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
    var body = document.body;

    /* ---------- Mobile menu ---------- */
    function closeMenu() {
        burger.classList.remove("is-open");
        nav.classList.remove("is-open");
        body.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Open menu");
    }

    function openMenu() {
        burger.classList.add("is-open");
        nav.classList.add("is-open");
        body.classList.add("menu-open");
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Close menu");
    }

    burger.addEventListener("click", function () {
        nav.classList.contains("is-open") ? closeMenu() : openMenu();
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu with the Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) closeMenu();
    });

    // Re-check layout if the user rotates / resizes past the breakpoint
    window.addEventListener("resize", function () {
        if (window.innerWidth > 900 && nav.classList.contains("is-open")) closeMenu();
    });

    /* ---------- Header shadow on scroll ---------- */
    function onScroll() {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Active nav link while scrolling ---------- */
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

    if ("IntersectionObserver" in window) {
        var sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var id = entry.target.id;
                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            "is-active",
                            link.getAttribute("href") === "#" + id
                        );
                    });
                });
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );
        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

        /* ---------- Reveal on scroll ---------- */
        var revealObserver = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        document.querySelectorAll(".reveal").forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll(".reveal").forEach(function (el) {
            el.classList.add("is-visible");
        });
    }

    /* ---------- Contact form (opens the visitor's email app) ---------- */
    var form = document.getElementById("contactForm");
    var status = document.getElementById("formStatus");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var name = form.name;
            var email = form.email;
            var message = form.message;
            var valid = true;

            [name, email, message].forEach(function (field) {
                field.classList.remove("is-invalid");
            });
            status.className = "form__status";
            status.textContent = "";

            if (!name.value.trim()) {
                name.classList.add("is-invalid");
                valid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                email.classList.add("is-invalid");
                valid = false;
            }
            if (message.value.trim().length < 5) {
                message.classList.add("is-invalid");
                valid = false;
            }

            if (!valid) {
                status.className = "form__status is-err";
                status.textContent = "Please fill in every field with valid details.";
                return;
            }

            var subject = encodeURIComponent("Portfolio enquiry from " + name.value.trim());
            var bodyText = encodeURIComponent(
                "Name: " + name.value.trim() +
                "\nEmail: " + email.value.trim() +
                "\n\n" + message.value.trim()
            );

            status.className = "form__status is-ok";
            status.textContent = "Opening your email app — talk soon!";
            window.location.href = "mailto:" + CONTACT_EMAIL +
                "?subject=" + subject + "&body=" + bodyText;
            form.reset();
        });

        // Clear the error highlight as soon as the visitor types
        Array.prototype.forEach.call(form.elements, function (el) {
            if (!el.tagName || (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA")) return;
            el.addEventListener("input", function () {
                el.classList.remove("is-invalid");
            });
        });
    }

    /* ---------- Footer year ---------- */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
})();

