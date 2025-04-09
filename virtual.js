// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", () => {
  // Declare AOS
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })
      }
    })
  })

  // Species carousel functionality
  const speciesContainer = document.getElementById("speciesContainer")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  // Sample marine species data (in a real app, this would come from an API)
  const marineSpecies = [
    {
      name: "Blue Whale",
      scientificName: "Balaenoptera musculus",
      description: "The largest animal known to have ever existed, reaching a length of up to 30 meters.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Great White Shark",
      scientificName: "Carcharodon carcharias",
      description: "A large mackerel shark known for its impressive size and predatory behavior.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Giant Pacific Octopus",
      scientificName: "Enteroctopus dofleini",
      description: "The largest octopus species, known for its intelligence and problem-solving abilities.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Coral Polyp",
      scientificName: "Anthozoa",
      description: "Tiny marine invertebrates that form the foundation of coral reef ecosystems.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Manta Ray",
      scientificName: "Mobula birostris",
      description: 'Large rays with distinctive "horns" that can reach wingspans of up to 7 meters.',
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Sea Turtle",
      scientificName: "Cheloniidae",
      description: "Ancient marine reptiles that have existed for over 100 million years.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Populate species cards
  function populateSpeciesCards() {
    speciesContainer.innerHTML = ""
    marineSpecies.forEach((species) => {
      const card = document.createElement("div")
      card.className = "species-card"
      card.innerHTML = `
                <div class="species-image">
                    <img src="${species.image}" alt="${species.name}">
                </div>
                <h3>${species.name}</h3>
                <p class="scientific-name"><em>${species.scientificName}</em></p>
                <p>${species.description}</p>
                <button class="btn btn-outline-primary btn-sm">Learn More</button>
            `
      speciesContainer.appendChild(card)
    })
  }

  // Initialize species carousel
  if (speciesContainer) {
    populateSpeciesCards()

    // Carousel navigation
    let scrollAmount = 0
    const cardWidth = 330 // card width + margin

    nextBtn.addEventListener("click", () => {
      scrollAmount += cardWidth
      if (scrollAmount > (marineSpecies.length - 3) * cardWidth) {
        scrollAmount = (marineSpecies.length - 3) * cardWidth
      }
      speciesContainer.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    })

    prevBtn.addEventListener("click", () => {
      scrollAmount -= cardWidth
      if (scrollAmount < 0) {
        scrollAmount = 0
      }
      speciesContainer.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    })
  }

  // Bubble animation enhancement
  const bubblesContainer = document.querySelector(".bubbles-container")
  if (bubblesContainer) {
    // Create additional random bubbles
    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement("span")
      bubble.className = "bubble"

      // Random positioning and sizing
      const size = Math.random() * 30 + 10
      const left = Math.random() * 100
      const animationDuration = Math.random() * 15 + 5
      const animationDelay = Math.random() * 10

      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`
      bubble.style.left = `${left}%`
      bubble.style.animationDuration = `${animationDuration}s`
      bubble.style.animationDelay = `${animationDelay}s`

      bubblesContainer.appendChild(bubble)
    }
  }

  // Simulate API fetch for marine life data
  // In a real application, this would fetch data from an actual API
  function fetchMarineLifeData() {
    // Simulating API fetch with a Promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          oceanTemperature: 16.5,
          coralHealthIndex: 72,
          endangeredSpecies: 35,
          conservationAreas: 12,
        })
      }, 1000)
    })
  }

  // Use the simulated API data
  fetchMarineLifeData()
    .then((data) => {
      console.log("Marine life data loaded:", data)
      // In a real app, you would update UI elements with this data
    })
    .catch((error) => {
      console.error("Error fetching marine life data:", error)
    })

  // Interactive water ripple effect on click
  document.addEventListener("click", (e) => {
    // Create ripple element
    const ripple = document.createElement("div")
    ripple.className = "water-ripple"

    // Position the ripple at click coordinates
    ripple.style.left = `${e.clientX}px`
    ripple.style.top = `${e.clientY}px`

    // Add to body
    document.body.appendChild(ripple)

    // Remove after animation completes
    setTimeout(() => {
      ripple.remove()
    }, 2000)
  })

  // Add CSS for the water ripple effect
  const rippleStyle = document.createElement("style")
  rippleStyle.textContent = `
        .water-ripple {
            position: fixed;
            width: 10px;
            height: 10px;
            background: rgba(144, 224, 239, 0.3);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
            z-index: 9999;
            animation: ripple 2s ease-out;
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 0.5;
            }
            100% {
                transform: scale(100);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(rippleStyle)

  // Parallax effect for sections
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset

    // Apply parallax effect to elements with .parallax-element class
    document.querySelectorAll(".parallax-element").forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.5
      element.style.transform = `translateY(${scrollPosition * speed}px)`
    })
  })

  // Add underwater particle effect
  const particleContainer = document.createElement("div")
  particleContainer.className = "particle-container"
  document.body.appendChild(particleContainer)

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random properties
    const size = Math.random() * 5 + 2
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    const duration = Math.random() * 60 + 30
    const delay = Math.random() * 10

    // Apply styles
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.left = `${posX}%`
    particle.style.top = `${posY}%`
    particle.style.animationDuration = `${duration}s`
    particle.style.animationDelay = `${delay}s`

    particleContainer.appendChild(particle)
  }

  // Add CSS for particles
  const particleStyle = document.createElement("style")
  particleStyle.textContent = `
        .particle-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float-particle 60s linear infinite;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) translateX(100px);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(particleStyle)

  // Add interactive fish that follow cursor
  const fish = document.createElement("div")
  fish.className = "interactive-fish"
  fish.innerHTML = `<svg viewBox="0 0 100 50" width="50" height="25">
        <path d="M10,25 Q30,10 50,25 Q70,40 90,25 L95,30 L95,20 L90,25 Q70,10 50,25 Q30,40 10,25 Z" fill="#90e0ef" />
        <circle cx="85" cy="25" r="3" fill="#03045e" />
    </svg>`
  document.body.appendChild(fish)

  // Fish follows cursor with delay
  let mouseX = 0
  let mouseY = 0
  let fishX = window.innerWidth / 2
  let fishY = window.innerHeight / 2

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // Update fish position with smooth animation
  function animateFish() {
    // Calculate distance between fish and cursor
    const dx = mouseX - fishX
    const dy = mouseY - fishY

    // Move fish 5% of the distance to cursor (easing)
    fishX += dx * 0.05
    fishY += dy * 0.05

    // Apply position
    fish.style.left = `${fishX}px`
    fish.style.top = `${fishY}px`

    // Rotate fish based on movement direction
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI
    fish.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`

    requestAnimationFrame(animateFish)
  }

  animateFish()

  // Add CSS for interactive fish
  const fishStyle = document.createElement("style")
  fishStyle.textContent = `
        .interactive-fish {
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.1s ease;
            filter: drop-shadow(0 0 5px rgba(144, 224, 239, 0.5));
        }
    `
  document.head.appendChild(fishStyle)
})

var AOS
