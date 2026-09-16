document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 STEMverse Script Initialized successfully!");
 
    // ==========================================================================
    // 1. PHOTO GALLERY SLIDER
    // ==========================================================================
    const galleryTrack = document.getElementById('galleryTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let galleryScroll = 0;
 
    if (galleryTrack && nextBtn && prevBtn) {
        console.log("📸 Gallery Elements Found. Slider active.");
 
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const firstItem = galleryTrack.querySelector('.gallery-item');
            if (firstItem) {
                const itemWidth = firstItem.offsetWidth + 25;
                const maxScroll = galleryTrack.scrollWidth - galleryTrack.parentElement.clientWidth;
 
                if (galleryScroll >= maxScroll) {
                    galleryScroll = 0;
                } else {
                    galleryScroll += itemWidth;
                    if (galleryScroll > maxScroll) galleryScroll = maxScroll;
                }
                galleryTrack.style.transform = `translateX(-${galleryScroll}px)`;
            }
        });
 
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const firstItem = galleryTrack.querySelector('.gallery-item');
            if (firstItem) {
                const itemWidth = firstItem.offsetWidth + 25;
                const maxScroll = galleryTrack.scrollWidth - galleryTrack.parentElement.clientWidth;
 
                if (galleryScroll <= 0) {
                    galleryScroll = maxScroll;
                } else {
                    galleryScroll -= itemWidth;
                    if (galleryScroll < 0) galleryScroll = 0;
                }
                galleryTrack.style.transform = `translateX(-${galleryScroll}px)`;
            }
        });
    } else {
        console.warn("⚠️ Gallery Warning: Missing 'galleryTrack', 'nextBtn', or 'prevBtn' in HTML.");
    }
 
 
    // ==========================================================================
    // 2. TEAM MEMBER CAROUSEL (Smooth Transitions)
    // ==========================================================================
    const teamCards = document.querySelectorAll('.team-card');
    const teamPrev = document.getElementById('teamPrev') || document.querySelector('.team-carousel .prev');
    const teamNext = document.getElementById('teamNext') || document.querySelector('.team-carousel .next');
    let currentTeamIndex = 0;
 
    if (teamCards.length > 0 && teamPrev && teamNext) {
        console.log(`👥 Team Carousel Active. ${teamCards.length} members loaded.`);
 
        function showTeamMember(index) {
            teamCards.forEach((card, i) => {
                if (i === index) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }
 
        showTeamMember(currentTeamIndex);
 
        teamNext.addEventListener('click', (e) => {
            e.preventDefault();
            currentTeamIndex = (currentTeamIndex + 1) % teamCards.length;
            showTeamMember(currentTeamIndex);
        });
 
        teamPrev.addEventListener('click', (e) => {
            e.preventDefault();
            currentTeamIndex = (currentTeamIndex - 1 + teamCards.length) % teamCards.length;
            showTeamMember(currentTeamIndex);
        });
    } else {
        console.warn("⚠️ Team Warning: Couldn't find '.team-card' items or navigation buttons.");
    }
 
    // ==========================================================================
    // 3. SAFE DATA INTEGRATION
    // ==========================================================================
    const pageData = {
        about: "STEMverse is a cutting-edge platform blending education with fantasy.",
        team: "Lead Designers, STEM educators, and AI Specialists.",
        impact: "We measure our success by the growth we see in our students. Through hands-on STEAM learning, they move from passive learners to active thinkers—building confidence, solving real-world problems, and expressing creativity with purpose."
    };
 
    const companyDescEl = document.getElementById('companyDescription');
    if (companyDescEl) companyDescEl.innerText = pageData.about;
 
    const teamDescEl = document.getElementById('teamDescription');
    if (teamDescEl) teamDescEl.innerText = pageData.team;
 
    const impactDescEl = document.getElementById('impactDescription');
    if (impactDescEl) impactDescEl.innerText = pageData.impact;
 
    // ==========================================================================
    // 4. AUTOMATIC LOGO CLONER FOR GAPLESS LOOP
    // ==========================================================================
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        const originalLogos = Array.from(logoTrack.children);
        originalLogos.forEach(logo => {
            const clone = logo.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            logoTrack.appendChild(clone);
        });
        console.log("🔄 Partner logos duplicated for infinite loop.");
    }
 
    // ==========================================================================
    // 5. MOBILE NAVIGATION — VERTICAL SIDEBAR FROM THE LEFT
    // ==========================================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinksEl = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinkItems = navLinksEl ? navLinksEl.querySelectorAll('.nav-link') : [];
 
    navLinkItems.forEach((link, i) => {
        link.style.transitionDelay = `${0.05 + i * 0.06}s`;
    });
 
    function openMobileNav() {
        navLinksEl.classList.add('is-open');
        mobileOverlay.classList.add('is-visible');
        hamburgerBtn.classList.add('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-open');
    }
 
    function closeMobileNav() {
        navLinksEl.classList.remove('is-open');
        mobileOverlay.classList.remove('is-visible');
        hamburgerBtn.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    }
 
    if (hamburgerBtn && navLinksEl && mobileOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navLinksEl.classList.contains('is-open');
            isOpen ? closeMobileNav() : openMobileNav();
        });
 
        mobileOverlay.addEventListener('click', closeMobileNav);
 
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });
 
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMobileNav();
        });
 
        window.addEventListener('resize', () => {
            if (window.innerWidth > 860) closeMobileNav();
        });
 
        console.log("📱 Mobile sidebar navigation ready.");
    } else {
        console.warn("⚠️ Nav Warning: Hamburger, nav links, or overlay not found.");
    }
 
    // ==========================================================================
    // 6. SCROLL-REVEAL ANIMATIONS
    // Shared observer, exposed as revealElements() so elements added later
    // (like the spotlight cards below) can be hooked in too.
    // ==========================================================================
    let revealObserver = null;
 
    if ('IntersectionObserver' in window) {
        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });
    }
 
    function revealElements(elements) {
        elements.forEach(el => {
            if (revealObserver) {
                revealObserver.observe(el);
            } else {
                el.classList.add('is-visible');
            }
        });
    }
 
    revealElements(document.querySelectorAll('[data-reveal]'));
    console.log("✨ Scroll-reveal active.");
 
    // Delegated on document so it works for .expand-toggle buttons that
    // exist now AND ones added later (e.g. spotlight cards re-rendered
    // when paging through the carousel).
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.expand-toggle');
        if (!btn) return;
 
        const card = btn.closest('.spotlight-card');
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (!panel || !card) return;
 
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
 
        btn.setAttribute('aria-expanded', String(!isOpen));
        panel.classList.toggle('is-open', !isOpen);
        card.classList.toggle('is-expanded', !isOpen);
 
        if (!isOpen) {
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 350);
        }
    });
 
    // ==========================================================================
    // 7. "AS SEEN IN" PRESS SPOTLIGHT CAROUSEL
    // Add a new press item below any time — every 3 form a page.
    // ==========================================================================
    const pressData = [
        {
            kicker: "STEMverse",
            logo: "SEE Pakistan 2026 World Startup Championship",
            quote: "Out of 4,000+ applicants, STEMverse proved that the future of education is already here.",
            cover: "pictures/seepakistan6.jpeg",
            badge: "",
            details: [
                { text: "Judges praised our hands-on model for bridging traditional classrooms with the modern tech economy. ", img: "pictures/seepakistan8.jpeg", cap: "Demonstration" },
                { text: "Ranked in the Top 100 of 4,000+ applicants at SEE Pakistan 2026.", img: "pictures/seepakistan4.jpeg", cap: "Pitch" }
            ]
        },
        {
            kicker: "STEMverse",
            logo: "Indus RAS Expo 2026",
            quote: "Demonstrating next-gen educational robotics and automation, STEMverse stood out as a major crowd puller at Indus RAS Expo.",
            cover: "pictures/rasexpo1.jpeg",
            details: [
                { text: "Visitors experienced our interactive STEM labs firsthand, showcasing how automation and robotics are revolutionizing modern learning.", img: "pictures/rasexpo4.jpeg", cap: "Interaction" },
                { text: "STEMverse CEO Mashaal Jawad took center stage in the main panel talk, sharing visionary insights on the future of EdTech, robotics, and skill development in Pakistan.", img: "pictures/rasexpo6.jpeg", cap: "Panel talk" }
            ]
        },
        {
            kicker: "STEMverse",
            logo: "Canva Community Peshawar x STEMverse",
            quote: "Empowering the next generation of creators with cutting-edge AI tools and hands-on website building skills.",
            cover: "pictures/canvaevent1.jpeg",
            details: [
                { text: "Hands-on workshops led by STEMverse and Canva Community Peshawar, teaching students and creators how to leverage AI for rapid design and content creation.", img: "pictures/canvaevent4.jpeg", cap: "innovation" },
                { text: "Participants built live, fully-functional websites from scratch, combining modern web development fundamentals with smart automation tools.", img: "pictures/canvaevent3.jpeg", cap: "Learning" }
            ]
        },
        {
            kicker: "STEMverse",
            logo: "STEMverse Summer Exhibition ",
            quote: "From young innovators building their first projects to future professionals launching technical careers, STEMverse is shaping tomorrow's tech leaders.",
            cover: "pictures/exhibition1.jpeg",
            details: [
                { text: "Empowering teens early: our dedicated internship program provided Matric and O-Level students with real-world exposure to technical skills, engineering, and project building.", img: "pictures/exhibition2.jpeg", cap: "Internship camp students" },
                { text: "Displaying innovative projects built by our students, showcasing how they apply foundational tech and coding skills to create real-world solutions.", img: "pictures/exhibition4.jpeg", cap: "exhibition" }
            ]
        },
        {
            kicker: "STEMverse",
            logo: "STEMverse School Summer Camp Exhibition ",
            quote: "Collaborating with Forward School and Pak-Turk to host vibrant summer camp exhibitions, showcasing young minds building their first tech projects and exploring the world of science",
            cover: "pictures/forward1.JPG",
            details: [
                { text: "Forward School partnership: displaying creative student projects and interactive coding models crafted during our specialized summer camp exhibition.", img: "pictures/forward2.jpeg", cap: "Creation" },
                { text: "Pak-Turk collaboration: celebrating early curiosity and hands-on learning as students present their foundational engineering and problem-solving solutions.", img: "pictures/pakturk1.jpeg", cap: "Students presentation" }
            ]
        },
        {
            kicker: "STEMverse",
            logo: "OIC 9th Ministeral Conference on Women.",
            quote: "Empowering young women in STEM builds a sustainable global future by driving innovation and leadership from an early age. ",
            cover: "pictures/oic1.jpeg",
            details: [
                { text: "Presenting grassroots STEMverse initiatives to international delegates at the OIC 9th Conference.", img: "pictures/oic2.jpeg", cap: "Networking" },
                { text: "Displaying student built tech projects to demonstrate early practical learning in coding and engineering.", img: "pictures/oic3.jpeg", cap: "Innovation" }
            ]
        },
        {
            kicker: "STEMverse",
            logo: "NUST Programming Competition",
            quote: "Celebrating our young coders as they competed among the best at NUST, proving their technical prowess and securing a spot in the top 10 finalists.",
            cover: "pictures/eap11.jpeg",
            details: [
                { text: "Competing on a prestigious platform: our students showcased their coding and problem-solving skills against top young minds at the NUST programming competition.", img: "pictures/eap12.jpeg", cap: "Competition" },
                { text: "Excellence in action: earning a proud spot in the top 10 finalists, reflecting our students' dedication, technical training, and competitive edge.", img: "pictures/eap13.jpeg", cap: "Finalists" }
            ]
        },
        
        {
            kicker: "STEMverse",
            logo: "STEMverse & SAHA Partnership",
            quote: "MoU signing with SAHA to strengthen STEM education in schools and expand hands-on learning opportunities for students.",
            cover: "pictures/mou1.jpeg",
            details: [
                { text: "Formalizing strategic alliances: signing an MoU with SAHA to expand hands-on learning opportunities and strengthen STEM education in schools.", img: "pictures/mou2.jpeg", cap: "Partnership" },
                { text: "Expanding educational horizons: building collaborative frameworks to bring advanced technical training and practical engineering to more students.", img: "pictures/mou3.jpeg", cap: "Agreement" }
            ]
        },
        {
            kicker: "STEMverse",
            logo: "Khyber Pakhtunkhwa Youth Excellence Award 2026",
            quote: "Honored to have our CEO & Founder Mashaal Jawad receive the Khyber Pakhtunkhwa Youth Excellence Award 2026 for advancing STEM and technology education.",
            cover: "pictures/award1.jpeg",
            details: [
                { text: "Honoring leadership: recognizing our CEO & Founder's efforts in strengthening STEM and technology education across Khyber Pakhtunkhwa.", img: "pictures/award2.jpeg", cap: "CEO/Founder Mashaal Jawad" },
                { text: "Provincial impact: celebrating this milestone presented by the Directorate of Youth Affairs KPK at the University of Peshawar.", img: "pictures/award3.jpeg", cap: "Milestone" }
            ]
        },
        {
         kicker: "STEMverse",
         logo: "Indus AI Week",
         quote: "Recognized with the Women in Tech Award at Indus AI Week for an outstanding AI-based project, selected from 500+ entries nationwide.",
         cover: "pictures/indus1.jpeg",
         details: [
         {
            text: "Celebrating innovation in Artificial Intelligence: her AI-based project was selected among 500+ entries from across Pakistan, earning recognition for its creativity, technical contribution, and real-world potential.",
            img: "pictures/indus2.jpeg",
            cap: "National Recognition"
         },
         {
            text: "Honoring women in technology: she received the Women in Tech Award at Indus AI Week, highlighting her contribution to innovation and the growing role of women in Artificial Intelligence.",
            img: "pictures/indus3.jpeg",
            cap: "Women in Tech"
        }
    ]
}

        // Add a 4th, 5th, etc. object here — they'll automatically form page 2, page 3, ...
    ];
 
    const spotlightPerPage = 3;
    const spotlightSlotConfig = [
        { cls: "card-a", badgeCls: "", badgeLabel: "", reveal: "left", delay: "0" },
        { cls: "card-b", badgeCls: "", badgeLabel: "", reveal: "pop", delay: "1" },
        { cls: "card-c", badgeCls: "", badgeLabel: "", reveal: "right", delay: "2" }
    ];
 
    const spotlightGridEl = document.getElementById("spotlightGrid");
    const spotlightPrevBtn = document.getElementById("spotlightPrev");
    const spotlightNextBtn = document.getElementById("spotlightNext");
    const spotlightDotsWrap = document.getElementById("spotlightDots");
 
    if (spotlightGridEl && spotlightPrevBtn && spotlightNextBtn && spotlightDotsWrap) {
 
        const spotlightPageCount = Math.ceil(pressData.length / spotlightPerPage);
        let spotlightPage = 0;
 
        function buildSpotlightCard(item, slot, uid) {
            const detailId = `spotlight-detail-${uid}`;
            const detailsHTML = item.details.map(d => `
                <div class="detail-row">
                    <p class="detail-text">${d.text}</p>
                    <div class="polaroid">
                        <img src="${d.img}" alt="" loading="lazy">
                        <span class="polaroid-cap">${d.cap}</span>
                    </div>
                </div>`).join("");
 
            return `
                <article class="spotlight-card ${slot.cls}" data-reveal="${slot.reveal}" data-reveal-delay="${slot.delay}">
                    <span class="spotlight-badge ${slot.badgeCls}">${slot.badgeLabel}</span>
 
                    <div class="press-thumb">
                        <img src="${item.cover}" alt="" loading="lazy">
                    </div>
 
                    <p class="press-kicker">${item.kicker}</p>
                    <div class="press-logo">${item.logo}</div>
                    <p class="press-quote">"${item.quote}"</p>
 
                    <button class="expand-toggle" type="button" aria-expanded="false" aria-controls="${detailId}">
                        <svg class="chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                        <span class="sr-only">Show more about this feature</span>
                    </button>
 
                    <div class="expand-wrap" id="${detailId}">
                        <div class="expand-inner">${detailsHTML}</div>
                    </div>
                </article>`;
        }
 
        function renderSpotlightPage() {
            spotlightGridEl.innerHTML = "";
            for (let i = 0; i < spotlightPerPage; i++) {
                const dataIdx = spotlightPage * spotlightPerPage + i;
                
                // Check if an item exists for this slot. If not, render an empty/placeholder slot to keep layout clean.
                if (dataIdx < pressData.length) {
                    const item = pressData[dataIdx];
                    spotlightGridEl.insertAdjacentHTML("beforeend", buildSpotlightCard(item, spotlightSlotConfig[i], `${spotlightPage}-${i}`));
                } else {
                    // Leaves the remaining grid slots empty instead of looping back to the start
                    spotlightGridEl.insertAdjacentHTML("beforeend", `<div class="spotlight-card empty-slot ${spotlightSlotConfig[i].cls}" style="visibility: hidden; pointer-events: none;"></div>`);
                }
            }
            revealElements(spotlightGridEl.querySelectorAll('[data-reveal]'));
            updateSpotlightDots();
            updateSpotlightNavButtons();
        }
 
        function updateSpotlightDots() {
            spotlightDotsWrap.innerHTML = "";
            for (let p = 0; p < spotlightPageCount; p++) {
                const dot = document.createElement("span");
                dot.className = "spotlight-dot" + (p === spotlightPage ? " is-active" : "");
                spotlightDotsWrap.appendChild(dot);
            }
        }
 
        function updateSpotlightNavButtons() {
            // Disable buttons at boundaries instead of infinite loop
            spotlightPrevBtn.disabled = spotlightPage === 0;
            spotlightNextBtn.disabled = spotlightPage >= spotlightPageCount - 1;
            
            // Optional: style disabled buttons visually if you have CSS for it
            spotlightPrevBtn.style.opacity = spotlightPage === 0 ? "0.5" : "1";
            spotlightNextBtn.style.opacity = spotlightPage >= spotlightPageCount - 1 ? "0.5" : "1";
        }
 
        spotlightPrevBtn.addEventListener("click", () => {
            if (spotlightPage > 0) {
                spotlightPage--;
                renderSpotlightPage();
            }
        });
 
        spotlightNextBtn.addEventListener("click", () => {
            if (spotlightPage < spotlightPageCount - 1) {
                spotlightPage++;
                renderSpotlightPage();
            }
        });
 
        renderSpotlightPage();
    } else {
        console.warn("⚠️ Spotlight Warning: Couldn't find spotlight grid/nav elements in HTML.");
    }
});
document.addEventListener('DOMContentLoaded', () => {
 
  var section = document.getElementById('experience');
 
  if (!section) {
    console.warn("⚠️ Experience section not found — check that your section has id=\"experience\".");
    return;
  }
 
  var animated = false;
 
  function animateBars(){
    if (animated) return;
    animated = true;
 
    var skills = section.querySelectorAll('.skill');
 
    if (!skills.length) {
      console.warn("⚠️ No .skill elements found inside #experience — check your HTML markup.");
      return;
    }
 
    skills.forEach(function(skill){
      var target = parseInt(skill.getAttribute('data-percent'), 10);
      var fill = skill.querySelector('.skill__fill');
      var label = skill.querySelector('.skill__percent');
      var suffix = skill.getAttribute('data-suffix') || ''; // e.g. "+"
 
      if (isNaN(target) || !fill || !label) {
        console.warn("⚠️ A .skill element is missing data-percent, .skill__fill, or .skill__percent.", skill);
        return;
      }
 
      // bar still fills based on percentage width — this part is unchanged
      var barWidth = Math.min(target, 100);
     requestAnimationFrame(function(){
      fill.style.width = barWidth + '%';
     });
 
      // number counts up but displays as a plain number, no % sign
      var duration = 1200; // ms, matches the CSS transition on .skill__fill
      var startTime = null;
 
      function step(timestamp){
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var current = Math.round(progress * target);
       label.textContent = current.toLocaleString() + (progress === 1 ? suffix : ''); // <-- no '%' appended anymore
        if (progress < 1){
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    });
  }
 
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          animateBars();
          observer.disconnect(); // only ever run once
        }
      });
    }, { threshold: 0.3 });
 
    observer.observe(section);
  } else {
    animateBars();
  }
 
});
 