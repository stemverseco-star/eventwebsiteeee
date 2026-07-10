// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        ?.scrollIntoView({
            behavior:"smooth"
        });

    });

});

// Navbar shadow while scrolling

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

// Pause logo slider on hover

const slider=document.querySelector(".logo-track");

slider.addEventListener("mouseenter",()=>{

    slider.style.animationPlayState="paused";

});

slider.addEventListener("mouseleave",()=>{

    slider.style.animationPlayState="running";

});

// Fade hero when page loads

window.addEventListener("load",()=>{

    document.body.style.opacity="1";

});