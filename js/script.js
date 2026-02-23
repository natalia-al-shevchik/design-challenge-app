// Design Challenge App - Main JavaScript
// Handles hint toggles, expand/collapse, node interactions

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== HINT TOGGLES =====
  
  // Get all hint toggle buttons (info icons)
  const hintToggles = document.querySelectorAll('.hint-toggle');
  
  // Add click listener to each toggle button
  hintToggles.forEach(button => {
    button.addEventListener('click', function() {
      // Find the next sibling element (the hint div)
      const hint = this.nextElementSibling;
      
      // Toggle the 'hidden' class
      hint.classList.toggle('hidden');
    });
  });
  
  // Get all hint close buttons (X icons)
  const hintCloses = document.querySelectorAll('.hint-close');
  
  // Add click listener to each close button
  hintCloses.forEach(button => {
    button.addEventListener('click', function() {
      // Find the parent hint div
      const hint = this.closest('.hint');
      
      // Add the 'hidden' class to hide it
      hint.classList.add('hidden');
    });
  });
  
});

// ===== CHALLENGE NODE CLICKS =====

// Get all challenge nodes
const challengeNodes = document.querySelectorAll('.challenge-node');

// Add click listener to each node
challengeNodes.forEach(node => {
  node.addEventListener('click', function() {
    // Get the challenge ID from data attribute
    const challengeId = this.getAttribute('data-challenge');
    
    // Find the corresponding challenge card
    const challengeCard = document.getElementById('challenge-' + challengeId);
    
    // Hide all challenges first
    const allChallenges = document.querySelectorAll('.challenge');
    allChallenges.forEach(challenge => {
      challenge.classList.add('hidden');
    });
    
    // Remove 'selected' class from all nodes
    challengeNodes.forEach(n => {
      n.classList.remove('selected');
    });
    
    // Show the clicked challenge
    challengeCard.classList.remove('hidden');
    
    // Add 'selected' class to clicked node
    this.classList.add('selected');
    
    // Optional: Scroll to the challenge card smoothly
    challengeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== EXPAND/COLLAPSE STEPS =====

// Get all expand buttons
const expandButtons = document.querySelectorAll('.expand-btn');

// Add click listener to each button
expandButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Find the additional-steps section in the same challenge
    const additionalSteps = this.previousElementSibling;
    
    // Find the button text span and arrow
    const buttonText = this.querySelector('span');
    const arrow = this.querySelector('.arrow-icon');
    
    // Toggle the hidden class on additional steps
    additionalSteps.classList.toggle('hidden');
    
    // Toggle the expanded class on the button (for arrow rotation)
    this.classList.toggle('expanded');
    
    // Change button text based on state
    if (additionalSteps.classList.contains('hidden')) {
      buttonText.textContent = 'Show more steps';
    } else {
      buttonText.textContent = 'Show less';
    }
  });
});

// ===== SPIN ANIMATION =====

// Get the spin button
const spinButton = document.querySelector('.spin');

// Add click listener
spinButton.addEventListener('click', function() {
  // Disable button during spin
  spinButton.disabled = true;
  
  // Get all challenge nodes (skip first child which is the spin button)
  const nodes = Array.from(document.querySelectorAll('.challenge-node'));
  
  // Choose random winner (0-9 for 10 nodes)
  const winner = Math.floor(Math.random() * nodes.length);
  
  let currentIndex = 0;
  let cycleCount = 0;
  const totalCycles = 2; // Go around the circle 2 times
  const speed = 100; // milliseconds between highlights
  
  // Cycling function
  const cycleInterval = setInterval(() => {
    // Remove highlight from all nodes
    nodes.forEach(node => node.classList.remove('selected'));
    
    // Highlight current node
    nodes[currentIndex].classList.add('selected');
    
    // Move to next node
    currentIndex++;
    
    // If we've gone through all nodes
    if (currentIndex >= nodes.length) {
      currentIndex = 0;
      cycleCount++;
      
      // After completing the cycles, stop on winner
      if (cycleCount >= totalCycles) {
        clearInterval(cycleInterval);
        
        // Final selection - stop on winner
        setTimeout(() => {
          nodes.forEach(node => node.classList.remove('selected'));
          nodes[winner].classList.add('selected');
          
          // Trigger click on winner node to show challenge
          nodes[winner].click();
          
          // Re-enable button
          spinButton.disabled = false;
        }, speed);
      }
    }
  }, speed);
});