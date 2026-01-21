// ========================================
// Nova Waithaka Portfolio - Interactive Scripts
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initNavigation();
  initScrollEffects();
  initCounterAnimation();
  initPortfolioFilter();
  initBlogTabs();
  initContactForm();
  initScrollReveal();
});

// ========================================
// Navigation
// ========================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  });
}

// ========================================
// Scroll Effects
// ========================================
function initScrollEffects() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Parallax effect for hero background orbs
  const orbs = document.querySelectorAll('.gradient-orb');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    orbs.forEach((orb, index) => {
      const speed = 0.1 + (index * 0.05);
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// ========================================
// Counter Animation
// ========================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-count');
    const increment = target / speed;
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  };

  // Use Intersection Observer to trigger animation when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ========================================
// Portfolio Filter
// ========================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter projects with animation
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          card.style.display = 'block';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Add transition styles dynamically
  projectCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

// ========================================
// Blog Category Tabs
// ========================================
function initBlogTabs() {
  const tabs = document.querySelectorAll('.blog-tab');
  const blogCards = document.querySelectorAll('.blog-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-tab');

      // Filter blog posts with animation
      blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.display = 'block';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Add transition styles
  blogCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

// ========================================
// Contact Form
// ========================================
function initContactForm() {
  const form = document.getElementById('contact-form');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = `
      <span>Sending...</span>
      <svg class="spinner" viewBox="0 0 24 24" style="width: 18px; height: 18px; animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 70" />
      </svg>
    `;
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    submitBtn.innerHTML = `
      <span>Message Sent!</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;">
        <path d="M5 13l4 4L19 7"/>
      </svg>
    `;
    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

    // Reset form after delay
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  });

  // Add floating label effect
  const inputs = form?.querySelectorAll('input, textarea, select');
  inputs?.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

// ========================================
// Scroll Reveal Animation
// ========================================
function initScrollReveal() {
  // Add data-reveal attribute to elements you want to animate
  const revealElements = document.querySelectorAll(
    '.section-header, .project-card, .service-card, .blog-card, .about-content, .about-image, .contact-content, .contact-form'
  );

  revealElements.forEach(el => {
    el.setAttribute('data-reveal', '');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// Utility: Add CSS for spinner animation
// ========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .spinner {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);

// ========================================
// Optional: Typed Text Effect for Hero
// ========================================
function initTypedText() {
  const element = document.querySelector('.hero-title-accent');
  if (!element) return;

  const words = ['Decisions', 'Insights', 'Growth', 'Impact'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  // Uncomment to enable typed effect
  // setTimeout(type, 1500);
}

// ========================================
// Optional: Cursor Trail Effect
// ========================================
function initCursorTrail() {
  const trail = [];
  const trailLength = 20;

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.cssText = `
      position: fixed;
      width: ${8 - i * 0.3}px;
      height: ${8 - i * 0.3}px;
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${1 - i / trailLength};
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }

  let mouseX = 0, mouseY = 0;
  let positions = Array(trailLength).fill({ x: 0, y: 0 });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    positions.unshift({ x: mouseX, y: mouseY });
    positions.pop();

    trail.forEach((dot, i) => {
      dot.style.left = positions[i].x + 'px';
      dot.style.top = positions[i].y + 'px';
    });

    requestAnimationFrame(animate);
  }

  // Uncomment to enable cursor trail
  // animate();
}

// Log when script loads
console.log('✨ Nova Portfolio scripts loaded successfully');
