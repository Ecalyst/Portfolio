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
    'Physics & Engineering Student',
    'Materials Characterization',
    'Scientific Computing Enthusiast',
    'Research-Driven Engineer'
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
    card.addEventListener('mouseenter', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
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
    }
};

// Open modal function
function openModal(modalId) {
    const data = modalData[modalId];
    if (!data) return;

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
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for opening modal
document.querySelectorAll('[data-modal]').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = element.getAttribute('data-modal');
        openModal(modalId);
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

// ===== Hero Particles Animation - CERN Accelerator Style =====
const canvas = document.getElementById('hero-particles');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let acceleratorParticles = [];
    let collisionEffects = [];
    let centerX, centerY, maxRadius;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        maxRadius = Math.min(canvas.width, canvas.height) * 0.35;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Accelerator ring colors
    const ringColors = [
        'hsla(200, 100%, 60%, 0.15)',
        'hsla(280, 100%, 60%, 0.12)',
        'hsla(340, 100%, 60%, 0.10)'
    ];

    // Particle in accelerator
    class AcceleratorParticle {
        constructor(ringIndex) {
            this.ringIndex = ringIndex;
            this.radius = maxRadius * (0.4 + ringIndex * 0.25);
            this.angle = Math.random() * Math.PI * 2;
            this.speed = (0.02 + Math.random() * 0.015) * (ringIndex % 2 === 0 ? 1 : -1);
            this.size = 2 + Math.random() * 2;
            this.trail = [];
            this.maxTrail = 15;
            this.hue = ringIndex === 0 ? 200 : ringIndex === 1 ? 280 : 340;
            this.opacity = 0.8 + Math.random() * 0.2;
        }

        update() {
            this.angle += this.speed;

            const x = centerX + Math.cos(this.angle) * this.radius;
            const y = centerY + Math.sin(this.angle) * this.radius;

            this.trail.unshift({ x, y });
            if (this.trail.length > this.maxTrail) {
                this.trail.pop();
            }

            this.x = x;
            this.y = y;
        }

        draw() {
            // Draw trail
            if (this.trail.length > 1) {
                ctx.beginPath();
                ctx.moveTo(this.trail[0].x, this.trail[0].y);
                for (let i = 1; i < this.trail.length; i++) {
                    ctx.lineTo(this.trail[i].x, this.trail[i].y);
                }
                const gradient = ctx.createLinearGradient(
                    this.trail[0].x, this.trail[0].y,
                    this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y
                );
                gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${this.opacity})`);
                gradient.addColorStop(1, `hsla(${this.hue}, 100%, 70%, 0)`);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.size * 0.8;
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            // Draw particle head
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, ${this.opacity})`;
            ctx.fill();

            // Glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, 0.2)`;
            ctx.fill();
        }
    }

    // Collision effect
    class CollisionEffect {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 30 + Math.random() * 20;
            this.opacity = 1;
            this.particles = [];

            for (let i = 0; i < 8; i++) {
                this.particles.push({
                    angle: (Math.PI * 2 / 8) * i,
                    speed: 2 + Math.random() * 3,
                    size: 1 + Math.random() * 2
                });
            }
        }

        update() {
            this.radius += 2;
            this.opacity -= 0.03;
            this.particles.forEach(p => {
                p.speed *= 0.95;
            });
            return this.opacity > 0;
        }

        draw() {
            // Expanding ring
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `hsla(60, 100%, 70%, ${this.opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Debris particles
            this.particles.forEach(p => {
                const px = this.x + Math.cos(p.angle) * this.radius * 0.8;
                const py = this.y + Math.sin(p.angle) * this.radius * 0.8;
                ctx.beginPath();
                ctx.arc(px, py, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(60, 100%, 80%, ${this.opacity})`;
                ctx.fill();
            });
        }
    }

    // Initialize particles - 3 rings with multiple particles each
    for (let ring = 0; ring < 3; ring++) {
        const particlesPerRing = 3 + ring;
        for (let i = 0; i < particlesPerRing; i++) {
            acceleratorParticles.push(new AcceleratorParticle(ring));
        }
    }

    // Trigger random collisions
    setInterval(() => {
        if (Math.random() > 0.6 && collisionEffects.length < 3) {
            const angle = Math.random() * Math.PI * 2;
            const radius = maxRadius * (0.5 + Math.random() * 0.4);
            collisionEffects.push(new CollisionEffect(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            ));
        }
    }, 1500);

    // Draw accelerator rings
    function drawRings() {
        for (let i = 0; i < 3; i++) {
            const radius = maxRadius * (0.4 + i * 0.25);
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = ringColors[i];
            ctx.lineWidth = 8;
            ctx.stroke();
        }

        // Center detector
        ctx.beginPath();
        ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(200, 100%, 60%, 0.3)';
        ctx.fill();
        ctx.strokeStyle = 'hsla(200, 100%, 70%, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Animation loop
    function animateAccelerator() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawRings();

        acceleratorParticles.forEach(p => {
            p.update();
            p.draw();
        });

        collisionEffects = collisionEffects.filter(c => {
            c.draw();
            return c.update();
        });

        requestAnimationFrame(animateAccelerator);
    }

    animateAccelerator();
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
