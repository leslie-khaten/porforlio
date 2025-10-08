// Custom Cursor Animation Script
document.addEventListener('DOMContentLoaded', function() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  // Check if cursor elements exist
  if (!cursorDot || !cursorOutline) {
    return; // Exit if cursor elements are not found
  }
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  let trailPositions = [];
  
  // Track mouse movement
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    
    // Create trail effect
    createTrail(mouseX, mouseY);
    
    // Create particles occasionally
    if (Math.random() < 0.3) {
      createParticle(mouseX, mouseY);
    }
  });
  
  // Create trail effect
  function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
      trail.remove();
    }, 500);
  }
  
  // Create particle effect
  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
    particle.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 800);
  }
  
  // Animate outline with smooth following
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .button, .zoomable, .card');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hover');
      cursorOutline.classList.add('hover');
      
      // Create burst of particles on hover
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createParticle(mouseX, mouseY);
        }, i * 50);
      }
    });
    
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hover');
      cursorOutline.classList.remove('hover');
    });
  });
  
  // Click effect
  document.addEventListener('click', function(e) {
    // Create burst of particles on click
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        createParticle(e.clientX, e.clientY);
      }, i * 30);
    }
    
    // Create expanding ring effect
    const ring = document.createElement('div');
    ring.style.position = 'fixed';
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
    ring.style.width = '10px';
    ring.style.height = '10px';
    ring.style.border = '2px solid #312579';
    ring.style.borderRadius = '50%';
    ring.style.pointerEvents = 'none';
    ring.style.zIndex = '10000';
    ring.style.transform = 'translate(-50%, -50%)';
    ring.style.animation = 'ringExpand 0.6s ease-out forwards';
    ring.style.mixBlendMode = 'difference';
    document.body.appendChild(ring);
    
    setTimeout(() => {
      ring.remove();
    }, 600);
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
  });
});
