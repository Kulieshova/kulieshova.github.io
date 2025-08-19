(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  onReady(() => {
    const hero = document.getElementById('hero');
    if (hero) {
      if (!prefersReduced) {
        requestAnimationFrame(() => {
          hero.classList.add('hero--visible');
        });
      } else {
        hero.classList.add('hero--visible');
      }
    }

    // Experience orbit interactions
    const orbit = document.querySelector('.exp__orbit');
    const popoverRoot = document.getElementById('exp-popover');
    const popoverCard = popoverRoot?.querySelector('.exp-popover__content');
    const titleEl = popoverRoot?.querySelector('.exp-popover__title');
    const bodyEl = popoverRoot?.querySelector('.exp-popover__body');
    const closeBtn = popoverRoot?.querySelector('.exp-popover__close');

    let anchorBtn = null;

    function openPopoverFor(button) {
      if (!popoverRoot || !popoverCard || !titleEl || !bodyEl) return;
      anchorBtn = button;
      titleEl.textContent = button.getAttribute('data-title') || '';
      bodyEl.textContent = button.getAttribute('data-body') || '';
      positionPopover();
      popoverRoot.classList.add('open');
      popoverRoot.setAttribute('aria-hidden', 'false');
      document.addEventListener('keydown', onKey, { once: false });
      window.addEventListener('resize', positionPopover);
      window.addEventListener('scroll', positionPopover, { passive: true });
    }

    function closePopover() {
      if (!popoverRoot) return;
      popoverRoot.classList.remove('open');
      popoverRoot.setAttribute('aria-hidden', 'true');
      anchorBtn = null;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', positionPopover);
      window.removeEventListener('scroll', positionPopover);
    }

    function onKey(e) {
      if (e.key === 'Escape') closePopover();
    }

    function positionPopover() {
      if (!anchorBtn || !popoverCard || !popoverRoot) return;
      const anchorRect = anchorBtn.getBoundingClientRect();
      const centerX = anchorRect.left + anchorRect.width / 2;
      const centerY = anchorRect.top + anchorRect.height / 2;
      popoverCard.style.left = `${centerX}px`;
      popoverCard.style.top = `${centerY}px`;
    }

    if (orbit && popoverRoot) {
      orbit.addEventListener('click', (e) => {
        const target = e.target.closest('.orbit__item');
        if (!target) return;
        if (anchorBtn === target && popoverRoot.classList.contains('open')) {
          closePopover();
        } else {
          openPopoverFor(target);
        }
      });

      document.addEventListener('click', (e) => {
        const withinPopover = e.target.closest('#exp-popover .exp-popover__content');
        const withinButton = e.target.closest('.orbit__item');
        if (!withinPopover && !withinButton) closePopover();
      });

      if (closeBtn) closeBtn.addEventListener('click', closePopover);
    }

    // Projects section - Hover Magnification with Push Physics
    const projectsStage = document.getElementById('projectsStage');
    const projectBubbles = document.querySelectorAll('.project-bubble');
    const projectModal = document.getElementById('projectModal');
    
    if (projectsStage && projectBubbles.length > 0) {
      const containerWidth = 800;
      const containerHeight = 400;
      const centerY = containerHeight / 2;
      
      // Physics objects for each bubble
      const balls = [];
      let hoveredBall = null;
      let mouseX = 0;
      let mouseY = 0;
      
      // Define size variations
      const bubbleSizes = [
        { size: 45, weight: 6 },
        { size: 55, weight: 8 },
        { size: 65, weight: 4 },
        { size: 75, weight: 2 }
      ];
      
      function getRandomBubbleSize() {
        const totalWeight = bubbleSizes.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let item of bubbleSizes) {
          random -= item.weight;
          if (random <= 0) {
            return item.size;
          }
        }
        return bubbleSizes[0].size;
      }
      
      // Normal distribution function (Box-Muller transform)
      function normalRandom(mean = 0, stdDev = 1) {
        let u1 = Math.random();
        let u2 = Math.random();
        let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return z0 * stdDev + mean;
      }
      
      // Create structured, even distribution across entire container
      function createStructuredDistribution(containerWidth, containerHeight, totalBubbles) {
        const positions = [];
        const padding = 40; // Reduced padding to use more space
        
        // Calculate available space
        const availableWidth = containerWidth - (padding * 2);
        const availableHeight = containerHeight - (padding * 2);
        
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        
        // Create even grid distribution with more coverage
        const cols = Math.ceil(Math.sqrt(totalBubbles * (availableWidth / availableHeight)));
        const rows = Math.ceil(totalBubbles / cols);
        
        // Calculate spacing to fill more of the container
        const colSpacing = availableWidth / (cols - 0.5); // Use more width
        const rowSpacing = availableHeight / (rows - 0.5); // Use more height
        
        let ballIndex = 0;
        
        for (let row = 0; row < rows && ballIndex < totalBubbles; row++) {
          // More random row offset
          const rowOffset = (row % 2) * (colSpacing * (0.05 + Math.random() * 0.15)); // Random offset between 5-20%
          
          for (let col = 0; col < cols && ballIndex < totalBubbles; col++) {
            // Base grid positioning with random offset
            let x = padding + colSpacing * (col + 0.25 + (Math.random() - 0.5) * 0.3) + rowOffset;
            let y = padding + rowSpacing * (row + 0.25 + (Math.random() - 0.5) * 0.3);
            
            // Increased organic variation for more randomness
            x += (Math.sin(ballIndex * 2.5 + Math.random() * 2) * (15 + Math.random() * 10)); // 15-25px variation
            y += (Math.cos(ballIndex * 1.8 + Math.random() * 2) * (12 + Math.random() * 8)); // 12-20px variation
            
            // Random center pull variation
            const distanceFromCenterX = x - centerX;
            const distanceFromCenterY = y - centerY;
            
            // Randomized center bias
            const centerPullX = 0.01 + Math.random() * 0.02; // 1-3% random center pull
            const centerPullY = 0.01 + Math.random() * 0.02;
            x -= distanceFromCenterX * centerPullX;
            y -= distanceFromCenterY * centerPullY;
            
            // Add some additional random scatter
            x += (Math.random() - 0.5) * 20; // ±10px random scatter
            y += (Math.random() - 0.5) * 16; // ±8px random scatter
            
            // Ensure bounds with minimal padding
            x = Math.max(padding, Math.min(containerWidth - padding, x));
            y = Math.max(padding, Math.min(containerHeight - padding, y));
            
            // Calculate distance from center for size determination (this stays the same)
            const distanceFromCenter = Math.sqrt(
              Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );
            
            positions.push({ x, y, distanceFromCenter });
            ballIndex++;
          }
        }
        
        return positions;
      }
      
      // Calculate size based on distance from center
      function getSizeBasedOnDistance(distanceFromCenter, maxDistance) {
        // Increased size ranges: center (95px) to edges (60px) - much larger than before
        const maxSize = 95; // Increased from 75px
        const minSize = 60; // Increased from 45px
        
        // Normalize distance (0 = center, 1 = max distance)
        const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        
        // Linear interpolation from max size (center) to min size (edges)
        const size = maxSize - (normalizedDistance * (maxSize - minSize));
        
        return Math.round(size);
      }
      
      // Check collision between two balls
      function checkBallCollision(ball1, ball2) {
        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Adjusted buffers for tighter but appropriate spacing
        const avgSize = (ball1.size + ball2.size) / 2;
        const baseBuffer = avgSize < 70 ? 10 : 8; // Reduced buffer for tighter spacing
        const sizeBuffer = Math.max(ball1.size, ball2.size) > 80 ? 12 : baseBuffer;
        const minDistance = ball1.radius + ball2.radius + sizeBuffer;
        
        return distance < minDistance;
      }
      
      // Resolve collision between two balls
      function resolveBallCollision(ball1, ball2) {
        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = ball1.radius + ball2.radius + 5;
        
        if (distance < minDistance && distance > 0) {
          // Calculate overlap
          const overlap = minDistance - distance;
          
          // Normalize direction
          const dirX = dx / distance;
          const dirY = dy / distance;
          
          // Separate balls based on their relative masses (sizes)
          const totalMass = ball1.size + ball2.size;
          const ball1Ratio = ball2.size / totalMass; // Lighter ball moves more
          const ball2Ratio = ball1.size / totalMass;
          
          // Move balls apart
          ball1.x -= dirX * overlap * ball1Ratio;
          ball1.y -= dirY * overlap * ball1Ratio;
          ball2.x += dirX * overlap * ball2Ratio;
          ball2.y += dirY * overlap * ball2Ratio;
          
          // Add repulsion velocities
          const repulsionStrength = 0.5;
          ball1.vx -= dirX * repulsionStrength * ball1Ratio;
          ball1.vy -= dirY * repulsionStrength * ball1Ratio;
          ball2.vx += dirX * repulsionStrength * ball2Ratio;
          ball2.vy += dirY * repulsionStrength * ball2Ratio;
        }
      }
      
      // Check distance between two balls
      function getDistance(ball1, ball2) {
        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
      
      // Apply push forces from magnified ball to others
      function applyPushForces() {
        if (!hoveredBall) return;
        
        const magnifiedRadius = hoveredBall.radius * 1.5; // Magnified size
        const pushDistance = magnifiedRadius + 30; // Push range
        
        balls.forEach(ball => {
          if (ball === hoveredBall) return;
          
          const distance = getDistance(hoveredBall, ball);
          
          if (distance < pushDistance) {
            // Calculate push direction
            const dx = ball.x - hoveredBall.x;
            const dy = ball.y - hoveredBall.y;
            const normalizedDistance = distance / pushDistance;
            
            // Stronger push when closer
            const pushStrength = (1 - normalizedDistance) * 3;
            
            if (distance > 0) {
              ball.pushForceX = (dx / distance) * pushStrength;
              ball.pushForceY = (dy / distance) * pushStrength;
            }
          } else {
            ball.pushForceX = 0;
            ball.pushForceY = 0;
          }
        });
      }
      
      // Initialize balls with structured distribution positioning
      function initializeBalls() {
        balls.length = 0;
        
        // Get structured positions
        const positions = createStructuredDistribution(containerWidth, containerHeight, projectBubbles.length);
        
        // Find max distance for size calculation
        const maxDistance = Math.max(...positions.map(p => p.distanceFromCenter));
        
        projectBubbles.forEach((bubble, index) => {
          // Calculate size based on distance from center
          const size = getSizeBasedOnDistance(positions[index].distanceFromCenter, maxDistance);
          const radius = size / 2;
          
          // Use pre-calculated structured position
          const x = positions[index].x;
          const y = positions[index].y;
          
          // Set initial bubble properties
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          bubble.style.fontSize = `${size * 0.4}px`;
          bubble.style.left = `${x - radius}px`;
          bubble.style.top = `${y - radius}px`;
          bubble.style.zIndex = '1'; // Same z-index for all
          
          // Create physics object
          const ball = {
            element: bubble,
            x: x,
            y: y,
            originalX: x, // Rest position
            originalY: y, // Rest position
            vx: 0,
            vy: 0,
            radius: radius,
            size: size,
            isHovered: false,
            pushForceX: 0,
            pushForceY: 0
          };
          
          balls.push(ball);
        });
      }
      
      // Update ball positions
      function updateBalls() {
        balls.forEach(ball => {
          if (ball === hoveredBall) {
            // Hovered ball follows mouse (with some constraints)
            const targetX = Math.max(ball.radius, Math.min(containerWidth - ball.radius, mouseX));
            const targetY = Math.max(ball.radius, Math.min(containerHeight - ball.radius, mouseY));
            
            ball.x += (targetX - ball.x) * 0.15; // Smooth following
            ball.y += (targetY - ball.y) * 0.15;
          } else {
            // Other balls return to rest position with push forces
            const restForceX = (ball.originalX - ball.x) * 0.08; // Stronger return force
            const restForceY = (ball.originalY - ball.y) * 0.08;
            
            // Apply forces
            ball.vx += restForceX + ball.pushForceX;
            ball.vy += restForceY + ball.pushForceY;
            
            // Apply stronger damping for quicker settling
            ball.vx *= 0.82;
            ball.vy *= 0.82;
            
            // Update position
            ball.x += ball.vx;
            ball.y += ball.vy;
            
            // Keep within bounds
            ball.x = Math.max(ball.radius, Math.min(containerWidth - ball.radius, ball.x));
            ball.y = Math.max(ball.radius, Math.min(containerHeight - ball.radius, ball.y));
          }
        });
        
        // Handle ball-to-ball collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            if (checkBallCollision(balls[i], balls[j])) {
              resolveBallCollision(balls[i], balls[j]);
            }
          }
        }
        
        // Update DOM positions and visual states
        balls.forEach(ball => {
          // Update DOM position
          ball.element.style.left = `${ball.x - ball.radius}px`;
          ball.element.style.top = `${ball.y - ball.radius}px`;
          
          // Update visual state - consistent z-index for all
          if (ball === hoveredBall) {
            ball.element.style.transform = 'scale(1.5)';
            ball.element.style.zIndex = '10'; // Slightly higher for hovered ball
            ball.element.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.5)';
          } else {
            ball.element.style.transform = 'scale(1)';
            ball.element.style.zIndex = '1'; // Same z-index for all non-hovered
            ball.element.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
          }
        });
        
        requestAnimationFrame(updateBalls);
      }
      
      // Mouse move handler
      function handleMouseMove(e) {
        const rect = projectsStage.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        // Find closest ball to mouse
        let closestBall = null;
        let closestDistance = Infinity;
        
        balls.forEach(ball => {
          const distance = Math.sqrt(
            Math.pow(mouseX - ball.x, 2) + Math.pow(mouseY - ball.y, 2)
          );
          
          if (distance < ball.radius + 20 && distance < closestDistance) {
            closestDistance = distance;
            closestBall = ball;
          }
        });
        
        // Update hovered ball
        if (closestBall !== hoveredBall) {
          hoveredBall = closestBall;
        }
        
        // Apply push forces
        applyPushForces();
      }
      
      // Mouse leave handler
      function handleMouseLeave() {
        hoveredBall = null;
        
        // Reset all push forces
        balls.forEach(ball => {
          ball.pushForceX = 0;
          ball.pushForceY = 0;
        });
      }
      
      // Modal functionality
      function openProjectModal(bubble) {
        if (!projectModal) return;
        
        const icon = projectModal.querySelector('.project-modal__icon');
        const title = projectModal.querySelector('.project-modal__title');
        const description = projectModal.querySelector('.project-modal__description');
        const tech = projectModal.querySelector('.project-modal__tech');
        
        if (icon) icon.textContent = bubble.textContent;
        if (title) title.textContent = bubble.dataset.title;
        if (description) description.textContent = bubble.dataset.description;
        if (tech) tech.setAttribute('data-tech', bubble.dataset.tech);
        
        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
      
      function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
      
      // Event listeners
      projectsStage.addEventListener('mousemove', handleMouseMove);
      projectsStage.addEventListener('mouseleave', handleMouseLeave);
      
      // Add click listeners to bubbles
      projectBubbles.forEach(bubble => {
        bubble.addEventListener('click', (e) => {
          e.preventDefault();
          openProjectModal(bubble);
        });
      });
      
      // Modal event listeners
      if (projectModal) {
        const closeModalBtn = projectModal.querySelector('.project-modal__close');
        const backdrop = projectModal.querySelector('.project-modal__backdrop');
        
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
        if (backdrop) backdrop.addEventListener('click', closeProjectModal);
        
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && projectModal.classList.contains('open')) {
            closeProjectModal();
          }
        });
      }
      
      // Initialize and start animation
      initializeBalls();
      updateBalls();
      
      // Reset on window resize
      window.addEventListener('resize', () => {
        setTimeout(() => {
          initializeBalls();
        }, 100);
      });
    }
  });
})(); 

// Blog Section - Category Filters
const blogFilters = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
const loadMoreBtn = document.querySelector('.btn--load-more');

if (blogFilters.length > 0) {
  blogFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Remove active class from all filters
      blogFilters.forEach(f => f.classList.remove('filter-btn--active'));
      
      // Add active class to clicked filter
      filter.classList.add('filter-btn--active');
      
      // Get selected category
      const selectedCategory = filter.getAttribute('data-category');
      
      // Filter blog cards
      blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Load More functionality (placeholder)
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    // Placeholder for load more functionality
    console.log('Load more blog posts...');
    
    // Add loading state
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading
    setTimeout(() => {
      loadMoreBtn.textContent = 'Load More';
      loadMoreBtn.disabled = false;
    }, 2000);
  });
}

// Add fadeInUp animation keyframes to CSS if not already present
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style); 