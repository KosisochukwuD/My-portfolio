document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. NAVIGATION MAPPING & SMOOTH SCROLLING
  // =========================================================
  
  // Define custom mapping between button/link clicks and target section IDs
  const sectionMap = {
    'home': '#hero',          // Scrolls to top hero section
    'about me': '#experience', // Scrolls to "WHAT I HAVE DONE SO FAR" / Experience
    'portfolio': '#portfolio', // Scrolls to Portfolio projects
    'skills': '#skills',      // Scrolls to Skills banner & grid
    'contact me': '#contact',  // Scrolls to Contact form
    'services': '#services'    // Services section if present
  };

  const navLinks = document.querySelectorAll('.nav-links a, .btn-contact');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Clean the text to match mapping keys
      const targetKey = link.innerText.trim().toLowerCase();
      const targetId = sectionMap[targetKey] || link.getAttribute('href');

      if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Smooth scroll to the section with offset for sticky navbar
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // =========================================================
  // 2. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // =========================================================
  const sections = document.querySelectorAll('section, header.hero-section');
  const mainNavLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    mainNavLinks.forEach(link => {
      link.classList.remove('active');
      const targetKey = link.innerText.trim().toLowerCase();
      
      // Match mapped IDs or direct hrefs
      if (
        (currentSectionId === 'hero' && targetKey === 'home') ||
        (currentSectionId === 'experience' && targetKey === 'about me') ||
        (currentSectionId === targetKey)
      ) {
        link.classList.add('active');
      }
    });
  });

  // =========================================================
  // 3. DYNAMIC TYPING EFFECT FOR HERO SUBTITLE
  // =========================================================
  const typingElement = document.querySelector('.typing-text');
  
  if (typingElement) {
    const roles = [
      "Front-End Developer",
      "UI/UX Designer",
      "Digital Strategist",
      "Medical Student"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typingSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // =========================================================
  // 4. SCROLL REVEAL ANIMATION (CARDS & SECTIONS)
  // =========================================================
  const revealElements = document.querySelectorAll(
    '.portfolio-card, .skill-card, .timeline-item, .contact-card, .skills-banner'
  );

  // Add base reveal class
  revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================================================
  // 5. CONTACT FORM INTERACTIVE FEEDBACK
  // =========================================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sendBtn = contactForm.querySelector('.btn-send');
      
      if (sendBtn) {
        sendBtn.textContent = 'Sending...';
        sendBtn.disabled = true;

        setTimeout(() => {
          sendBtn.textContent = 'Message Sent! ✓';
          sendBtn.style.backgroundColor = '#22c55e';
          sendBtn.style.color = '#ffffff';
          contactForm.reset();

          setTimeout(() => {
            sendBtn.textContent = 'Send';
            sendBtn.style.backgroundColor = '#ffffff';
            sendBtn.style.color = '#111111';
            sendBtn.disabled = false;
          }, 3000);
        }, 1200);
      }
    });
  }

});