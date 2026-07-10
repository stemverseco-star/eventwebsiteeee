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
                const itemWidth = firstItem.offsetWidth + 25; // Item width + gap
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

        // Initialize first profile card view
        showTeamMember(currentTeamIndex);

        teamNext.addEventListener('click', (e) => {
            e.preventDefault();
            currentTeamIndex = (currentTeamIndex + 1) % teamCards.length;
            showTeamMember(currentTeamIndex);
            console.log(`➡️ Showing team member index: ${currentTeamIndex}`);
        });

        teamPrev.addEventListener('click', (e) => {
            e.preventDefault();
            currentTeamIndex = (currentTeamIndex - 1 + teamCards.length) % teamCards.length;
            showTeamMember(currentTeamIndex);
            console.log(`⬅️ Showing team member index: ${currentTeamIndex}`);
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
            logoTrack.appendChild(clone);
        });
        console.log("🔄 Partner logos duplicated for infinite loop.");
    }
});