/**
 * =========================================================================
 * 💖 ROMANTIC BIRTHDAY LOVE WEBSITE - MAIN APPLICATION
 * =========================================================================
 * 
 * WELCOME! This file controls the interactive story, love code unlock,
 * animations, photo galleries, letter, gift, and final question.
 * 
 * 🔧 HOW TO PERSONALIZE THIS WEBSITE:
 * 1. Change your girlfriend's name and your name in CONFIG below.
 * 2. Set your custom 4-digit Love Code (default: "1437").
 * 3. Place your photos in the /assets/ folder:
 *      - hero.jpg            -> Main romantic hero photo
 *      - little-world.jpg    -> Chapter 1 story photo
 *      - memory-polaroid.jpg -> Polaroid candid memory photo
 *      - memory-film.jpg     -> Film strip romantic beach/cafe photo
 *      - memory-roses.jpg    -> Rose bouquet / heart memory photo
 *      - memory-then.jpg     -> Early dating memory photo
 *      - memory-now.jpg      -> Recent birthday celebration photo
 *      - forever.jpg         -> Final romantic question & ending photo
 * 4. (Optional) Place audio files in /assets/:
 *      - birthday.mp3   -> Birthday voice recording or birthday song
 *      - music.mp3      -> Romantic background music
 *      - heartbeat.mp3  -> Custom heartbeat sound
 *      - letter.mp3     -> Voice recording of you reading the love letter
 * 5. Edit the love letter text in the loveLetter variable below.
 * 
 * =========================================================================
 */

// =========================================================================
// 1. CENTRAL CONFIGURATION OBJECT
// =========================================================================
const CONFIG = {
  // Names to display across headings & letters
  girlfriendName: "My Love",
  yourName: "Yours Truly",

  // 4-Digit PIN to unlock the secret website (default: "1048")
  loveCode: "1048",

  // Audio files: happy-birthday.ogg plays on unlock, Pesamale.mp3 plays in repeat mode throughout the website
  birthdayAudio: "assets/happy-birthday.ogg",
  backgroundMusic: "assets/Pesamale.mp3",
  heartbeatAudio: "assets/heartbeat.mp3",
  letterAudio: "assets/Pesamale.mp3",

  // Main visual paths
  heroImage: "assets/couple.jpg",

  // Feature toggles
  enableSound: true,
  enableParticles: true,
  enableParallax: true
};

// =========================================================================
// 2. MEMORIES CONFIGURATION (Template G - Swipeable Cards, zero duplicates)
// =========================================================================
const memories = [
  {
    image: "assets/first-photo.jpg",
    title: "Our Very First Photo",
    text: "The day our story began — shy smiles, fast heartbeats, and the start of our forever."
  },
  {
    image: "assets/1.jpg",
    title: "Where It All Began",
    text: "A simple hello that changed everything in both our lives forever."
  },
  {
    image: "assets/2.jpg",
    title: "The First Spark",
    text: "The way you laughed, the way time completely froze when I looked at you."
  },
  {
    image: "assets/3.jpg",
    title: "Sweet Little Moments",
    text: "Silly inside jokes and the pure comfort of being completely ourselves together."
  },
  {
    image: "assets/4.jpg",
    title: "Floating on Clouds",
    text: "Every second looking at you feels like pure cinematic poetry."
  },
  {
    image: "assets/5.jpg",
    title: "A Quiet Whisper",
    text: "Holding your hand in quiet peace, knowing no place on earth is warmer."
  },
  {
    image: "assets/6.jpg",
    title: "Days We Treasure",
    text: "Unforgettable laughter and sweet memories that I replay in my heart everyday."
  },
  {
    image: "assets/7.jpg",
    title: "Growing in Love",
    text: "Celebrating you — your beauty, your warmth, and the happiness you bring."
  },
  {
    image: "assets/cute.jpg",
    title: "That Adorable Smile",
    text: "Your cute smile has the power to brighten up my darkest days in an instant."
  },
  {
    image: "assets/astetic.jpg",
    title: "Aesthetic Evenings",
    text: "Golden skies, calm breezes, and endless conversations by the shore."
  },
  {
    image: "assets/romantics-view.jpg",
    title: "Our Little World",
    text: "Looking out towards the future with you, ready for every tomorrow together."
  },
  {
    image: "assets/couple.jpg",
    title: "Together By Your Side",
    text: "Two hearts beating as one, today, tomorrow, and for all our tomorrows."
  },
  {
    image: "assets/suprice.jpg",
    title: "A Lifetime With You",
    text: "Will you give this life for me? My heart and soul belong to you forever ❤️"
  }
];

// =========================================================================
// 3. REASONS WHY I LOVE YOU CONFIGURATION
// =========================================================================
const reasons = [
  {
    num: "01",
    title: "Your Smile",
    text: "Because no matter how chaotic the day has been, the moment you smile, everything in my world becomes peaceful and bright."
  },
  {
    num: "02",
    title: "Your Kindness",
    text: "The gentle, selfless way you care for everyone around you inspires me to be a better person every single day."
  },
  {
    num: "03",
    title: "The Way You Care",
    text: "In the smallest gestures and the quietest moments, your love wraps around my soul like the warmest blanket."
  },
  {
    num: "04",
    title: "The Way You Make Me Happy",
    text: "Just your presence, your funny jokes, and your cute expressions turn ordinary moments into unforgettable magic."
  },
  {
    num: "05",
    title: "Simply... You ❤️",
    text: "For all that you are, all that you've been, and all that you're yet to be. I fell in love with your true self, forever."
  }
];

// =========================================================================
// 4. SPECIAL LOVE LETTER CONTENT
// =========================================================================
const loveLetter = `My Dearest Love,

Happy Birthday! ❤️

From the very first moment our paths crossed, my world became infinitely more beautiful, vibrant, and meaningful. You have this magical ability to bring warmth to the coldest days, serenity to the loudest storms, and pure joy into every corner of my heart.

Thank you for being my favorite confidante, my biggest smile, my sweetest adventure, and my safe haven. Thank you for your patience, your unconditional kindness, and every little laugh we share.

As you step into another wonderful year of your life, I wish you all the dreams your heart can hold, and endless happiness. No matter what changes in this world, one thing will always remain constant: my love for you.

Happy Birthday, my beautiful girl.

Forever & Always Yours,
With all my heart ❤️`;


// =========================================================================
// APPLICATION STATE & CONTROLLER
// =========================================================================
class RomanticApp {
  constructor() {
    this.enteredPin = [];
    this.currentSwipeIndex = 0;
    this.currentReasonIndex = 0;
    this.noClickCount = 0;
    this.isUnlocked = false;
    this.letterAudioPlaying = false;
    this.letterAudioEl = null;

    this.init();
  }

  init() {
    // Inject personalized names into DOM elements
    document.title = `Happy Birthday ${CONFIG.girlfriendName} ❤️ | Our Little World`;
    const heroName = document.getElementById('hero-name-heading');
    if (heroName) heroName.textContent = `${CONFIG.girlfriendName} ❤️`;
    const celebName = document.getElementById('celebration-name');
    if (celebName) celebName.textContent = `${CONFIG.girlfriendName} ❤️`;
    const finalName = document.getElementById('final-recipient-name');
    if (finalName) finalName.textContent = `${CONFIG.girlfriendName} ❤️`;
    const letterContent = document.getElementById('letter-content-text');
    if (letterContent) letterContent.textContent = loveLetter;

    // Initialize Particle Canvas
    if (window.romanticParticles && CONFIG.enableParticles) {
      window.romanticParticles.init('particle-canvas');
      window.romanticParticles.startAmbientHearts();
    }

    // Set up interactive handlers
    this.setupKeypad();
    this.setupCelebration();
    this.setupTimelineObserver();
    this.setupThenNow();
    this.setupEnvelopeMemory();
    this.setupSwipeMemories();
    this.setupMomentsLightbox();
    this.setupReasonsCarousel();
    this.setupLetterCinema();
    this.setupGiftBox();
    this.setupFinalQuestion();
    this.setupSoundToggle();
    this.setupNavigation();
    this.setupTouchInteractions();
  }

  // =========================================================================
  // PIN KEYPAD & UNLOCK FLOW
  // =========================================================================
  setupKeypad() {
    const keypad = document.getElementById('keypad');
    if (!keypad) return;

    keypad.addEventListener('click', (e) => {
      const btn = e.target.closest('.key-btn');
      if (!btn) return;

      const key = btn.getAttribute('data-key');
      this.handleKeyInput(key, e.clientX, e.clientY);
    });

    // Also support keyboard numbers for easy desktop testing
    window.addEventListener('keydown', (e) => {
      if (this.isUnlocked) return;
      if (e.key >= '0' && e.key <= '9') {
        this.handleKeyInput(e.key);
      } else if (e.key === 'Backspace') {
        this.handleKeyInput('backspace');
      }
    });
  }

  handleKeyInput(key, clickX, clickY) {
    if (this.isUnlocked) return;

    // Spawn tiny floating heart on tap
    if (clickX && clickY && window.romanticParticles) {
      window.romanticParticles.spawnTapHeart(clickX, clickY);
    }

    if (key === 'backspace') {
      if (this.enteredPin.length > 0) {
        this.enteredPin.pop();
        if (window.romanticAudio) window.romanticAudio.playPinClick();
        this.updatePinDisplay();
      }
      return;
    }

    if (key === 'heart') {
      // Fun bonus tap effect
      if (window.romanticAudio) window.romanticAudio.playPinClick();
      if (clickX && clickY && window.romanticParticles) {
        window.romanticParticles.spawnTapHeart(clickX, clickY);
      }
      return;
    }

    // Number key entered
    if (this.enteredPin.length < 4) {
      this.enteredPin.push(key);
      if (window.romanticAudio) window.romanticAudio.playPinClick();
      this.updatePinDisplay();

      if (this.enteredPin.length === 4) {
        this.verifyPin();
      }
    }
  }

  updatePinDisplay() {
    for (let i = 0; i < 4; i++) {
      const dot = document.getElementById(`pin-dot-${i}`);
      if (!dot) continue;
      if (i < this.enteredPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled', 'error');
      }
    }
  }

  verifyPin() {
    const entered = this.enteredPin.join('');
    const errorMsg = document.getElementById('lock-error-msg');
    const lockScreen = document.getElementById('lock-screen');

    if (entered === CONFIG.loveCode) {
      // SUCCESS: Cinematic Unlock
      this.isUnlocked = true;
      if (errorMsg) errorMsg.classList.remove('visible');

      // Play the birthday audio immediately when user enters the PIN correctly
      if (window.romanticAudio) {
        window.romanticAudio.playBirthdayAudio(CONFIG.birthdayAudio);
      }

      this.triggerUnlockSequence();
    } else {
      // WRONG CODE: Gentle Romantic Shake
      if (window.romanticAudio) window.romanticAudio.playWrongCode();
      if (lockScreen) lockScreen.classList.add('shake-screen');

      for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`pin-dot-${i}`);
        if (dot) dot.classList.add('error');
      }

      if (errorMsg) {
        errorMsg.textContent = "Hmm... that's not it, my love ❤️";
        errorMsg.classList.add('visible');
      }

      setTimeout(() => {
        if (lockScreen) lockScreen.classList.remove('shake-screen');
        this.enteredPin = [];
        this.updatePinDisplay();
        if (errorMsg) errorMsg.textContent = "Try again...";
      }, 750);
    }
  }

  triggerUnlockSequence() {
    const unlockStage = document.getElementById('unlock-stage');
    const lockScreen = document.getElementById('lock-screen');
    const celebrationOverlay = document.getElementById('celebration-overlay');

    if (window.romanticAudio) window.romanticAudio.playUnlock();

    // Show merging heart animation
    if (unlockStage) unlockStage.classList.add('active');

    setTimeout(() => {
      // Burst hundreds of glowing hearts and particles outward
      if (window.romanticParticles) {
        window.romanticParticles.burstUnlockHearts(window.innerWidth / 2, window.innerHeight / 2);
      }

      // Hide lock screen
      if (lockScreen) lockScreen.classList.add('unlocked');

      setTimeout(() => {
        if (unlockStage) unlockStage.classList.remove('active');
        // Reveal Happy Birthday celebration overlay
        if (celebrationOverlay) celebrationOverlay.classList.add('active');

        // Play celebratory poppers and ensure birthday audio is active
        if (window.romanticAudio) {
          window.romanticAudio.playConfettiPop();
          window.romanticAudio.playBirthdayAudio(CONFIG.birthdayAudio);
        }
        if (window.romanticParticles) {
          window.romanticParticles.launchCelebration(5000);
        }
      }, 700);

    }, 1800);
  }

  // =========================================================================
  // CELEBRATION OVERLAY & HERO ENTRY
  // =========================================================================
  setupCelebration() {
    const btnEnter = document.getElementById('btn-enter-world');
    const btnReplay = document.getElementById('btn-replay-audio');
    const celebrationOverlay = document.getElementById('celebration-overlay');
    const mainExp = document.getElementById('main-experience');
    const bottomNav = document.getElementById('bottom-nav');

    if (btnReplay) {
      btnReplay.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.romanticAudio) {
          window.romanticAudio.playConfettiPop();
          window.romanticAudio.replayBirthdayAudio();
        }
      });
    }

    if (btnEnter) {
      btnEnter.addEventListener('click', () => {
        if (window.romanticAudio) {
          window.romanticAudio.playConfettiPop();
          window.romanticAudio.startBgm(CONFIG.backgroundMusic);
        }
        if (celebrationOverlay) celebrationOverlay.classList.remove('active');
        if (mainExp) mainExp.classList.add('visible');
        if (bottomNav) bottomNav.classList.remove('nav-hidden');

        // Smooth scroll to top of hero
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Hero scroll down indicator
    const scrollStory = document.getElementById('scroll-to-story');
    if (scrollStory) {
      scrollStory.addEventListener('click', () => {
        const littleWorld = document.getElementById('little-world-section');
        if (littleWorld) littleWorld.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Chapter 1 button
    const btnStartStory = document.getElementById('btn-start-story');
    if (btnStartStory) {
      btnStartStory.addEventListener('click', () => {
        const timeline = document.getElementById('story-timeline-section');
        if (timeline) timeline.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // =========================================================================
  // TIMELINE SCROLL TRIGGERED PROGRESSION
  // =========================================================================
  setupTimelineObserver() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressLine = document.getElementById('timeline-progress');
    const timelineSection = document.getElementById('story-timeline-section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.35 });

    timelineItems.forEach(item => observer.observe(item));

    // Dynamic vertical glow height on scroll
    window.addEventListener('scroll', () => {
      if (!timelineSection || !progressLine) return;
      const rect = timelineSection.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        const total = rect.height;
        const current = windowH - rect.top;
        const percent = Math.min(100, Math.max(0, (current / total) * 100));
        progressLine.style.height = `${percent}%`;
      }
    }, { passive: true });
  }

  // =========================================================================
  // THEN & NOW TOGGLE COMPARISON
  // =========================================================================
  setupThenNow() {
    const btnThen = document.getElementById('btn-show-then');
    const btnNow = document.getElementById('btn-show-now');
    const photoWrap = document.getElementById('then-now-wrap');
    const caption = document.getElementById('then-now-caption');

    if (!btnThen || !btnNow || !photoWrap) return;

    btnThen.addEventListener('click', () => {
      btnThen.classList.add('active');
      btnNow.classList.remove('active');
      photoWrap.classList.remove('show-now');
      if (caption) caption.textContent = "Then: Shy smiles over our very first coffee date...";
      if (window.romanticAudio) window.romanticAudio.playPinClick();
    });

    btnNow.addEventListener('click', () => {
      btnNow.classList.add('active');
      btnThen.classList.remove('active');
      photoWrap.classList.add('show-now');
      if (caption) caption.textContent = "Now: Celebrating your birthday, deeply in love and happy ❤️";
      if (window.romanticAudio) window.romanticAudio.playPinClick();
    });
  }

  // =========================================================================
  // ENVELOPE MEMORY CARD (Tap to reveal secret photo)
  // =========================================================================
  setupEnvelopeMemory() {
    const card = document.getElementById('envelope-memory-card');
    if (!card) return;

    card.addEventListener('click', () => {
      card.classList.toggle('opened');
      if (window.romanticAudio) window.romanticAudio.playLetterOpen();
      if (card.classList.contains('opened') && window.romanticParticles) {
        const rect = card.getBoundingClientRect();
        window.romanticParticles.spawnTapHeart(rect.left + rect.width / 2, rect.top + 50);
      }
    });
  }

  // =========================================================================
  // SWIPE MEMORY CARDS (Template G)
  // =========================================================================
  setupSwipeMemories() {
    const deck = document.getElementById('swipe-deck-wrapper');
    const prevBtn = document.getElementById('swipe-prev-btn');
    const nextBtn = document.getElementById('swipe-next-btn');
    const counter = document.getElementById('swipe-counter');

    if (!deck) return;

    // Render cards from memories configuration
    deck.innerHTML = '';
    memories.forEach((mem, index) => {
      const card = document.createElement('div');
      card.className = 'swipe-card';
      card.style.zIndex = memories.length - index;
      card.innerHTML = `
        <div class="swipe-card-img-wrap">
          <img src="${mem.image}" alt="${mem.title}" loading="lazy">
        </div>
        <span class="swipe-card-badge">Memory ${String(index + 1).padStart(2, '0')}</span>
        <h4 class="swipe-card-title">${mem.title}</h4>
        <p class="swipe-card-text">${mem.text}</p>
      `;
      deck.appendChild(card);
    });

    this.updateSwipeStack();

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentSwipeIndex > 0) {
          this.currentSwipeIndex--;
          this.updateSwipeStack();
          if (window.romanticAudio) window.romanticAudio.playPinClick();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentSwipeIndex < memories.length - 1) {
          this.currentSwipeIndex++;
          this.updateSwipeStack();
          if (window.romanticAudio) window.romanticAudio.playPinClick();
        }
      });
    }

    // Touch swipe gestures
    let touchStartX = 0;
    deck.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    deck.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (diff < -45 && this.currentSwipeIndex < memories.length - 1) {
        this.currentSwipeIndex++;
        this.updateSwipeStack();
        if (window.romanticAudio) window.romanticAudio.playPinClick();
      } else if (diff > 45 && this.currentSwipeIndex > 0) {
        this.currentSwipeIndex--;
        this.updateSwipeStack();
        if (window.romanticAudio) window.romanticAudio.playPinClick();
      }
    }, { passive: true });
  }

  updateSwipeStack() {
    const cards = document.querySelectorAll('.swipe-card');
    const counter = document.getElementById('swipe-counter');

    cards.forEach((card, i) => {
      if (i < this.currentSwipeIndex) {
        // Discarded left
        card.style.transform = `translateX(-120%) rotate(-15deg)`;
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
      } else if (i === this.currentSwipeIndex) {
        // Active top card
        card.style.transform = `translateX(0) scale(1)`;
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
      } else {
        // Stacked underneath
        const offset = (i - this.currentSwipeIndex) * 8;
        const scale = 1 - (i - this.currentSwipeIndex) * 0.05;
        card.style.transform = `translateY(${offset}px) scale(${scale})`;
        card.style.opacity = '0.7';
        card.style.pointerEvents = 'none';
      }
    });

    if (counter) {
      counter.textContent = `${String(this.currentSwipeIndex + 1).padStart(2, '0')} / ${String(memories.length).padStart(2, '0')}`;
    }
  }

  // =========================================================================
  // MOMENTS REEL LIGHTBOX (All 11 Photos Tap to View)
  // =========================================================================
  setupMomentsLightbox() {
    const items = document.querySelectorAll('.moments-grid-item');
    const modal = document.getElementById('photo-lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close-btn');
    const backdrop = document.getElementById('lightbox-backdrop');

    if (!modal || !modalImg) return;

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        const src = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption') || '';
        modalImg.src = src;
        if (modalCaption) modalCaption.textContent = caption;
        modal.classList.add('active');

        if (window.romanticParticles) {
          window.romanticParticles.spawnTapHeart(e.clientX, e.clientY);
        }
        if (window.romanticAudio) {
          window.romanticAudio.playPinClick();
        }
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
  }

  // =========================================================================
  // REASONS WHY I LOVE YOU CAROUSEL
  // =========================================================================
  setupReasonsCarousel() {
    const container = document.getElementById('reasons-carousel');
    const indicators = document.getElementById('reason-indicators');
    if (!container || !indicators) return;

    container.innerHTML = '';
    indicators.innerHTML = '';

    reasons.forEach((r, idx) => {
      // Reason Card
      const card = document.createElement('div');
      card.className = `reason-card ${idx === 0 ? 'active' : ''}`;
      card.innerHTML = `
        <div class="reason-top-row">
          <span class="reason-number">${r.num}</span>
          <span class="reason-heart-badge">❤️</span>
        </div>
        <div>
          <h4 class="reason-title">${r.title}</h4>
          <p class="reason-detail">${r.text}</p>
        </div>
      `;
      // Tap card to advance to next reason
      card.addEventListener('click', () => {
        this.currentReasonIndex = (this.currentReasonIndex + 1) % reasons.length;
        this.updateReasonsView();
        if (window.romanticAudio) window.romanticAudio.playPinClick();
      });
      container.appendChild(card);

      // Indicator Dot
      const dot = document.createElement('div');
      dot.className = `reason-indicator-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        this.currentReasonIndex = idx;
        this.updateReasonsView();
        if (window.romanticAudio) window.romanticAudio.playPinClick();
      });
      indicators.appendChild(dot);
    });

    // Touch swipe support
    let touchStartX = 0;
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (diff < -40) {
        this.currentReasonIndex = (this.currentReasonIndex + 1) % reasons.length;
        this.updateReasonsView();
        if (window.romanticAudio) window.romanticAudio.playPinClick();
      } else if (diff > 40) {
        this.currentReasonIndex = (this.currentReasonIndex - 1 + reasons.length) % reasons.length;
        this.updateReasonsView();
        if (window.romanticAudio) window.romanticAudio.playPinClick();
      }
    }, { passive: true });
  }

  updateReasonsView() {
    const cards = document.querySelectorAll('.reason-card');
    const dots = document.querySelectorAll('.reason-indicator-dot');

    cards.forEach((card, idx) => {
      card.classList.remove('active', 'prev');
      if (idx === this.currentReasonIndex) {
        card.classList.add('active');
      } else if (idx < this.currentReasonIndex) {
        card.classList.add('prev');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === this.currentReasonIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // SPECIAL LETTER CINEMATIC HEARTBEAT SCENE
  // =========================================================================
  setupLetterCinema() {
    const btnEnterCinema = document.getElementById('btn-enter-letter-cinema');
    const cinemaStage = document.getElementById('letter-cinema-stage');
    const pulsingEnv = document.getElementById('cinema-pulsing-envelope');
    const readingModal = document.getElementById('letter-reading-modal');
    const btnCloseLetter = document.getElementById('btn-close-letter');
    const bottomNav = document.getElementById('bottom-nav');
    const audioBtn = document.getElementById('letter-audio-play-btn');

    if (btnEnterCinema && cinemaStage) {
      btnEnterCinema.addEventListener('click', () => {
        // Hide bottom nav and ambient UI for absolute intimacy
        if (bottomNav) bottomNav.classList.add('nav-hidden');
        cinemaStage.classList.add('active');

        // Start realistic pulsing heartbeat sound
        if (window.romanticAudio) {
          window.romanticAudio.startHeartbeat(CONFIG.heartbeatAudio);
        }
      });
    }

    if (pulsingEnv && readingModal) {
      pulsingEnv.addEventListener('click', () => {
        // Stop heartbeat sound
        if (window.romanticAudio) {
          window.romanticAudio.stopHeartbeat();
          window.romanticAudio.playLetterOpen();
        }

        // Open letter reading modal with rose petal burst
        cinemaStage.classList.remove('active');
        readingModal.classList.add('active');

        if (window.romanticParticles) {
          window.romanticParticles.launchCelebration(2500);
        }
      });
    }

    if (btnCloseLetter && readingModal) {
      btnCloseLetter.addEventListener('click', () => {
        readingModal.classList.remove('active');
        if (bottomNav) bottomNav.classList.remove('nav-hidden');

        // Stop letter audio if playing
        if (this.letterAudioEl) {
          this.letterAudioEl.pause();
          this.letterAudioPlaying = false;
        }

        // Smooth scroll to surprise section
        const surprise = document.getElementById('surprise-section');
        if (surprise) surprise.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Optional letter voice playback
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (!this.letterAudioEl) {
          this.letterAudioEl = new Audio(CONFIG.letterAudio);
          this.letterAudioEl.onended = () => {
            this.letterAudioPlaying = false;
            audioBtn.textContent = '▶';
          };
        }

        if (this.letterAudioPlaying) {
          this.letterAudioEl.pause();
          this.letterAudioPlaying = false;
          audioBtn.textContent = '▶';
        } else {
          this.letterAudioEl.play().then(() => {
            this.letterAudioPlaying = true;
            audioBtn.textContent = '⏸';
          }).catch(err => {
            console.log("No custom letter voice file found. You can add assets/letter.mp3 anytime!");
            if (window.romanticAudio) window.romanticAudio.playUnlock();
          });
        }
      });
    }
  }

  // =========================================================================
  // SURPRISE GIFT BOX
  // =========================================================================
  setupGiftBox() {
    const giftBox = document.getElementById('gift-box-container');
    const revealedCard = document.getElementById('surprise-revealed-card');
    const hint = document.getElementById('gift-tap-hint');
    const btnSurpriseYes = document.getElementById('btn-surprise-yes');

    if (!giftBox) return;

    giftBox.addEventListener('click', (e) => {
      if (giftBox.classList.contains('opened')) return;

      giftBox.classList.add('opened');
      if (hint) hint.textContent = "Surprise Unlocked! ✨";

      // Boom! Explosion of confetti, stars, hearts, petals
      if (window.romanticAudio) window.romanticAudio.playGiftOpen();
      if (window.romanticParticles) {
        window.romanticParticles.burstGift(e.clientX, e.clientY);
      }

      setTimeout(() => {
        if (revealedCard) revealedCard.classList.add('visible');
      }, 400);
    });

    if (btnSurpriseYes) {
      btnSurpriseYes.addEventListener('click', () => {
        if (window.romanticAudio) window.romanticAudio.playYesCelebration();
        if (window.romanticParticles) window.romanticParticles.burstYesLove();
        const questionSec = document.getElementById('question-section');
        if (questionSec) {
          questionSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // =========================================================================
  // FINAL QUESTION: PLAYFUL YES / NO INTERACTION
  // =========================================================================
  setupFinalQuestion() {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const tooltip = document.getElementById('no-tooltip');
    const finalModal = document.getElementById('final-screen-modal');
    const replayBtn = document.getElementById('btn-replay-story');

    if (btnNo) {
      btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        this.noClickCount++;

        if (window.romanticAudio) window.romanticAudio.playPinClick();

        // Playfully dodge / move button
        const angles = [-35, 40, -45, 50];
        const moveX = (this.noClickCount % 2 === 1 ? -1 : 1) * (40 + Math.random() * 40);
        const moveY = (Math.random() - 0.5) * 40;
        btnNo.style.transform = `translate(${moveX}px, ${moveY}px) scale(${Math.max(0.7, 1 - this.noClickCount * 0.1)})`;

        // Make YES button grow bigger and pulse with tempting glow
        if (btnYes) {
          const yesScale = 1 + this.noClickCount * 0.12;
          btnYes.style.transform = `scale(${yesScale})`;
        }

        // Cute messages
        if (tooltip) {
          if (this.noClickCount === 1) {
            tooltip.textContent = "Are you sure? 🥺";
          } else if (this.noClickCount === 2) {
            tooltip.textContent = "Think again, my love ❤️";
          } else {
            tooltip.textContent = "Nice try, but your heart says YES! 🥰";
          }
        }
      });
    }

    if (btnYes) {
      btnYes.addEventListener('click', () => {
        // Triumphant heart celebration
        if (window.romanticAudio) window.romanticAudio.playYesCelebration();
        if (window.romanticParticles) window.romanticParticles.burstYesLove();

        if (tooltip) tooltip.textContent = "Then it's you and me... always. ❤️";

        setTimeout(() => {
          if (finalModal) finalModal.classList.add('active');
          if (window.romanticParticles) window.romanticParticles.launchCelebration(6000);
        }, 1200);
      });
    }

    if (replayBtn && finalModal) {
      replayBtn.addEventListener('click', () => {
        finalModal.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // =========================================================================
  // AUDIO TOGGLE BUTTON
  // =========================================================================
  setupSoundToggle() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      if (window.romanticAudio) {
        const isMuted = window.romanticAudio.toggleMute();
        if (isMuted) {
          soundBtn.classList.add('muted');
        } else {
          soundBtn.classList.remove('muted');
        }
      }
    });
  }

  // =========================================================================
  // FLOATING BOTTOM NAVIGATION
  // =========================================================================
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (window.romanticAudio) window.romanticAudio.playPinClick();
        }
      });
    });

    // Update active nav button on scroll
    window.addEventListener('scroll', () => {
      if (!this.isUnlocked) return;
      const sections = ['hero-section', 'story-timeline-section', 'memories-section', 'letter-invite-section', 'surprise-section'];
      const scrollPos = window.scrollY + 200;

      sections.forEach(secId => {
        const el = document.getElementById(secId);
        if (!el) return;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navItems.forEach(btn => {
            if (btn.getAttribute('data-target') === secId) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
      });
    }, { passive: true });
  }

  // =========================================================================
  // MICRO-INTERACTIONS & TOUCH EFFECTS
  // =========================================================================
  setupTouchInteractions() {
    // Touch parallax on floating photo card
    const tiltCard = document.getElementById('floating-photo-tilt');
    if (tiltCard && CONFIG.enableParallax) {
      tiltCard.addEventListener('mousemove', (e) => {
        const rect = tiltCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        tiltCard.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
      });
      tiltCard.addEventListener('mouseleave', () => {
        tiltCard.style.transform = '';
      });
    }
  }
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.romanticApp = new RomanticApp();
});
