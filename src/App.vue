<template>
  <div class="app">

    <!-- ConfigApplier Component (Accessed using ref) -->
    <ConfigApplier ref="configApplier" />

       <!-- Hero Section -->
    <header class="hero">
      <div class="hero-overlay">
        <div class="hero-content">
          <h1 class="hero-title">Transforming Businesses with AI Solutions</h1>
          <p class="hero-subtitle">Harness the power of artificial intelligence to drive innovation and growth</p>
          <button class="cta-button" @click="navigateToServices">Explore Our Solutions</button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Mission Section -->
      <section class="section mission-section">
        <div class="section-content">
          <div class="text-content">
            <h2 class="section-title">Bridging Innovation with Expertise</h2>
            <p class="section-text">
              At Vision Bridge, we combine deep technical expertise with strategic insight to deliver transformative AI solutions. Our mission is to empower organizations through intelligent automation and data-driven decision making.
            </p>
          </div>
          <div class="graphic-content">
            <div class="innovation-graphic"></div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="section services-section">
        <h2 class="section-title text-center">Our Core Services</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🤖</div>
            <h3 class="service-title">AI Strategy</h3>
            <p class="service-description">Custom roadmaps for successful AI implementation</p>
          </div>
          <div class="service-card">
            <div class="service-icon">🧠</div>
            <h3 class="service-title">Machine Learning</h3>
            <p class="service-description">Advanced predictive modeling and analytics</p>
          </div>
          <div class="service-card">
            <div class="service-icon">📈</div>
            <h3 class="service-title">Business Automation</h3>
            <p class="service-description">Streamline operations with intelligent systems</p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="section team-section">
        <div class="section-content reversed">
          <div class="graphic-content">
            <div class="team-graphic"></div>
          </div>
          <div class="text-content">
            <h2 class="section-title">World-Class Expertise</h2>
            <p class="section-text">
              Our team of AI specialists, data scientists, and industry experts brings decades of combined experience in delivering cutting-edge solutions across multiple sectors.
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="section contact-section">
        <div class="contact-container">
          <div class="contact-info">
            <h2 class="section-title">Let's Transform Your Business</h2>
            <div class="info-item">
              <span class="info-icon">📍</span>
              <p>123 Innovation Blvd, Tech Valley</p>
            </div>
            <div class="info-item">
              <span class="info-icon">📞</span>
              <p>+1 (555) 123-4567</p>
            </div>
            <div class="info-item">
              <span class="info-icon">✉️</span>
              <p>contact@visionbridge.ai</p>
            </div>
          </div>
          <form class="contact-form" @submit.prevent="sendMessage">
            <div class="form-group">
              <input type="text" v-model="name" placeholder="Your Name" class="form-input" required />
            </div>
            <div class="form-group">
              <input type="email" v-model="email" placeholder="Email Address" class="form-input" required />
            </div>
            <div class="form-group">
              <textarea v-model="message" placeholder="How can we help you?" class="form-textarea" rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-button">Send Message</button>
          </form>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="main-footer">
      <div class="footer-content">
        <div class="footer-brand">
          <h3 class="footer-title">Vision Bridge</h3>
          <p class="footer-tagline">Pioneering Intelligent Solutions</p>
        </div>
        <div class="footer-links">
          <a href="#about" class="footer-link">About Us</a>
          <a href="#services" class="footer-link">Services</a>
          <a href="#careers" class="footer-link">Careers</a>
          <a href="#contact" class="footer-link">Contact</a>
        </div>
        <div class="social-links">
          <a href="#" class="social-icon">🐦</a>
          <a href="#" class="social-icon">💼</a>
          <a href="#" class="social-icon">📸</a>
        </div>
      </div>
      <div class="copyright">
        © 2024 Vision Bridge. All rights reserved.
      </div>
    </footer>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import ConfigApplier from './components/ConfigApplier.vue';

const name = ref('');
const email = ref('');
const message = ref('');

const sendMessage = () => {
  console.log(`Message from: ${name.value}, Email: ${email.value}, Message: ${message.value}`);
  // Form submission actions will be handled here
};

const navigateToServices = () => {
  window.scrollTo({ top: document.querySelector('.services').offsetTop, behavior: 'smooth' });
};

// Created reference to access ConfigApplier component
const configApplier = ref(null);

// Method called when the "Apply Configurations" button is clicked
const applyConfigurations = () => {
  if (configApplier.value && configApplier.value.applyConfigs) {
    configApplier.value.applyConfigs();
  } else {
    console.warn("ConfigApplier method not available!");
  }
};
</script>

<style scoped>
:root {
  --primary-color: #2a2d3b;
  --secondary-color: #4a90e2;
  --accent-color: #00c8a4;
  --text-color: #333;
  --light-bg: #f9fafc;
  --transition-speed: 0.3s;
}

/* Config Control Bar */
.config-control-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}


/* Base Styles */
.app {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--text-color);
  line-height: 1.6;
  padding-top: 70px; /* Space for config bar */
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-color), #1a1c25);
  min-height: 70vh;
  position: relative;
  color: white;
  margin-top: 70px; /* Prevent double padding */
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.4);
  padding: 4rem 2rem;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Other styles remain the same... */
/* [Remaining styles unchanged] */

/* Responsive Design */
@media (max-width: 768px) {
  .config-control-bar {
    padding: 0.8rem 1rem;
  }
  
  .app {
    padding-top: 60px;
  }
  
  .hero {
    margin-top: 60px;
    min-height: 60vh;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .section {
    padding: 4rem 1rem;
  }
}
.apply-configs {
  text-align: center;
  margin: 20px 0;
}

.apply-configs button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
