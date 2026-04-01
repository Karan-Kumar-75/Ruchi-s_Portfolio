// ==============================================
// RUCHI SHARMA - PORTFOLIO JAVASCRIPT
// Features: Hamburger menu, Smooth scroll,
//           Contact form, Scroll effects
// ==============================================


// ---- 1. ELEMENT REFERENCES ----
const navbar       = document.getElementById('navbar');
const hamburger    = document.getElementById('hamburger');
const navLinks     = document.getElementById('nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const contactForm  = document.getElementById('contact-form');
const backToTop    = document.getElementById('back-to-top');


// ============================================
// 2. HAMBURGER MENU (Mobile Toggle)
// ============================================
hamburger.addEventListener('click', () => {
  // Toggle the 'open' class on both hamburger and nav-links
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);

  // Update ARIA attribute for accessibility
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close the mobile menu when a nav link is clicked
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu if user clicks outside of it
document.addEventListener('click', (e) => {
  const clickedInsideNav = navLinks.contains(e.target) || hamburger.contains(e.target);
  if (!clickedInsideNav && navLinks.classList.contains('open')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});


// ============================================
// 3. SCROLL EFFECTS
//    - Navbar shadow on scroll
//    - Back-to-top button visibility
//    - Active nav link highlighting
// ============================================
function onScroll() {
  const scrollY = window.scrollY;

  // Add/remove shadow on navbar
  navbar.classList.toggle('scrolled', scrollY > 20);

  // Show/hide back-to-top button
  backToTop.classList.toggle('visible', scrollY > 400);

  // Highlight active nav link based on visible section
  updateActiveNavLink();
}

window.addEventListener('scroll', onScroll, { passive: true });


// ============================================
// 4. ACTIVE NAV LINK (Scroll Spy)
//    Highlights the correct nav item as
//    the user scrolls through sections.
// ============================================
function updateActiveNavLink() {
  // All sections that match a nav link
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach(section => {
    // Offset to trigger a bit before reaching section top
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  // Update active class
  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}


// ============================================
// 5. BACK TO TOP BUTTON
// ============================================
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============================================
// 6. CONTACT FORM — Submit Handler
//    Shows a success alert on submission.
// ============================================
contactForm.addEventListener('submit', function(e) {
  // Prevent default form reload
  e.preventDefault();

  // Get field values
  const nameValue    = document.getElementById('name').value.trim();
  const emailValue   = document.getElementById('email').value.trim();
  const messageValue = document.getElementById('message').value.trim();

  // Basic validation: check all fields are filled
  if (!nameValue || !emailValue || !messageValue) {
    alert('⚠️ Please fill in all fields before submitting.');
    return;
  }

  // Simple email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailValue)) {
    alert('⚠️ Please enter a valid email address.');
    return;
  }

  // Show success message
  alert(`✅ Thank you, ${nameValue}!\n\nYour message has been received. I'll get back to you soon!`);

  // Reset form fields after submission
  contactForm.reset();
});


// ============================================
// 7. FADE-IN ANIMATION ON SCROLL
//    Uses IntersectionObserver to animate
//    elements as they enter the viewport.
// ============================================
function setupFadeAnimations() {
  // Add 'fade-in' class to all section children
  const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .contact-card, .info-card, .about-text, .about-avatar'
  );

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
  });

  // Create an observer that watches when elements come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a slight staggered delay for a nice cascade effect
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 80);

          // Stop observing once visible
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,    // Trigger when 10% of element is visible
      rootMargin: '0px 0px -40px 0px'
    }
  );

  // Observe each element
  animatedElements.forEach(el => observer.observe(el));
}

// Run fade animation setup once the page loads
setupFadeAnimations();


// ============================================
// 8. SKILL PROGRESS BAR ANIMATION
//    Animates skill bars when the skills
//    section scrolls into view.
// ============================================
function setupSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger the CSS animation by re-applying the element
          entry.target.style.animationPlayState = 'running';
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach(bar => {
    // Pause animation initially (will play when visible)
    bar.style.animationPlayState = 'paused';
    skillObserver.observe(bar);
  });
}

setupSkillBars();


// ============================================
// 9. SMOOTH SCROLL for anchor links
//    (Redundant fallback for older browsers
//    that don't support CSS scroll-behavior)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');

    // Skip if it's just '#'
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// ============================================
// 10. PAGE LOAD — Initial setup
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Run scroll once to set initial active link
  updateActiveNavLink();

  // Log a friendly greeting in the console
  console.log('👋 Hello! Welcome to Ruchi Sharma\'s Portfolio.');
  console.log('📬 Portfolio by: Ruchi Sharma | BCA Student, RKDF University');
});
