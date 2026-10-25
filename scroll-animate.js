(function () {
    "use strict";

    // ── Scroll-reveal observer ────────────────────────────────────────────────
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

    // ── Active nav underline on scroll ────────────────────────────────────────
    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                document.querySelectorAll("nav a").forEach(function (link) {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + entry.target.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, { threshold: 0.35 });

    function init() {
        // Attach scroll-reveal to every animate-on-scroll and stagger-children
        document.querySelectorAll(".animate-on-scroll, .stagger-children").forEach(function (el) {
            revealObserver.observe(el);
        });

        // Observe all sections with an id
        document.querySelectorAll("section[id]").forEach(function (s) {
            sectionObserver.observe(s);
        });

        // ── Header scroll shadow ──────────────────────────────────────────────
        var header = document.querySelector("header");
        window.addEventListener("scroll", function () {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }, { passive: true });

        // ── Mobile nav (slide-in drawer) ──────────────────────────────────────
        var menuIcon = document.getElementById("menu-icon");
        var nav = document.querySelector("nav");

        // Create overlay backdrop
        var overlay = document.createElement("div");
        overlay.className = "nav-overlay";
        document.body.appendChild(overlay);

        function openNav() {
            nav.classList.add("active");
            overlay.classList.add("active");
            menuIcon.classList.remove("bx-menu");
            menuIcon.classList.add("bx-x");
            document.body.style.overflow = "hidden";
        }

        function closeNav() {
            nav.classList.remove("active");
            overlay.classList.remove("active");
            menuIcon.classList.remove("bx-x");
            menuIcon.classList.add("bx-menu");
            document.body.style.overflow = "";
        }

        if (menuIcon && nav) {
            menuIcon.addEventListener("click", function () {
                nav.classList.contains("active") ? closeNav() : openNav();
            });
            overlay.addEventListener("click", closeNav);
            nav.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", closeNav);
            });
        }

        // ── Resume tab switcher ───────────────────────────────────────────────
        var resumeBtns = document.querySelectorAll(".resume-btn");

        resumeBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var target = this.getAttribute("data-target");
                if (!target) return;

                // Update button active state
                resumeBtns.forEach(function (b) { b.classList.remove("active"); });
                btn.classList.add("active");

                // Show correct detail panel
                document.querySelectorAll(".resume-detail").forEach(function (detail) {
                    detail.classList.remove("active");
                });

                var targetEl = document.getElementById(target);
                if (targetEl) {
                    targetEl.classList.add("active");

                    // Re-trigger stagger animation for newly shown content
                    var staggerEls = targetEl.querySelectorAll(".stagger-children");
                    staggerEls.forEach(function (el) {
                        el.classList.remove("visible");
                        setTimeout(function () {
                            el.classList.add("visible");
                        }, 30);
                    });
                }
            });
        });

        // ── Portfolio carousel ────────────────────────────────────────────────
 // ── Portfolio carousel ────────────────────────────────────────────────

var imgSlide = document.querySelector(".img-slide");
var portfolioDetails = document.querySelectorAll(".portfollio-detail");
var arrowLeft = document.querySelector(".arrow-left");
var arrowRight = document.querySelector(".arrow-right");
var exploreBtn = document.querySelector(".explore-btn");

if (imgSlide && portfolioDetails.length) {

    var currentIndex = 0;
    var total = portfolioDetails.length;


    function updateCarousel() {

        // Move image carousel
        imgSlide.style.transform =
            "translateX(calc(" + currentIndex + " * (-100% - 2rem)))";


        // Remove active from all details
        portfolioDetails.forEach(function (detail) {
            detail.classList.remove("active");
        });


        // Show current detail
        portfolioDetails[currentIndex].classList.add("active");


        // ───── LEFT ARROW ─────
        if (arrowLeft) {

            arrowLeft.classList.toggle(
                "disabled",
                currentIndex === 0
            );

        }


        // ───── LAST PROJECT ─────
        if (currentIndex === total - 1) {

            // Hide right arrow
            if (arrowRight) {
                arrowRight.style.display = "none";
            }

            // Show Explore
            if (exploreBtn) {
                exploreBtn.style.display = "inline-flex";
            }

        }

        // ───── NOT LAST PROJECT ─────
        else {

            // Show right arrow
            if (arrowRight) {
                arrowRight.style.display = "inline-flex";
            }

            // Hide Explore
            if (exploreBtn) {
                exploreBtn.style.display = "none";
            }

        }
    }


    // LEFT ARROW
    if (arrowLeft) {

        arrowLeft.addEventListener("click", function () {

            if (currentIndex > 0) {

                currentIndex--;

                updateCarousel();

            }

        });

    }


    // RIGHT ARROW
    if (arrowRight) {

        arrowRight.addEventListener("click", function () {

            if (currentIndex < total - 1) {

                currentIndex++;

                updateCarousel();

            }

        });

    }


    // Initial state
    updateCarousel();
}
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();