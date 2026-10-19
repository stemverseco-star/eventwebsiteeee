// ===== Smooth scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        ?.scrollIntoView({
            behavior:"smooth"
        });

    });

});

// ===== Navbar shadow while scrolling =====
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>20){

        navbar.style.background="rgba(8,27,41,.92)";
        navbar.style.boxShadow="0 5px 20px rgba(0,0,0,.2)";

    }

    else{

        navbar.style.background="rgba(8,27,41,.6)";
        navbar.style.boxShadow="none";

    }

});

// ===== Pause logo slider on hover =====
const slider=document.querySelector(".logo-track");

if(slider){

    slider.addEventListener("mouseenter",()=>{

        slider.style.animationPlayState="paused";

    });

    slider.addEventListener("mouseleave",()=>{

        slider.style.animationPlayState="running";

    });

}

// ===== Fade hero when page loads =====
window.addEventListener("load",()=>{

    document.body.style.opacity="1";

});

// ===== Mobile menu (hamburger + drawer) =====
(function () {
    const navbarEl  = document.querySelector(".navbar");
    const navLinks  = document.querySelector(".nav-links");
    if (!navbarEl || !navLinks) return;

    // Create hamburger button
    const toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "<span></span><span></span><span></span>";
    navbarEl.appendChild(toggle);

    // Create dim backdrop
    const backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);

    function setMenu(open) {
        navLinks.classList.toggle("open", open);
        toggle.classList.toggle("is-open", open);
        backdrop.classList.toggle("is-visible", open);
        document.body.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", () =>
        setMenu(!navLinks.classList.contains("open"))
    );

    backdrop.addEventListener("click", () => setMenu(false));

    // Close after tapping a link (smooth-scroll still works)
    navLinks.querySelectorAll("a").forEach(link =>
        link.addEventListener("click", () => setMenu(false))
    );

    // Close with Escape key
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") setMenu(false);
    });

    // Reset if the window is resized up to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) setMenu(false);
    });
})();