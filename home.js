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
const teamMembers = [

    {
        name: "Mashaal Jawad",
        role: "Founder, CEO & Chief Strategist",
        image: "pictures/mashaal.png",
        theme: "light",
        bio: "At STEMverse, I lead the vision, strategy, and development of innovative STEM education experiences that bridge technology, creativity, and real-world problem-solving. I drive initiatives that transform the way students engage with coding, AI, robotics, and emerging technologies, creating an environment where learning is not only impactful but exciting, practical, and future-focused."
    },
   {
        name: "Qurat-ul-Ain",
        role: "Co-Founder & COO",
        image: "pictures/qurat.png",
        theme: "light",
        bio: "I lead the organization’s operational strategy and growth, overseeing the execution of key initiatives, strengthening internal systems, and ensuring effective collaboration across teams. I focus on building efficient processes, maintaining organizational alignment, and turning our vision into impactful, scalable outcomes."
    },
    {
        name: "Muzammil Qarni",
        role: "Business Developnment Manager",
        image: "pictures/muzammil.png",
        theme: "light",
        bio: "As Business Development Lead at STEMverse, I drive business growth through strategic partnerships, client relationships, and market expansion, identifying new opportunities and building collaborations that strengthen STEMverse’s reach and impact.",
       contactBtn: '<a href="/connect/muzammil" class="contact-btn">Contact</a>'
    },
    {
        name: "Maheen Arshad",
        role: "Engineering Team Lead",
        image: "pictures/maheen.jpeg",
        theme: "light",
        bio: "I lead engineering initiatives and oversee the development of innovative, real-world STEM projects, transforming ideas into practical and engaging learning experiences."
    },
    {
        name: "Adeya Khan",
        role: "Web Developer & STEM Instructor",
        image: "pictures/ADEYA.jpeg",
        theme: "light",
        bio: "As a Web Developer & STEM Instructor at STEMverse, I’m the one behind the website and the fun, hands-on STEM experiences. From building digital experiences to teaching coding and turning ideas into real projects, I make sure learning stays creative, practical, and enjoyable."
    },
    {
        name: "Hamna Anjum",
        role: "STEM Instructor (3D Printing & AI)",
        image: "pictures/hamna.png",
        theme: "light",
        bio: "I bring ideas to life through creative 3D projects and exciting AI activities, helping students explore emerging technologies while learning by creating, experimenting, and having fun."
    },
     {
        name: "Qudsia Bano",
        role: "Outreach and Partnership Manager",
        image: "pictures/qudsiabano.png",
        theme: "light",
        bio: "As Outreach & Partnership Manager at STEMverse, I build meaningful relationships and partnerships, connecting STEMverse with schools, organizations, and new opportunities to grow our community and expand our impact."
    },
    {
        name: "Sanam Hussani",
        role: "Content & Social Media",
        image: "pictures/sanam.png",
        theme: "light",
        bio: "I’m the one behind STEMverse’s social media — from creating fun, engaging content and Insta videos to managing our digital presence and making sure STEMverse stays active, creative, and connected with its audience."
    },
    {
        name: "Haseeb Afridi",
        role: "Full Stack Developer",
        image: "pictures/haseb.ipeg",
        theme: "light",
        bio: "As a Full Stack Developer at STEMverse, I’m the one behind the app you see — building and managing everything from the user interface to the backend, turning ideas into smooth, functional, and user-friendly digital experiences."
    },
    {
        name: "Member Two",
        role: "Robotics Instructor",
        image: "images/member2.jpg",
        bio: "Passionate about robotics and engineering, helping students turn creative ideas into exciting hands-on projects."
    },

    {
        name: "Member Three",
        role: "AI Specialist",
        image: "images/member3.jpg",
        bio: "Exploring artificial intelligence and helping students understand AI through practical and creative learning."
    }

];


let currentMember = 0;

const teamSection = document.querySelector(".team-section"); // Selects the section element
const memberImage = document.getElementById("memberImage");
const background = document.querySelector(".team-background");
const memberName = document.getElementById("memberName");
const memberRole = document.getElementById("memberRole");
const memberBio = document.getElementById("memberBio");
const memberContactBtn = document.getElementById("memberContactBtn");

function showMember(index) {
    const member = teamMembers[index];

    // Front image & background
    memberImage.src = member.image;
    background.style.backgroundImage = `url("${member.image}")`;

    // Information text
    memberName.textContent = member.name;
    memberRole.textContent = member.role;
    memberBio.textContent = member.bio;

    // Optional contact button handling
    if (member.contactBtn) {
        memberContactBtn.innerHTML = member.contactBtn;
    } else {
        memberContactBtn.innerHTML = "";
    }

    // ---> THIS IS WHAT ACTUALLY CHANGES THE THEME CLASS <---
    if (member.theme === "light") {
        teamSection.classList.add("navy-theme");
    } else {
        teamSection.classList.remove("navy-theme");
    }
}

// Previous button
document.getElementById("previousMember").addEventListener("click", () => {
    currentMember--;
    if (currentMember < 0) {
        currentMember = teamMembers.length - 1;
    }
    showMember(currentMember);
});

// Next button
document.getElementById("nextMember").addEventListener("click", () => {
    currentMember++;
    if (currentMember >= teamMembers.length) {
        currentMember = 0;
    }
    showMember(currentMember);
});

// Load first member on page load
showMember(currentMember);