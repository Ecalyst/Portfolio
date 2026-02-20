// ===== Reduced Motion Check =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== Keyboard vs Mouse Detection =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');

function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

setTheme(getPreferredTheme());

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'light' : 'dark');
    }
});

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for background
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Counter Animation Observer
const counterSection = document.querySelector('.hero-stats');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
        }
    });
}, observerOptions);

if (counterSection) {
    counterObserver.observe(counterSection);
}

// AOS (Animate On Scroll) Implementation
const animatedElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Apply delay if specified
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, parseInt(delay));
        }
    });
}, {
    ...observerOptions,
    threshold: 0.15
});

animatedElements.forEach(el => {
    aosObserver.observe(el);
});

// ===== Typing Animation =====
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Aerospace Engineering Student',
    'Space Systems Enthusiast',
    'Flight Operations Specialist',
    'ISAE-SUPAERO Student'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation after a delay
setTimeout(typeEffect, 1500);

// ===== Skill Bars Animation =====
const skillBars = document.querySelectorAll('.level-bar, .language-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'growBar 1s ease-out forwards';
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== Parallax Effect for Planet =====
const planet = document.querySelector('.planet');
const orbits = document.querySelectorAll('.orbit');

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;

    if (planet) {
        planet.style.transform = `translate(calc(-50% + ${xPercent * 10}px), calc(-50% + ${yPercent * 10}px))`;
    }
});

// ===== Active Navigation Link Highlight =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Add CSS for skill bar animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes growBar {
        from {
            width: 0;
        }
        to {
            width: var(--level);
        }
    }
    
    .nav-link.active {
        color: var(--text-primary);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===== Timeline Animation Enhancement =====
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            const marker = entry.target.querySelector('.timeline-marker');
            if (marker) {
                marker.style.animation = 'markerPop 0.5s ease-out forwards';
            }
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add marker animation
const markerStyle = document.createElement('style');
markerStyle.textContent = `
    @keyframes markerPop {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(markerStyle);

// ===== Card Hover Effects =====
const cards = document.querySelectorAll('.project-card, .edu-card, .highlight-card, .contact-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { left, top } = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - top}px`);
    });
});

// ===== Preloader (Optional Enhancement) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('aos-animate');
            }
        });
    }, 100);
});

// ===== Console Easter Egg =====
console.log('%c Welcome to Léo Quesnoit\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #4d7cfe;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #a0a0a0;');
console.log('%cLooking for a skilled aerospace engineer? Contact me at leo.quesnoit@gmail.com', 'font-size: 14px; color: #00d4aa;');

// ===== Modal System =====
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

// Detailed content for each modal
const modalData = {
    airbus: {
        badge: 'Current Position',
        title: 'Apprentice Engineer',
        subtitle: 'Airbus Defence and Space, Toulouse • 2023 - Present',
        content: `
            <h4>About the Mission</h4>
            <p>The Mars Sample Return (MSR) mission is one of the most ambitious space exploration endeavors ever undertaken. 
            Working on the Earth Return Orbiter (ERO), I am contributing to the spacecraft that will capture the sample container 
            left in Mars orbit by NASA's Sample Retrieval Lander and bring it back to Earth for scientific analysis.</p>
            
            <h4>My Responsibilities</h4>
            <ul>
                <li>Developing flight procedures for spacecraft operations, ensuring mission-critical sequences are robust and validated</li>
                <li>Testing and validating telemetry reception systems to ensure reliable data transmission between Earth and the spacecraft</li>
                <li>Designing telecommunication protocols for deep space communication scenarios</li>
                <li>Collaborating with international teams (ESA & NASA) on mission interface definitions</li>
                <li>Writing and maintaining operational documentation for flight control teams</li>
                <li>Participating in simulation campaigns to verify end-to-end mission scenarios</li>
            </ul>
            
            <h4>Technical Environment</h4>
            <div class="modal-skills">
                <span>Flight Dynamics</span>
                <span>Telemetry Systems</span>
                <span>CCSDS Standards</span>
                <span>Mission Operations</span>
                <span>Satellite Communications</span>
                <span>Python</span>
                <span>MATLAB</span>
            </div>
        `
    },
    thailand: {
        badge: 'International Experience',
        title: 'Intern Engineer',
        subtitle: 'Burapha University, Thailand • 2025 (10 weeks)',
        content: `
            <h4>Project Overview</h4>
            <p>This internship focused on applying artificial intelligence and machine learning techniques to solve 
            real-world energy management challenges. I worked in the Engineering Faculty's research laboratory 
            on developing predictive models for electricity consumption forecasting.</p>
            
            <h4>Key Achievements</h4>
            <ul>
                <li>Developed and fine-tuned machine learning models using Python (TensorFlow/Keras) to predict electricity consumption patterns</li>
                <li>Preprocessed and analyzed large datasets of historical energy consumption data</li>
                <li>Implemented feature engineering techniques to improve model accuracy by 15%</li>
                <li>Created data visualization dashboards to present predictions to stakeholders</li>
                <li>Collaborated with Thai researchers, enhancing cross-cultural communication skills</li>
                <li>Presented research findings to faculty members and industry partners</li>
            </ul>
            
            <h4>Technical Skills Applied</h4>
            <div class="modal-skills">
                <span>Machine Learning</span>
                <span>TensorFlow</span>
                <span>Python</span>
                <span>Data Analysis</span>
                <span>Time Series Forecasting</span>
                <span>Pandas</span>
                <span>NumPy</span>
            </div>
        `
    },
    cea: {
        badge: 'Research Experience',
        title: 'Research Intern',
        subtitle: 'CEA (French Alternative Energies Commission), Grenoble • 2023 (11 weeks)',
        content: `
            <h4>Research Context</h4>
            <p>The CEA is one of Europe's leading research institutions. I worked in the DTNM (Department of New Materials Technology), 
            focusing on the characterization of conductive inks for printed electronics applications, which have potential 
            uses in flexible circuits, sensors, and aerospace components.</p>
            
            <h4>Research Activities</h4>
            <ul>
                <li>Developed and applied protocols for electrical characterization using four-point probe measurements</li>
                <li>Performed morphological analysis using Scanning Electron Microscopy (SEM) and profilometry</li>
                <li>Studied the relationship between screen printing parameters and ink conductivity</li>
                <li>Analyzed the effects of curing temperature and time on electrical properties</li>
                <li>Documented experimental procedures and results in detailed technical reports</li>
                <li>Presented findings at weekly laboratory meetings</li>
            </ul>
            
            <h4>Equipment & Techniques Used</h4>
            <div class="modal-skills">
                <span>SEM Microscopy</span>
                <span>Electrical Characterization</span>
                <span>Screen Printing</span>
                <span>Profilometry</span>
                <span>Materials Analysis</span>
                <span>Lab Protocols</span>
                <span>Technical Writing</span>
            </div>
        `
    },
    sunspear: {
        badge: 'Club Project',
        title: 'Sunspear Hypersonic Rocket',
        subtitle: 'SCUBE Engineering Club, ISAE-SUPAERO • 2023 - Present',
        content: `
            <h4>Project Vision</h4>
            <p>Sunspear is an ambitious student project aiming to design, build, and launch a hypersonic rocket 
            capable of reaching 10km altitude. This places us among the few student teams worldwide 
            attempting such a technically challenging goal.</p>
            
            <h4>My Contributions</h4>
            <ul>
                <li><strong>Electronics Team:</strong> Designing and integrating avionics systems including telemetry, GPS tracking, and recovery systems</li>
                <li><strong>Sponsorship Team:</strong> Identifying and contacting potential industry sponsors, preparing sponsorship proposals and presentations</li>
                <li>Participating in system-level design reviews and technical documentation</li>
                <li>Contributing to ground station development for rocket telemetry reception</li>
                <li>Collaborating with 50+ team members across multiple engineering disciplines</li>
            </ul>
            
            <h4>Technical Challenges</h4>
            <ul>
                <li>Thermal management at hypersonic speeds</li>
                <li>Reliable recovery system deployment at high altitudes</li>
                <li>Robust communication system for real-time tracking</li>
                <li>Structural integrity under extreme aerodynamic loads</li>
            </ul>
            
            <h4>Technologies</h4>
            <div class="modal-skills">
                <span>Avionics</span>
                <span>Telemetry</span>
                <span>Propulsion</span>
                <span>Project Management</span>
                <span>SolidWorks</span>
                <span>Electronics Design</span>
            </div>
        `
    },
    course: {
        badge: 'Competition',
        title: 'Course En Cours',
        subtitle: 'National Competition • 2018',
        content: `
            <h4>About the Competition</h4>
            <p>Course En Cours is a prestigious French educational competition where student teams design, 
            build, and race miniature electric cars. This multidisciplinary challenge covers engineering, 
            marketing, and project management skills.</p>
            
            <h4>My Leadership Roles</h4>
            <ul>
                <li><strong>Head of Project:</strong> Coordinated a team of 6 students across all project phases from design to race day</li>
                <li><strong>Sponsor Manager:</strong> Secured partnerships with local businesses, raising funds for materials and equipment</li>
                <li>Managed project timeline and ensured deliverables were met on schedule</li>
                <li>Organized team meetings and delegated tasks according to member strengths</li>
                <li>Presented our project to jury members at regional and national competitions</li>
            </ul>
            
            <h4>Technical Work</h4>
            <ul>
                <li>CAD design of the car body using aerodynamic principles</li>
                <li>Selection and integration of electric motor and battery systems</li>
                <li>3D printing and composite material assembly</li>
                <li>Performance testing and iterative improvements</li>
            </ul>
            
            <h4>Skills Developed</h4>
            <div class="modal-skills">
                <span>Leadership</span>
                <span>CAD Design</span>
                <span>Aerodynamics</span>
                <span>Team Management</span>
                <span>Public Speaking</span>
                <span>Sponsorship</span>
            </div>
        `
    },
    ulm: {
        badge: 'Research Project',
        title: 'ULM Stall Alert Sensor',
        subtitle: 'IUT Applied Physics Project • 2022',
        content: `
            <h4>Project Background</h4>
            <p>Stall is a critical flight condition where the wing loses lift due to excessive angle of attack. 
            For ultralight aircraft (ULMs), which often lack sophisticated instrumentation, stall can be 
            particularly dangerous. This project aimed to develop an affordable, reliable stall warning system.</p>
            
            <h4>Technical Implementation</h4>
            <ul>
                <li>Designed a sensor system using pressure differential measurements to detect approaching stall conditions</li>
                <li>Programmed microcontroller (Arduino) to process sensor data and trigger visual/audio alerts</li>
                <li>Conducted wind tunnel testing to calibrate sensor thresholds</li>
                <li>Developed a compact, weather-resistant housing for the sensor unit</li>
                <li>Created user interface with clear warning indicators for pilots</li>
            </ul>
            
            <h4>Recognition</h4>
            <p>The project was selected for presentation at the 2022 Day of Science, where I demonstrated 
            the working prototype to visitors and explained the underlying physics and engineering principles.</p>
            
            <h4>Technologies Used</h4>
            <div class="modal-skills">
                <span>Arduino</span>
                <span>Pressure Sensors</span>
                <span>Aerodynamics</span>
                <span>Electronics</span>
                <span>3D Printing</span>
                <span>LabVIEW</span>
            </div>
        `
    },
    treasurer: {
        badge: 'Association Leadership',
        title: 'Apprenticeship Club Treasurer',
        subtitle: 'SUPAERO Apprenticeship Association • Since 2023',
        content: `
            <h4>About the Association</h4>
            <p>The SUPAERO Apprenticeship Club brings together all apprentice engineering students at ISAE-SUPAERO, 
            organizing events, managing resources, and representing apprentices within the school's student life.</p>
            
            <h4>Treasury Responsibilities</h4>
            <ul>
                <li>Managing the association's annual budget of several thousand euros</li>
                <li>Tracking all income and expenses with detailed accounting records</li>
                <li>Processing reimbursements and payments for club activities</li>
                <li>Preparing financial reports for the board and general assemblies</li>
                <li>Ensuring compliance with student association financial regulations</li>
                <li>Coordinating with the school's administration on funding matters</li>
            </ul>
            
            <h4>Events & Activities Supported</h4>
            <ul>
                <li>Integration events for new apprentices</li>
                <li>Networking events with industry professionals</li>
                <li>Technical workshops and skill-building sessions</li>
                <li>End-of-year gala and celebrations</li>
            </ul>
            
            <h4>Skills Applied</h4>
            <div class="modal-skills">
                <span>Financial Management</span>
                <span>Excel</span>
                <span>Budget Planning</span>
                <span>Team Collaboration</span>
                <span>Organization</span>
                <span>Communication</span>
            </div>
        `
    },
    supaero: {
        badge: 'Engineering Curriculum',
        title: 'Industrialization & Methods Engineer',
        subtitle: 'ISAE-SUPAERO Apprenticeship Program • 2023 - 2026',
        content: `
            <h4>Program Overview</h4>
            <p>A comprehensive 3-year engineering program combining academic excellence with extensive industrial 
            experience. The curriculum focuses on the industrialization of aerospace systems, bridging the gap 
            between R&D and Production.</p>
            
            <h4>Key Competencies</h4>
            <ul>
                <li><strong>Aerospace Engineering:</strong> Flight mechanics, aerodynamics, propulsion, aircraft architecture, and space systems design.</li>
                <li><strong>Industrialization & Methods:</strong> Manufacturing processes, quality management (Lean, Six Sigma), supply chain, and Industry 4.0 technologies.</li>
                <li><strong>Embedded Systems:</strong> Avionics, real-time systems, sensors, and telecommunications.</li>
                <li><strong>Project Management:</strong> Leading complex technical projects, financial analysis, and team management.</li>
            </ul>
            
            <h4>Core Modules & Projects</h4>
            <ul>
                <li><strong>Scientific Foundation:</strong> Applied Mathematics, Fluid Mechanics, Thermodynamics, Signal Processing.</li>
                <li><strong>Technical Projects:</strong>
                    <ul>
                        <li><em>Research & Development Project (100h):</em> Innovation in aerospace technologies.</li>
                        <li><em>Innovation & Design Project (90h):</em> End-to-end product development.</li>
                    </ul>
                </li>
                <li><strong>Digital Skills:</strong> Python programming, Data Analysis, AI, and CAD/CAM (CATIA, 3DExperience).</li>
            </ul>
            
            <h4>Professional Integration</h4>
            <p>The program involves 50% of the time spent at the company (Airbus Defence and Space), allowing for 
            progressive responsibility and direct application of academic concepts to real-world industrial challenges.</p>
            
            <div class="modal-skills">
                <span>Aerospace</span>
                <span>Industrialization</span>
                <span>Project Management</span>
                <span>Quality (Lean/Six Sigma)</span>
                <span>Systems Engineering</span>
                <span>Avionics</span>
            </div>
        `
    }
};

// Open modal function
let modalTriggerElement = null;

function openModal(modalId) {
    const data = modalData[modalId];
    if (!data) return;

    modalTriggerElement = document.activeElement;

    modalContent.innerHTML = `
        <div class="modal-header">
            <span class="modal-badge">${data.badge}</span>
            <h2 class="modal-title">${data.title}</h2>
            <p class="modal-subtitle">${data.subtitle}</p>
        </div>
        <div class="modal-body">
            ${data.content}
        </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for keyboard users
    setTimeout(() => modalClose.focus(), 100);
}

// Close modal function
function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Return focus to trigger element
    if (modalTriggerElement) {
        modalTriggerElement.focus();
        modalTriggerElement = null;
    }
}

// Event listeners for opening modal (click + keyboard)
document.querySelectorAll('[data-modal]').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = element.getAttribute('data-modal');
        openModal(modalId);
    });

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const modalId = element.getAttribute('data-modal');
            openModal(modalId);
        }
    });
});

// Event listeners for closing modal
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// ===== Scroll Progress Bar =====
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = progress + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// ===== Custom Cursor =====
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

if (cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth outline following
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .clickable, .project-card, .skill-card, .education-card, .timeline-content, input, textarea, [role="button"]');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '0.6';
    });
}

// ===== Hero Particles Animation =====
const canvas = document.getElementById('hero-particles');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let shootingStars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.5 + 0.3; // Fixed opacity, no blinking
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(220, 100%, 80%, ${this.opacity})`;
            ctx.fill();

            // Subtle glow effect for larger particles
            if (this.size > 1.5) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(220, 100%, 70%, ${this.opacity * 0.15})`;
                ctx.fill();
            }
        }
    }

    // Shooting star class
    class ShootingStar {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width * 1.5;
            this.y = -10;
            this.length = Math.random() * 80 + 40;
            this.speed = Math.random() * 15 + 10;
            this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
            this.opacity = 1;
            this.active = false;
        }

        update() {
            if (!this.active) return;

            this.x -= Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.opacity -= 0.015;

            if (this.opacity <= 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            if (!this.active || this.opacity <= 0) return;

            const tailX = this.x + Math.cos(this.angle) * this.length;
            const tailY = this.y - Math.sin(this.angle) * this.length;

            const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
            gradient.addColorStop(0, `hsla(220, 100%, 90%, ${this.opacity})`);
            gradient.addColorStop(1, `hsla(220, 100%, 90%, 0)`);

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Head glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(220, 100%, 95%, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize particles
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Initialize shooting stars
    for (let i = 0; i < 3; i++) {
        shootingStars.push(new ShootingStar());
    }

    // Randomly activate shooting stars
    setInterval(() => {
        const inactiveStar = shootingStars.find(s => !s.active);
        if (inactiveStar && Math.random() > 0.7) {
            inactiveStar.active = true;
        }
    }, 2000);

    // Animation loop with off-screen pause
    let particlesRunning = true;
    let animationFrameId = null;

    function animateParticles() {
        if (!particlesRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        shootingStars.forEach(s => {
            s.update();
            s.draw();
        });

        animationFrameId = requestAnimationFrame(animateParticles);
    }

    // Pause canvas when hero is off-screen
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!particlesRunning) {
                        particlesRunning = true;
                        animateParticles();
                    }
                } else {
                    particlesRunning = false;
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }
            });
        }, { threshold: 0 });
        heroObserver.observe(heroSection);
    }

    if (!prefersReducedMotion) {
        animateParticles();
    }
}

// ===== Section Reveal on Scroll =====
const revealSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
});

revealSections.forEach(section => {
    sectionObserver.observe(section);
});
